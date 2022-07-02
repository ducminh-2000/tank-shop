import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Account, Stores } from 'src/app/api/models';
import { LoopBackAuth } from 'src/app/api/services/core';
import { StoresApi } from 'src/app/api/services/custom';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
var StoreformComponent = /** @class */ (function () {
    function StoreformComponent(bsModalRef, auth, notifierService, storeApi, spinner) {
        this.bsModalRef = bsModalRef;
        this.auth = auth;
        this.notifierService = notifierService;
        this.storeApi = storeApi;
        this.spinner = spinner;
        this.roles = [];
        this.currentAccount = new Account();
        this.isRoleAdmin = false;
        this.isRoleSuperAdmin = false;
        this.admins = [];
        this.regions = ['VN', 'US', 'UK'];
        this.regionForm = new FormControl();
    }
    StoreformComponent.prototype.ngOnInit = function () {
        this.currentAccount = this.auth.getCurrentUserData();
        this.isRoleSuperAdmin =
            this.currentAccount.roles[0].name === 'SUPERADMIN' ||
                this.currentAccount.roles[0].name === 'ADMIN';
        this.isRoleAdmin = this.currentAccount.roles[0].name === 'ADMIN';
        this.onResult = new EventEmitter();
    };
    StoreformComponent.prototype.initData = function () {
        this.regionForm.value(this.store.region);
    };
    StoreformComponent.prototype.overlayZindex = function () {
        var sdk = document.getElementsByClassName('cdk-overlay-container');
        sdk[0].setAttribute('style', 'z-index:1056');
    };
    StoreformComponent.prototype.upsertStore = function (form) {
        var _this = this;
        if (form.invalid) {
            this.notifierService.error("Chưa nhập đủ các trường!");
            return;
        }
        this.spinner.show().then().catch();
        var observable;
        if (this.store.id) {
            observable = (this.storeApi.patchAttributes(this.store.id, this.store));
        }
        else {
            this.store.code = this.store.code.toUpperCase();
            observable = (this.storeApi.create(this.store));
        }
        observable.subscribe(function (res) {
            _this.onResult.emit({
                isCancelled: false,
            });
            _this.bsModalRef.hide();
            _this.notifierService.success('Thành công !');
            _this.spinner.hide().then().catch();
        }, function (error) {
            _this.spinner.hide().then().catch();
            if (error.details) {
                _this.notifierService.error("Mã kho hàng bị trùng");
            }
            else
                _this.notifierService.error('Thất bại!');
        });
    };
    StoreformComponent.prototype.cancel = function () {
        this.onResult.emit({
            isCancelled: true,
        });
        this.bsModalRef.hide();
    };
    StoreformComponent.prototype.compareById = function (item1, item2) {
        return item1 && item2 && (item1.id === item2.id || item1 === item2);
    };
    StoreformComponent.prototype.compareByName = function (item1, item2) {
        return item1 && item2
            ? item1.toLowerCase() === item2.toLowerCase()
            : (item2 = item1);
    };
    __decorate([
        Input(),
        __metadata("design:type", Stores)
    ], StoreformComponent.prototype, "store", void 0);
    __decorate([
        ViewChild('multiSelect', { static: true }),
        __metadata("design:type", MatSelect)
    ], StoreformComponent.prototype, "multiSelect", void 0);
    StoreformComponent = __decorate([
        Component({
            selector: 'app-storeform',
            templateUrl: './storeform.component.html',
            styleUrls: ['./storeform.component.scss']
        }),
        __metadata("design:paramtypes", [BsModalRef,
            LoopBackAuth,
            NotificationWrapperService,
            StoresApi,
            NgxSpinnerService])
    ], StoreformComponent);
    return StoreformComponent;
}());
export { StoreformComponent };
//# sourceMappingURL=storeform.component.js.map