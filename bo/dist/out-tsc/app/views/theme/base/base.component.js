import { __decorate, __metadata } from "tslib";
// Angular
import { Component, ViewEncapsulation } from '@angular/core';
// Object-Path
import * as objectPath from 'object-path';
// Layout
import { LayoutConfigService, MenuConfigService, } from '../../../core/_base/layout';
import { HtmlClassService } from '../html-class.service';
import { LayoutConfig } from '../../../core/_config/layout.config';
import { MenuConfig } from '../../../core/_config/menu.config';
// User permissions
import { NgxPermissionsService } from 'ngx-permissions';
import { Account, LoopBackAuth } from '../../../api';
var BaseComponent = /** @class */ (function () {
    /**
     * Component constructor
     *
     * @param layoutConfigService: LayoutConfigService
     * @param menuConfigService: MenuConfifService
     * @param htmlClassService: HtmlClassService
     * @param permissionsService
     * @param auth
     */
    function BaseComponent(layoutConfigService, menuConfigService, htmlClassService, permissionsService, auth) {
        var _this = this;
        this.layoutConfigService = layoutConfigService;
        this.menuConfigService = menuConfigService;
        this.htmlClassService = htmlClassService;
        this.permissionsService = permissionsService;
        this.auth = auth;
        this.userLogin = new Account();
        this.isRoleAdmin = false;
        this.isRoleSuperAdmin = false;
        // Private properties
        this.unsubscribe = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
        this.userLogin = this.auth.getCurrentUserData();
        this.isRoleAdmin = this.userLogin.roles[0].name === 'ADMIN';
        this.isRoleSuperAdmin = this.userLogin.roles[0].name === 'SUPERADMIN';
        this.loadRolesWithPermissions();
        // register configs by demos
        this.layoutConfigService.loadConfigs(new LayoutConfig().configs);
        var config = new MenuConfig().configs;
        // console.log('BASE MENU CONFIG', config);
        if (!this.isRoleAdmin && !this.isRoleSuperAdmin) {
            var findStatisticMenu = config.aside.items.find(function (it) { return it.page === '/statistic'; });
            var index1 = config.aside.items.indexOf(findStatisticMenu);
            if (index1) {
                config.aside.items.splice(index1, 1);
            }
        }
        if (!this.isRoleSuperAdmin) {
            var findVPS = config.aside.items.find(function (it) { return it.title === 'system'; });
            var index2 = config.aside.items.indexOf(findVPS);
            if (index2) {
                config.aside.items.splice(index2, 1);
            }
        }
        this.menuConfigService.loadConfigs(config);
        // setup element classes
        this.htmlClassService.setConfig(this.layoutConfigService.getConfig());
        var subscr = this.layoutConfigService.onConfigUpdated$.subscribe(function (layoutConfig) {
            // reset body class based on global and page level layout config, refer to html-class.service.ts
            document.body.className = '';
            _this.htmlClassService.setConfig(layoutConfig);
        });
        this.unsubscribe.push(subscr);
    }
    /**
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
     */
    /**
     * On init
     */
    BaseComponent.prototype.ngOnInit = function () {
        var _this = this;
        var config = this.layoutConfigService.getConfig();
        this.selfLayout = objectPath.get(config, 'self.layout');
        this.asideDisplay = objectPath.get(config, 'aside.self.display');
        this.subheaderDisplay = objectPath.get(config, 'subheader.display');
        this.desktopHeaderDisplay = objectPath.get(config, 'header.self.fixed.desktop');
        this.fitTop = objectPath.get(config, 'content.fit-top');
        this.fluid = objectPath.get(config, 'content.width') === 'fluid';
        // let the layout type change
        var subscr = this.layoutConfigService.onConfigUpdated$.subscribe(function (cfg) {
            setTimeout(function () {
                _this.selfLayout = objectPath.get(cfg, 'self.layout');
            });
        });
        this.unsubscribe.push(subscr);
    };
    /**
     * On destroy
     */
    BaseComponent.prototype.ngOnDestroy = function () {
        this.unsubscribe.forEach(function (sb) { return sb.unsubscribe(); });
    };
    /**
     * NGX Permissions, init roles
     */
    BaseComponent.prototype.loadRolesWithPermissions = function () { };
    BaseComponent = __decorate([
        Component({
            selector: 'kt-base',
            templateUrl: './base.component.html',
            styleUrls: ['./base.component.scss'],
            encapsulation: ViewEncapsulation.None,
        }),
        __metadata("design:paramtypes", [LayoutConfigService,
            MenuConfigService,
            HtmlClassService,
            NgxPermissionsService,
            LoopBackAuth])
    ], BaseComponent);
    return BaseComponent;
}());
export { BaseComponent };
//# sourceMappingURL=base.component.js.map