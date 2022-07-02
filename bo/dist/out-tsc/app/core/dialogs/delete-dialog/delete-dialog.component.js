import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
var DeleteDialogComponent = /** @class */ (function () {
    function DeleteDialogComponent(bsModalRef) {
        this.bsModalRef = bsModalRef;
    }
    DeleteDialogComponent.prototype.ngOnInit = function () {
        this.onClose = new Subject();
    };
    DeleteDialogComponent.prototype.delete = function () {
        this.onClose.next(true);
        this.bsModalRef.hide();
    };
    DeleteDialogComponent.prototype.cancel = function () {
        this.onClose.next(false);
        this.bsModalRef.hide();
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DeleteDialogComponent.prototype, "title", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DeleteDialogComponent.prototype, "content", void 0);
    DeleteDialogComponent = __decorate([
        Component({
            selector: 'app-delete-dialog',
            templateUrl: './delete-dialog.component.html',
            styleUrls: ['./delete-dialog.component.css']
        }),
        __metadata("design:paramtypes", [BsModalRef])
    ], DeleteDialogComponent);
    return DeleteDialogComponent;
}());
export { DeleteDialogComponent };
//# sourceMappingURL=delete-dialog.component.js.map