import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { of, ReplaySubject, Subject, zip } from 'rxjs';
import { flatMap, take, takeUntil } from 'rxjs/operators';
import { Account, Bills, User, Status, StatusOfBill, ShipBrand, Shipper, StatusOfForeignBill } from 'src/app/api/models';
import { LoopBackAuth } from 'src/app/api/services/core';
import { BillsApi, ForeignBillApi, ShipBrandApi, ShipperApi, StatusApi, StatusOfBillApi, StatusOfForeignBillApi, UserApi } from 'src/app/api/services/custom';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
import _ from 'lodash';
import { MatSelect } from '@angular/material/select';
var BillformComponent = /** @class */ (function () {
    function BillformComponent(bsModalRef, auth, userApi, statusApi, shipBrandApi, foreignBillApi, shipperApi, statusOfBillApi, statusOfForeignBillApi, notifierService, billApi, spinner) {
        this.bsModalRef = bsModalRef;
        this.auth = auth;
        this.userApi = userApi;
        this.statusApi = statusApi;
        this.shipBrandApi = shipBrandApi;
        this.foreignBillApi = foreignBillApi;
        this.shipperApi = shipperApi;
        this.statusOfBillApi = statusOfBillApi;
        this.statusOfForeignBillApi = statusOfForeignBillApi;
        this.notifierService = notifierService;
        this.billApi = billApi;
        this.spinner = spinner;
        this.roles = [];
        this.currentAccount = new Account();
        this.isRoleAdmin = false;
        this.isRoleSuperAdmin = false;
        this.admins = [];
        this.statusOfBill = new StatusOfBill();
        this.statuses = [];
        this.users = [];
        this.listBill = [];
        this.shipbrands = [];
        this.shippers = [];
        this.fbillRaw = [];
        this.fbills = [];
        this.isSubmitted = false;
        this.addStatus = new Status();
        this.userBill = new User();
        this.shipBrand = new ShipBrand();
        this.shipper = new Shipper();
        this.foreignBill = [];
        this.statusForm = new FormControl();
        this.userForm = new FormControl();
        this.userFormFilterCtrl = new FormControl();
        this.filteredUserForm = new ReplaySubject(1);
        this.filteredStatusForm = new ReplaySubject(1);
        this.shipBrandForm = new FormControl();
        this.shipBrandFormFilterCtrl = new FormControl();
        this.filteredShipBrandForm = new ReplaySubject(1);
        this.shipperForm = new FormControl();
        this.shipperFormFilterCtrl = new FormControl();
        this.filteredShipperForm = new ReplaySubject(1);
        this.foreignBillForm = new FormControl();
        this.foreignBillFormFilterCtrl = new FormControl();
        this.filteredForeignBillForm = new ReplaySubject(1);
        this._onDestroy = new Subject();
    }
    BillformComponent.prototype.ngOnInit = function () {
        var _a;
        this.currentAccount = this.auth.getCurrentUserData();
        this.isRoleSuperAdmin =
            this.currentAccount.roles[0].name === 'SUPERADMIN' ||
                this.currentAccount.roles[0].name === 'ADMIN';
        this.isRoleAdmin = this.currentAccount.roles[0].name === 'ADMIN';
        this.onResult = new EventEmitter();
        if (this.bill.id) {
            // this.shipBrand = this.bill.shipBrand;
            this.userBill = this.bill.user;
            this.fbillRaw = this.bill.foreignBill;
            this.addStatus = (_a = this.bill.statusOfBill[this.bill.statusOfBill.length - 1]) === null || _a === void 0 ? void 0 : _a.status;
        }
        this.initData();
    };
    BillformComponent.prototype.initData = function () {
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
                order: 1
            }
        };
        var filterUser = {
        // include: [
        //   {
        //     relation: 'foreignBill'
        //   }
        // ]
        };
        var filterFBill = {
            include: [
                {
                    relation: 'bill'
                },
                // {
                //   relation: 'user'
                // },
                {
                    statusOfForeignBill: ['stores', 'status']
                }
            ],
            where: {
                // userName: item.name,
                isHidden: false
            }
        };
        zip(this.statusApi.find(filter), this.userApi.find(filterUser), this.shipBrandApi.find(), this.shipperApi.find(), this.foreignBillApi.find(filterFBill), this.statusApi.find(filterOne)).subscribe(function (_a) {
            var statuses = _a[0], users = _a[1], shipBrands = _a[2], shippers = _a[3], fbills = _a[4], statusOne = _a[5];
            _this.statuses = statuses;
            // data.map((it: Status) => {
            //   if (it.group && (parseInt(it.group.order) == 2 || parseInt(it.group.order) >= 4)) {
            //     console.log(it)
            //     this.statuses.push(it);
            //   }
            // })
            _this.shipbrands = shipBrands;
            _this.shippers = shippers;
            _this.users = users;
            // this.addStatus = statusOne[0];
            _this.fbills = fbills;
            _this.users.filter(function (user) {
                if (_this.bill.user && _this.bill.user.id === user.id) {
                    _this.userForm.setValue(user);
                }
                _this.bill.phone = _this.userBill.phoneNumber;
                _this.bill.to = _this.userBill.address;
                _this.bill.recive = _this.userBill.name;
            });
            _this.filteredUserForm.next(_this.users.slice());
            _this.userFormFilterCtrl.valueChanges
                .pipe(takeUntil(_this._onDestroy))
                .subscribe(function () {
                _this.filterUserMulti();
            });
            _this.foreignBillForm.setValue(_this.fbills.filter(function (fbill) {
                if (_this.bill.foreignBill &&
                    _this.bill.foreignBill.find(function (foreignBill) { return foreignBill.id === fbill.id; })) {
                    return fbill;
                }
            }));
            _this.filteredForeignBillForm.next(_this.fbills.slice());
            _this.foreignBillFormFilterCtrl.valueChanges
                .pipe(takeUntil(_this._onDestroy))
                .subscribe(function () {
                _this.filterForeignBillMulti();
            });
            _this.shipbrands.filter(function (shipBrand) {
                if (_this.bill.shipBrand && _this.bill.shipBrand.id === shipBrand.id) {
                    _this.shipBrandForm.setValue(shipBrand);
                }
            });
            _this.filteredShipBrandForm.next(_this.shipbrands.slice());
            _this.shipBrandFormFilterCtrl.valueChanges
                .pipe(takeUntil(_this._onDestroy))
                .subscribe(function () {
                _this.filterShipBrandMulti();
            });
            _this.statuses.filter(function (status) {
                if (_this.bill.statuses &&
                    _this.addStatus.id === status.id) {
                    _this.statusForm.setValue(status);
                }
            });
        });
    };
    BillformComponent.prototype.overlayZindex = function () {
        var sdk = document.getElementsByClassName('cdk-overlay-container');
        sdk[0].setAttribute('style', 'z-index:1056');
    };
    BillformComponent.prototype.ngOnDestroy = function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    BillformComponent.prototype.getBillOfUser = function (item) {
        // this.fbills = []
        var _this = this;
        var filterFBill = {
            include: [
                {
                    relation: 'bill'
                },
                // {
                //   relation: 'user'
                // },
                {
                    statusOfForeignBill: ['stores', 'status']
                }
            ],
            where: {
                userName: item.name,
                isHidden: false,
                pickDate: this.filterPickTime || undefined
            }
        };
        this.foreignBillApi.find(filterFBill).subscribe(function (data) {
            _this.fbills = data;
            // data.forEach((it: ForeignBill) => {
            //   if (!it.isHidden && !it.billsId) {
            //     this.fbills.push(it);
            //   }
            // })
            _this.foreignBillForm.setValue(_this.fbills.filter(function (fbill) {
                if (_this.bill.foreignBill &&
                    _this.bill.foreignBill.find(function (foreignBill) { return foreignBill.id === fbill.id; })) {
                    return fbill;
                }
            }));
            _this.filteredForeignBillForm.next(_this.fbills.slice());
            _this.foreignBillFormFilterCtrl.valueChanges
                .pipe(takeUntil(_this._onDestroy))
                .subscribe(function () {
                _this.filterForeignBillMulti();
            });
        });
        // if (item.foreignBill) {
        // }
    };
    BillformComponent.prototype.setInitialValue = function () {
        var _this = this;
        this.filteredUserForm
            .pipe(take(1), takeUntil(this._onDestroy))
            .subscribe(function () {
            _this.multiSelect.compareWith = function (a, b) { return a && b && a.id === b.id; };
        });
        this.filteredShipBrandForm
            .pipe(take(1), takeUntil(this._onDestroy))
            .subscribe(function () {
            _this.multiSelect.compareWith = function (a, b) { return a && b && a.id === b.id; };
        });
        this.filteredShipperForm
            .pipe(take(1), takeUntil(this._onDestroy))
            .subscribe(function () {
            _this.multiSelect.compareWith = function (a, b) { return a && b && a.id === b.id; };
        });
        this.filteredForeignBillForm
            .pipe(take(1), takeUntil(this._onDestroy))
            .subscribe(function () {
            _this.multiSelect.compareWith = function (a, b) { return a && b && a.id === b.id; };
        });
    };
    BillformComponent.prototype.filterUserMulti = function () {
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
    BillformComponent.prototype.filterShipBrandMulti = function () {
        if (!this.shipbrands) {
            return;
        }
        var search = this.shipBrandFormFilterCtrl.value;
        if (!search) {
            this.filteredShipBrandForm.next(this.shipbrands.slice());
            return;
        }
        else {
            search = search.toLowerCase();
        }
        this.filteredShipBrandForm.next(this.shipbrands.filter(function (bank) { return bank.name.toLowerCase().indexOf(search) > -1; }));
    };
    BillformComponent.prototype.filterShipperMulti = function () {
        if (!this.shippers) {
            return;
        }
        var search = this.shipperFormFilterCtrl.value;
        if (!search) {
            this.filteredShipperForm.next(this.shippers.slice());
            return;
        }
        else {
            search = search.toLowerCase();
        }
        this.filteredShipperForm.next(this.shippers.filter(function (bank) { return bank.name.toLowerCase().indexOf(search) > -1; }));
    };
    BillformComponent.prototype.filterForeignBillMulti = function () {
        if (!this.shippers) {
            return;
        }
        var search = this.shipperFormFilterCtrl.value;
        if (!search) {
            this.filteredShipperForm.next(this.shippers.slice());
            return;
        }
        else {
            search = search.toLowerCase();
        }
        this.filteredShipperForm.next(this.shippers.filter(function (bank) { return bank.name.toLowerCase().indexOf(search) > -1; }));
    };
    BillformComponent.prototype.ngAfterViewInit = function () {
        this.setInitialValue();
    };
    BillformComponent.prototype.upsertBill = function (form) {
        return __awaiter(this, void 0, void 0, function () {
            var fbillRemove, observable, statusRaw, mess;
            var _this = this;
            return __generator(this, function (_a) {
                if (form.invalid) {
                    this.notifierService.error('Chưa điền đủ thông tin');
                    return [2 /*return*/];
                }
                this.bill.userId = this.userBill.id;
                this.bill.userCode = this.userBill.userCode;
                this.bill.code = this.bill.code.toUpperCase();
                fbillRemove = _.differenceBy(this.fbillRaw, this.foreignBill, 'id');
                if (this.bill.id) {
                    statusRaw = this.bill.statusOfBill[this.bill.statusOfBill.length - 1].status;
                    if (statusRaw.statusGroupId <= this.addStatus.statusGroupId) {
                        if (this.isRoleSuperAdmin) {
                            observable = this.billApi.patchAttributes(this.bill.id, this.bill);
                        }
                        else {
                            observable = this.billApi.patchAttributes(this.bill.id, this.bill);
                        }
                    }
                    else {
                        mess = "Kh\u00F4ng th\u1EC3 th\u1EF1c hi\u1EC7n ".concat(this.addStatus.name, " sau ").concat(statusRaw.name, "!");
                        this.notifierService.error(mess);
                        return [2 /*return*/];
                    }
                    observable
                        .pipe(flatMap(function (bill) {
                        var billStatusSubs = [];
                        _this.foreignBill.forEach(function (item) {
                            item.billsId = _this.bill.id;
                            item.billId = _this.bill.id;
                            var rawFbill = new StatusOfForeignBill();
                            rawFbill.foreignBillId = item.id;
                            rawFbill.statusId = _this.addStatus.id;
                            // rawFbill.storesId = item.statusOfForeignBill[item.statusOfForeignBill.length - 1].storesId
                            billStatusSubs.push(_this.foreignBillApi.patchAttributes(item.id, item));
                            billStatusSubs.push(_this.statusOfForeignBillApi.create([rawFbill]));
                        });
                        fbillRemove.forEach(function (item) {
                            item.billsId = null;
                            billStatusSubs.push(_this.foreignBillApi.patchAttributes(item.id, item));
                        });
                        var temp = new StatusOfBill();
                        temp.billsId = bill.id;
                        temp.statusId = _this.addStatus.id;
                        if (_this.addStatus.id != 3 && _this.currentAccount.storesId) {
                            temp.storesId = _this.currentAccount.storesId;
                        }
                        else
                            temp.storesId = null;
                        billStatusSubs.push(_this.statusOfBillApi.create([temp]));
                        if (billStatusSubs.length > 0) {
                            return zip.apply(void 0, billStatusSubs);
                        }
                        else {
                            return of(true);
                        }
                    }))
                        .subscribe(function () {
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
                }
                return [2 /*return*/];
            });
        });
    };
    BillformComponent.prototype.cancel = function () {
        this.onResult.emit({
            isCancelled: true,
        });
        this.bsModalRef.hide();
    };
    BillformComponent.prototype.compareById = function (item1, item2) {
        return item1 && item2 && (item1.id === item2.id || item1 === item2);
    };
    BillformComponent.prototype.compareByName = function (item1, item2) {
        return item1 && item2
            ? item1.toLowerCase() === item2.toLowerCase()
            : (item2 = item1);
    };
    __decorate([
        Input(),
        __metadata("design:type", Bills)
    ], BillformComponent.prototype, "bill", void 0);
    __decorate([
        ViewChild('multiSelect', { static: true }),
        __metadata("design:type", MatSelect)
    ], BillformComponent.prototype, "multiSelect", void 0);
    BillformComponent = __decorate([
        Component({
            selector: 'app-billform',
            templateUrl: './billform.component.html',
            styleUrls: ['./billform.component.scss']
        }),
        __metadata("design:paramtypes", [BsModalRef,
            LoopBackAuth,
            UserApi,
            StatusApi,
            ShipBrandApi,
            ForeignBillApi,
            ShipperApi,
            StatusOfBillApi,
            StatusOfForeignBillApi,
            NotificationWrapperService,
            BillsApi,
            NgxSpinnerService])
    ], BillformComponent);
    return BillformComponent;
}());
export { BillformComponent };
//# sourceMappingURL=billform.component.js.map