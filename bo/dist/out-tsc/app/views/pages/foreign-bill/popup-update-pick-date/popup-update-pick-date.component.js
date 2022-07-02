import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forkJoin, Subject } from 'rxjs';
import { ForeignBillApi } from 'src/app/api';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
var PopupUpdatePickDateComponent = /** @class */ (function () {
    function PopupUpdatePickDateComponent(foreignBillApi, bsModalRef, notifierService) {
        this.foreignBillApi = foreignBillApi;
        this.bsModalRef = bsModalRef;
        this.notifierService = notifierService;
        this.pickDate = new Date(null);
        this._onDestroy = new Subject();
        this.onResult = new EventEmitter();
    }
    PopupUpdatePickDateComponent.prototype.ngOnInit = function () {
    };
    PopupUpdatePickDateComponent.prototype.update = function () {
        var _this = this;
        // {
        var ob = [];
        for (var _i = 0, _a = this.bills; _i < _a.length; _i++) {
            var bill = _a[_i];
            bill.pickDate = this.pickDate;
            ob.push(this.foreignBillApi.patchAttributes(bill.id, bill));
        }
        if (ob.length < 1) {
            return;
        }
        else {
            forkJoin(ob).subscribe(function (data) {
                // console.log(data)
                _this.bsModalRef.hide();
                _this.onResult.emit({
                    isCancelled: false,
                });
            }, function (error) {
                _this.notifierService.warning("Có lỗi xảy ra hãy cập nhật lần lượt");
                console.log(error);
            });
        }
        // }
    };
    PopupUpdatePickDateComponent.prototype.ngOnDestroy = function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    PopupUpdatePickDateComponent.prototype.cancel = function () {
        this.onResult.emit({
            isCancelled: true,
        });
        this.bsModalRef.hide();
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], PopupUpdatePickDateComponent.prototype, "bills", void 0);
    PopupUpdatePickDateComponent = __decorate([
        Component({
            selector: 'app-popup-update-pick-date',
            templateUrl: './popup-update-pick-date.component.html',
            styleUrls: ['./popup-update-pick-date.component.scss']
        }),
        __metadata("design:paramtypes", [ForeignBillApi,
            BsModalRef,
            NotificationWrapperService])
    ], PopupUpdatePickDateComponent);
    return PopupUpdatePickDateComponent;
}());
export { PopupUpdatePickDateComponent };
//# sourceMappingURL=popup-update-pick-date.component.js.map