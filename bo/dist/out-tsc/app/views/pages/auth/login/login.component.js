import { __decorate, __metadata } from "tslib";
import { ChangeDetectorRef, Component, ViewEncapsulation, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AccountApi } from '../../../../api';
import { Account, LoopBackAuth, } from '../../../../api';
import { NotificationWrapperService } from '../../../../core/services/notification-wrapper.service';
import { Roles } from '../../../../core/constant/constant';
import { flatMap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, translate, fb, cdr, route, accountApi, auth, notificationWrapperService, spinner) {
        this.router = router;
        this.translate = translate;
        this.fb = fb;
        this.cdr = cdr;
        this.route = route;
        this.accountApi = accountApi;
        this.auth = auth;
        this.notificationWrapperService = notificationWrapperService;
        this.spinner = spinner;
        this.loading = false;
        this.errors = [];
        this.account = new Account();
        this.roles = Roles;
        if (accountApi.getCurrentId()) {
            console.log('auto login');
        }
        this.router.navigate(['']).then();
    }
    LoginComponent.prototype.ngOnInit = function () { };
    LoginComponent.prototype.ngOnDestroy = function () {
        this.loading = false;
    };
    LoginComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    LoginComponent.prototype.login = function (email, password) {
        var _this = this;
        var emailInput = window.document.getElementById('email');
        var passwordInput = window.document.getElementById('password');
        var data = {
            email: email,
            password: password,
        };
        if (this.validateEmail(email) == false) {
            emailInput.classList.add('is-invalid');
        }
        else {
            emailInput.classList.remove('is-invalid');
            this.spinner.show().then().catch();
            this.accountApi
                .login(data)
                .pipe(flatMap(function (token) {
                return _this.accountApi.findById(token.userId, {
                    include: ['roles'],
                });
            }))
                .subscribe(function (account) {
                var roleID = account.roles && account.roles.length > 0
                    ? account.roles[0].id
                    : undefined;
                _this.auth.setUser(account);
                _this.spinner.hide().then().catch();
                _this.router.navigate(['/foreign-bill']).then();
            }, function (error) {
                _this.spinner.hide().then().catch();
                _this.auth.clear();
                _this.router.navigate(['']).then();
                if (error.code === 'LOGIN_FAILED') {
                    _this.notificationWrapperService.error('Login failed!');
                }
                else
                    _this.notificationWrapperService.error('message.error');
            });
        }
    };
    LoginComponent = __decorate([
        Component({
            selector: 'kt-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss'],
            encapsulation: ViewEncapsulation.None,
        }),
        __metadata("design:paramtypes", [Router,
            TranslateService,
            FormBuilder,
            ChangeDetectorRef,
            ActivatedRoute,
            AccountApi,
            LoopBackAuth,
            NotificationWrapperService,
            NgxSpinnerService])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map