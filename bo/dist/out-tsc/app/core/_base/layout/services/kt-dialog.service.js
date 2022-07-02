import { __decorate, __metadata } from "tslib";
// Angular
import { Injectable } from '@angular/core';
// RxJS
import { BehaviorSubject } from 'rxjs';
var KtDialogService = /** @class */ (function () {
    // Public properties
    function KtDialogService() {
        this.currentState = new BehaviorSubject(false);
        this.ktDialog = new KTDialog({ type: 'loader', placement: 'top center', message: 'Loading ...' });
    }
    KtDialogService.prototype.show = function () {
        this.currentState.next(true);
        this.ktDialog.show();
    };
    KtDialogService.prototype.hide = function () {
        this.currentState.next(false);
        this.ktDialog.hide();
    };
    KtDialogService.prototype.checkIsShown = function () {
        return this.currentState.value;
    };
    KtDialogService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], KtDialogService);
    return KtDialogService;
}());
export { KtDialogService };
//# sourceMappingURL=kt-dialog.service.js.map