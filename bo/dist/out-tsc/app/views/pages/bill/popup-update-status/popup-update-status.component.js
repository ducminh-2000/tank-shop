import { __decorate, __metadata } from "tslib";
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forkJoin, Subject } from 'rxjs';
import { ForeignBillApi, LoopBackAuth, StatusApi, StatusOfBill, StatusOfBillApi, StatusOfForeignBill, StatusOfForeignBillApi, StoresApi } from 'src/app/api';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
var PopupUpdateStatusBillComponent = /** @class */ (function () {
    function PopupUpdateStatusBillComponent(foreignBillApi, statusOfForeignBillApi, statusApi, storeApi, auth, httpClient, notifierService, translateService, bsModalRef, statusOfBillApi) {
        this.foreignBillApi = foreignBillApi;
        this.statusOfForeignBillApi = statusOfForeignBillApi;
        this.statusApi = statusApi;
        this.storeApi = storeApi;
        this.auth = auth;
        this.httpClient = httpClient;
        this.notifierService = notifierService;
        this.translateService = translateService;
        this.bsModalRef = bsModalRef;
        this.statusOfBillApi = statusOfBillApi;
        this._onDestroy = new Subject();
        this.statuses = [];
        this.statusForm = new FormControl();
        this.onResult = new EventEmitter();
    }
    PopupUpdateStatusBillComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.onResult = new EventEmitter();
        var filterOne = {
            where: {
                order: 1,
            },
        };
        this.statusApi.find().subscribe(function (data) {
            _this.statuses = data;
        });
    };
    PopupUpdateStatusBillComponent.prototype.overlayZindex = function () {
        var sdk = document.getElementsByClassName('cdk-overlay-container');
        sdk[0].setAttribute('style', 'z-index:1056');
    };
    PopupUpdateStatusBillComponent.prototype.update = function () {
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
        //   if (result) {
        var dataBill = [];
        var dataFBill = [];
        var dataError = [];
        for (var _i = 0, _a = this.bills; _i < _a.length; _i++) {
            var bill = _a[_i];
            var statusRaw = bill.statusOfBill[bill.statusOfBill.length - 1].status;
            var rawBill = new StatusOfBill();
            rawBill.billsId = bill.id;
            rawBill.statusId = this.generalStatus.id;
            if (statusRaw.statusGroupId <= this.generalStatus.statusGroupId) {
                dataBill.push(rawBill);
                bill.foreignBill.forEach(function (fbill) {
                    var rawFBill = new StatusOfForeignBill();
                    rawFBill.foreignBillId = fbill.id;
                    rawFBill.statusId = _this.generalStatus.id;
                    dataFBill.push(rawFBill);
                });
            }
            else
                dataError.push(rawBill);
        }
        var observable = [];
        observable.push(this.statusOfBillApi.create(dataBill));
        observable.push(this.statusOfForeignBillApi.create(dataFBill));
        forkJoin(observable).subscribe(function () {
            // this.getBillOfStores(this.PAGE_SIZE * (this.currentPage - 1));
            if (dataError.length > 0) {
                var mess = "C\u00F3 ".concat(dataError.length, " b\u1EA3n ghi b\u1EA1n ch\u1ECDn kh\u00F4ng th\u1ECFa m\u00E3n, vui l\u00F2ng c\u1EADp nh\u1EADt l\u1EA7n l\u01B0\u1EE3t!");
                _this.notifierService.warning(_this.translateService.instant(mess));
                _this.bsModalRef.hide();
                _this.onResult.emit({
                    isCancelled: false,
                });
            }
            else {
                _this.notifierService.success(_this.translateService.instant('Thành công'));
                _this.bsModalRef.hide();
                _this.onResult.emit({
                    isCancelled: false,
                });
            }
        }, function (error) {
            _this.bsModalRef.hide();
            _this.onResult.emit({
                isCancelled: false,
            });
            _this.notifierService.error(_this.translateService.instant('Thất bại'));
        });
        // }
        // })
    };
    PopupUpdateStatusBillComponent.prototype.ngOnDestroy = function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    PopupUpdateStatusBillComponent.prototype.cancel = function () {
        this.onResult.emit({
            isCancelled: true,
        });
        this.bsModalRef.hide();
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], PopupUpdateStatusBillComponent.prototype, "bills", void 0);
    PopupUpdateStatusBillComponent = __decorate([
        Component({
            selector: 'app-popup-update-status-bill',
            templateUrl: './popup-update-status.component.html',
            styleUrls: ['./popup-update-status.component.scss']
        }),
        __metadata("design:paramtypes", [ForeignBillApi,
            StatusOfForeignBillApi,
            StatusApi,
            StoresApi,
            LoopBackAuth,
            HttpClient,
            NotificationWrapperService,
            TranslateService,
            BsModalRef,
            StatusOfBillApi])
    ], PopupUpdateStatusBillComponent);
    return PopupUpdateStatusBillComponent;
}());
export { PopupUpdateStatusBillComponent };
//# sourceMappingURL=popup-update-status.component.js.map