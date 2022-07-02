import { __decorate, __metadata } from "tslib";
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Account, User } from 'src/app/api/models';
import { LoopBackAuth } from 'src/app/api/services/core';
import { AccountApi, UserApi } from 'src/app/api/services/custom';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
var UserFormComponent = /** @class */ (function () {
    function UserFormComponent(bsModalRef, notificationWrapperService, auth, notifierService, httpClient, accountApi, userApi, translateService, spinner) {
        this.bsModalRef = bsModalRef;
        this.notificationWrapperService = notificationWrapperService;
        this.auth = auth;
        this.notifierService = notifierService;
        this.httpClient = httpClient;
        this.accountApi = accountApi;
        this.userApi = userApi;
        this.translateService = translateService;
        this.spinner = spinner;
        this.roles = [];
        this.currentuser = new Account();
        this.isRoleAdmin = false;
        this.isRoleSuperAdmin = false;
        this.admins = [];
    }
    UserFormComponent.prototype.ngOnInit = function () {
        this.currentuser = this.auth.getCurrentUserData();
        this.isRoleSuperAdmin =
            this.currentuser.roles[0].name === 'SUPERADMIN' ||
                this.currentuser.roles[0].name === 'ADMIN';
        this.isRoleAdmin = this.currentuser.roles[0].name === 'ADMIN';
        this.onResult = new EventEmitter();
        this.initData();
    };
    UserFormComponent.prototype.initData = function () {
        var filter = {
        // where: {
        //   fields: ['id', 'name'],
        // },
        };
        this.changeCityFilter();
        this.changeDistrictFilter();
    };
    UserFormComponent.prototype.changeCityFilter = function () { };
    UserFormComponent.prototype.changeDistrictFilter = function () { };
    UserFormComponent.prototype.upsertUser = function (form) {
        var _this = this;
        if (form.invalid) {
            this.notifierService.error("Chưa điền đủ thông tin!");
            return;
        }
        this.spinner.show().then().catch();
        var observable;
        if (this.user.id) {
            // observable.push(this.userApi.updateStores(this.user.id,this.store));
            observable = (this.userApi.patchAttributes(this.user.id, this.user));
        }
        else {
            // this.user.storesId = this.store.id
            this.user.userCode = this.user.userCode.toUpperCase();
            observable = (this.userApi.create(this.user));
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
    UserFormComponent.prototype.cancel = function () {
        this.onResult.emit({
            isCancelled: true,
        });
        this.bsModalRef.hide();
    };
    UserFormComponent.prototype.compareById = function (item1, item2) {
        return item1 && item2 && (item1.id === item2.id || item1 === item2);
    };
    UserFormComponent.prototype.compareByName = function (item1, item2) {
        return item1 && item2
            ? item1.toLowerCase() === item2.toLowerCase()
            : (item2 = item1);
    };
    __decorate([
        Input(),
        __metadata("design:type", User)
    ], UserFormComponent.prototype, "user", void 0);
    UserFormComponent = __decorate([
        Component({
            selector: 'app-user-form',
            templateUrl: './user-form.component.html',
            styleUrls: ['./user-form.component.scss']
        }),
        __metadata("design:paramtypes", [BsModalRef,
            NotificationWrapperService,
            LoopBackAuth,
            NotificationWrapperService,
            HttpClient,
            AccountApi,
            UserApi,
            TranslateService,
            NgxSpinnerService])
    ], UserFormComponent);
    return UserFormComponent;
}());
export { UserFormComponent };
//# sourceMappingURL=user-form.component.js.map