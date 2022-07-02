import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReplaySubject, Subject, zip, Observable, of } from 'rxjs';
import { takeUntil, take, flatMap } from 'rxjs/operators';
import { Account, ForeignBill, ForeignBillApi, LoopBackAuth, Status, StatusApi, StatusOfBill, StatusOfForeignBillApi, Stores, StoresApi, User, UserApi } from 'src/app/api';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
var ForeignBillFormComponent = /** @class */ (function () {
    function ForeignBillFormComponent(bsModalRef, auth, userApi, statusApi, router, notifierService, spinner, storesApi, foreignBillApi, statusOfForeignBillApi) {
        this.bsModalRef = bsModalRef;
        this.auth = auth;
        this.userApi = userApi;
        this.statusApi = statusApi;
        this.router = router;
        this.notifierService = notifierService;
        this.spinner = spinner;
        this.storesApi = storesApi;
        this.foreignBillApi = foreignBillApi;
        this.statusOfForeignBillApi = statusOfForeignBillApi;
        this.roles = [];
        this.currentAccount = new Account();
        this.isRoleAdmin = false;
        this.isRoleSuperAdmin = false;
        this.admins = [];
        this.statusOfBill = new StatusOfBill();
        this.statuses = [];
        this.users = [];
        this.listBill = [];
        this.stores = [];
        this.pickDate = '';
        this.isSubmitted = false;
        this.addStatus = new Status();
        this.addStores = new Stores();
        this.userBill = new User();
        this.statusForm = new FormControl();
        this.filteredStatusForm = new ReplaySubject(1);
        this.userForm = new FormControl();
        this.userFormFilterCtrl = new FormControl();
        this.filteredUserForm = new ReplaySubject(1);
        this.storeForm = new FormControl();
        this.storeFormFilterCtrl = new FormControl();
        this.filteredStoreForm = new ReplaySubject(1);
        this._onDestroy = new Subject();
    }
    ForeignBillFormComponent.prototype.ngOnInit = function () {
        var _a, _b;
        this.currentAccount = this.auth.getCurrentUserData();
        this.isRoleSuperAdmin =
            this.currentAccount.roles[0].name === 'SUPERADMIN' ||
                this.currentAccount.roles[0].name === 'ADMIN';
        this.isRoleAdmin = this.currentAccount.roles[0].name === 'ADMIN';
        this.onResult = new EventEmitter();
        this.addStatus = (_a = this.foreignBill.statusOfForeignBill[this.foreignBill.statusOfForeignBill.length - 1]) === null || _a === void 0 ? void 0 : _a.status;
        this.addStores = (_b = this.foreignBill.statusOfForeignBill[this.foreignBill.statusOfForeignBill.length - 1]) === null || _b === void 0 ? void 0 : _b.stores;
        if (this.foreignBill.pickDate) {
            this.foreignBill.pickDate = moment(this.foreignBill.pickDate)
                .toISOString(true)
                .slice(0, 10);
        }
        this.initData();
    };
    ForeignBillFormComponent.prototype.initData = function () {
        var _this = this;
        var filter = {
            include: [
                {
                    relation: "group"
                }
            ],
            where: {
                or: [
                    {
                        order: {
                            gt: 4
                        }
                    },
                    {
                        order: {
                            lt: 2
                        }
                    }
                ]
            },
            order: ["statusGroupId ASC"]
        };
        var filterOne = {
            where: {
                order: 1,
            },
        };
        zip(this.statusApi.find(filter), this.userApi.find(), this.statusApi.find(filterOne), this.storesApi.find()).subscribe(function (_a) {
            var statuses = _a[0], users = _a[1], statusOne = _a[2], stores = _a[3];
            _this.statuses = statuses;
            // data.map((it: Status) => {
            //   if (it.group && (parseInt(it.group.order) == 2 || parseInt(it.group.order) >= 4)) {
            //     console.log(it)
            //     this.statuses.push(it);
            //   }
            // })
            _this.stores = stores;
            _this.users = users;
            _this.addStatus = statusOne[0];
            _this.users.filter(function (user) {
                if (_this.foreignBill.userName && _this.foreignBill.userName === user.name) {
                    _this.userForm.setValue(user);
                }
            });
            _this.filteredUserForm.next(_this.users.slice());
            _this.userFormFilterCtrl.valueChanges
                .pipe(takeUntil(_this._onDestroy))
                .subscribe(function () {
                _this.filterUserMulti();
            });
            _this.stores.filter(function (store) {
                if (_this.addStores &&
                    _this.foreignBill.stores &&
                    _this.addStores.id === store.id) {
                    _this.storeForm.setValue(store);
                }
            });
            _this.filteredStoreForm.next(_this.stores.slice());
            _this.storeFormFilterCtrl.valueChanges
                .pipe(takeUntil(_this._onDestroy))
                .subscribe(function () {
                _this.filterStoreMulti();
            });
            _this.statuses.filter(function (status) {
                if (_this.addStatus &&
                    _this.foreignBill.statuses &&
                    _this.addStatus.id === status.id) {
                    _this.statusForm.setValue(status);
                }
            });
        });
    };
    ForeignBillFormComponent.prototype.overlayZindex = function () {
        var sdk = document.getElementsByClassName('cdk-overlay-container');
        sdk[0].setAttribute('style', 'z-index:1056');
    };
    ForeignBillFormComponent.prototype.ngOnDestroy = function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    ForeignBillFormComponent.prototype.setInitialValue = function () {
        var _this = this;
        this.filteredUserForm
            .pipe(take(1), takeUntil(this._onDestroy))
            .subscribe(function () {
            _this.multiSelect.compareWith = function (a, b) {
                return a && b && a.id === b.id;
            };
        });
    };
    ForeignBillFormComponent.prototype.filterUserMulti = function () {
        if (!this.users) {
            return;
        }
        var search = this.userFormFilterCtrl.value;
        if (!search) {
            this.filteredUserForm.next(this.users.slice());
            return;
        }
        else {
            search = search.toLowerCase();
        }
        this.filteredUserForm.next(this.users.filter(function (bank) { return bank.userCode.toLowerCase().indexOf(search) > -1; }));
    };
    ForeignBillFormComponent.prototype.filterStoreMulti = function () {
        if (!this.stores) {
            return;
        }
        var search = this.storeFormFilterCtrl.value;
        if (!search) {
            this.filteredStoreForm.next(this.stores.slice());
            return;
        }
        else {
            search = search.toLowerCase();
        }
        this.filteredStoreForm.next(this.stores.filter(function (bank) { return bank.code.toLowerCase().indexOf(search) > -1; }));
    };
    ForeignBillFormComponent.prototype.ngAfterViewInit = function () {
        this.setInitialValue();
    };
    ForeignBillFormComponent.prototype.updateBills = function () {
        var _this = this;
        var observable = new Observable();
        // this.foreignBill.userId = this.userBill.id;
        this.foreignBill.userName = this.userBill.name;
        if (this.foreignBill.id) {
            var statusRaw = this.foreignBill.statusOfForeignBill[this.foreignBill.statusOfForeignBill.length - 1].status;
            if (statusRaw.statusGroupId <= this.addStatus.statusGroupId) {
                this.spinner.show().then().catch();
                observable =
                    this.foreignBillApi.patchAttributes(this.foreignBill.id, this.foreignBill);
            }
            else {
                // this.spinner.show().then().catch();
                var mess = "Kh\u00F4ng th\u1EC3 th\u1EF1c hi\u1EC7n ".concat(this.addStatus.name, " sau ").concat(statusRaw.name, "!");
                this.notifierService.error(mess);
                return;
            }
        }
        // if (observable != undefined){
        observable
            .pipe(flatMap(function (bill) {
            var sub = [];
            var tmp = {
                foreignBillId: bill.id,
                statusId: _this.addStatus.id,
                storesId: _this.addStores.id
            };
            sub.push(_this.statusOfForeignBillApi.create([tmp]));
            if (sub.length > 0) {
                return zip.apply(void 0, sub);
            }
            else {
                return of(true);
            }
        }))
            .subscribe(function (res) {
            _this.spinner.hide().then().catch();
            _this.onResult.emit({
                isCancelled: false,
            });
            _this.bsModalRef.hide();
            _this.notifierService.success('Thành công!');
        }, function (error) {
            _this.spinner.hide().then().catch();
            if (error.details) {
                _this.notifierService.error("Mã đơn hàng bị trùng");
            }
            else
                _this.notifierService.error(error.message);
        });
        // }
    };
    ForeignBillFormComponent.prototype.cancel = function () {
        this.onResult.emit({
            isCancelled: true,
        });
        this.bsModalRef.hide();
    };
    ForeignBillFormComponent.prototype.compareById = function (item1, item2) {
        return item1 && item2 && (item1.id === item2.id || item1 === item2);
    };
    ForeignBillFormComponent.prototype.compareByName = function (item1, item2) {
        return item1 && item2
            ? item1.toLowerCase() === item2.toLowerCase()
            : (item2 = item1);
    };
    __decorate([
        Input(),
        __metadata("design:type", ForeignBill)
    ], ForeignBillFormComponent.prototype, "foreignBill", void 0);
    __decorate([
        ViewChild('multiSelect', { static: true }),
        __metadata("design:type", MatSelect)
    ], ForeignBillFormComponent.prototype, "multiSelect", void 0);
    ForeignBillFormComponent = __decorate([
        Component({
            selector: 'app-foreign-bill-form',
            templateUrl: './foreign-bill-form.component.html',
            styleUrls: ['./foreign-bill-form.component.scss']
        }),
        __metadata("design:paramtypes", [BsModalRef,
            LoopBackAuth,
            UserApi,
            StatusApi,
            Router,
            NotificationWrapperService,
            NgxSpinnerService,
            StoresApi,
            ForeignBillApi,
            StatusOfForeignBillApi])
    ], ForeignBillFormComponent);
    return ForeignBillFormComponent;
}());
export { ForeignBillFormComponent };
//# sourceMappingURL=foreign-bill-form.component.js.map