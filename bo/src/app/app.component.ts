import { Subscription } from 'rxjs';
// Angular
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// Layout
import { LayoutConfigService, TranslationService } from './core/_base/layout';
// language list
import { locale as enLang } from './core/_config/i18n/en';
import { locale as chLang } from './core/_config/i18n/ch';
import { locale as esLang } from './core/_config/i18n/es';
import { locale as jpLang } from './core/_config/i18n/jp';
import { locale as deLang } from './core/_config/i18n/de';
import { locale as frLang } from './core/_config/i18n/fr';
import { locale as viLang } from './core/_config/i18n/vi';
import { LoopBackConfig } from './api';
import { environment } from '../environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body[kt-root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  // Public properties
  title = 'Metronic';
  loader: boolean;
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  /**
   * Component constructor
   *
   * @param translationService: TranslationService
   * @param router: Router
   * @param layoutConfigService: LayoutCongifService
   * @param translateService
   * @param swUpdate
   */
  constructor(
    private translationService: TranslationService,
    private router: Router,
    private layoutConfigService: LayoutConfigService,
    private translateService: TranslateService
  ) {

    // register translations
    this.translationService.loadTranslations(enLang, chLang, esLang, jpLang, deLang, frLang, viLang);
  }

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit(): void {
    // enable/disable loader
    this.initApplication();
    this.loader = this.layoutConfigService.getConfig('loader.enabled');

    const routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // hide splash screen

        // scroll to top on every route change
        window.scrollTo(0, 0);

        // to display back the body content
        setTimeout(() => {
          document.body.classList.add('kt-page--loaded');
        }, 500);
      }
    });
    this.unsubscribe.push(routerSubscription);
  }

  /**
   * On Destroy
   */
  ngOnDestroy() {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
  }

  initApplication() {
    // console.log('init');
    LoopBackConfig.setBaseURL(environment.apiUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
    LoopBackConfig.whereOnUrl();
    LoopBackConfig.filterOnUrl();


    // const browserLang = this.translateService.getBrowserLang();
    // this.translateService.use(browserLang.match(/en|fr/) ? browserLang : 'fr');
    (window as any).translateService = this.translateService;
    (window as any).t = key => this.translateService.instant(key);
  }
}
