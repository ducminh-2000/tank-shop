import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
var LoadingContentComponent = /** @class */ (function () {
    function LoadingContentComponent() {
        this.isShowLoading = false;
        this.data = [];
    }
    LoadingContentComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LoadingContentComponent.prototype, "isShowLoading", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LoadingContentComponent.prototype, "data", void 0);
    LoadingContentComponent = __decorate([
        Component({
            selector: 'app-loading-content',
            templateUrl: './loading-content.component.html',
            styleUrls: ['./loading-content.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], LoadingContentComponent);
    return LoadingContentComponent;
}());
export { LoadingContentComponent };
//# sourceMappingURL=loading-content.component.js.map