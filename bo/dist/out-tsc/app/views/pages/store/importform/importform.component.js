import { __decorate, __metadata } from "tslib";
import { flatMap, take, takeUntil } from 'rxjs/operators';
import { ForeignBillApi, StatusApi, StatusOfForeignBillApi, UserApi } from 'src/app/api/services/custom';
import { forkJoin, of, ReplaySubject, Subject, zip } from 'rxjs';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { Account, ForeignBill, LoopBackAuth, StatusOfForeignBill, Stores, StoresApi, User } from 'src/app/api';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { PopupImportComponent } from '../../foreign-bill/popup-import/popup-import.component';
var ImportformComponent = /** @class */ (function () {
    function ImportformComponent(bsModalRef, auth, notifierService, statusOfFBillApi, fbillApi, statusApi, userApi, storeApi, spinner, router, bsModalService) {
        this.bsModalRef = bsModalRef;
        this.auth = auth;
        this.notifierService = notifierService;
        this.statusOfFBillApi = statusOfFBillApi;
        this.fbillApi = fbillApi;
        this.statusApi = statusApi;
        this.userApi = userApi;
        this.storeApi = storeApi;
        this.spinner = spinner;
        this.router = router;
        this.bsModalService = bsModalService;
        this.roles = [];
        this.currentAccount = new Account();
        this.isRoleAdmin = false;
        this.isRoleSuperAdmin = false;
        this.admins = [];
        this.statusOfBill = new StatusOfForeignBill();
        this.listBillOfStore = [];
        this.listStore = [];
        this.listBill = [];
        this.listBillCurrent = [];
        this.listStatusOfFbill = [];
        this.bill = new ForeignBill();
        this.fbillRaw = [];
        this.users = [];
        this.userBill = new User();
        this.listAddBill = [];
        this.stores = new Stores();
        this.addStore = new Map();
        this.addStatus = new Map();
        this.check = false;
        this.code = '';
        this.isSubmitted = false;
        this._onDestroy = new Subject();
        this.userForm = new FormControl();
        this.userFormFilterCtrl = new FormControl();
        this.filteredUserForm = new ReplaySubject(1);
        this.storeForm = new FormControl();
        this.storeFormFilterCtrl = new FormControl();
        this.filteredStoreForm = new ReplaySubject(1);
    }
    ImportformComponent.prototype.ngOnInit = function () {
        this.currentAccount = this.auth.getCurrentUserData();
        this.isRoleSuperAdmin =
            this.currentAccount.roles[0].name === 'SUPERADMIN' ||
                this.currentAccount.roles[0].name === 'ADMIN';
        this.isRoleAdmin = this.currentAccount.roles[0].name === 'ADMIN';
        this.onResult = new EventEmitter();
        this.initData();
    };
    ImportformComponent.prototype.initData = function () {
        var _this = this;
        this.statusOfBill.storesId = this.currentAccount.storesId;
        var observable = [];
        var filter = {
            include: [
                {
                    relation: 'group'
                }
            ],
            where: {
                and: [
                    {
                        order: {
                            gt: 1
                        }
                    },
                    {
                        order: {
                            lt: 4
                        }
                    }
                ]
            }
        };
        var filterBill = {
            include: [
                {
                    statuses: ['group']
                },
                {
                    relation: 'stores'
                },
                // {
                //   relation: 'group'
                // },
                {
                    statusOfForeignBill: [
                        { status: 'group' }, 'stores'
                    ]
                }
            ]
        };
        observable.push(this.storeApi.find());
        observable.push(this.userApi.find());
        observable.push(this.fbillApi.find(filterBill));
        observable.push(this.statusApi.find(filter));
        forkJoin(observable).subscribe(function (data) {
            _this.listStore = data[0];
            _this.users = data[1];
            _this.listBillCurrent = data[2];
            _this.status = data[3];
            _this.filteredUserForm.next(_this.users.slice());
            _this.userFormFilterCtrl.valueChanges
                .pipe(takeUntil(_this._onDestroy))
                .subscribe(function () {
                _this.filterUserMulti();
            });
            _this.filteredStoreForm.next(_this.listStore.slice());
            _this.storeFormFilterCtrl.valueChanges
                .pipe(takeUntil(_this._onDestroy))
                .subscribe(function () {
                _this.filterUserMulti();
            });
            console.log(data[3]);
        });
    };
    ImportformComponent.prototype.ngOnDestroy = function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    ImportformComponent.prototype.setInitialValue = function () {
        var _this = this;
        this.filteredUserForm
            .pipe(take(1), takeUntil(this._onDestroy))
            .subscribe(function () {
            _this.multiSelect.compareWith = function (a, b) {
                return a && b && a.id === b.id;
            };
        });
        this.filteredStoreForm
            .pipe(take(1), takeUntil(this._onDestroy))
            .subscribe(function () {
            _this.multiSelect.compareWith = function (a, b) {
                return a && b && a.id === b.id;
            };
        });
    };
    ImportformComponent.prototype.filterUserMulti = function () {
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
    ImportformComponent.prototype.filterStoreMulti = function () {
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
    ImportformComponent.prototype.get = function () {
        this.listBill = [];
        this.listAddBill = [];
        this.bill = new ForeignBill();
    };
    ImportformComponent.prototype.showImport = function () {
        var modalRef = this.bsModalService.show(PopupImportComponent, {
            initialState: {
                option: 2
            },
            class: 'modal-lg'
        });
        modalRef.content.onResult.subscribe(function (result) {
            if (!result.isCancelled) {
            }
        });
    };
    ImportformComponent.prototype.overlayZindex = function () {
        var sdk = document.getElementsByClassName('cdk-overlay-container');
        sdk[0].setAttribute('style', 'z-index:1056');
    };
    ImportformComponent.prototype.removeBill = function (index) {
        this.listBill.splice(index, 1);
    };
    ImportformComponent.prototype.addToList = function (form) {
        var _this = this;
        var statusRaw;
        var tmp = new ForeignBill();
        this.code = this.code.toUpperCase();
        this.isSubmitted = true;
        if (form.invalid || this.userBill == undefined || this.store == undefined) {
            this.notifierService.warning('Chưa điền đủ thông tin!');
            return;
        }
        this.spinner.show().then().catch();
        if (this.store.region == 'VN') {
            statusRaw = this.status[1];
        }
        else {
            statusRaw = this.status[0];
        }
        this.statusOfBill.statusId = statusRaw.id;
        this.listBillCurrent.filter(function (data) {
            if (data.code === _this.code && data.isHidden == false) {
                tmp = data;
            }
        });
        this.onResult.emit({
            isCancelled: false,
        });
        if (tmp.code) {
            this.listBillOfStore = tmp.statusOfForeignBill;
            this.listBillOfStore.sort(function (a, b) { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); });
            var exist = true;
            if (this.listBillOfStore == []) {
                exist = false;
            }
            else if (this.listBillOfStore[0].status.order != 2 && this.listBillOfStore[0].status.order != 3) {
                exist = false;
            }
            if (this.listBillOfStore[0].status.group.order <= statusRaw.group.order && this.listBillOfStore[0].status.order >= statusRaw.order) {
                var mess = "Kh\u00F4ng th\u1EC3 ".concat(statusRaw.name, " sau ").concat(this.listBillOfStore[0].status.name);
                alert(mess);
                this.spinner.hide().then().catch();
            }
            if (exist) {
                alert("Tracking đã tồn tại trong kho");
                this.spinner.hide().then().catch();
            }
            else if (this.store.id != this.currentAccount.storesId && exist) {
                if (confirm('Bạn đang nhập kho một Tracking vào kho khác kho của bạn. Bạn có chắc chắn ???')) {
                    this.listBill.filter(function (it) {
                        if (tmp.code === it.code) {
                            _this.check = true;
                        }
                    });
                    if (this.check) {
                        this.notifierService.error("Tracking đã có trong danh sách");
                    }
                    else {
                        this.listBill.push(tmp);
                        this.statusOfBill.foreignBillId = tmp.id;
                        this.statusOfBill.storesId = this.store.id;
                        this.listStatusOfFbill.push(this.statusOfBill);
                    }
                    this.bsModalRef.hide();
                    this.spinner.hide().then().catch();
                }
                else {
                    this.spinner.hide().then().catch();
                }
            }
            else {
                this.listBill.filter(function (it) {
                    if (tmp.code == it.code) {
                        _this.check = true;
                    }
                });
                if (this.check) {
                    this.notifierService.error("Tracking đã có trong danh sách");
                }
                else {
                    this.listBill.push(tmp);
                    this.statusOfBill.foreignBillId = tmp.id;
                    this.statusOfBill.storesId = this.store.id;
                    this.listStatusOfFbill.push(this.statusOfBill);
                }
                this.bsModalRef.hide();
                this.spinner.hide().then().catch();
            }
        }
        else {
            var check1_1 = false, check2_1 = false;
            this.spinner.hide().then().catch();
            tmp.code = this.code.toUpperCase();
            // tmp.userId = this.userBill.id;
            tmp.stores = [this.store];
            tmp.statuses = [statusRaw];
            // tmp.userCode = this.userBill.userCode;
            this.listAddBill.filter(function (it) {
                if (tmp.code === it.code) {
                    check1_1 = true;
                }
            });
            this.listBill.filter(function (it) {
                if (tmp.code === it.code) {
                    check2_1 = true;
                }
            });
            if (check1_1 && check2_1) {
                this.notifierService.error("Tracking đã có trong danh sách");
            }
            else {
                this.listBill.push(tmp);
                this.listAddBill.push(tmp);
                this.addStore.set(tmp.code, this.store.id);
                this.addStatus.set(tmp.code, statusRaw.id);
                //     console.log(this.addStore)
                // this.statusOfBill.foreignBillId = this.bill.id;
                // this.listStatusOfFbill.push(this.statusOfBill)
            }
        }
        // this.bill = new ForeignBill()
    };
    ImportformComponent.prototype.upsertStore = function () {
        var _this = this;
        this.spinner.show().then().catch();
        var ob = [];
        if (this.listAddBill.length > 0) {
            for (var _i = 0, _a = this.listAddBill; _i < _a.length; _i++) {
                var item = _a[_i];
                console.log(item);
                ob.push(this.fbillApi.create(item));
            }
            zip.apply(void 0, ob).pipe(flatMap(function (bills) {
                var sub = [];
                for (var i = 0; i < bills.length; i++) {
                    console.log(bills[i]);
                    var tmp = {
                        foreignBillId: bills[i].id,
                        statusId: _this.addStatus.get(bills[i].code),
                        storesId: _this.addStore.get(bills[i].code)
                    };
                    sub.push(_this.statusOfFBillApi.create(tmp));
                }
                sub.push(_this.statusOfFBillApi.createArray(_this.listStatusOfFbill));
                if (sub.length > 0) {
                    return zip.apply(void 0, sub);
                }
                else {
                    return of(true);
                }
            })).subscribe(function (res) {
                _this.onResult.emit({
                    isCancelled: false,
                });
                _this.bsModalRef.hide();
                _this.spinner.hide().then().catch();
                _this.notifierService.success('Thành công !');
                _this.get();
            }, function (error) {
                if (error.details) {
                    _this.notifierService.error('Có một số bản ghi bị sai. Bản ghi đúng đã được thực thi!');
                }
                _this.spinner.hide().then().catch();
                _this.notifierService.error('Thất bại!');
            });
        }
        // ob.push(this.statusOfFBillApi.createArray(this.listStatusOfFbill))
        else if (this.listStatusOfFbill.length > 0) {
            var sub = [];
            sub.push(this.statusOfFBillApi.createArray(this.listStatusOfFbill));
            forkJoin(sub).subscribe(function (res) {
                _this.onResult.emit({
                    isCancelled: false,
                });
                _this.bsModalRef.hide();
                _this.notifierService.success('Thành công !');
                _this.spinner.hide().then().catch();
                _this.get();
            }, function (error) {
                _this.spinner.hide().then().catch();
                _this.notifierService.error('Thất bại!');
            });
        }
        else {
            this.notifierService.error("Danh sách trống !");
        }
    };
    ImportformComponent.prototype.cancel = function () {
        this.onResult.emit({
            isCancelled: true,
        });
        this.bsModalRef.hide();
        this.check = false;
        this.router.navigate(['/store/list']);
    };
    ImportformComponent.prototype.compareById = function (item1, item2) {
        return item1 && item2 && (item1.id === item2.id || item1 === item2);
    };
    ImportformComponent.prototype.compareByName = function (item1, item2) {
        return item1 && item2
            ? item1.toLowerCase() === item2.toLowerCase()
            : (item2 = item1);
    };
    __decorate([
        ViewChild('multiSelect', { static: true }),
        __metadata("design:type", MatSelect)
    ], ImportformComponent.prototype, "multiSelect", void 0);
    ImportformComponent = __decorate([
        Component({
            selector: 'app-importform',
            templateUrl: './importform.component.html',
            styleUrls: ['./importform.component.scss']
        }),
        __metadata("design:paramtypes", [BsModalRef,
            LoopBackAuth,
            NotificationWrapperService,
            StatusOfForeignBillApi,
            ForeignBillApi,
            StatusApi,
            UserApi,
            StoresApi,
            NgxSpinnerService,
            Router,
            BsModalService])
    ], ImportformComponent);
    return ImportformComponent;
}());
export { ImportformComponent };
//# sourceMappingURL=importform.component.js.map