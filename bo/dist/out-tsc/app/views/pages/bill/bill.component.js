import { __decorate, __metadata } from "tslib";
import { ContainerApi, ForeignBillApi, StatusApi, StatusOfBillApi, StatusOfForeignBillApi } from 'src/app/api/services/custom';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, EventEmitter, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, of, zip } from 'rxjs';
import { Account, Bills, BillsApi, LoopBackAuth, Status, StatusOfBill } from 'src/app/api';
import { PAGE_SIZE } from 'src/app/core/constant/constant';
import { DeleteDialogComponent } from 'src/app/core/dialogs/delete-dialog/delete-dialog.component';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
import { BillformComponent } from './billform/billform.component';
import { HistoryComponent } from './history/history.component';
import { flatMap } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DownloadFileService } from 'src/app/core/services/download-file.service';
import { PopupExportXlsxComponent } from './popup-export-xlsx/popup-export-xlsx.component';
import { PopupUpdateStatusBillComponent } from './popup-update-status/popup-update-status.component';
import { ExportFileService } from 'src/app/core/services/export-file.service';
var BillComponent = /** @class */ (function () {
    function BillComponent(billApi, statusOfBillApi, statusApi, foreignBillApi, statusOfForeignBillApi, route, router, auth, notifierService, changeDetectorRef, translateService, bsModalService, spinner, notificationWrapperService, bsModalRef, httpClient, container, downloadService, exportService) {
        this.billApi = billApi;
        this.statusOfBillApi = statusOfBillApi;
        this.statusApi = statusApi;
        this.foreignBillApi = foreignBillApi;
        this.statusOfForeignBillApi = statusOfForeignBillApi;
        this.route = route;
        this.router = router;
        this.auth = auth;
        this.notifierService = notifierService;
        this.changeDetectorRef = changeDetectorRef;
        this.translateService = translateService;
        this.bsModalService = bsModalService;
        this.spinner = spinner;
        this.notificationWrapperService = notificationWrapperService;
        this.bsModalRef = bsModalRef;
        this.httpClient = httpClient;
        this.container = container;
        this.downloadService = downloadService;
        this.exportService = exportService;
        this.statusForm = new FormControl();
        this.datas = new Account();
        this.typeCurrentUser = 0;
        this.userLogin = new Account();
        this.isValidate = false;
        this.search = '';
        this.generalStatus = new Status();
        this.listBill = [];
        this.statuses = [];
        this.PAGE_SIZE = PAGE_SIZE;
        this.selectPageSize = '5';
        this.isShowLoading = false;
        this.deleteValue = [];
        this.isCheckbox = false;
        this.isRoleAdmin = false;
        this.filterUserName = '';
        this.filterUserCode = '';
        this.filterGrade = 0;
        this.isRoleSuperAdmin = false;
        this.checkAll = false;
        this.filterRole = '';
        this.filterPickDate = new Date(null);
    }
    BillComponent.prototype.ngOnInit = function () {
        this.userLogin = this.auth.getCurrentUserData();
        this.isRoleSuperAdmin = this.userLogin.roles[0].name === 'SUPERADMIN';
        this.isRoleAdmin = this.userLogin.roles[0].name === 'ADMIN';
        this.selectedItems = new Map();
        this.onResult = new EventEmitter();
        this.getBillOfStores();
        this.setStatus();
    };
    BillComponent.prototype.getBillOfStores = function (skip, limit) {
        var _this = this;
        if (skip === void 0) { skip = 0; }
        if (limit === void 0) { limit = this.PAGE_SIZE; }
        this.listBill = [];
        var filterStatus = {
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
        this.storeId = this.route.snapshot.params['id'] ? this.route.snapshot.params['id'] : '';
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
                            isHidden: {
                                like: 'false'
                            }
                        },
                        {
                            code: {
                                like: "%".concat(this.filterUserName, "%")
                            }
                        },
                        {
                            userCode: {
                                like: "%".concat(this.filterUserCode, "%")
                            }
                        },
                    ]
                };
            }
            else {
                whereFilter = {
                    and: [
                        {
                            isHidden: {
                                like: 'false'
                            }
                        },
                        {
                            code: {
                                like: "%".concat(this.filterUserName, "%")
                            }
                        },
                        {
                            userCode: {
                                like: "%".concat(this.filterUserCode, "%")
                            }
                        },
                    ]
                };
            }
            var filter = {
                include: [
                    {
                        relation: 'user',
                    },
                    {
                        relation: 'statuses',
                    },
                    {
                        relation: 'shipBrand',
                    },
                    {
                        foreignBill: [
                            {
                                statusOfForeignBill: ['stores', 'status']
                            },
                            // 'user'
                        ]
                    },
                    // {
                    //   relation: 'shipper',
                    // },
                    {
                        statusOfBill: ['stores', 'status']
                    }
                ],
                where: whereFilter,
                limit: limit,
                skip: skip,
                order: ['createdAt DESC'],
            };
            this.spinner.show().then().catch();
            this.selectedItems.clear();
            this.checkAll = false;
            this.isCheckbox = this.selectedItems.size !== 0;
            forkJoin(this.billApi.find(filter), this.billApi.count(whereFilter), this.statusApi.find(filterStatus)).subscribe(function (data) {
                _this.spinner.hide().then().catch();
                _this.listBill = data[0];
                console.log(data[0]);
                // data[0].map((item) => {
                //   if (!item.isHidden && (this.storeId == 0 ||
                //     (item.statusOfBill[0].stores && item.statusOfBill[0].stores.id == this.storeId))
                //   )
                //     this.listBill.push(item)
                // })
                _this.statuses = data[2];
                // data.map((it: Status) => {
                //   if (it.group && (parseInt(it.group.order) == 2 || parseInt(it.group.order) >= 4)) {
                //     console.log(it)
                //     this.statuses.push(it);
                //   }
                // })
                // if (this.filterUserCode) {
                //   const tmp = this.listBill;
                //   // console.log(tmp)
                //   this.listBill = [];
                //   for (let i = 0; i < tmp.length; i++) {
                //     if (tmp[i].user.userCode.includes(this.filterUserCode)) {
                //       this.listBill.push(tmp[i])
                //       // console.log(tmp[i])
                //     }
                //   }
                // }
                _this.totalItems = data[1].count;
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
                        relation: 'user',
                    },
                    {
                        relation: 'statuses',
                    },
                    {
                        relation: 'shipBrand',
                    },
                    {
                        relation: 'foreignBill',
                    },
                    // {
                    //   relation: 'shipper',
                    // },
                    {
                        statusOfBill: ['stores', 'status']
                    }
                ],
                order: ['createdAt DESC'],
            };
            this.spinner.show().then().catch();
            this.selectedItems.clear();
            this.checkAll = false;
            this.isCheckbox = this.selectedItems.size !== 0;
            this.billApi.find(filter).subscribe(function (bills) {
                _this.spinner.hide().then().catch();
                console.log(bills);
                bills.map(function (item) {
                    if (!item.isHidden &&
                        (item.statusOfBill[item.statusOfBill.length - 1].storesId == _this.userLogin.storesId))
                        _this.listBill.push(item);
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
    BillComponent.prototype.showUpdateStatus = function () {
        if (this.selectedItems.size === 0) {
            this.notifierService.warning(this.translateService.instant('Chưa có bản ghi được chọn'));
        }
        else {
            this.upsertListBill(Array.from(this.selectedItems.values()));
        }
    };
    BillComponent.prototype.upsertListBill = function (bills) {
        var _this = this;
        var modalRef = this.bsModalService.show(PopupUpdateStatusBillComponent, {
            initialState: {
                bills: bills,
            },
            class: 'modal-lg',
        });
        modalRef.content.onResult.subscribe(function (result) {
            if (!result.isCancelled) {
                _this.getBillOfStores(PAGE_SIZE * (_this.currentPage - 1));
            }
        });
    };
    BillComponent.prototype.overlayZindex = function () {
        var sdk = document.getElementsByClassName('cdk-overlay-container');
        sdk[0].setAttribute('style', 'z-index:1056');
    };
    BillComponent.prototype.setStatus = function () {
        var _this = this;
        var filterOne = {
            where: {
                order: 1
            }
        };
        this.statusApi.findOne(filterOne).subscribe(function (data) {
            _this.addStatus = data;
        }, function (err) {
            console.log(err);
            console.log('ters');
        });
    };
    BillComponent.prototype.changePage = function () {
        this.getBillOfStores(this.PAGE_SIZE * (this.currentPage - 1));
    };
    BillComponent.prototype.updateList = function () {
        this.PAGE_SIZE = +this.selectPageSize;
        this.getBillOfStores(this.PAGE_SIZE * (this.currentPage - 1));
    };
    BillComponent.prototype.toggleCheckItems = function (bill, checked) {
        if (checked) {
            this.selectedItems.set(bill.id, bill);
        }
        else {
            this.selectedItems.delete(bill.id);
            this.checkAll = false;
        }
    };
    BillComponent.prototype.toggleCheckAll = function (bills, checked) {
        var _this = this;
        if (checked) {
            bills.forEach(function (it) {
                _this.selectedItems.set(it.id, it);
            });
        }
        else {
            bills.forEach(function (it) {
                _this.selectedItems.delete(it.id);
            });
        }
        this.checkAll = true;
        this.isCheckbox = this.selectedItems.size !== 0;
    };
    BillComponent.prototype.showAddItemModal = function () {
        var bill = new Bills();
        this.showCRUDItemModal(bill, 1);
    };
    BillComponent.prototype.showEditItemModal = function (item) {
        var itemToEdit = Object.assign({}, item);
        this.showCRUDItemModal(itemToEdit, 1);
    };
    BillComponent.prototype.showHistory = function (item) {
        var itemToEdit = Object.assign({}, item);
        this.showCRUDItemModal(itemToEdit, 2);
    };
    BillComponent.prototype.duplicateBill = function (bill) {
        var _this = this;
        var temp = new Bills();
        temp.userId = bill.userId;
        temp.shipBrand = bill.shipBrand;
        temp.shipper = bill.shipper;
        temp.shipmentCode = bill.shipmentCode;
        temp.weight = bill.weight;
        temp.code = (Math.random() * 1000000).toFixed();
        temp.to = bill.to;
        temp.userCode = bill.userCode;
        temp.recive = bill.recive;
        temp.isHidden = bill.isHidden;
        temp.phone = bill.phone;
        var observable;
        observable = this.billApi.create(temp);
        observable
            .pipe(flatMap(function (item) {
            var billStatusSubs = [];
            var statusOfBill = new StatusOfBill();
            statusOfBill.billsId = item.id;
            statusOfBill.statusId = _this.addStatus.id;
            billStatusSubs.push(_this.statusOfBillApi.create([statusOfBill]));
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
            _this.getBillOfStores();
        }, function (error) {
            _this.spinner.hide().then().catch();
            _this.notifierService.error(error.message);
        });
    };
    BillComponent.prototype.showCRUDItemModal = function (bill, option) {
        var _this = this;
        if (option == 3) {
            var modalRef = this.bsModalService.show(PopupExportXlsxComponent, {
                initialState: {
                    bill: bill,
                },
                class: 'modal-lg',
            });
            modalRef.content.onResult.subscribe(function (result) {
                if (!result.isCancelled) {
                    _this.getBillOfStores(PAGE_SIZE * (_this.currentPage - 1));
                }
            });
        }
        if (option == 2) {
            var modalRef = this.bsModalService.show(HistoryComponent, {
                initialState: {
                    bill: bill,
                },
                class: 'modal-lg',
            });
            modalRef.content.onResult.subscribe(function (result) {
                if (!result.isCancelled) {
                    _this.getBillOfStores(PAGE_SIZE * (_this.currentPage - 1));
                }
            });
        }
        if (option == 1) {
            if (bill.id) {
                var modalRef = this.bsModalService.show(BillformComponent, {
                    initialState: {
                        bill: bill,
                    },
                    class: 'modal-lg',
                });
                modalRef.content.onResult.subscribe(function (result) {
                    if (!result.isCancelled) {
                        _this.getBillOfStores(PAGE_SIZE * (_this.currentPage - 1));
                    }
                });
            }
            else {
                this.router.navigate(['/bill/addBill']);
            }
        }
    };
    BillComponent.prototype.deleteItem = function (bill) {
        this.deleteItems([bill]);
    };
    BillComponent.prototype.deleteMultipleItems = function () {
        if (this.selectedItems.size === 0) {
            this.notifierService.warning(this.translateService.instant('Chưa có bản ghi được chọn'));
        }
        else {
            this.deleteItems(Array.from(this.selectedItems.values()));
        }
    };
    BillComponent.prototype.deleteItems = function (bills) {
        var _this = this;
        var modalRef = this.bsModalService.show(DeleteDialogComponent, {
            initialState: {
                title: this.translateService.instant('Xóa Hóa đơn'),
                content: this.translateService.instant('Bạn có chắc chắn muốn xóa các bản ghi đã chọn'),
            },
        });
        modalRef.content.onClose.subscribe(function (result) {
            if (result) {
                forkJoin(bills.map(function (bill) {
                    bill.isHidden = true;
                    bill.code = bill.id;
                    return _this.billApi.patchAttributes(bill.id, bill);
                })).subscribe(function (results) {
                    _this.getBillOfStores(_this.PAGE_SIZE * (_this.currentPage - 1));
                    _this.notifierService.success(_this.translateService.instant('Xóa thành công'));
                }, function (error) {
                    _this.notifierService.error(_this.translateService.instant('Xóa thất bại'));
                });
            }
        });
    };
    BillComponent.prototype.showExport = function () {
        // this.exportService.exportExcel()
        // this.showCRUDItemModal(undefined,3)
    };
    __decorate([
        ViewChild('multiSelect', { static: true }),
        __metadata("design:type", MatSelect)
    ], BillComponent.prototype, "multiSelect", void 0);
    BillComponent = __decorate([
        Component({
            selector: 'app-bill',
            templateUrl: './bill.component.html',
            styleUrls: ['./bill.component.scss']
        }),
        __metadata("design:paramtypes", [BillsApi,
            StatusOfBillApi,
            StatusApi,
            ForeignBillApi,
            StatusOfForeignBillApi,
            ActivatedRoute,
            Router,
            LoopBackAuth,
            NotificationWrapperService,
            ChangeDetectorRef,
            TranslateService,
            BsModalService,
            NgxSpinnerService,
            NotificationWrapperService,
            BsModalRef,
            HttpClient,
            ContainerApi,
            DownloadFileService,
            ExportFileService])
    ], BillComponent);
    return BillComponent;
}());
export { BillComponent };
//# sourceMappingURL=bill.component.js.map