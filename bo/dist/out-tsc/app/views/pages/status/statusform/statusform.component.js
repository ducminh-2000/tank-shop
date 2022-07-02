import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Account, Status, StatusGroup } from 'src/app/api/models';
import { LoopBackAuth } from 'src/app/api/services/core';
import { StatusApi, StatusGroupApi } from 'src/app/api/services/custom';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
var StatusformComponent = /** @class */ (function () {
    function StatusformComponent(bsModalRef, auth, notifierService, statusApi, statusGroupApi, spinner) {
        this.bsModalRef = bsModalRef;
        this.auth = auth;
        this.notifierService = notifierService;
        this.statusApi = statusApi;
        this.statusGroupApi = statusGroupApi;
        this.spinner = spinner;
        this._onDestroy = new Subject();
        this.roles = [];
        this.currentAccount = new Account();
        this.isRoleAdmin = false;
        this.isRoleSuperAdmin = false;
        this.admins = [];
        this.statusGroups = [];
        this.addGroup = new StatusGroup();
        this.statusGroupForm = new FormControl();
        this.statusGroupFormFilterCtrl = new FormControl();
        this.filteredStatusGroupForm = new ReplaySubject(1);
    }
    StatusformComponent.prototype.ngOnInit = function () {
        this.currentAccount = this.auth.getCurrentUserData();
        this.isRoleSuperAdmin =
            this.currentAccount.roles[0].name === 'SUPERADMIN' ||
                this.currentAccount.roles[0].name === 'ADMIN';
        this.isRoleAdmin = this.currentAccount.roles[0].name === 'ADMIN';
        this.onResult = new EventEmitter();
        if (this.status.group) {
            this.addGroup.id = this.status.statusGroupId;
            this.statusGroupForm.setValue(this.addGroup);
        }
        this.initData();
    };
    StatusformComponent.prototype.ngOnDestroy = function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    StatusformComponent.prototype.initData = function () {
        var _this = this;
        var filter = {
            order: ['order ASC'],
        };
        this.statusGroupApi.find(filter).subscribe(function (data) {
            _this.statusGroups = data;
            _this.statusGroups.filter(function (item) {
                if (_this.status.group && _this.status.statusGroupId === item.id) {
                    _this.statusGroupForm.setValue(item);
                }
            });
            _this.filteredStatusGroupForm.next(_this.statusGroups.slice());
            _this.statusGroupFormFilterCtrl.valueChanges
                .pipe(takeUntil(_this._onDestroy))
                .subscribe(function () {
                _this.filterStatusGroupMulti();
            });
        });
    };
    StatusformComponent.prototype.ngAfterViewInit = function () {
        this.setInitialValue();
    };
    StatusformComponent.prototype.setInitialValue = function () {
        var _this = this;
        this.filteredStatusGroupForm
            .pipe(take(1), takeUntil(this._onDestroy))
            .subscribe(function () {
            _this.multiSelect.compareWith = function (a, b) { return a && b && a.id === b.id; };
        });
    };
    StatusformComponent.prototype.filterStatusGroupMulti = function () {
        if (!this.statusGroups) {
            return;
        }
        var search = this.statusGroupFormFilterCtrl.value;
        if (!search) {
            this.filteredStatusGroupForm.next(this.statusGroups.slice());
            return;
        }
        else {
            search = search.toLowerCase();
        }
        this.filteredStatusGroupForm.next(this.statusGroups.filter(function (bank) { return bank.code.toLowerCase().indexOf(search) > -1; }));
    };
    StatusformComponent.prototype.overlayZindex = function () {
        var sdk = document.getElementsByClassName('cdk-overlay-container');
        sdk[0].setAttribute('style', 'z-index:1056');
    };
    StatusformComponent.prototype.upsertStatus = function (form) {
        var _this = this;
        if (form.invalid || this.addGroup.id == undefined) {
            this.notifierService.warning("Chưa nhập đủ các trường!");
            console.log(this.addGroup);
            return;
        }
        console.log(this.addGroup);
        this.spinner.show().then().catch();
        var observable;
        this.status.statusGroupId = this.addGroup.id;
        this.status.groupId = this.addGroup.id;
        if (this.status.id) {
            observable = (this.statusApi.patchAttributes(this.status.id, this.status));
        }
        else {
            this.status.order = 5;
            observable = (this.statusApi.create(this.status));
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
    StatusformComponent.prototype.cancel = function () {
        this.onResult.emit({
            isCancelled: true,
        });
        this.bsModalRef.hide();
    };
    StatusformComponent.prototype.compareById = function (item1, item2) {
        return item1 && item2 && (item1.id === item2.id || item1 === item2);
    };
    StatusformComponent.prototype.compareByName = function (item1, item2) {
        return item1 && item2
            ? item1.toLowerCase() === item2.toLowerCase()
            : (item2 = item1);
    };
    __decorate([
        Input(),
        __metadata("design:type", Status)
    ], StatusformComponent.prototype, "status", void 0);
    __decorate([
        ViewChild('multiSelect', { static: true }),
        __metadata("design:type", MatSelect)
    ], StatusformComponent.prototype, "multiSelect", void 0);
    StatusformComponent = __decorate([
        Component({
            selector: 'app-statusform',
            templateUrl: './statusform.component.html',
            styleUrls: ['./statusform.component.scss']
        }),
        __metadata("design:paramtypes", [BsModalRef,
            LoopBackAuth,
            NotificationWrapperService,
            StatusApi,
            StatusGroupApi,
            NgxSpinnerService])
    ], StatusformComponent);
    return StatusformComponent;
}());
export { StatusformComponent };
//# sourceMappingURL=statusform.component.js.map