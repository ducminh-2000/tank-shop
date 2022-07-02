import { __decorate, __metadata } from "tslib";
// Angular
import { Component } from '@angular/core';
// Layout
import { LayoutConfigService } from '../../../../core/_base/layout';
var HeaderMobileComponent = /** @class */ (function () {
    /**
     * Component constructor
     *
     * @param layoutConfigService: LayoutConfigService
     */
    function HeaderMobileComponent(layoutConfigService) {
        this.layoutConfigService = layoutConfigService;
        this.toggleOptions = {
            target: 'body',
            targetState: 'kt-header__topbar--mobile-on',
            togglerState: 'kt-header-mobile__toolbar-topbar-toggler--active'
        };
    }
    /**
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
     */
    /**
     * On init
     */
    HeaderMobileComponent.prototype.ngOnInit = function () {
        this.headerLogo = 'asset/images/logo.png';
        this.asideDisplay = this.layoutConfigService.getConfig('aside.self.display');
    };
    HeaderMobileComponent = __decorate([
        Component({
            selector: 'kt-header-mobile',
            templateUrl: './header-mobile.component.html',
            styleUrls: ['./header-mobile.component.scss']
        }),
        __metadata("design:paramtypes", [LayoutConfigService])
    ], HeaderMobileComponent);
    return HeaderMobileComponent;
}());
export { HeaderMobileComponent };
//# sourceMappingURL=header-mobile.component.js.map