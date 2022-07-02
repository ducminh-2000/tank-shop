import { __decorate, __metadata } from "tslib";
// Angular
import { Component, Input } from '@angular/core';
var TopbarComponent = /** @class */ (function () {
    function TopbarComponent() {
        this.isNotify = 0;
    }
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TopbarComponent.prototype, "isNotify", void 0);
    TopbarComponent = __decorate([
        Component({
            selector: 'kt-topbar',
            templateUrl: './topbar.component.html',
            styleUrls: ['./topbar.component.scss']
        })
    ], TopbarComponent);
    return TopbarComponent;
}());
export { TopbarComponent };
//# sourceMappingURL=topbar.component.js.map