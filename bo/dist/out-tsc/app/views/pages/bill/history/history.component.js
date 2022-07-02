import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Bills } from 'src/app/api/models';
var HistoryComponent = /** @class */ (function () {
    function HistoryComponent(bsModalRef) {
        this.bsModalRef = bsModalRef;
        this.listStatusOfBill = [];
    }
    HistoryComponent.prototype.ngOnInit = function () {
        this.onResult = new EventEmitter();
        var n = this.bill.statusOfBill.length;
        for (var i = n - 1; i >= 0; i--) {
            this.listStatusOfBill.push(this.bill.statusOfBill[i]);
        }
    };
    HistoryComponent.prototype.cancel = function () {
        this.onResult.emit({
            isCancelled: true,
        });
        this.bsModalRef.hide();
    };
    __decorate([
        Input(),
        __metadata("design:type", Bills)
    ], HistoryComponent.prototype, "bill", void 0);
    HistoryComponent = __decorate([
        Component({
            selector: 'app-history',
            templateUrl: './history.component.html',
            styleUrls: ['./history.component.scss']
        }),
        __metadata("design:paramtypes", [BsModalRef])
    ], HistoryComponent);
    return HistoryComponent;
}());
export { HistoryComponent };
//# sourceMappingURL=history.component.js.map