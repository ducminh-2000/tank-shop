import { __decorate, __metadata } from "tslib";
import { ChangeDetectorRef, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { Account, LoopBackAuth, User, UserApi } from 'src/app/api';
import { PAGE_SIZE } from 'src/app/core/constant/constant';
import { DeleteDialogComponent } from 'src/app/core/dialogs/delete-dialog/delete-dialog.component';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
import { UserFormComponent } from './user-form/user-form.component';
var UserComponent = /** @class */ (function () {
    function UserComponent(userApi, auth, notifierService, changeDetectorRef, translateService, bsModalService, spinner, notificationWrapperService) {
        this.userApi = userApi;
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
    UserComponent.prototype.ngOnInit = function () {
        this.userLogin = this.auth.getCurrentUserData();
        this.isRoleSuperAdmin = this.userLogin.roles[0].name === 'SUPERADMIN';
        this.isRoleAdmin = this.userLogin.roles[0].name === 'ADMIN';
        this.selectedItems = new Map();
        this.getUsers();
    };
    UserComponent.prototype.getUsers = function (skip, limit) {
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
                    userCode: {
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
            forkJoin(this.userApi.find(filter), this.userApi.count(filter.where)).subscribe(function (data) {
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
                include: [],
            };
            this.spinner.show().then().catch();
            this.selectedItems.clear();
            this.checkAll = false;
            this.isCheckbox = this.selectedItems.size !== 0;
            this.userApi.findById(this.auth.getCurrentUserId(), filter).subscribe(function (user) {
                _this.spinner.hide().then().catch();
                _this.users = [user];
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
    UserComponent.prototype.changePage = function () {
        this.getUsers(this.PAGE_SIZE * (this.currentPage - 1));
    };
    UserComponent.prototype.updateList = function () {
        this.PAGE_SIZE = +this.selectPageSize;
        this.getUsers(this.PAGE_SIZE * (this.currentPage - 1));
    };
    UserComponent.prototype.toggleCheckItems = function (user, checked) {
        if (checked) {
            this.selectedItems.set(user.id, user);
        }
        else {
            this.selectedItems.delete(user.id);
            this.checkAll = false;
        }
    };
    UserComponent.prototype.toggleCheckAll = function (users, checked) {
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
    UserComponent.prototype.showAddItemModal = function () {
        var user = new User();
        this.showCRUDItemModal(user, 1);
    };
    UserComponent.prototype.showEditItemModal = function (item) {
        var itemToEdit = Object.assign({}, item);
        this.showCRUDItemModal(itemToEdit, 1);
    };
    UserComponent.prototype.showBillOfUserModal = function (item) {
        var itemToEdit = Object.assign({}, item);
        this.showCRUDItemModal(itemToEdit, 2);
    };
    UserComponent.prototype.showCRUDItemModal = function (user, option) {
        var _this = this;
        if (option == 1) {
            var modalRef = this.bsModalService.show(UserFormComponent, {
                initialState: {
                    user: user,
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
    UserComponent.prototype.deleteItem = function (user) {
        this.deleteItems([user]);
    };
    UserComponent.prototype.deleteMultipleItems = function () {
        if (this.selectedItems.size === 0) {
            this.notifierService.warning(this.translateService.instant('SELECT EMPTY'));
        }
        else {
            this.deleteItems(Array.from(this.selectedItems.values()));
        }
    };
    UserComponent.prototype.deleteItems = function (users) {
        var _this = this;
        var modalRef = this.bsModalService.show(DeleteDialogComponent, {
            initialState: {
                title: this.translateService.instant('users.messages.delete.title'),
                content: this.translateService.instant('users.messages.delete.confirmation'),
            },
        });
        modalRef.content.onClose.subscribe(function (result) {
            if (result) {
                forkJoin(users.map(function (user) {
                    return _this.userApi.deleteById(user.id);
                })).subscribe(function (results) {
                    _this.getUsers(_this.PAGE_SIZE * (_this.currentPage - 1));
                    _this.notifierService.success(_this.translateService.instant('users.messages.delete.success'));
                }, function (error) {
                    _this.notifierService.error(_this.translateService.instant('users.messages.delete.error'));
                });
            }
        });
    };
    UserComponent.prototype.getFileUrl = function (user) {
        // return `${LoopBackConfig.getPath()}/${LoopBackConfig.getApiVersion()}/Containers/files/download/${user.file}`;
    };
    UserComponent = __decorate([
        Component({
            selector: 'app-user',
            templateUrl: './user.component.html',
            styleUrls: ['./user.component.scss']
        }),
        __metadata("design:paramtypes", [UserApi,
            LoopBackAuth,
            NotificationWrapperService,
            ChangeDetectorRef,
            TranslateService,
            BsModalService,
            NgxSpinnerService,
            NotificationWrapperService])
    ], UserComponent);
    return UserComponent;
}());
export { UserComponent };
//# sourceMappingURL=user.component.js.map