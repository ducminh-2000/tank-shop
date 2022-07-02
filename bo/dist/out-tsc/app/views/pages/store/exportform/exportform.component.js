import { __decorate, __metadata } from "tslib";
import { ForeignBillApi, StatusApi, StatusOfForeignBillApi, UserApi } from 'src/app/api/services/custom';
import { forkJoin, ReplaySubject, Subject } from 'rxjs';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { Account, ForeignBill, LoopBackAuth, Status, StatusOfForeignBill, Stores, StoresApi, User } from 'src/app/api';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { take, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
var ExportformComponent = /** @class */ (function () {
    function ExportformComponent(bsModalRef, auth, notifierService, statusOfFBillApi, fbillApi, statusApi, storeApi, userApi, spinner, router) {
        this.bsModalRef = bsModalRef;
        this.auth = auth;
        this.notifierService = notifierService;
        this.statusOfFBillApi = statusOfFBillApi;
        this.fbillApi = fbillApi;
        this.statusApi = statusApi;
        this.storeApi = storeApi;
        this.userApi = userApi;
        this.spinner = spinner;
        this.router = router;
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
        this.check = false;
        this.code = '';
        this.isSubmitted = false;
        this.status = new Status();
        this._onDestroy = new Subject();
        this.userForm = new FormControl();
        this.userFormFilterCtrl = new FormControl();
        this.filteredUserForm = new ReplaySubject(1);
        this.storeForm = new FormControl();
        this.storeFormFilterCtrl = new FormControl();
        this.filteredStoreForm = new ReplaySubject(1);
    }
    ExportformComponent.prototype.ngOnInit = function () {
        this.currentAccount = this.auth.getCurrentUserData();
        this.isRoleSuperAdmin =
            this.currentAccount.roles[0].name === 'SUPERADMIN' ||
                this.currentAccount.roles[0].name === 'ADMIN';
        this.isRoleAdmin = this.currentAccount.roles[0].name === 'ADMIN';
        this.onResult = new EventEmitter();
        this.initData();
    };
    ExportformComponent.prototype.initData = function () {
        var _this = this;
        this.statusOfBill.storesId = this.currentAccount.storesId;
        var observable = [];
        var filter = {
            include: [
                {
                    relation: 'group'
                },
            ],
            where: {
                order: 4
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
        observable.push(this.statusApi.findOne(filter));
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
        });
    };
    ExportformComponent.prototype.ngOnDestroy = function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    ExportformComponent.prototype.setInitialValue = function () {
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
    ExportformComponent.prototype.filterUserMulti = function () {
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
    ExportformComponent.prototype.filterStoreMulti = function () {
        if (!this.listStore) {
            return;
        }
        var search = this.storeFormFilterCtrl.value;
        if (!search) {
            this.filteredStoreForm.next(this.listStore.slice());
            return;
        }
        else {
            search = search.toUpperCase();
        }
        this.filteredStoreForm.next(this.listStore.filter(function (bank) { return bank.code.toUpperCase().indexOf(search) > -1; }));
    };
    ExportformComponent.prototype.overlayZindex = function () {
        var sdk = document.getElementsByClassName('cdk-overlay-container');
        sdk[0].setAttribute('style', 'z-index:1056');
    };
    ExportformComponent.prototype.removeBill = function (index) {
        this.listBill.splice(index, 1);
    };
    ExportformComponent.prototype.addToList = function (form) {
        var _this = this;
        this.code = this.code.toUpperCase();
        this.isSubmitted = true;
        if (form.invalid || this.userBill == undefined || this.store == undefined) {
            this.notifierService.warning('Chưa điền đủ thông tin!');
            return;
        }
        var tmp = new ForeignBill();
        this.spinner.show().then().catch();
        this.statusOfBill.statusId = this.status.id;
        this.listBillCurrent.filter(function (data) {
            if (data.code === _this.code && data.isHidden === false) {
                tmp = data;
            }
        });
        this.onResult.emit({
            isCancelled: false,
        });
        if (tmp.id) {
            this.listBillOfStore = tmp.statusOfForeignBill;
            this.listBillOfStore.sort(function (a, b) { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); });
            console.log(this.listBillOfStore);
            console.log(this.status);
            var exist = true;
            if (this.listBillOfStore == []) {
                exist = false;
            }
            if (this.listBillOfStore[0].status.order != 2 && this.listBillOfStore[0].status.order != 3) {
                exist = false;
            }
            if ((this.listBillOfStore[0].status.order == 2 || this.listBillOfStore[0].status.order == 3)
                && this.listBillOfStore[0].storesId != this.store.id) {
                exist = false;
            }
            if (this.listBillOfStore[0].status.group.order <= this.status.group.order && this.listBillOfStore[0].status.order >= this.status.order) {
                var mess = "Kh\u00F4ng th\u1EC3 ".concat(this.status.name, " sau ").concat(this.listBillOfStore[0].status.name);
                alert(mess);
                this.spinner.hide().then().catch();
            }
            if (!exist) {
                alert("Tracking đã xuất kho hoặc Tracking chưa nhập kho");
                this.spinner.hide().then().catch();
            }
            else if (this.currentAccount.storesId != this.statusOfBill.storesId) {
                if (confirm('Bạn đang xuất kho một Tracking từ kho khác kho của bạn. Bạn có chắc chắn ???')) {
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
                    ;
                    this.bsModalRef.hide();
                    this.spinner.hide().then().catch();
                }
                else {
                    this.spinner.hide().then().catch();
                }
            }
            else {
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
        }
        else {
            alert("Đơn hàng không tồn tại");
            this.spinner.hide().then().catch();
        }
    };
    ExportformComponent.prototype.upsertStore = function () {
        var _this = this;
        if (this.listStatusOfFbill.length > 0) {
            console.log(this.listStatusOfFbill);
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
                if (error.details) {
                    _this.notifierService.error('Có một số bản ghi bị sai. Bản ghi đúng đã được thực thi!');
                }
                _this.spinner.hide().then().catch();
                _this.notifierService.error('Thất bại!');
            });
        }
        else {
            this.notifierService.error("Danh sách trống !");
        }
    };
    ExportformComponent.prototype.get = function () {
        this.listBill = [];
        this.listAddBill = [];
        this.bill = new ForeignBill();
    };
    ExportformComponent.prototype.cancel = function () {
        this.onResult.emit({
            isCancelled: true,
        });
        this.bsModalRef.hide();
        this.check = false;
        this.router.navigate(['/store/list']);
    };
    ExportformComponent.prototype.compareById = function (item1, item2) {
        return item1 && item2 && (item1.id === item2.id || item1 === item2);
    };
    ExportformComponent.prototype.compareByName = function (item1, item2) {
        return item1 && item2
            ? item1.toLowerCase() === item2.toLowerCase()
            : (item2 = item1);
    };
    __decorate([
        ViewChild('multiSelect', { static: true }),
        __metadata("design:type", MatSelect)
    ], ExportformComponent.prototype, "multiSelect", void 0);
    ExportformComponent = __decorate([
        Component({
            selector: 'app-exportform',
            templateUrl: './exportform.component.html',
            styleUrls: ['./exportform.component.scss']
        }),
        __metadata("design:paramtypes", [BsModalRef,
            LoopBackAuth,
            NotificationWrapperService,
            StatusOfForeignBillApi,
            ForeignBillApi,
            StatusApi,
            StoresApi,
            UserApi,
            NgxSpinnerService,
            Router])
    ], ExportformComponent);
    return ExportformComponent;
}());
export { ExportformComponent };
//# sourceMappingURL=exportform.component.js.map