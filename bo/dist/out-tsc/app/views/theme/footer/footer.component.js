import { __decorate, __metadata } from "tslib";
// Angular
import { Component } from '@angular/core';
// Layout
import { LayoutConfigService } from '../../../core/_base/layout';
// Object-Path
import * as objectPath from 'object-path';
var FooterComponent = /** @class */ (function () {
    /**
     * Component constructor
     *
     * @param layoutConfigService: LayouConfigService
     */
    function FooterComponent(layoutConfigService) {
        this.layoutConfigService = layoutConfigService;
        // Public properties
        this.today = Date.now();
    }
    /**
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
     */
    /**
     * On init
     */
    FooterComponent.prototype.ngOnInit = function () {
        var config = this.layoutConfigService.getConfig();
        // footer width fluid
        this.fluid = objectPath.get(config, 'footer.self.width') === 'fluid';
    };
    FooterComponent = __decorate([
        Component({
            selector: 'kt-footer',
            templateUrl: './footer.component.html',
        }),
        __metadata("design:paramtypes", [LayoutConfigService])
    ], FooterComponent);
    return FooterComponent;
}());
export { FooterComponent };
//# sourceMappingURL=footer.component.js.map