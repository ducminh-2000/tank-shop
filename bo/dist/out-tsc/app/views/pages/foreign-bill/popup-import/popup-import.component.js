import { __decorate, __metadata } from "tslib";
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { of, Subject, zip } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { ForeignBillApi, LoopBackAuth, LoopBackConfig, StoresApi } from 'src/app/api';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
var PopupImportComponent = /** @class */ (function () {
    // store: Stores;
    function PopupImportComponent(foreignBillApi, auth, httpClient, notifierService, translateService, spinner, notificationWrapperService, bsModalRef, storeApi) {
        this.foreignBillApi = foreignBillApi;
        this.auth = auth;
        this.httpClient = httpClient;
        this.notifierService = notifierService;
        this.translateService = translateService;
        this.spinner = spinner;
        this.notificationWrapperService = notificationWrapperService;
        this.bsModalRef = bsModalRef;
        this.storeApi = storeApi;
        this._onDestroy = new Subject();
        this.startDate = new Date();
        this.endDate = new Date();
        this.file = null;
        this.stores = [];
        this.storeForm = new FormControl();
        this.onResult = new EventEmitter();
    }
    PopupImportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.onResult = new EventEmitter();
        this.storeApi.find().subscribe(function (data) {
            _this.stores = data;
        });
    };
    PopupImportComponent.prototype.overlayZindex = function () {
        var sdk = document.getElementsByClassName('cdk-overlay-container');
        sdk[0].setAttribute('style', 'z-index:1056');
    };
    PopupImportComponent.prototype.onFileChanged = function (file, container) {
        if (file && this.generalStore != null) {
            this.file = file;
        }
    };
    PopupImportComponent.prototype.uploadFile = function (container, form) {
        var _this = this;
        if (form.invalid || this.stores == undefined) {
            this.notifierService.warning('Vui lòng nhập đủ thông tin');
            return;
        }
        this.spinner.show().then().catch();
        var formData = new FormData();
        formData.append('file', this.file, new Date().toISOString() + '_' + this.file.name);
        var ob = [];
        ob.push(this.httpClient
            .post("".concat(LoopBackConfig.getPath(), "/").concat(LoopBackConfig.getApiVersion(), "/Containers/").concat(container, "/upload?access_token=").concat(this.auth.getAccessTokenId()), formData));
        if (this.option == 2) {
            zip.apply(void 0, ob).pipe(flatMap(function (result) {
                var sub = [];
                if (container === 'images') {
                    sub.push(_this.storeApi.createWithFileCsv(result[0].result.files.file[0].name, _this.generalStore));
                    console.log(result[0].result.files.file[0].name);
                }
                else {
                    _this.notificationWrapperService.error('Có lỗi xảy ra trong quá trình upload !');
                }
                if (sub.length > 0) {
                    return zip.apply(void 0, sub);
                }
                else {
                    return of(true);
                }
            }))
                .subscribe(function (result) {
                console.log(result);
                _this.onResult.emit({
                    isCancelled: false,
                });
                _this.notifierService.success('Thành công');
                _this.spinner.hide().then().catch();
                _this.bsModalRef.hide();
            }, function (error) {
                _this.spinner.hide().then().catch();
                console.log(error);
                _this.onResult.emit({
                    isCancelled: true,
                });
                _this.notifierService.error(_this.translateService.instant('appCore.errorUpload'));
            });
        }
        else {
            zip.apply(void 0, ob).pipe(flatMap(function (result) {
                var sub = [];
                if (container === 'images') {
                    sub.push(_this.foreignBillApi.createWithFileCsv(result[0].result.files.file[0].name, _this.generalStore));
                    console.log(result[0].result.files.file[0].name);
                }
                else {
                    _this.notificationWrapperService.error('Có lỗi xảy ra trong quá trình upload !');
                }
                if (sub.length > 0) {
                    return zip.apply(void 0, sub);
                }
                else {
                    return of(true);
                }
            }))
                .subscribe(function (result) {
                console.log(result);
                _this.onResult.emit({
                    isCancelled: false,
                });
                _this.notifierService.success('Thành công');
                _this.spinner.hide().then().catch();
                _this.bsModalRef.hide();
            }, function (error) {
                _this.spinner.hide().then().catch();
                console.log(error);
                _this.onResult.emit({
                    isCancelled: true,
                });
                _this.notifierService.error(_this.translateService.instant('appCore.errorUpload'));
            });
        }
    };
    PopupImportComponent.prototype.ngOnDestroy = function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    PopupImportComponent.prototype.cancel = function () {
        this.onResult.emit({
            isCancelled: true,
        });
        this.bsModalRef.hide();
    };
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], PopupImportComponent.prototype, "option", void 0);
    PopupImportComponent = __decorate([
        Component({
            selector: 'app-popup-import',
            templateUrl: './popup-import.component.html',
            styleUrls: ['./popup-import.component.scss']
        }),
        __metadata("design:paramtypes", [ForeignBillApi,
            LoopBackAuth,
            HttpClient,
            NotificationWrapperService,
            TranslateService,
            NgxSpinnerService,
            NotificationWrapperService,
            BsModalRef,
            StoresApi])
    ], PopupImportComponent);
    return PopupImportComponent;
}());
export { PopupImportComponent };
//# sourceMappingURL=popup-import.component.js.map