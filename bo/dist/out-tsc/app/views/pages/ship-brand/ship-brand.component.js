import { __decorate, __metadata } from "tslib";
import { ChangeDetectorRef, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { Account, LoopBackAuth, ShipBrand, ShipBrandApi } from 'src/app/api';
import { PAGE_SIZE } from 'src/app/core/constant/constant';
import { DeleteDialogComponent } from 'src/app/core/dialogs/delete-dialog/delete-dialog.component';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
import { ShipBrandFormComponent } from './ship-brand-form/ship-brand-form.component';
var ShipBrandComponent = /** @class */ (function () {
    function ShipBrandComponent(shipBrandApi, auth, notifierService, changeDetectorRef, translateService, bsModalService, spinner, notificationWrapperService) {
        this.shipBrandApi = shipBrandApi;
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
        this.shipBrands = [];
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
    ShipBrandComponent.prototype.ngOnInit = function () {
        this.userLogin = this.auth.getCurrentUserData();
        this.isRoleSuperAdmin = this.userLogin.roles[0].name === 'SUPERADMIN';
        this.isRoleAdmin = this.userLogin.roles[0].name === 'ADMIN';
        this.selectedItems = new Map();
        this.getShipBrands();
    };
    ShipBrandComponent.prototype.getShipBrands = function (skip, limit) {
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
                    name: {
                        like: "%".concat(this.filterUserName, "%")
                    }
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
            forkJoin(this.shipBrandApi.find(filter), this.shipBrandApi.count(filter.where)).subscribe(function (data) {
                _this.spinner.hide().then().catch();
                _this.shipBrands = data[0];
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
    ShipBrandComponent.prototype.changePage = function () {
        this.getShipBrands(this.PAGE_SIZE * (this.currentPage - 1));
    };
    ShipBrandComponent.prototype.updateList = function () {
        this.PAGE_SIZE = +this.selectPageSize;
        this.getShipBrands(this.PAGE_SIZE * (this.currentPage - 1));
    };
    ShipBrandComponent.prototype.toggleCheckItems = function (shipBrand, checked) {
        if (checked) {
            this.selectedItems.set(shipBrand.id, shipBrand);
        }
        else {
            this.selectedItems.delete(shipBrand.id);
            this.checkAll = false;
        }
    };
    ShipBrandComponent.prototype.toggleCheckAll = function (shipBrands, checked) {
        var _this = this;
        if (checked) {
            shipBrands.forEach(function (it) {
                _this.selectedItems.set(it.id, it);
            });
        }
        else {
            shipBrands.forEach(function (it) {
                _this.selectedItems.delete(it.id);
            });
        }
        this.checkAll = true;
        this.isCheckbox = this.selectedItems.size !== 0;
    };
    ShipBrandComponent.prototype.showAddItemModal = function () {
        var shipBrand = new ShipBrand();
        this.showCRUDItemModal(shipBrand, 1);
    };
    ShipBrandComponent.prototype.showEditItemModal = function (item) {
        var itemToEdit = Object.assign({}, item);
        this.showCRUDItemModal(itemToEdit, 1);
    };
    ShipBrandComponent.prototype.showBillOfUserModal = function (item) {
        var itemToEdit = Object.assign({}, item);
        this.showCRUDItemModal(itemToEdit, 2);
    };
    ShipBrandComponent.prototype.showCRUDItemModal = function (shipBrand, option) {
        var _this = this;
        if (option == 1) {
            var modalRef = this.bsModalService.show(ShipBrandFormComponent, {
                initialState: {
                    shipBrand: shipBrand,
                },
                class: 'modal-lg',
            });
            modalRef.content.onResult.subscribe(function (result) {
                if (!result.isCancelled) {
                    _this.getShipBrands(PAGE_SIZE * (_this.currentPage - 1));
                }
            });
        }
    };
    ShipBrandComponent.prototype.deleteItem = function (shipBrand) {
        this.deleteItems([shipBrand]);
    };
    ShipBrandComponent.prototype.deleteMultipleItems = function () {
        if (this.selectedItems.size === 0) {
            this.notifierService.warning(this.translateService.instant('SELECT EMPTY'));
        }
        else {
            this.deleteItems(Array.from(this.selectedItems.values()));
        }
    };
    ShipBrandComponent.prototype.deleteItems = function (shipBrands) {
        var _this = this;
        var modalRef = this.bsModalService.show(DeleteDialogComponent, {
            initialState: {
                title: this.translateService.instant('Xóa hãng ship ký gửi'),
                content: this.translateService.instant('Bạn có chắc muốn xóa bản ghi này ?'),
            },
        });
        modalRef.content.onClose.subscribe(function (result) {
            if (result) {
                forkJoin(shipBrands.map(function (shipBrand) {
                    return _this.shipBrandApi.deleteById(shipBrand.id);
                })).subscribe(function (results) {
                    _this.getShipBrands(_this.PAGE_SIZE * (_this.currentPage - 1));
                    _this.notifierService.success(_this.translateService.instant('Thành công'));
                }, function (error) {
                    _this.notifierService.error(_this.translateService.instant('Thất bại'));
                });
            }
        });
    };
    ShipBrandComponent.prototype.getFileUrl = function (user) {
        // return `${LoopBackConfig.getPath()}/${LoopBackConfig.getApiVersion()}/Containers/files/download/${user.file}`;
    };
    ShipBrandComponent = __decorate([
        Component({
            selector: 'app-ship-brand',
            templateUrl: './ship-brand.component.html',
            styleUrls: ['./ship-brand.component.scss']
        }),
        __metadata("design:paramtypes", [ShipBrandApi,
            LoopBackAuth,
            NotificationWrapperService,
            ChangeDetectorRef,
            TranslateService,
            BsModalService,
            NgxSpinnerService,
            NotificationWrapperService])
    ], ShipBrandComponent);
    return ShipBrandComponent;
}());
export { ShipBrandComponent };
//# sourceMappingURL=ship-brand.component.js.map