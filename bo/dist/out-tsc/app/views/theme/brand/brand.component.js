import { __decorate, __metadata } from "tslib";
// Angular
import { Component } from '@angular/core';
// Layout
import { LayoutConfigService } from '../../../core/_base/layout';
import { HtmlClassService } from '../html-class.service';
var BrandComponent = /** @class */ (function () {
    /**
     * Component constructor
     *
     * @param layoutConfigService: LayoutConfigService
     * @param htmlClassService: HtmlClassService
     */
    function BrandComponent(layoutConfigService, htmlClassService) {
        this.layoutConfigService = layoutConfigService;
        this.htmlClassService = htmlClassService;
        this.toggleOptions = {
            target: 'body',
            targetState: 'kt-aside--minimize',
            togglerState: 'kt-aside__brand-aside-toggler--active'
        };
    }
    /**
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
     */
    /**
     * On init
     */
    BrandComponent.prototype.ngOnInit = function () {
        this.headerLogo = this.layoutConfigService.getLogo();
        this.headerStickyLogo = this.layoutConfigService.getStickyLogo();
    };
    /**
     * On after view init
     */
    BrandComponent.prototype.ngAfterViewInit = function () {
    };
    BrandComponent = __decorate([
        Component({
            selector: 'kt-brand',
            templateUrl: './brand.component.html',
            styleUrls: ['./brand.component.scss'],
        }),
        __metadata("design:paramtypes", [LayoutConfigService, HtmlClassService])
    ], BrandComponent);
    return BrandComponent;
}());
export { BrandComponent };
//# sourceMappingURL=brand.component.js.map