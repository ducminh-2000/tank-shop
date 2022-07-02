import { __decorate, __metadata } from "tslib";
import { Router } from '@angular/router';
import { AccountApi } from './../../../api/services/custom/Account';
import { StoresApi } from './../../../api/services/custom/Stores';
import { ChangeDetectorRef, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { Account, LoopBackAuth, Stores } from 'src/app/api';
import { PAGE_SIZE } from 'src/app/core/constant/constant';
import { DeleteDialogComponent } from 'src/app/core/dialogs/delete-dialog/delete-dialog.component';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
import { StoreformComponent } from './storeform/storeform.component';
import { jsPDF } from "jspdf";
import { Canvg } from 'canvg';
var StoreComponent = /** @class */ (function () {
    function StoreComponent(storesApi, accountApi, router, auth, notifierService, changeDetectorRef, translateService, bsModalService, spinner, notificationWrapperService) {
        this.storesApi = storesApi;
        this.accountApi = accountApi;
        this.router = router;
        this.auth = auth;
        this.notifierService = notifierService;
        this.changeDetectorRef = changeDetectorRef;
        this.translateService = translateService;
        this.bsModalService = bsModalService;
        this.spinner = spinner;
        this.notificationWrapperService = notificationWrapperService;
        this.datas = new Account();
        this.typeCurrentUser = 0;
        this.userLogin = new Account();
        this.isValidate = false;
        this.search = '';
        this.listStore = [];
        this.PAGE_SIZE = PAGE_SIZE;
        this.selectPageSize = '5';
        this.isShowLoading = false;
        this.deleteValue = [];
        this.isCheckbox = false;
        this.isRoleAdmin = false;
        this.filterUserName = '';
        this.filterGrade = 0;
        this.isRoleSuperAdmin = false;
        this.checkAll = false;
        this.filterRole = '';
    }
    StoreComponent.prototype.ngOnInit = function () {
        this.userLogin = this.auth.getCurrentUserData();
        this.isRoleSuperAdmin = this.userLogin.roles[0].name === 'SUPERADMIN';
        this.isRoleAdmin = this.userLogin.roles[0].name === 'ADMIN';
        this.selectedItems = new Map();
        this.getStores();
    };
    StoreComponent.prototype.getStores = function (skip, limit) {
        var _this = this;
        if (skip === void 0) { skip = 0; }
        if (limit === void 0) { limit = this.PAGE_SIZE; }
        if (this.isRoleSuperAdmin) {
            if (skip <= 0) {
                skip = 0;
                this.currentPage = 1;
            }
            var whereFilter = void 0;
            if (this.isRoleSuperAdmin) {
                whereFilter = {
                    code: {
                        like: "%".concat(this.filterUserName, "%")
                    }
                };
            }
            else {
                whereFilter = {
                    id: this.userLogin.storesId,
                };
            }
            var filter = {
                include: [],
                where: whereFilter,
                limit: limit,
                skip: skip,
                order: ['name ASC'],
            };
            this.spinner.show().then().catch();
            this.selectedItems.clear();
            this.checkAll = false;
            this.isCheckbox = this.selectedItems.size !== 0;
            forkJoin(this.storesApi.find(filter), this.storesApi.count(filter.where)).subscribe(function (data) {
                _this.spinner.hide().then().catch();
                _this.listStore = data[0];
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
                include: [],
            };
            this.spinner.show().then().catch();
            this.selectedItems.clear();
            this.checkAll = false;
            this.isCheckbox = this.selectedItems.size !== 0;
            this.storesApi.findById(this.userLogin.storesId, filter).subscribe(function (store) {
                _this.spinner.hide().then().catch();
                _this.listStore = [store];
                _this.totalItems = 1;
                _this.changeDetectorRef.detectChanges();
            }, function (error) {
                _this.spinner.hide().then().catch();
                console.log('error', error);
                _this.changeDetectorRef.detectChanges();
                _this.notificationWrapperService.error(error.message || 'message.error');
            });
        }
    };
    StoreComponent.prototype.downloadBarcode = function (store) {
        var doc = new jsPDF();
        var v, content;
        var canvas = document.querySelector('canvas');
        var ctx = canvas.getContext('2d');
        content = document.getElementById(store.code).lastElementChild.innerHTML;
        v = Canvg.fromString(ctx, content);
        // doc.addSvgAsImage(,1,1,100,2,'',true,0);
        v.start();
        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        console.log(imgData);
        doc.addImage(imgData, 'JPEG', 0, 0, 0, 0);
        doc.save();
    };
    StoreComponent.prototype.changePage = function () {
        this.getStores(this.PAGE_SIZE * (this.currentPage - 1));
    };
    StoreComponent.prototype.updateList = function () {
        this.PAGE_SIZE = +this.selectPageSize;
        this.getStores(this.PAGE_SIZE * (this.currentPage - 1));
    };
    StoreComponent.prototype.toggleCheckItems = function (store, checked) {
        if (checked) {
            this.selectedItems.set(store.id, store);
        }
        else {
            this.selectedItems.delete(store.id);
            this.checkAll = false;
        }
    };
    StoreComponent.prototype.toggleCheckAll = function (stores, checked) {
        var _this = this;
        if (checked) {
            stores.forEach(function (it) {
                _this.selectedItems.set(it.id, it);
            });
        }
        else {
            stores.forEach(function (it) {
                _this.selectedItems.delete(it.id);
            });
        }
        this.checkAll = true;
        this.isCheckbox = this.selectedItems.size !== 0;
    };
    StoreComponent.prototype.showAddItemModal = function () {
        var store = new Stores();
        this.showCRUDItemModal(store, 1);
    };
    StoreComponent.prototype.showEditItemModal = function (item) {
        var itemToEdit = Object.assign({}, item);
        this.showCRUDItemModal(itemToEdit, 1);
    };
    StoreComponent.prototype.showBillOfUserModal = function (item) {
        var itemToEdit = Object.assign({}, item);
        this.showCRUDItemModal(itemToEdit, 2);
    };
    StoreComponent.prototype.showCRUDItemModal = function (store, option) {
        var _this = this;
        if (option == 1) {
            var modalRef = this.bsModalService.show(StoreformComponent, {
                initialState: {
                    store: store,
                },
                class: 'modal-lg',
            });
            modalRef.content.onResult.subscribe(function (result) {
                if (!result.isCancelled) {
                    _this.getStores(PAGE_SIZE * (_this.currentPage - 1));
                }
            });
        }
    };
    StoreComponent.prototype.deleteItem = function (store) {
        this.deleteItems([store]);
    };
    StoreComponent.prototype.deleteMultipleItems = function () {
        if (this.selectedItems.size === 0) {
            this.notifierService.warning(this.translateService.instant('Chưa có kho được chọn'));
        }
        else {
            this.deleteItems(Array.from(this.selectedItems.values()));
        }
    };
    StoreComponent.prototype.deleteItems = function (stores) {
        var _this = this;
        var modalRef = this.bsModalService.show(DeleteDialogComponent, {
            initialState: {
                title: this.translateService.instant('Xóa Kho hàng'),
                content: this.translateService.instant('Bạn có chắc chắn muốn xóa các bản ghi vừa chọn ?'),
            },
        });
        modalRef.content.onClose.subscribe(function (result) {
            if (result) {
                forkJoin(stores.map(function (store) {
                    return _this.storesApi.deleteById(store.id);
                })).subscribe(function (results) {
                    _this.getStores(_this.PAGE_SIZE * (_this.currentPage - 1));
                    _this.notifierService.success(_this.translateService.instant('Xóa thành công'));
                }, function (error) {
                    _this.notifierService.error(_this.translateService.instant('Xóa thất bại'));
                });
            }
        });
    };
    StoreComponent.prototype.setVisible = function (store) {
        store.isHidden = !store.isHidden;
        store.region = store.region;
        this.storesApi.patchAttributes(store.id, store).subscribe();
    };
    StoreComponent.prototype.listBillOfStore = function (store) {
        this.router.navigate(['/store/detail/', store.id]);
    };
    StoreComponent.prototype.importStore = function () {
        this.router.navigate(['/store/import/']);
    };
    StoreComponent.prototype.exportStore = function () {
        this.router.navigate(['/store/export/']);
    };
    StoreComponent = __decorate([
        Component({
            selector: 'app-store',
            templateUrl: './store.component.html',
            styleUrls: ['./store.component.scss']
        }),
        __metadata("design:paramtypes", [StoresApi,
            AccountApi,
            Router,
            LoopBackAuth,
            NotificationWrapperService,
            ChangeDetectorRef,
            TranslateService,
            BsModalService,
            NgxSpinnerService,
            NotificationWrapperService])
    ], StoreComponent);
    return StoreComponent;
}());
export { StoreComponent };
//# sourceMappingURL=store.component.js.map