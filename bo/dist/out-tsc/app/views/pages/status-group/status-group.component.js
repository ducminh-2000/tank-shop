import { __decorate, __metadata } from "tslib";
import { ChangeDetectorRef, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { Account, LoopBackAuth, StatusGroup, StatusGroupApi } from 'src/app/api';
import { PAGE_SIZE } from 'src/app/core/constant/constant';
import { DeleteDialogComponent } from 'src/app/core/dialogs/delete-dialog/delete-dialog.component';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
import { StatusGroupFormComponent } from './status-group-form/status-group-form.component';
var StatusGroupComponent = /** @class */ (function () {
    function StatusGroupComponent(statusGroupApi, auth, notifierService, changeDetectorRef, translateService, bsModalService, spinner, notificationWrapperService) {
        this.statusGroupApi = statusGroupApi;
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
        this.statusGroups = [];
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
    StatusGroupComponent.prototype.ngOnInit = function () {
        this.userLogin = this.auth.getCurrentUserData();
        this.isRoleSuperAdmin = this.userLogin.roles[0].name === 'SUPERADMIN';
        this.isRoleAdmin = this.userLogin.roles[0].name === 'ADMIN';
        this.selectedItems = new Map();
        this.getstatusGroups();
    };
    StatusGroupComponent.prototype.getstatusGroups = function (skip, limit) {
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
                    code: this.filterUserName ? { like: "%".concat(this.filterUserName, "%") } : undefined,
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
            forkJoin(this.statusGroupApi.find(filter), this.statusGroupApi.count(filter.where)).subscribe(function (data) {
                _this.spinner.hide().then().catch();
                _this.statusGroups = data[0];
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
    StatusGroupComponent.prototype.changePage = function () {
        this.getstatusGroups(this.PAGE_SIZE * (this.currentPage - 1));
    };
    StatusGroupComponent.prototype.updateList = function () {
        this.PAGE_SIZE = +this.selectPageSize;
        this.getstatusGroups(this.PAGE_SIZE * (this.currentPage - 1));
    };
    StatusGroupComponent.prototype.toggleCheckItems = function (statusGroup, checked) {
        if (checked) {
            this.selectedItems.set(statusGroup.id, statusGroup);
        }
        else {
            this.selectedItems.delete(statusGroup.id);
            this.checkAll = false;
        }
    };
    StatusGroupComponent.prototype.toggleCheckAll = function (statusGroups, checked) {
        var _this = this;
        if (checked) {
            statusGroups.forEach(function (it) {
                _this.selectedItems.set(it.id, it);
            });
        }
        else {
            statusGroups.forEach(function (it) {
                _this.selectedItems.delete(it.id);
            });
        }
        this.checkAll = true;
        this.isCheckbox = this.selectedItems.size !== 0;
    };
    StatusGroupComponent.prototype.showAddItemModal = function () {
        var statusGroup = new StatusGroup();
        this.showCRUDItemModal(statusGroup, 1);
    };
    StatusGroupComponent.prototype.showEditItemModal = function (item) {
        var itemToEdit = Object.assign({}, item);
        this.showCRUDItemModal(itemToEdit, 1);
    };
    StatusGroupComponent.prototype.showBillOfUserModal = function (item) {
        var itemToEdit = Object.assign({}, item);
        this.showCRUDItemModal(itemToEdit, 2);
    };
    StatusGroupComponent.prototype.showCRUDItemModal = function (statusGroup, option) {
        var _this = this;
        if (option == 1) {
            var modalRef = this.bsModalService.show(StatusGroupFormComponent, {
                initialState: {
                    statusGroup: statusGroup,
                },
                class: 'modal-lg',
            });
            modalRef.content.onResult.subscribe(function (result) {
                if (!result.isCancelled) {
                    _this.getstatusGroups(PAGE_SIZE * (_this.currentPage - 1));
                }
            });
        }
    };
    StatusGroupComponent.prototype.deleteItem = function (statusGroup) {
        this.deleteItems([statusGroup]);
    };
    StatusGroupComponent.prototype.deleteMultipleItems = function () {
        if (this.selectedItems.size === 0) {
            this.notifierService.warning(this.translateService.instant('SELECT EMPTY'));
        }
        else {
            this.deleteItems(Array.from(this.selectedItems.values()));
        }
    };
    StatusGroupComponent.prototype.deleteItems = function (statusGroups) {
        var _this = this;
        var modalRef = this.bsModalService.show(DeleteDialogComponent, {
            initialState: {
                title: this.translateService.instant('Xóa nhóm'),
                content: this.translateService.instant('Bạn có chắc muốn xóa bản ghi này ?'),
            },
        });
        modalRef.content.onClose.subscribe(function (result) {
            if (result) {
                forkJoin(statusGroups.map(function (statusGroup) {
                    return _this.statusGroupApi.deleteById(statusGroup.id);
                })).subscribe(function (results) {
                    _this.getstatusGroups(_this.PAGE_SIZE * (_this.currentPage - 1));
                    _this.notifierService.success(_this.translateService.instant('Thành công'));
                }, function (error) {
                    _this.notifierService.error(_this.translateService.instant('Thất bại'));
                });
            }
        });
    };
    StatusGroupComponent.prototype.getFileUrl = function (user) {
        // return `${LoopBackConfig.getPath()}/${LoopBackConfig.getApiVersion()}/Containers/files/download/${user.file}`;
    };
    StatusGroupComponent = __decorate([
        Component({
            selector: 'app-status-group',
            templateUrl: './status-group.component.html',
            styleUrls: ['./status-group.component.scss']
        }),
        __metadata("design:paramtypes", [StatusGroupApi,
            LoopBackAuth,
            NotificationWrapperService,
            ChangeDetectorRef,
            TranslateService,
            BsModalService,
            NgxSpinnerService,
            NotificationWrapperService])
    ], StatusGroupComponent);
    return StatusGroupComponent;
}());
export { StatusGroupComponent };
//# sourceMappingURL=status-group.component.js.map