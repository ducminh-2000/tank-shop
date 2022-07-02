import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
var CommonDialogComponent = /** @class */ (function () {
    function CommonDialogComponent(bsModalRef) {
        this.bsModalRef = bsModalRef;
    }
    CommonDialogComponent.prototype.ngOnInit = function () {
        this.onClose = new Subject();
    };
    CommonDialogComponent.prototype.action = function () {
        this.onClose.next(true);
        this.bsModalRef.hide();
    };
    CommonDialogComponent.prototype.cancel = function () {
        this.onClose.next(false);
        this.bsModalRef.hide();
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CommonDialogComponent.prototype, "title", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CommonDialogComponent.prototype, "content", void 0);
    CommonDialogComponent = __decorate([
        Component({
            selector: 'app-common-dialog',
            templateUrl: './common-dialog.component.html',
            styleUrls: ['./common-dialog.component.css']
        }),
        __metadata("design:paramtypes", [BsModalRef])
    ], CommonDialogComponent);
    return CommonDialogComponent;
}());
export { CommonDialogComponent };
//# sourceMappingURL=common-dialog.component.js.map