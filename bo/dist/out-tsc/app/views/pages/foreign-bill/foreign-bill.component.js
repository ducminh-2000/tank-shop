import { __assign, __decorate, __metadata } from "tslib";
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, of, zip } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { Account, ForeignBill, LoopBackAuth, StatusOfForeignBill } from 'src/app/api';
import { ForeignBillApi, StatusApi, StatusOfForeignBillApi, StoresApi } from 'src/app/api/services/custom';
import { PAGE_SIZE } from 'src/app/core/constant/constant';
import { DeleteDialogComponent } from 'src/app/core/dialogs/delete-dialog/delete-dialog.component';
import { DownloadFileService } from 'src/app/core/services/download-file.service';
import { ExportFileService } from 'src/app/core/services/export-file.service';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
import { ForeignBillFormComponent } from './foreign-bill-form/foreign-bill-form.component';
import { HistoryForeignBillComponent } from './history-foreign-bill/history-foreign-bill.component';
import { PopupExportComponent } from './popup-export/popup-export.component';
import { PopupImportComponent } from './popup-import/popup-import.component';
import { PopupUpdatePickDateComponent } from './popup-update-pick-date/popup-update-pick-date.component';
import { PopupUpdateStatusComponent } from './popup-update-status/popup-update-status.component';
import { PopupUpdateUsercodeComponent } from './popup-update-usercode/popup-update-usercode.component';
var ForeignBillComponent = /** @class */ (function () {
    function ForeignBillComponent(foreignBillApi, statusOfForeignBillApi, statusApi, storeApi, route, router, auth, httpClient, notifierService, changeDetectorRef, translateService, bsModalService, spinner, notificationWrapperService, bsModalRef, downloadService, exportService) {
        this.foreignBillApi = foreignBillApi;
        this.statusOfForeignBillApi = statusOfForeignBillApi;
        this.statusApi = statusApi;
        this.storeApi = storeApi;
        this.route = route;
        this.router = router;
        this.auth = auth;
        this.httpClient = httpClient;
        this.notifierService = notifierService;
        this.changeDetectorRef = changeDetectorRef;
        this.translateService = translateService;
        this.bsModalService = bsModalService;
        this.spinner = spinner;
        this.notificationWrapperService = notificationWrapperService;
        this.bsModalRef = bsModalRef;
        this.downloadService = downloadService;
        this.exportService = exportService;
        this.statusForm = new FormControl();
        this.storeForm = new FormControl();
        this.datas = new Account();
        this.typeCurrentUser = 0;
        this.userLogin = new Account();
        this.isValidate = false;
        this.search = '';
        this.imageTmp = '';
        this.listBill = [];
        this.listBillTotal = [];
        this.PAGE_SIZE = PAGE_SIZE;
        this.selectPageSize = '5';
        this.isShowLoading = false;
        this.deleteValue = [];
        this.isCheckbox = false;
        this.isRoleAdmin = false;
        this.filterTrackingNumber = '';
        this.filterGrade = 0;
        this.isRoleSuperAdmin = false;
        this.checkAll = false;
        this.filterRole = '';
        this.statuses = [];
        this.stores = [];
    }
    ForeignBillComponent.prototype.ngOnInit = function () {
        this.userLogin = this.auth.getCurrentUserData();
        this.isRoleSuperAdmin = this.userLogin.roles[0].name === 'SUPERADMIN';
        this.isRoleAdmin = this.userLogin.roles[0].name === 'ADMIN';
        this.selectedItems = new Map();
        this.onResult = new EventEmitter();
        this.getBillOfStores();
        this.setStatus();
        this.getInit();
    };
    ForeignBillComponent.prototype.getInit = function () {
        var _this = this;
        var filter = {
            include: [
                {
                    relation: 'group'
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
        forkJoin(this.statusApi.find(filter), this.storeApi.find())
            .subscribe(function (data) {
            _this.statuses = data[0];
            _this.stores = data[1];
            // data.map((it: Status) => {
            //   if (it.group && (parseInt(it.group.order) == 2 || parseInt(it.group.order) >= 4)) {
            //     console.log(it)
            //     this.statuses.push(it);
            //   }
            // })
        });
    };
    ForeignBillComponent.prototype.updateStatus = function () {
        if (this.selectedItems.size === 0) {
            this.notifierService.warning(this.translateService.instant('Chưa có bản ghi được chọn'));
        }
        else {
            this.updateItems(Array.from(this.selectedItems.values()));
        }
    };
    ForeignBillComponent.prototype.exportFile = function () {
        if (this.selectedItems.size === 0) {
            this.notifierService.warning(this.translateService.instant('Chưa có bản ghi được chọn'));
        }
        else {
            this.exportItems(Array.from(this.selectedItems.values()));
        }
    };
    ForeignBillComponent.prototype.exportItems = function (bills) {
        var _this = this;
        var modalRef = this.bsModalService.show(PopupExportComponent, {
            initialState: {
                bills: bills
            },
            class: 'modal-lg'
        });
        modalRef.content.onResult.subscribe(function (result) {
            if (!result.isCancelled) {
                _this.getBillOfStores(PAGE_SIZE * (_this.currentPage - 1));
            }
        });
    };
    ForeignBillComponent.prototype.overlayZindex = function () {
        var sdk = document.getElementsByClassName('cdk-overlay-container');
        sdk[0].setAttribute('style', 'z-index:1056');
    };
    ForeignBillComponent.prototype.showUpdateStatus = function () {
        if (this.selectedItems.size === 0) {
            this.notifierService.warning(this.translateService.instant('Chưa có bản ghi được chọn'));
        }
        else {
            this.updateStatusItems(Array.from(this.selectedItems.values()));
        }
    };
    ForeignBillComponent.prototype.showUpdatePickDate = function () {
        if (this.selectedItems.size === 0) {
            this.notifierService.warning(this.translateService.instant('Chưa có bản ghi được chọn'));
        }
        else {
            this.updatePickDateItems(Array.from(this.selectedItems.values()));
        }
    };
    ForeignBillComponent.prototype.updateStatusItems = function (bills) {
        var _this = this;
        var modalRef = this.bsModalService.show(PopupUpdateStatusComponent, {
            initialState: {
                bills: bills
            },
            class: 'modal-lg'
        });
        modalRef.content.onResult.subscribe(function (result) {
            if (!result.isCancelled) {
                _this.getBillOfStores();
            }
        });
    };
    ForeignBillComponent.prototype.updatePickDateItems = function (bills) {
        var _this = this;
        var modalRef = this.bsModalService.show(PopupUpdatePickDateComponent, {
            initialState: {
                bills: bills
            },
            class: 'modal-lg'
        });
        modalRef.content.onResult.subscribe(function (result) {
            if (!result.isCancelled) {
                _this.getBillOfStores(PAGE_SIZE * (_this.currentPage - 1));
            }
        });
    };
    ForeignBillComponent.prototype.showUpdateUser = function () {
        if (this.selectedItems.size === 0) {
            this.notifierService.warning(this.translateService.instant('Chưa có bản ghi được chọn'));
        }
        else {
            this.updateUserItems(Array.from(this.selectedItems.values()));
        }
    };
    ForeignBillComponent.prototype.updateUserItems = function (bills) {
        var _this = this;
        var modalRef = this.bsModalService.show(PopupUpdateUsercodeComponent, {
            initialState: {
                bills: bills
            },
            class: 'modal-lg'
        });
        modalRef.content.onResult.subscribe(function (result) {
            if (!result.isCancelled) {
                _this.getBillOfStores(PAGE_SIZE * (_this.currentPage - 1));
            }
        });
    };
    ForeignBillComponent.prototype.updateItems = function (bills) {
        var _this = this;
        var modalRef = this.bsModalService.show(DeleteDialogComponent, {
            initialState: {
                title: this.translateService.instant('Cập nhật đồng bộ tracking'),
                content: this.translateService.instant('Bạn có chắc chắn muốn cập nhật các bản ghi đã chọn')
            }
        });
        modalRef.content.onClose.subscribe(function (result) {
            if (result) {
                var data = [];
                var errorData_1 = [];
                if (_this.generalStatus != undefined) {
                    for (var _i = 0, bills_1 = bills; _i < bills_1.length; _i++) {
                        var bill = bills_1[_i];
                        var statusRaw = bill.statusOfForeignBill[bill.statusOfForeignBill.length - 1]
                            .status;
                        var store = bill.statusOfForeignBill[bill.statusOfForeignBill.length - 1]
                            .stores;
                        console.log(store);
                        var raw = new StatusOfForeignBill();
                        raw.foreignBillId = bill.id;
                        raw.statusId = _this.generalStatus.id;
                        raw.storesId = store.id;
                        console.log(raw);
                        if (statusRaw.statusGroupId <= _this.generalStatus.statusGroupId) {
                            data.push(raw);
                        }
                        else
                            errorData_1.push(raw);
                    }
                    _this.statusOfForeignBillApi.createArray(data).subscribe(function () {
                        _this.getBillOfStores(_this.PAGE_SIZE * (_this.currentPage - 1));
                        if (errorData_1.length > 0) {
                            var mess = "C\u00F3 ".concat(errorData_1.length, " b\u1EA3n ghi b\u1EA1n ch\u1ECDn kh\u00F4ng th\u1ECFa m\u00E3n, vui l\u00F2ng c\u1EADp nh\u1EADt l\u1EA7n l\u01B0\u1EE3t!");
                            _this.notifierService.warning(_this.translateService.instant(mess));
                        }
                        else {
                            _this.notifierService.success(_this.translateService.instant('Thành công'));
                        }
                    }, function (error) {
                        _this.notifierService.error(_this.translateService.instant('Thất bại'));
                    });
                }
                else {
                    var ob = [];
                    for (var _a = 0, bills_2 = bills; _a < bills_2.length; _a++) {
                        var bill = bills_2[_a];
                        bill.pickDate = _this.pickDate;
                        ob.push(_this.foreignBillApi.patchAttributes(bill.id, bill));
                    }
                    if (ob.length < 1) {
                        return;
                    }
                    else {
                        forkJoin(ob).subscribe(function (data) {
                            console.log(data);
                        }, function (error) {
                            console.log(error);
                        });
                    }
                    console.log(_this.pickDate);
                }
            }
        });
    };
    ForeignBillComponent.prototype.getBillOfStores = function (skip, limit) {
        var _this = this;
        if (skip === void 0) { skip = 0; }
        if (limit === void 0) { limit = this.PAGE_SIZE; }
        this.listBill = [];
        this.listBillTotal = [];
        this.storeId = this.route.snapshot.params['id']
            ? this.route.snapshot.params['id']
            : 0;
        if (this.isRoleSuperAdmin) {
            if (skip <= 0) {
                skip = 0;
                this.currentPage = 1;
            }
            var whereFilter = void 0;
            if (this.isRoleSuperAdmin) {
                whereFilter = {
                    and: [
                        {
                            code: this.filterTrackingNumber ? {
                                like: "%".concat(this.filterTrackingNumber, "%")
                            } : undefined
                        },
                        {
                            isHidden: false
                        },
                        {
                            pickDate: this.filterPickTime || undefined
                        }
                    ]
                };
            }
            else {
                whereFilter = {};
            }
            var filter = {
                include: [
                    // {
                    //   relation: 'user',
                    // },
                    {
                        relation: 'statuses'
                    },
                    {
                        relation: 'stores'
                    },
                    {
                        statusOfForeignBill: [
                            'stores',
                            'status'
                        ]
                    }
                ],
                where: whereFilter,
                limit: limit,
                skip: skip,
                order: ['pickDate DESC']
            };
            // console.log(this.filterPickTime);
            var filterAll = {
                include: [
                    // {
                    //   relation: 'user',
                    // },
                    {
                        relation: 'statuses'
                    },
                    {
                        relation: 'stores'
                    },
                    {
                        statusOfForeignBill: [
                            'stores',
                            'status'
                        ]
                    }
                ],
                where: whereFilter,
                order: ['createdAt DESC']
            };
            this.spinner.show().then().catch();
            this.selectedItems.clear();
            this.checkAll = false;
            this.isCheckbox = this.selectedItems.size !== 0;
            forkJoin(this.foreignBillApi.find(filter), this.foreignBillApi.count(filterAll.where), this.foreignBillApi.find(filterAll)).subscribe(function (data) {
                _this.spinner.hide().then().catch();
                if (_this.storeId === 0) {
                    _this.listBill = data[0];
                    _this.listBillTotal = data[2];
                }
                else {
                    data[0].map(function (item) {
                        if (item.statusOfForeignBill[item.statusOfForeignBill.length - 1]
                            .stores &&
                            item.statusOfForeignBill[item.statusOfForeignBill.length - 1]
                                .storesId == _this.storeId) {
                            _this.listBill.push(item);
                        }
                    });
                    data[2].map(function (item) {
                        if (item.statusOfForeignBill[item.statusOfForeignBill.length - 1]
                            .stores &&
                            item.statusOfForeignBill[item.statusOfForeignBill.length - 1]
                                .storesId == _this.storeId) {
                            _this.listBillTotal.push(item);
                        }
                    });
                }
                _this.totalItems = _this.listBillTotal.length;
                _this.changeDetectorRef.detectChanges();
            }, function (error) {
                _this.spinner.hide().then().catch();
                console.log('error', error);
                _this.changeDetectorRef.detectChanges();
                _this.notificationWrapperService.error(error.message || 'message.error');
            });
        }
        else {
            if (skip <= 0) {
                skip = 0;
                this.currentPage = 1;
            }
            var filter = {
                include: [
                    {
                        relation: 'statuses'
                    },
                    {
                        relation: 'stores',
                        field: ['id', 'code'],
                        scope: {
                            where: {
                                storesId: 1
                            }
                        }
                    },
                    {
                        statusOfForeignBill: ['stores', 'status']
                    },
                ],
                where: {
                    and: [
                        {
                            code: this.filterTrackingNumber ? {
                                like: "%".concat(this.filterTrackingNumber, "%")
                            } : undefined
                        },
                        {
                            isHidden: false
                        },
                        {
                            pickDate: this.filterPickTime || undefined
                        },
                    ]
                },
                order: ['createdAt DESC']
            };
            this.spinner.show().then().catch();
            this.selectedItems.clear();
            this.checkAll = false;
            this.isCheckbox = this.selectedItems.size !== 0;
            forkJoin(this.foreignBillApi.find(filter), this.foreignBillApi.count(filter.where), this.foreignBillApi.find(filter)).subscribe(function (data) {
                _this.spinner.hide().then().catch();
                data[0].map(function (item) {
                    if (item.statusOfForeignBill[item.statusOfForeignBill.length - 1]
                        .stores &&
                        item.statusOfForeignBill[item.statusOfForeignBill.length - 1]
                            .storesId == _this.userLogin.storesId) {
                        _this.listBill.push(item);
                    }
                });
                data[2].map(function (item) {
                    if (item.statusOfForeignBill[item.statusOfForeignBill.length - 1]
                        .stores &&
                        item.statusOfForeignBill[item.statusOfForeignBill.length - 1]
                            .storesId == _this.userLogin.storesId) {
                        _this.listBillTotal.push(item);
                    }
                });
                _this.totalItems = _this.listBill.length;
                _this.changeDetectorRef.detectChanges();
            }, function (error) {
                _this.spinner.hide().then().catch();
                console.log('error', error);
                _this.changeDetectorRef.detectChanges();
                _this.notificationWrapperService.error(error.message || 'message.error');
            });
        }
    };
    ForeignBillComponent.prototype.setStatus = function () {
        var _this = this;
        var filterOne = {
            where: {
                order: 1
            }
        };
        this.statusApi.findOne(filterOne).subscribe(function (data) {
            _this.addStatus = data;
        });
    };
    ForeignBillComponent.prototype.changePage = function () {
        this.getBillOfStores(this.PAGE_SIZE * (this.currentPage - 1));
    };
    ForeignBillComponent.prototype.updateList = function () {
        this.PAGE_SIZE = +this.selectPageSize;
        this.getBillOfStores(this.PAGE_SIZE * (this.currentPage - 1));
    };
    ForeignBillComponent.prototype.toggleCheckItems = function (bill, checked) {
        if (checked) {
            this.selectedItems.set(bill.id + '', bill);
        }
        else {
            this.selectedItems.delete(bill.id + '');
            this.checkAll = false;
        }
    };
    ForeignBillComponent.prototype.toggleCheckAll = function (bills, checked) {
        var _this = this;
        if (checked) {
            bills.forEach(function (it) {
                _this.selectedItems.set(it.id + '', it);
            });
        }
        else {
            bills.forEach(function (it) {
                _this.selectedItems.delete(it.id + '');
            });
        }
        this.checkAll = true;
        this.isCheckbox = this.selectedItems.size !== 0;
    };
    ForeignBillComponent.prototype.showAddItemModal = function () {
        var bill = new ForeignBill();
        this.showCRUDItemModal(bill, 1);
    };
    ForeignBillComponent.prototype.showEditItemModal = function (item) {
        var itemToEdit = Object.assign({}, item);
        this.showCRUDItemModal(itemToEdit, 1);
    };
    ForeignBillComponent.prototype.showHistory = function (item) {
        var itemToEdit = Object.assign({}, item);
        this.showCRUDItemModal(itemToEdit, 2);
    };
    ForeignBillComponent.prototype.duplicateBill = function (bill) {
        var _this = this;
        bill.code = (Math.random() * 100000000).toFixed();
        bill.billsId = null;
        bill.billId = null;
        var store = bill.statusOfForeignBill[bill.statusOfForeignBill.length - 1].stores;
        var tmp = __assign({}, bill);
        delete tmp.id;
        var observable;
        observable = this.foreignBillApi.create(tmp);
        observable
            .pipe(flatMap(function (item) {
            var billStatusSubs = [];
            var raw = new StatusOfForeignBill();
            raw.foreignBillId = item.id;
            raw.statusId = _this.addStatus.id;
            raw.storesId = store.id;
            billStatusSubs.push(_this.statusOfForeignBillApi.createArray([raw]));
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
                isCancelled: false
            });
            _this.bsModalRef.hide();
            _this.notifierService.success('Thành công!');
            _this.getBillOfStores();
        }, function (error) {
            _this.spinner.hide().then().catch();
            _this.notifierService.error(error.message);
        });
    };
    ForeignBillComponent.prototype.showCRUDItemModal = function (bill, option) {
        var _this = this;
        if (option == 3) {
            var modalRef = this.bsModalService.show(PopupImportComponent, {
                initialState: {
                    bill: bill
                },
                class: 'modal-lg'
            });
            modalRef.content.onResult.subscribe(function (result) {
                if (!result.isCancelled) {
                    _this.getBillOfStores(PAGE_SIZE * (_this.currentPage - 1));
                }
            });
        }
        if (option == 2) {
            var modalRef = this.bsModalService.show(HistoryForeignBillComponent, {
                initialState: {
                    bill: bill
                },
                class: 'modal-lg'
            });
            modalRef.content.onResult.subscribe(function (result) {
                if (!result.isCancelled) {
                    _this.getBillOfStores(PAGE_SIZE * (_this.currentPage - 1));
                }
            });
        }
        if (option == 1) {
            if (bill.id) {
                var modalRef = this.bsModalService.show(ForeignBillFormComponent, {
                    initialState: {
                        foreignBill: bill
                    },
                    class: 'modal-lg'
                });
                modalRef.content.onResult.subscribe(function (result) {
                    if (!result.isCancelled) {
                        _this.getBillOfStores(PAGE_SIZE * (_this.currentPage - 1));
                    }
                });
            }
            else {
                this.router.navigate(['/foreign-bill/add-bill']);
            }
        }
    };
    ForeignBillComponent.prototype.deleteItem = function (bill) {
        this.deleteItems([bill]);
    };
    ForeignBillComponent.prototype.deleteMultipleItems = function () {
        if (this.selectedItems.size === 0) {
            this.notifierService.warning(this.translateService.instant('Chưa có bản ghi được chọn'));
        }
        else {
            this.deleteItems(Array.from(this.selectedItems.values()));
        }
    };
    ForeignBillComponent.prototype.deleteItems = function (bills) {
        var _this = this;
        var modalRef = this.bsModalService.show(DeleteDialogComponent, {
            initialState: {
                title: this.translateService.instant('Xóa Tracking'),
                content: this.translateService.instant('Bạn có chắc chắn muốn xóa các bản ghi đã chọn')
            }
        });
        modalRef.content.onClose.subscribe(function (result) {
            if (result) {
                forkJoin(bills.map(function (bill) {
                    bill.isHidden = true;
                    bill.code = bill.id.toFixed();
                    bill.billsId = null;
                    bill.billId = null;
                    return _this.foreignBillApi.patchAttributes(bill.id, bill);
                })).subscribe(function (results) {
                    _this.getBillOfStores(_this.PAGE_SIZE * (_this.currentPage - 1));
                    _this.notifierService.success(_this.translateService.instant('Xóa thành công'));
                }, function (error) {
                    _this.notifierService.error(_this.translateService.instant('Xóa thất bại'));
                });
            }
        });
    };
    ForeignBillComponent.prototype.showImport = function () {
        this.showCRUDItemModal(undefined, 3);
    };
    __decorate([
        ViewChild('multiSelect', { static: true }),
        __metadata("design:type", MatSelect)
    ], ForeignBillComponent.prototype, "multiSelect", void 0);
    ForeignBillComponent = __decorate([
        Component({
            selector: 'app-foreign-bill',
            templateUrl: './foreign-bill.component.html',
            styleUrls: ['./foreign-bill.component.scss']
        }),
        __metadata("design:paramtypes", [ForeignBillApi,
            StatusOfForeignBillApi,
            StatusApi,
            StoresApi,
            ActivatedRoute,
            Router,
            LoopBackAuth,
            HttpClient,
            NotificationWrapperService,
            ChangeDetectorRef,
            TranslateService,
            BsModalService,
            NgxSpinnerService,
            NotificationWrapperService,
            BsModalRef,
            DownloadFileService,
            ExportFileService])
    ], ForeignBillComponent);
    return ForeignBillComponent;
}());
export { ForeignBillComponent };
//# sourceMappingURL=foreign-bill.component.js.map