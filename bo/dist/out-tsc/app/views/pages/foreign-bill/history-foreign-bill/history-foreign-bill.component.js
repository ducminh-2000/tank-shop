import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ForeignBill } from 'src/app/api';
var HistoryForeignBillComponent = /** @class */ (function () {
    function HistoryForeignBillComponent(bsModalRef) {
        this.bsModalRef = bsModalRef;
        this.listStatusOfForeignBill = [];
    }
    HistoryForeignBillComponent.prototype.ngOnInit = function () {
        var _a;
        this.onResult = new EventEmitter();
        var n = (_a = this.bill.statusOfForeignBill) === null || _a === void 0 ? void 0 : _a.length;
        for (var i = n - 1; i >= 0; i--) {
            this.listStatusOfForeignBill.push(this.bill.statusOfForeignBill[i]);
        }
        console.log(this.listStatusOfForeignBill);
    };
    HistoryForeignBillComponent.prototype.cancel = function () {
        this.onResult.emit({
            isCancelled: true,
        });
        this.bsModalRef.hide();
    };
    __decorate([
        Input(),
        __metadata("design:type", ForeignBill)
    ], HistoryForeignBillComponent.prototype, "bill", void 0);
    HistoryForeignBillComponent = __decorate([
        Component({
            selector: 'app-history-foreign-bill',
            templateUrl: './history-foreign-bill.component.html',
            styleUrls: ['./history-foreign-bill.component.scss']
        }),
        __metadata("design:paramtypes", [BsModalRef])
    ], HistoryForeignBillComponent);
    return HistoryForeignBillComponent;
}());
export { HistoryForeignBillComponent };
//# sourceMappingURL=history-foreign-bill.component.js.map