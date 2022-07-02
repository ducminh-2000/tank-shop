import { __decorate, __metadata } from "tslib";
// Angular
import { Component, Input } from '@angular/core';
// RxJS
// NGRX
import { Router } from '@angular/router';
import { Account, AccountApi, LoopBackAuth } from 'src/app/api';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
var UserProfileComponent = /** @class */ (function () {
    /**
     * Component constructor
     *
     * @param store: Store<AppState>
     */
    function UserProfileComponent(accountApi, auth, notificationWrapperService, router) {
        this.accountApi = accountApi;
        this.auth = auth;
        this.notificationWrapperService = notificationWrapperService;
        this.router = router;
        // Public properties
        this.user = new Account();
        this.avatar = true;
        this.greeting = true;
    }
    /**
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
     */
    /**
     * On init
     */
    UserProfileComponent.prototype.ngOnInit = function () {
        this.user = this.auth.getCurrentUserData();
    };
    /**
     * Log out
     */
    UserProfileComponent.prototype.logout = function () {
        var _this = this;
        this.accountApi.logout().subscribe(function () {
            _this.auth.clear();
            _this.notificationWrapperService.success('Logout');
            _this.router.navigate(['auth']);
        }, function (error) {
            _this.auth.clear();
            _this.router.navigate(['auth']);
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], UserProfileComponent.prototype, "avatar", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], UserProfileComponent.prototype, "greeting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], UserProfileComponent.prototype, "badge", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], UserProfileComponent.prototype, "icon", void 0);
    UserProfileComponent = __decorate([
        Component({
            selector: 'kt-user-profile',
            templateUrl: './user-profile.component.html',
            styleUrls: ['./user-profile.component.scss'],
        }),
        __metadata("design:paramtypes", [AccountApi,
            LoopBackAuth,
            NotificationWrapperService,
            Router])
    ], UserProfileComponent);
    return UserProfileComponent;
}());
export { UserProfileComponent };
//# sourceMappingURL=user-profile.component.js.map