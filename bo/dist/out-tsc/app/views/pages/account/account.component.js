import { __decorate, __metadata } from "tslib";
import { AccountApi } from './../../../api/services/custom/Account';
import { ChangeDetectorRef, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { Account, LoopBackAuth } from 'src/app/api';
import { PAGE_SIZE } from 'src/app/core/constant/constant';
import { DeleteDialogComponent } from 'src/app/core/dialogs/delete-dialog/delete-dialog.component';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
import { AccountformComponent } from './accountform/accountform.component';
var AccountComponent = /** @class */ (function () {
    function AccountComponent(accountApi, auth, notifierService, changeDetectorRef, translateService, bsModalService, spinner, notificationWrapperService) {
        this.accountApi = accountApi;
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
        this.users = [];
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
    AccountComponent.prototype.ngOnInit = function () {
        this.userLogin = this.auth.getCurrentUserData();
        this.isRoleSuperAdmin = this.userLogin.roles[0].name === 'SUPERADMIN';
        this.isRoleAdmin = this.userLogin.roles[0].name === 'ADMIN';
        this.selectedItems = new Map();
        this.getUsers();
    };
    AccountComponent.prototype.getUsers = function (skip, limit) {
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
                    },
                    grade: this.filterGrade ? this.filterGrade : undefined,
                    kind: this.filterRole ? this.filterRole : undefined,
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
                        relation: 'roles',
                    },
                    {
                        relation: 'stores',
                    },
                    // {
                    //   relation: 'bills',
                    // },
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
            forkJoin(this.accountApi.find(filter), this.accountApi.count(filter.where)).subscribe(function (data) {
                _this.spinner.hide().then().catch();
                _this.users = data[0];
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
                        relation: 'roles',
                    },
                    {
                        relation: 'stores',
                    },
                    // {
                    //   relation: 'bills',
                    // },
                ],
            };
            this.spinner.show().then().catch();
            this.selectedItems.clear();
            this.checkAll = false;
            this.isCheckbox = this.selectedItems.size !== 0;
            this.accountApi.findById(this.auth.getCurrentUserId(), filter).subscribe(function (account) {
                _this.spinner.hide().then().catch();
                _this.users = [account];
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
    AccountComponent.prototype.changePage = function () {
        this.getUsers(this.PAGE_SIZE * (this.currentPage - 1));
    };
    AccountComponent.prototype.updateList = function () {
        this.PAGE_SIZE = +this.selectPageSize;
        this.getUsers(this.PAGE_SIZE * (this.currentPage - 1));
    };
    AccountComponent.prototype.toggleCheckItems = function (user, checked) {
        if (checked) {
            this.selectedItems.set(user.id, user);
        }
        else {
            this.selectedItems.delete(user.id);
            this.checkAll = false;
        }
    };
    AccountComponent.prototype.toggleCheckAll = function (users, checked) {
        var _this = this;
        if (checked) {
            users.forEach(function (it) {
                _this.selectedItems.set(it.id, it);
            });
        }
        else {
            users.forEach(function (it) {
                _this.selectedItems.delete(it.id);
            });
        }
        this.checkAll = true;
        this.isCheckbox = this.selectedItems.size !== 0;
    };
    AccountComponent.prototype.showAddItemModal = function () {
        var account = new Account();
        this.showCRUDItemModal(account, 1);
    };
    AccountComponent.prototype.showEditItemModal = function (item) {
        var itemToEdit = Object.assign({}, item);
        this.showCRUDItemModal(itemToEdit, 1);
    };
    AccountComponent.prototype.showBillOfUserModal = function (item) {
        var itemToEdit = Object.assign({}, item);
        this.showCRUDItemModal(itemToEdit, 2);
    };
    AccountComponent.prototype.showCRUDItemModal = function (account, option) {
        var _this = this;
        if (option == 1) {
            var modalRef = this.bsModalService.show(AccountformComponent, {
                initialState: {
                    account: account,
                },
                class: 'modal-lg',
            });
            modalRef.content.onResult.subscribe(function (result) {
                if (!result.isCancelled) {
                    _this.getUsers(PAGE_SIZE * (_this.currentPage - 1));
                }
            });
        }
    };
    AccountComponent.prototype.deleteItem = function (account) {
        this.deleteItems([account]);
    };
    AccountComponent.prototype.deleteMultipleItems = function () {
        if (this.selectedItems.size === 0) {
            this.notifierService.warning(this.translateService.instant('SELECT EMPTY'));
        }
        else {
            this.deleteItems(Array.from(this.selectedItems.values()));
        }
    };
    AccountComponent.prototype.deleteItems = function (accounts) {
        var _this = this;
        var modalRef = this.bsModalService.show(DeleteDialogComponent, {
            initialState: {
                title: this.translateService.instant('users.messages.delete.title'),
                content: this.translateService.instant('users.messages.delete.confirmation'),
            },
        });
        modalRef.content.onClose.subscribe(function (result) {
            if (result) {
                forkJoin(accounts.map(function (account) {
                    return _this.accountApi.deleteById(account.id);
                })).subscribe(function (results) {
                    _this.getUsers(_this.PAGE_SIZE * (_this.currentPage - 1));
                    _this.notifierService.success(_this.translateService.instant('users.messages.delete.success'));
                }, function (error) {
                    _this.notifierService.error(_this.translateService.instant('users.messages.delete.error'));
                });
            }
        });
    };
    AccountComponent.prototype.getFileUrl = function (user) {
        // return `${LoopBackConfig.getPath()}/${LoopBackConfig.getApiVersion()}/Containers/files/download/${user.file}`;
    };
    AccountComponent = __decorate([
        Component({
            selector: 'app-account',
            templateUrl: './account.component.html',
            styleUrls: ['./account.component.scss']
        }),
        __metadata("design:paramtypes", [AccountApi,
            LoopBackAuth,
            NotificationWrapperService,
            ChangeDetectorRef,
            TranslateService,
            BsModalService,
            NgxSpinnerService,
            NotificationWrapperService])
    ], AccountComponent);
    return AccountComponent;
}());
export { AccountComponent };
//# sourceMappingURL=account.component.js.map