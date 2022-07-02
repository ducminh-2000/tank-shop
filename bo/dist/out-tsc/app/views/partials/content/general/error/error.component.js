import { __decorate, __metadata } from "tslib";
// Angular
import { Component, HostBinding, Input } from '@angular/core';
var ErrorComponent = /** @class */ (function () {
    function ErrorComponent() {
        // Public properties
        // type of error template to be used, accepted values; error-v1 | error-v2 | error-v3 | error-v4 | error-v5 | error-v6
        this.type = 'error-v1';
        // error code, some error types template has it
        this.code = '404';
        // error descriptions
        this.desc = 'Oops! Something went wrong!';
        // return back button title
        this.return = 'Return back';
        this.classes = 'kt-grid kt-grid--ver kt-grid--root';
    }
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ErrorComponent.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ErrorComponent.prototype, "image", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ErrorComponent.prototype, "code", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ErrorComponent.prototype, "title", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ErrorComponent.prototype, "subtitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ErrorComponent.prototype, "desc", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ErrorComponent.prototype, "return", void 0);
    __decorate([
        HostBinding('class'),
        __metadata("design:type", Object)
    ], ErrorComponent.prototype, "classes", void 0);
    ErrorComponent = __decorate([
        Component({
            selector: 'kt-error',
            templateUrl: './error.component.html',
            styleUrls: ['./error.component.scss']
        })
    ], ErrorComponent);
    return ErrorComponent;
}());
export { ErrorComponent };
//# sourceMappingURL=error.component.js.map