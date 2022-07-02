import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReplaySubject, Subject, zip, of } from 'rxjs';
import { takeUntil, take, flatMap } from 'rxjs/operators';
import { ForeignBill, Account, StatusOfBill, Status, LoopBackAuth, UserApi, StatusApi, StoresApi, Stores, ForeignBillApi, StatusOfForeignBillApi, } from 'src/app/api';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
var AddForeignBillComponent = /** @class */ (function () {
    function AddForeignBillComponent(bsModalRef, auth, userApi, statusApi, router, notifierService, spinner, storesApi, foreignBillApi, statusOfForeignBillApi) {
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
        this.bill = new ForeignBill();
        this.roles = [];
        this.currentAccount = new Account();
        this.isRoleAdmin = false;
        this.isRoleSuperAdmin = false;
        this.admins = [];
        this.statusOfBill = new StatusOfBill();
        this.statuses = [];
        this.users = [];
        this.listBill = [];
        this.listBillCurrent = [];
        this.stores = [];
        this.isSubmitted = false;
        this.addStatus = new Status();
        this.userBill = [];
        this.statusForm = new FormControl();
        this.filteredStatusForm = new ReplaySubject(1);
        this.userForm = new FormControl();
        this.userFormFilterCtrl = new FormControl();
        this.filteredUserForm = new ReplaySubject(1);
        this.storeForm = new FormControl();
        this.storeFormFilterCtrl = new FormControl();
        this.filteredStoreForm = new ReplaySubject(1);
        this._onDestroy = new Subject();
        this.bill.stores = [new Stores()];
    }
    AddForeignBillComponent.prototype.ngOnInit = function () {
        this.currentAccount = this.auth.getCurrentUserData();
        this.isRoleSuperAdmin =
            this.currentAccount.roles[0].name === 'SUPERADMIN' ||
                this.currentAccount.roles[0].name === 'ADMIN';
        this.isRoleAdmin = this.currentAccount.roles[0].name === 'ADMIN';
        this.onResult = new EventEmitter();
        this.initData();
    };
    AddForeignBillComponent.prototype.initData = function () {
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
            }
        };
        var filterOne = {
            where: {
                order: 1,
            },
        };
        zip(this.statusApi.find(filter), this.foreignBillApi.find(), this.userApi.find(), this.statusApi.find(filterOne), this.storesApi.find()).subscribe(function (_a) {
            var statuses = _a[0], foreignBills = _a[1], users = _a[2], statusOne = _a[3], stores = _a[4];
            _this.statuses = statuses;
            // data.map((it: Status) => {
            //   if (it.group && (parseInt(it.group.order) == 2 || parseInt(it.group.order) >= 4)) {
            //     console.log(it)
            //     this.statuses.push(it);
            //   }
            // })
            _this.listBillCurrent = foreignBills;
            _this.stores = stores;
            _this.users = users;
            _this.addStatus = statusOne[0];
            _this.users.filter(function (user) {
                if (_this.bill.userName && _this.bill.userName === user.name) {
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
                if (_this.bill.stores[0] && _this.bill.stores[0].id === store.id) {
                    _this.storeForm.setValue(store);
                }
            });
            _this.filteredStoreForm.next(_this.stores.slice());
            _this.storeFormFilterCtrl.valueChanges
                .pipe(takeUntil(_this._onDestroy))
                .subscribe(function () {
                _this.filterStoreMulti();
            });
        });
    };
    AddForeignBillComponent.prototype.overlayZindex = function () {
        var sdk = document.getElementsByClassName('cdk-overlay-container');
        sdk[0].setAttribute('style', 'z-index:1056');
    };
    AddForeignBillComponent.prototype.ngOnDestroy = function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    AddForeignBillComponent.prototype.setInitialValue = function () {
        var _this = this;
        this.filteredUserForm
            .pipe(take(1), takeUntil(this._onDestroy))
            .subscribe(function () {
            _this.multiSelect.compareWith = function (a, b) {
                return a && b && a.id === b.id;
            };
        });
    };
    AddForeignBillComponent.prototype.filterUserMulti = function () {
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
    AddForeignBillComponent.prototype.filterStoreMulti = function () {
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
    AddForeignBillComponent.prototype.ngAfterViewInit = function () {
        this.setInitialValue();
    };
    AddForeignBillComponent.prototype.addBillToList = function (bill, form) {
        this.isSubmitted = true;
        if (form.invalid || bill.stores[0] == undefined || this.addStatus == undefined) {
            this.notifierService.warning('Chưa điền đủ thông tin!');
            return;
        }
        var tmp = Object.assign({}, bill);
        var check = true;
        this.listBillCurrent.filter(function (item) {
            if (item.code === tmp.code) {
                check = false;
            }
        });
        if (check) {
            this.listBill.push(tmp);
            this.isSubmitted = false;
        }
        else {
            this.notifierService.error("Mã đơn bị trùng");
        }
    };
    AddForeignBillComponent.prototype.removeBillFromList = function (index) {
        this.listBill.splice(index, 1);
        this.userBill.splice(index, 1);
    };
    AddForeignBillComponent.prototype.createBills = function () {
        var _this = this;
        if (this.listBill.length === 0) {
            this.notifierService.warning('Chưa có hóa đơn được tạo');
            return;
        }
        this.spinner.show().then().catch();
        var observable = [];
        console.log(this.userBill);
        console.log(this.listBill.length);
        for (var i = 0; i < this.listBill.length; i++) {
            var createObservable = void 0;
            // this.listBill[i].userId = this.userBill[i].id;
            this.listBill[i].userName = this.userBill[i].name;
            if (this.listBill[i].id) {
                observable.push(this.foreignBillApi.linkStatuses(this.listBill[i].id, this.addStatus.id));
            }
            else {
                this.listBill[i].code = this.listBill[i].code.toUpperCase();
                createObservable = this.foreignBillApi.create([this.listBill[i]]);
            }
            observable.push(createObservable);
        }
        zip.apply(void 0, observable).pipe(flatMap(function (bills) {
            var sub = [];
            for (var i = 0; i < bills.length; i++) {
                var tmp = void 0;
                if (_this.isRoleSuperAdmin) {
                    tmp = {
                        foreignBillId: bills[i]['0'].id,
                        statusId: _this.addStatus.id,
                        storesId: _this.listBill[i].stores[0].id
                    };
                }
                else {
                    tmp = {
                        foreignBillId: bills[i]['0'].id,
                        statusId: _this.addStatus.id,
                        storesId: _this.currentAccount.storesId
                    };
                }
                sub.push(_this.statusOfForeignBillApi.create([tmp]));
            }
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
            _this.router.navigate(['/foreign-bill']);
        }, function (error) {
            _this.spinner.hide().then().catch();
            if (error.details) {
                _this.notifierService.error("Mã đơn hàng bị trùng");
            }
            else
                _this.notifierService.error(error.message);
            console.log(error);
        });
    };
    AddForeignBillComponent.prototype.cancel = function () {
        this.router.navigate(['/foreign-bill']);
    };
    AddForeignBillComponent.prototype.compareById = function (item1, item2) {
        return item1 && item2 && (item1.id === item2.id || item1 === item2);
    };
    AddForeignBillComponent.prototype.compareByName = function (item1, item2) {
        return item1 && item2
            ? item1.toLowerCase() === item2.toLowerCase()
            : (item2 = item1);
    };
    __decorate([
        ViewChild('multiSelect', { static: true }),
        __metadata("design:type", MatSelect)
    ], AddForeignBillComponent.prototype, "multiSelect", void 0);
    AddForeignBillComponent = __decorate([
        Component({
            selector: 'app-add-foreign-bill',
            templateUrl: './add-foreign-bill.component.html',
            styleUrls: ['./add-foreign-bill.component.scss'],
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
    ], AddForeignBillComponent);
    return AddForeignBillComponent;
}());
export { AddForeignBillComponent };
//# sourceMappingURL=add-foreign-bill.component.js.map