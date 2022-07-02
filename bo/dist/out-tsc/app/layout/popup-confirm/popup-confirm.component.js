import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
var PopupConfirmComponent = /** @class */ (function () {
    function PopupConfirmComponent(bsModalRef) {
        this.bsModalRef = bsModalRef;
        this.idModal = '';
        this.titleText = '';
        this.bodyText = '';
        this.haveNo = true;
        this.closedEvent = new EventEmitter();
    }
    PopupConfirmComponent.prototype.ngOnInit = function () {
    };
    PopupConfirmComponent.prototype.confirmYes = function () {
        this.closedEvent.emit(true);
        this.bsModalRef.hide();
    };
    PopupConfirmComponent.prototype.dismissModal = function () {
        this.closedEvent.emit(false);
        this.bsModalRef.hide();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PopupConfirmComponent.prototype, "idModal", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PopupConfirmComponent.prototype, "titleText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PopupConfirmComponent.prototype, "bodyText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PopupConfirmComponent.prototype, "haveNo", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PopupConfirmComponent.prototype, "closedEvent", void 0);
    PopupConfirmComponent = __decorate([
        Component({
            selector: 'app-popup-confirm',
            templateUrl: './popup-confirm.component.html',
            styleUrls: ['./popup-confirm.component.scss']
        }),
        __metadata("design:paramtypes", [BsModalRef])
    ], PopupConfirmComponent);
    return PopupConfirmComponent;
}());
export { PopupConfirmComponent };
//# sourceMappingURL=popup-confirm.component.js.map