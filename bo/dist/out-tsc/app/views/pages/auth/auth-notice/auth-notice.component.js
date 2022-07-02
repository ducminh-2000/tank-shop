import { __decorate, __metadata } from "tslib";
// Angular
import { ChangeDetectorRef, Component, Output } from '@angular/core';
// Auth
var AuthNoticeComponent = /** @class */ (function () {
    /**
     * Component Constructure
     *
     * @param authNoticeService
     * @param cdr
     */
    function AuthNoticeComponent(cdr) {
        this.cdr = cdr;
        this.message = '';
        // Private properties
        this.subscriptions = [];
    }
    /*
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
    */
    /**
     * On init
     */
    AuthNoticeComponent.prototype.ngOnInit = function () { };
    /**
     * On destroy
     */
    AuthNoticeComponent.prototype.ngOnDestroy = function () { };
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AuthNoticeComponent.prototype, "type", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AuthNoticeComponent.prototype, "message", void 0);
    AuthNoticeComponent = __decorate([
        Component({
            selector: 'kt-auth-notice',
            templateUrl: './auth-notice.component.html',
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], AuthNoticeComponent);
    return AuthNoticeComponent;
}());
export { AuthNoticeComponent };
//# sourceMappingURL=auth-notice.component.js.map