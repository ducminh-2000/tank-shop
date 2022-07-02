import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { StatusApi, StatusOfForeignBill, StatusOfForeignBillApi } from 'src/app/api';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
var PopupUpdateStatusComponent = /** @class */ (function () {
    function PopupUpdateStatusComponent(statusOfForeignBillApi, statusApi, notifierService, translateService, bsModalRef) {
        this.statusOfForeignBillApi = statusOfForeignBillApi;
        this.statusApi = statusApi;
        this.notifierService = notifierService;
        this.translateService = translateService;
        this.bsModalRef = bsModalRef;
        this._onDestroy = new Subject();
        this.file = null;
        this.statuses = [];
        this.statusForm = new FormControl();
        this.onResult = new EventEmitter();
    }
    PopupUpdateStatusComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.onResult = new EventEmitter();
        var filter = {
            include: [
                {
                    relation: 'group'
                }
            ],
            where: {
                // or: [
                //   {
                order: {
                    gt: 5
                }
            },
            // {
            //   order: {
            //     lt: 2
            //   }
            // }
            // ]
            // }
        };
        this.statusApi.find(filter).subscribe(function (data) {
            _this.statuses = data;
        });
    };
    PopupUpdateStatusComponent.prototype.overlayZindex = function () {
        var sdk = document.getElementsByClassName('cdk-overlay-container');
        sdk[0].setAttribute('style', 'z-index:1056');
    };
    PopupUpdateStatusComponent.prototype.uploadStatus = function () {
        var _this = this;
        // const modalRef = this.bsModalService.show(DeleteDialogComponent, {
        //   initialState: {
        //     title: this.translateService.instant('Cập nhật đồng bộ tracking'),
        //     content: this.translateService.instant(
        //       'Bạn có chắc chắn muốn cập nhật các bản ghi đã chọn'
        //     ),
        //   },
        // });
        // modalRef.content.onClose.subscribe((result) => {
        // if (result) {
        var data = [];
        var errorData = [];
        if (this.generalStatus != undefined) {
            for (var _i = 0, _a = this.bills; _i < _a.length; _i++) {
                var bill = _a[_i];
                var statusRaw = bill.statusOfForeignBill[bill.statusOfForeignBill.length - 1]
                    .status;
                var store = bill.statusOfForeignBill[bill.statusOfForeignBill.length - 1]
                    .stores;
                console.log(store);
                var raw = new StatusOfForeignBill();
                raw.foreignBillId = bill.id;
                raw.statusId = this.generalStatus.id;
                raw.storesId = store.id;
                console.log(raw);
                if (statusRaw.statusGroupId <= this.generalStatus.statusGroupId) {
                    data.push(raw);
                }
                else
                    errorData.push(raw);
            }
            this.statusOfForeignBillApi.createArray(data).subscribe(function () {
                // this.getBillOfStores(this.PAGE_SIZE * (this.currentPage - 1));
                if (errorData.length > 0) {
                    var mess = "C\u00F3 ".concat(errorData.length, " b\u1EA3n ghi b\u1EA1n ch\u1ECDn kh\u00F4ng th\u1ECFa m\u00E3n, vui l\u00F2ng c\u1EADp nh\u1EADt l\u1EA7n l\u01B0\u1EE3t!");
                    _this.notifierService.warning(_this.translateService.instant(mess));
                }
                else {
                    _this.bsModalRef.hide();
                    _this.onResult.emit({
                        isCancelled: false,
                    });
                    _this.notifierService.success(_this.translateService.instant('Thành công'));
                }
            }, function () {
                _this.bsModalRef.hide();
                _this.notifierService.error(_this.translateService.instant('Thất bại'));
            });
        }
        //   }
        // });
    };
    PopupUpdateStatusComponent.prototype.ngOnDestroy = function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    PopupUpdateStatusComponent.prototype.cancel = function () {
        this.onResult.emit({
            isCancelled: true,
        });
        this.bsModalRef.hide();
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], PopupUpdateStatusComponent.prototype, "bills", void 0);
    PopupUpdateStatusComponent = __decorate([
        Component({
            selector: 'app-popup-update-status',
            templateUrl: './popup-update-status.component.html',
            styleUrls: ['./popup-update-status.component.scss']
        }),
        __metadata("design:paramtypes", [StatusOfForeignBillApi,
            StatusApi,
            NotificationWrapperService,
            TranslateService,
            BsModalRef])
    ], PopupUpdateStatusComponent);
    return PopupUpdateStatusComponent;
}());
export { PopupUpdateStatusComponent };
//# sourceMappingURL=popup-update-status.component.js.map