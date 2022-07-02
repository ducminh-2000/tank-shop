import { __decorate, __metadata } from "tslib";
import { ChangeDetectorRef, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { Account, LoopBackAuth, Shipper, ShipperApi } from 'src/app/api';
import { PAGE_SIZE } from 'src/app/core/constant/constant';
import { DeleteDialogComponent } from 'src/app/core/dialogs/delete-dialog/delete-dialog.component';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
import { ShipperFormComponent } from './shipper-form/shipper-form.component';
var ShipperComponent = /** @class */ (function () {
    function ShipperComponent(shipperApi, auth, notifierService, changeDetectorRef, translateService, bsModalService, spinner, notificationWrapperService) {
        this.shipperApi = shipperApi;
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
        this.shippers = [];
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
    ShipperComponent.prototype.ngOnInit = function () {
        this.userLogin = this.auth.getCurrentUserData();
        this.isRoleSuperAdmin = this.userLogin.roles[0].name === 'SUPERADMIN';
        this.isRoleAdmin = this.userLogin.roles[0].name === 'ADMIN';
        this.selectedItems = new Map();
        this.getShippers();
    };
    ShipperComponent.prototype.getShippers = function (skip, limit) {
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
                    name: this.filterUserName ? { like: "%".concat(this.filterUserName, "%") } : undefined,
                };
            }
            else {
                whereFilter = {
                    id: this.userLogin.id,
                };
            }
            var filter = {
                include: [],
                where: whereFilter,
                limit: limit,
                skip: skip,
                order: ['id ASC'],
            };
            this.spinner.show().then().catch();
            this.selectedItems.clear();
            this.checkAll = false;
            this.isCheckbox = this.selectedItems.size !== 0;
            forkJoin(this.shipperApi.find(filter), this.shipperApi.count(filter.where)).subscribe(function (data) {
                _this.spinner.hide().then().catch();
                _this.shippers = data[0];
                _this.totalItems = data[1].count;
                _this.changeDetectorRef.detectChanges();
            }, function (error) {
                _this.spinner.hide().then().catch();
                console.log('error', error);
                _this.changeDetectorRef.detectChanges();
                _this.notificationWrapperService.error(error.message || 'message.error');
            });
        }
    };
    ShipperComponent.prototype.changePage = function () {
        this.getShippers(this.PAGE_SIZE * (this.currentPage - 1));
    };
    ShipperComponent.prototype.updateList = function () {
        this.PAGE_SIZE = +this.selectPageSize;
        this.getShippers(this.PAGE_SIZE * (this.currentPage - 1));
    };
    ShipperComponent.prototype.toggleCheckItems = function (shipper, checked) {
        if (checked) {
            this.selectedItems.set(shipper.id, shipper);
        }
        else {
            this.selectedItems.delete(shipper.id);
            this.checkAll = false;
        }
    };
    ShipperComponent.prototype.toggleCheckAll = function (shippers, checked) {
        var _this = this;
        if (checked) {
            shippers.forEach(function (it) {
                _this.selectedItems.set(it.id, it);
            });
        }
        else {
            shippers.forEach(function (it) {
                _this.selectedItems.delete(it.id);
            });
        }
        this.checkAll = true;
        this.isCheckbox = this.selectedItems.size !== 0;
    };
    ShipperComponent.prototype.showAddItemModal = function () {
        var shipper = new Shipper();
        this.showCRUDItemModal(shipper, 1);
    };
    ShipperComponent.prototype.showEditItemModal = function (item) {
        var itemToEdit = Object.assign({}, item);
        this.showCRUDItemModal(itemToEdit, 1);
    };
    ShipperComponent.prototype.showBillOfUserModal = function (item) {
        var itemToEdit = Object.assign({}, item);
        this.showCRUDItemModal(itemToEdit, 2);
    };
    ShipperComponent.prototype.showCRUDItemModal = function (shipper, option) {
        var _this = this;
        if (option == 1) {
            var modalRef = this.bsModalService.show(ShipperFormComponent, {
                initialState: {
                    shipper: shipper,
                },
                class: 'modal-lg',
            });
            modalRef.content.onResult.subscribe(function (result) {
                if (!result.isCancelled) {
                    _this.getShippers(PAGE_SIZE * (_this.currentPage - 1));
                }
            });
        }
    };
    ShipperComponent.prototype.deleteItem = function (shipper) {
        this.deleteItems([shipper]);
    };
    ShipperComponent.prototype.deleteMultipleItems = function () {
        if (this.selectedItems.size === 0) {
            this.notifierService.warning(this.translateService.instant('SELECT EMPTY'));
        }
        else {
            this.deleteItems(Array.from(this.selectedItems.values()));
        }
    };
    ShipperComponent.prototype.deleteItems = function (shippers) {
        var _this = this;
        var modalRef = this.bsModalService.show(DeleteDialogComponent, {
            initialState: {
                title: this.translateService.instant('Xóa người gửi'),
                content: this.translateService.instant('Bạn có chắc muốn xóa bản ghi này ?'),
            },
        });
        modalRef.content.onClose.subscribe(function (result) {
            if (result) {
                forkJoin(shippers.map(function (Shipper) {
                    return _this.shipperApi.deleteById(Shipper.id);
                })).subscribe(function (results) {
                    _this.getShippers(_this.PAGE_SIZE * (_this.currentPage - 1));
                    _this.notifierService.success(_this.translateService.instant('Thành công'));
                }, function (error) {
                    _this.notifierService.error(_this.translateService.instant('Thất bại'));
                });
            }
        });
    };
    ShipperComponent.prototype.getFileUrl = function (user) {
        // return `${LoopBackConfig.getPath()}/${LoopBackConfig.getApiVersion()}/Containers/files/download/${user.file}`;
    };
    ShipperComponent = __decorate([
        Component({
            selector: 'app-shipper',
            templateUrl: './shipper.component.html',
            styleUrls: ['./shipper.component.scss']
        }),
        __metadata("design:paramtypes", [ShipperApi,
            LoopBackAuth,
            NotificationWrapperService,
            ChangeDetectorRef,
            TranslateService,
            BsModalService,
            NgxSpinnerService,
            NotificationWrapperService])
    ], ShipperComponent);
    return ShipperComponent;
}());
export { ShipperComponent };
//# sourceMappingURL=shipper.component.js.map