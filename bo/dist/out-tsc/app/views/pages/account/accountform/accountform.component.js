import { __decorate, __metadata } from "tslib";
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoopBackConfig } from 'src/app/api';
import { Account } from 'src/app/api/models';
import { LoopBackAuth } from 'src/app/api/services/core';
import { AccountApi, StoresApi } from 'src/app/api/services/custom';
import { Roles } from 'src/app/core/constant/constant';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
var AccountformComponent = /** @class */ (function () {
    function AccountformComponent(bsModalRef, notificationWrapperService, auth, notifierService, httpClient, accountApi, storeApi, translateService, spinner) {
        this.bsModalRef = bsModalRef;
        this.notificationWrapperService = notificationWrapperService;
        this.auth = auth;
        this.notifierService = notifierService;
        this.httpClient = httpClient;
        this.accountApi = accountApi;
        this.storeApi = storeApi;
        this.translateService = translateService;
        this.spinner = spinner;
        this.roles = [];
        this.currentAccount = new Account();
        this.isRoleAdmin = false;
        this.isRoleSuperAdmin = false;
        this.admins = [];
        this.listStore = [];
        this.roleForm = new FormControl();
        this.storeForm = new FormControl();
        this.storeFormFilterCtrl = new FormControl();
        this.filteredStoreForm = new ReplaySubject(1);
        this._onDestroy = new Subject();
    }
    AccountformComponent.prototype.ngOnInit = function () {
        this.currentAccount = this.auth.getCurrentUserData();
        this.isRoleSuperAdmin =
            this.currentAccount.roles[0].name === 'SUPERADMIN' ||
                this.currentAccount.roles[0].name === 'ADMIN';
        this.isRoleAdmin = this.currentAccount.roles[0].name === 'ADMIN';
        this.onResult = new EventEmitter();
        this.initData();
        this.getStore();
    };
    AccountformComponent.prototype.initData = function () {
        console.log(this.account);
        var filter = {
        // where: {
        //   fields: ['id', 'name'],
        // },
        };
        this.changeCityFilter();
        this.changeDistrictFilter();
    };
    AccountformComponent.prototype.ngOnDestroy = function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    AccountformComponent.prototype.overlayZindex = function () {
        var sdk = document.getElementsByClassName('cdk-overlay-container');
        sdk[0].setAttribute('style', 'z-index:1056');
    };
    AccountformComponent.prototype.getStore = function () {
        var _this = this;
        this.storeApi.find().subscribe(function (data) {
            _this.listStore = data;
            _this.listStore.filter(function (store) {
                if (_this.account.stores && _this.account.stores.id === store.id) {
                    _this.storeForm.setValue(store);
                }
            });
            // this.listStore.filter((store) => {
            //   if(this.account.storesId === store.id) console.log(store);
            // })
            // this.storeForm.setValue(
            //   this.listStore.filter((store) => {
            //     if(this.account.storesId === store.id) return store;
            //   })
            // )
            _this.filteredStoreForm.next(_this.listStore.slice());
            _this.storeFormFilterCtrl.valueChanges
                .pipe(takeUntil(_this._onDestroy))
                .subscribe(function () {
                _this.filterStoreMulti();
            });
        });
    };
    AccountformComponent.prototype.filterStoreMulti = function () {
        if (!this.listStore) {
            return;
        }
        var search = this.storeFormFilterCtrl.value;
        if (!search) {
            this.filteredStoreForm.next(this.listStore.slice());
            return;
        }
        else {
            search = search.toLowerCase();
        }
        this.filteredStoreForm.next(this.listStore.filter(function (bank) { return bank.code.toLowerCase().indexOf(search) > -1; }));
    };
    AccountformComponent.prototype.changeCityFilter = function () { };
    AccountformComponent.prototype.changeDistrictFilter = function () { };
    AccountformComponent.prototype.onFileChanged = function (file, container) {
        if (file) {
            this.uploadFile(file, container);
        }
    };
    AccountformComponent.prototype.uploadFile = function (file, container) {
        var _this = this;
        this.spinner.show().then().catch();
        var formData = new FormData();
        formData.append('file', file, new Date().toISOString() + '_' + file.name);
        this.httpClient
            .post("".concat(LoopBackConfig.getPath(), "/").concat(LoopBackConfig.getApiVersion(), "/Containers/").concat(container, "/upload?access_token=").concat(this.auth.getAccessTokenId()), formData)
            .subscribe(function (result) {
            if (container === 'images') {
                _this.account.avatar = result.result.files.file[0].name;
            }
            else {
                _this.notificationWrapperService.error('Có lỗi xảy ra trong quá trình thay ảnh !');
            }
            _this.spinner.hide().then().catch();
        }, function (error) {
            _this.notifierService.error(_this.translateService.instant('appCore.errorUpload'));
        });
    };
    AccountformComponent.prototype.upsertAccount = function () {
        var _this = this;
        this.spinner.show().then().catch();
        var observable;
        this.account.storesId = this.generalStore.id;
        if (!this.isRoleSuperAdmin) {
            this.account.kind = Roles.USER;
        }
        if (this.account.id) {
            // observable.push(this.accountApi.updateStores(this.account.id,this.store));
            observable = (this.accountApi.patchAttributes(this.account.id, this.account));
        }
        else {
            // this.account.storesId = this.store.id
            observable = (this.accountApi.create(this.account));
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
            _this.notifierService.error('Thất bại!');
        });
    };
    AccountformComponent.prototype.cancel = function () {
        this.onResult.emit({
            isCancelled: true,
        });
        this.bsModalRef.hide();
    };
    AccountformComponent.prototype.compareById = function (item1, item2) {
        return item1 && item2 && (item1.id === item2.id || item1 === item2);
    };
    AccountformComponent.prototype.compareByName = function (item1, item2) {
        return item1 && item2
            ? item1.toLowerCase() === item2.toLowerCase()
            : (item2 = item1);
    };
    __decorate([
        Input(),
        __metadata("design:type", Account)
    ], AccountformComponent.prototype, "account", void 0);
    __decorate([
        ViewChild('multiSelect', { static: true }),
        __metadata("design:type", MatSelect)
    ], AccountformComponent.prototype, "multiSelect", void 0);
    AccountformComponent = __decorate([
        Component({
            selector: 'app-accountform',
            templateUrl: './accountform.component.html',
            styleUrls: ['./accountform.component.scss']
        }),
        __metadata("design:paramtypes", [BsModalRef,
            NotificationWrapperService,
            LoopBackAuth,
            NotificationWrapperService,
            HttpClient,
            AccountApi,
            StoresApi,
            TranslateService,
            NgxSpinnerService])
    ], AccountformComponent);
    return AccountformComponent;
}());
export { AccountformComponent };
//# sourceMappingURL=accountform.component.js.map