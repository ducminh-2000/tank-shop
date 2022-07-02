import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { of, ReplaySubject, Subject, zip } from 'rxjs';
import { flatMap, take, takeUntil } from 'rxjs/operators';
import { Account, Bills, User, Status, StatusOfBill, ShipBrand, Shipper, StatusOfForeignBill } from 'src/app/api/models';
import { LoopBackAuth } from 'src/app/api/services/core';
import { BillsApi, ForeignBillApi, ShipBrandApi, ShipperApi, StatusApi, StatusOfBillApi, StatusOfForeignBillApi, UserApi } from 'src/app/api/services/custom';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
var AddbillComponent = /** @class */ (function () {
    function AddbillComponent(bsModalRef, auth, userApi, statusApi, shipBrandApi, foreignBillApi, shipperApi, router, statusOfBillApi, statusOfForeignBillApi, notifierService, billApi, spinner) {
        this.bsModalRef = bsModalRef;
        this.auth = auth;
        this.userApi = userApi;
        this.statusApi = statusApi;
        this.shipBrandApi = shipBrandApi;
        this.foreignBillApi = foreignBillApi;
        this.shipperApi = shipperApi;
        this.router = router;
        this.statusOfBillApi = statusOfBillApi;
        this.statusOfForeignBillApi = statusOfForeignBillApi;
        this.notifierService = notifierService;
        this.billApi = billApi;
        this.spinner = spinner;
        this.bill = new Bills();
        this.roles = [];
        this.currentAccount = new Account();
        this.isRoleAdmin = false;
        this.isRoleSuperAdmin = false;
        this.admins = [];
        this.statusOfBill = new StatusOfBill();
        this.statuses = [];
        this.fbills = [];
        this.users = [];
        this.shipbrands = [];
        this.shippers = [];
        this.listBill = [];
        this.listBillCurrent = [];
        this.isSubmitted = false;
        this.addStatus = new Status();
        this.foreignBill = [];
        this.userBill = new User();
        this.shipBrand = new ShipBrand();
        this.shipper = new Shipper();
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
    AddbillComponent.prototype.ngOnInit = function () {
        this.currentAccount = this.auth.getCurrentUserData();
        this.isRoleSuperAdmin =
            this.currentAccount.roles[0].name === 'SUPERADMIN' ||
                this.currentAccount.roles[0].name === 'ADMIN';
        this.isRoleAdmin = this.currentAccount.roles[0].name === 'ADMIN';
        this.onResult = new EventEmitter();
        this.statusRaw = new Map();
        this.fbillRaw = new Map();
        this.initData();
    };
    AddbillComponent.prototype.initData = function () {
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
            include: [
                {
                    relation: "group"
                }
            ],
            where: {
                and: [
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
        zip(this.billApi.find(), this.statusApi.find(filter), this.userApi.find(), this.shipBrandApi.find(), this.shipperApi.find(), this.statusApi.find(filterOne)).subscribe(function (_a) {
            var bills = _a[0], statuses = _a[1], users = _a[2], shipBrands = _a[3], shippers = _a[4], statusOne = _a[5];
            _this.statuses = statuses;
            _this.listBillCurrent = bills;
            _this.shipbrands = shipBrands;
            _this.shippers = shippers;
            _this.users = users;
            _this.addStatus = statusOne[0];
            _this.users.filter(function (user) {
                if (_this.bill.user && _this.bill.user.id === user.id) {
                    _this.userForm.setValue(user);
                    console.log(_this.bill);
                }
            });
            _this.filteredUserForm.next(_this.users.slice());
            _this.userFormFilterCtrl.valueChanges
                .pipe(takeUntil(_this._onDestroy))
                .subscribe(function () {
                _this.filterUserMulti();
                _this.bill.phone = _this.userBill.phoneNumber;
                _this.bill.to = _this.userBill.address;
                _this.bill.recive = _this.userBill.name;
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
                    _this.bill.statuses.find(function (it) { return it.id === status.id; })) {
                    _this.statusForm.setValue(status);
                }
            });
        });
    };
    AddbillComponent.prototype.overlayZindex = function () {
        var sdk = document.getElementsByClassName('cdk-overlay-container');
        sdk[0].setAttribute('style', 'z-index:1056');
    };
    AddbillComponent.prototype.ngOnDestroy = function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    AddbillComponent.prototype.getBillOfUser = function (item) {
        var _this = this;
        // this.fbills = []
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
    AddbillComponent.prototype.setInitialValue = function () {
        var _this = this;
        this.filteredUserForm
            .pipe(take(1), takeUntil(this._onDestroy))
            .subscribe(function () {
            _this.multiSelect.compareWith = function (a, b) { return a && b && a.id === b.id; };
        });
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
    AddbillComponent.prototype.filterUserMulti = function () {
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
    AddbillComponent.prototype.filterShipBrandMulti = function () {
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
    AddbillComponent.prototype.filterShipperMulti = function () {
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
    AddbillComponent.prototype.filterForeignBillMulti = function () {
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
    AddbillComponent.prototype.ngAfterViewInit = function () {
        this.setInitialValue();
    };
    AddbillComponent.prototype.addBillToList = function (bill, form) {
        this.isSubmitted = true;
        if (form.invalid || this.userBill.id == undefined || this.shipBrand.id == undefined || this.addStatus.id == undefined) {
            this.notifierService.warning('Chưa điền đủ thông tin!');
            return;
        }
        console.log(bill);
        var tmp = Object.assign({}, bill);
        tmp.userId = this.userBill.id;
        tmp.shipBrand = this.shipBrand;
        tmp.userCode = this.userBill.userCode;
        var check = true;
        this.listBillCurrent.filter(function (item) {
            if (item.code === tmp.code) {
                check = false;
            }
        });
        this.listBill.filter(function (item) {
            if (item.code === tmp.code) {
                check = false;
            }
        });
        if (check) {
            this.listBill.push(tmp);
            this.statusRaw.set(tmp.code, this.addStatus.id);
            this.fbillRaw.set(tmp.code, this.foreignBill);
            this.isSubmitted = false;
            console.log(this.fbillRaw);
        }
        else {
            this.notifierService.error("Mã đơn bị trùng");
        }
        // this.foreignBill = [];
    };
    AddbillComponent.prototype.removeBillFromList = function (index) {
        this.statusRaw.delete(this.listBill[index].code);
        this.fbillRaw.delete(this.listBill[index].code);
        this.listBill.splice(index, 1);
    };
    AddbillComponent.prototype.createBills = function () {
        var _this = this;
        if (this.listBill.length === 0) {
            this.notifierService.warning('Chưa có hóa đơn được tạo');
            return;
        }
        this.spinner.show().then().catch();
        var observable = [];
        for (var _i = 0, _a = this.listBill; _i < _a.length; _i++) {
            var bill = _a[_i];
            var createObservable = void 0;
            if (bill.id) {
                observable.push(this.billApi.linkStatuses(bill.id, this.addStatus.id));
            }
            else {
                bill.code = bill.code.toUpperCase();
                createObservable = this.billApi.create(bill);
            }
            observable.push(createObservable);
        }
        zip.apply(void 0, observable).pipe(flatMap(function (bills) {
            var sub = [];
            var _loop_1 = function (i) {
                var raw = _this.fbillRaw.get(bills[i].code);
                raw.forEach(function (item) {
                    item.billsId = bills[i].id;
                    item.billId = bills[i].id;
                    var rawFbill = new StatusOfForeignBill();
                    rawFbill.foreignBillId = item.id;
                    rawFbill.statusId = _this.statusRaw.get(bills[i].code);
                    rawFbill.storesId = item.statusOfForeignBill[item.statusOfForeignBill.length - 1].storesId;
                    sub.push(_this.foreignBillApi.patchAttributes(item.id, item));
                    sub.push(_this.statusOfForeignBillApi.create([rawFbill]));
                });
                var temp = new StatusOfBill();
                temp.billsId = bills[i].id;
                temp.statusId = _this.statusRaw.get(bills[i].code);
                sub.push(_this.statusOfBillApi.create([temp]));
            };
            for (var i = 0; i < _this.listBill.length; i++) {
                _loop_1(i);
            }
            if (sub.length > 0) {
                return zip.apply(void 0, sub);
            }
            else {
                return of(true);
            }
        })).subscribe(function (res) {
            _this.spinner.hide().then().catch();
            _this.onResult.emit({
                isCancelled: false,
            });
            _this.bsModalRef.hide();
            _this.notifierService.success('Thành công!');
            _this.router.navigate(['/bill']);
        }, function (error) {
            _this.spinner.hide().then().catch();
            if (error.details) {
                _this.notifierService.error("Mã đơn hàng bị trùng");
            }
            else
                _this.notifierService.error(error.message);
        });
    };
    AddbillComponent.prototype.cancel = function () {
        this.router.navigate(['/bill']);
    };
    AddbillComponent.prototype.compareById = function (item1, item2) {
        return item1 && item2 && (item1.id === item2.id || item1 === item2);
    };
    AddbillComponent.prototype.compareByName = function (item1, item2) {
        return item1 && item2
            ? item1.toLowerCase() === item2.toLowerCase()
            : (item2 = item1);
    };
    __decorate([
        ViewChild('multiSelect', { static: true }),
        __metadata("design:type", MatSelect)
    ], AddbillComponent.prototype, "multiSelect", void 0);
    AddbillComponent = __decorate([
        Component({
            selector: 'app-addbill',
            templateUrl: './addbill.component.html',
            styleUrls: ['./addbill.component.scss']
        }),
        __metadata("design:paramtypes", [BsModalRef,
            LoopBackAuth,
            UserApi,
            StatusApi,
            ShipBrandApi,
            ForeignBillApi,
            ShipperApi,
            Router,
            StatusOfBillApi,
            StatusOfForeignBillApi,
            NotificationWrapperService,
            BillsApi,
            NgxSpinnerService])
    ], AddbillComponent);
    return AddbillComponent;
}());
export { AddbillComponent };
//# sourceMappingURL=addbill.component.js.map