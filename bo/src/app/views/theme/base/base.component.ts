// Angular
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
// RxJS
import { Observable, Subscription } from 'rxjs';
// Object-Path
import * as objectPath from 'object-path';
// Layout
import {
  LayoutConfigService,
  MenuConfigService,
} from '../../../core/_base/layout';
import { HtmlClassService } from '../html-class.service';
import { LayoutConfig } from '../../../core/_config/layout.config';
import { MenuConfig } from '../../../core/_config/menu.config';
// User permissions
import { NgxPermissionsService } from 'ngx-permissions';
import { Account, LoopBackAuth } from '../../../api';

@Component({
  selector: 'kt-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BaseComponent implements OnInit, OnDestroy {
  // Public variables
  selfLayout: string;
  asideDisplay: boolean;
  asideSecondary: boolean;
  subheaderDisplay: boolean;
  desktopHeaderDisplay: boolean;
  fitTop: boolean;
  fluid: boolean;
  userLogin: Account = new Account();
  isRoleAdmin = false;
  isRoleSuperAdmin = false;

  // Private properties
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  /**
   * Component constructor
   *
   * @param layoutConfigService: LayoutConfigService
   * @param menuConfigService: MenuConfifService
   * @param htmlClassService: HtmlClassService
   * @param permissionsService
   * @param auth
   */
  constructor(
    private layoutConfigService: LayoutConfigService,
    private menuConfigService: MenuConfigService,
    private htmlClassService: HtmlClassService,
    private permissionsService: NgxPermissionsService,
    private auth: LoopBackAuth
  ) {
    this.userLogin = this.auth.getCurrentUserData();
    this.isRoleAdmin = this.userLogin.roles[0].name === 'ADMIN';
    this.isRoleSuperAdmin = this.userLogin.roles[0].name === 'SUPERADMIN';
    this.loadRolesWithPermissions();

    // register configs by demos
    this.layoutConfigService.loadConfigs(new LayoutConfig().configs);
    const config = new MenuConfig().configs;
    // console.log('BASE MENU CONFIG', config);
    if (!this.isRoleAdmin && !this.isRoleSuperAdmin) {
      const findStatisticMenu = config.aside.items.find(
        (it) => it.page === '/statistic'
      );
      const index1 = config.aside.items.indexOf(findStatisticMenu);
      if (index1) {
        config.aside.items.splice(index1, 1);
      }
    }
    if (!this.isRoleSuperAdmin) {
      const findVPS = config.aside.items.find((it) => it.title === 'system');
      const index2 = config.aside.items.indexOf(findVPS);
      if (index2) {
        config.aside.items.splice(index2, 1);
      }
    }
    this.menuConfigService.loadConfigs(config);

    // setup element classes
    this.htmlClassService.setConfig(this.layoutConfigService.getConfig());

    const subscr = this.layoutConfigService.onConfigUpdated$.subscribe(
      (layoutConfig) => {
        // reset body class based on global and page level layout config, refer to html-class.service.ts
        document.body.className = '';
        this.htmlClassService.setConfig(layoutConfig);
      }
    );
    this.unsubscribe.push(subscr);
  }

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit(): void {
    const config = this.layoutConfigService.getConfig();
    this.selfLayout = objectPath.get(config, 'self.layout');
    this.asideDisplay = objectPath.get(config, 'aside.self.display');
    this.subheaderDisplay = objectPath.get(config, 'subheader.display');
    this.desktopHeaderDisplay = objectPath.get(
      config,
      'header.self.fixed.desktop'
    );
    this.fitTop = objectPath.get(config, 'content.fit-top');
    this.fluid = objectPath.get(config, 'content.width') === 'fluid';

    // let the layout type change
    const subscr = this.layoutConfigService.onConfigUpdated$.subscribe(
      (cfg) => {
        setTimeout(() => {
          this.selfLayout = objectPath.get(cfg, 'self.layout');
        });
      }
    );
    this.unsubscribe.push(subscr);
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  /**
   * NGX Permissions, init roles
   */
  loadRolesWithPermissions() {}
}
