import { __decorate, __metadata } from "tslib";
// Angular
import { Component } from '@angular/core';
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
var AppComponent = /** @class */ (function () {
    /**
     * Component constructor
     *
     * @param translationService: TranslationService
     * @param router: Router
     * @param layoutConfigService: LayoutCongifService
     * @param translateService
     * @param swUpdate
     */
    function AppComponent(translationService, router, layoutConfigService, translateService) {
        this.translationService = translationService;
        this.router = router;
        this.layoutConfigService = layoutConfigService;
        this.translateService = translateService;
        // Public properties
        this.title = 'Metronic';
        this.unsubscribe = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
        // register translations
        this.translationService.loadTranslations(enLang, chLang, esLang, jpLang, deLang, frLang, viLang);
    }
    /**
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
     */
    /**
     * On init
     */
    AppComponent.prototype.ngOnInit = function () {
        // enable/disable loader
        this.initApplication();
        this.loader = this.layoutConfigService.getConfig('loader.enabled');
        var routerSubscription = this.router.events.subscribe(function (event) {
            if (event instanceof NavigationEnd) {
                // hide splash screen
                // scroll to top on every route change
                window.scrollTo(0, 0);
                // to display back the body content
                setTimeout(function () {
                    document.body.classList.add('kt-page--loaded');
                }, 500);
            }
        });
        this.unsubscribe.push(routerSubscription);
    };
    /**
     * On Destroy
     */
    AppComponent.prototype.ngOnDestroy = function () {
        this.unsubscribe.forEach(function (sb) { return sb.unsubscribe(); });
    };
    AppComponent.prototype.initApplication = function () {
        var _this = this;
        // console.log('init');
        LoopBackConfig.setBaseURL(environment.apiUrl);
        LoopBackConfig.setApiVersion(environment.apiVersion);
        LoopBackConfig.whereOnUrl();
        LoopBackConfig.filterOnUrl();
        // const browserLang = this.translateService.getBrowserLang();
        // this.translateService.use(browserLang.match(/en|fr/) ? browserLang : 'fr');
        window.translateService = this.translateService;
        window.t = function (key) { return _this.translateService.instant(key); };
    };
    AppComponent = __decorate([
        Component({
            // tslint:disable-next-line:component-selector
            selector: 'body[kt-root]',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
            // changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [TranslationService,
            Router,
            LayoutConfigService,
            TranslateService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map