import { __decorate, __metadata } from "tslib";
import { StatusApi } from './../../../api/services/custom/Status';
import { Status } from './../../../api/models/Status';
import { ChangeDetectorRef, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { Account, LoopBackAuth } from 'src/app/api';
import { PAGE_SIZE } from 'src/app/core/constant/constant';
import { DeleteDialogComponent } from 'src/app/core/dialogs/delete-dialog/delete-dialog.component';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
import { StatusformComponent } from './statusform/statusform.component';
var StatusComponent = /** @class */ (function () {
    function StatusComponent(statusApi, auth, notifierService, changeDetectorRef, translateService, bsModalService, spinner, notificationWrapperService) {
        this.statusApi = statusApi;
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
        this.listStatus = [];
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
    StatusComponent.prototype.ngOnInit = function () {
        this.userLogin = this.auth.getCurrentUserData();
        this.isRoleSuperAdmin = this.userLogin.roles[0].name === 'SUPERADMIN';
        this.isRoleAdmin = this.userLogin.roles[0].name === 'ADMIN';
        this.selectedItems = new Map();
        this.getStatus();
    };
    StatusComponent.prototype.getStatus = function (skip, limit) {
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
                    and: [
                        {
                            name: {
                                like: "%".concat(this.filterUserName, "%")
                            }
                        },
                        {
                            order: {
                                gt: 4
                            }
                        }
                    ]
                };
            }
            else {
                whereFilter = {
                    id: this.userLogin.id,
                };
            }
            var filter = {
                include: [
                    {
                        relation: "group"
                    }
                ],
                where: whereFilter,
                limit: limit,
                skip: skip,
                order: ['name ASC'],
            };
            this.spinner.show().then().catch();
            this.selectedItems.clear();
            this.checkAll = false;
            this.isCheckbox = this.selectedItems.size !== 0;
            forkJoin(this.statusApi.find(filter), this.statusApi.count(filter.where)).subscribe(function (data) {
                _this.spinner.hide().then().catch();
                _this.listStatus = data[0];
                _this.totalItems = data[1].count;
                console.log(data[0]);
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
            this.statusApi.findById(this.auth.getCurrentUserId(), filter).subscribe(function (status) {
                _this.spinner.hide().then().catch();
                _this.listStatus = [status];
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
    StatusComponent.prototype.changePage = function () {
        this.getStatus(this.PAGE_SIZE * (this.currentPage - 1));
    };
    StatusComponent.prototype.updateList = function () {
        this.PAGE_SIZE = +this.selectPageSize;
        this.getStatus(this.PAGE_SIZE * (this.currentPage - 1));
    };
    StatusComponent.prototype.toggleCheckItems = function (status, checked) {
        if (checked) {
            this.selectedItems.set(status.id, status);
        }
        else {
            this.selectedItems.delete(status.id);
            this.checkAll = false;
        }
    };
    StatusComponent.prototype.toggleCheckAll = function (status, checked) {
        var _this = this;
        if (checked) {
            status.forEach(function (it) {
                _this.selectedItems.set(it.id, it);
            });
        }
        else {
            status.forEach(function (it) {
                _this.selectedItems.delete(it.id);
            });
        }
        this.checkAll = true;
        this.isCheckbox = this.selectedItems.size !== 0;
    };
    StatusComponent.prototype.showAddItemModal = function () {
        var status = new Status();
        this.showCRUDItemModal(status, 1);
    };
    StatusComponent.prototype.showEditItemModal = function (item) {
        var itemToEdit = Object.assign({}, item);
        this.showCRUDItemModal(itemToEdit, 1);
    };
    StatusComponent.prototype.showBillOfUserModal = function (item) {
        var itemToEdit = Object.assign({}, item);
        this.showCRUDItemModal(itemToEdit, 2);
    };
    StatusComponent.prototype.showCRUDItemModal = function (status, option) {
        var _this = this;
        if (option == 1) {
            var modalRef = this.bsModalService.show(StatusformComponent, {
                initialState: {
                    status: status,
                },
                class: 'modal-lg',
            });
            modalRef.content.onResult.subscribe(function (result) {
                if (!result.isCancelled) {
                    _this.getStatus(PAGE_SIZE * (_this.currentPage - 1));
                }
            });
        }
    };
    StatusComponent.prototype.deleteItem = function (status) {
        this.deleteItems([status]);
    };
    StatusComponent.prototype.deleteMultipleItems = function () {
        if (this.selectedItems.size === 0) {
            this.notifierService.warning(this.translateService.instant('SELECT EMPTY'));
        }
        else {
            this.deleteItems(Array.from(this.selectedItems.values()));
        }
    };
    StatusComponent.prototype.deleteItems = function (listStatus) {
        var _this = this;
        var modalRef = this.bsModalService.show(DeleteDialogComponent, {
            initialState: {
                title: this.translateService.instant('users.messages.delete.title'),
                content: this.translateService.instant('users.messages.delete.confirmation'),
            },
        });
        modalRef.content.onClose.subscribe(function (result) {
            if (result) {
                forkJoin(listStatus.map(function (status) {
                    return _this.statusApi.deleteById(status.id);
                })).subscribe(function (results) {
                    _this.getStatus(_this.PAGE_SIZE * (_this.currentPage - 1));
                    _this.notifierService.success(_this.translateService.instant('users.messages.delete.success'));
                }, function (error) {
                    _this.notifierService.error(_this.translateService.instant('users.messages.delete.error'));
                });
            }
        });
    };
    StatusComponent.prototype.getFileUrl = function (user) {
        // return `${LoopBackConfig.getPath()}/${LoopBackConfig.getApiVersion()}/Containers/files/download/${user.file}`;
    };
    StatusComponent = __decorate([
        Component({
            selector: 'app-status',
            templateUrl: './status.component.html',
            styleUrls: ['./status.component.scss']
        }),
        __metadata("design:paramtypes", [StatusApi,
            LoopBackAuth,
            NotificationWrapperService,
            ChangeDetectorRef,
            TranslateService,
            BsModalService,
            NgxSpinnerService,
            NotificationWrapperService])
    ], StatusComponent);
    return StatusComponent;
}());
export { StatusComponent };
//# sourceMappingURL=status.component.js.map