import { __decorate, __metadata } from "tslib";
// Angular
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
// Object-Path
import * as objectPath from 'object-path';
// Loading bar
import { LoadingBarService } from '@ngx-loading-bar/core';
// Layout
import { LayoutConfigService, LayoutRefService } from '../../../core/_base/layout';
// HTML Class Service
import { HtmlClassService } from '../html-class.service';
import { Account, LoopBackAuth } from '../../../api';
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(router, layoutRefService, layoutConfigService, loader, htmlClassService, auth) {
        var _this = this;
        this.router = router;
        this.layoutRefService = layoutRefService;
        this.layoutConfigService = layoutConfigService;
        this.loader = loader;
        this.htmlClassService = htmlClassService;
        this.auth = auth;
        this.isNotify = 0;
        /**
         * Component constructor
         *
         * @param router: Router
         * @param layoutRefService: LayoutRefService
         * @param layoutConfigService: LayoutConfigService
         * @param loader: LoadingBarService
         * @param htmlClassService: HtmlClassService
         * @param notificationApi
         * @param auth
         */
        this.userLogin = new Account();
        this.isRoleAdmin = false;
        // page progress bar percentage
        this.router.events.subscribe(function (event) {
            if (event instanceof NavigationStart) {
                // set page progress bar loading to start on NavigationStart event router
                _this.loader.start();
            }
            if (event instanceof RouteConfigLoadStart) {
                _this.loader.increment(35);
            }
            if (event instanceof RouteConfigLoadEnd) {
                _this.loader.increment(75);
            }
            if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
                // set page progress bar loading to end on NavigationEnd event router
                _this.loader.complete();
            }
        });
    }
    /**
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
     */
    /**
     * On init
     */
    HeaderComponent.prototype.ngOnInit = function () {
        this.userLogin = this.auth.getCurrentUserData();
        this.isRoleAdmin = this.userLogin.roles[0].name === 'SUPERADMIN';
        var config = this.layoutConfigService.getConfig();
        // get menu header display option
        this.menuHeaderDisplay = objectPath.get(config, 'header.menu.self.display');
        // header width fluid
        this.fluid = objectPath.get(config, 'header.self.width') === 'fluid';
        // animate the header minimize the height on scroll down. to be removed, not applicable for default demo
        /*if (objectPath.get(config, 'header.self.fixed.desktop.enabled') || objectPath.get(config, 'header.self.fixed.desktop')) {
            // header minimize on scroll down
            this.ktHeader.nativeElement.setAttribute('data-ktheader-minimize', '1');
        }*/
        this.getNotifications();
    };
    HeaderComponent.prototype.ngAfterViewInit = function () {
        // keep header element in the service
        this.layoutRefService.addElement('header', this.ktHeader.nativeElement);
    };
    HeaderComponent.prototype.getNotifications = function () {
        var filter = {
            accountId: this.isRoleAdmin ? undefined : this.userLogin.id,
            or: [
                { read: { neq: 'READ' } },
                { read: null }
            ]
        };
    };
    __decorate([
        ViewChild('ktHeader', { static: true }),
        __metadata("design:type", ElementRef)
    ], HeaderComponent.prototype, "ktHeader", void 0);
    HeaderComponent = __decorate([
        Component({
            selector: 'kt-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.scss']
        }),
        __metadata("design:paramtypes", [Router,
            LayoutRefService,
            LayoutConfigService,
            LoadingBarService,
            HtmlClassService,
            LoopBackAuth])
    ], HeaderComponent);
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map