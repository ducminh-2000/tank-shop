import { __decorate, __metadata } from "tslib";
// Angular
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Translate
import { TranslateService } from '@ngx-translate/core';
// Auth
var ForgotPasswordComponent = /** @class */ (function () {
    /**
     * Component constructor
     *
     * @param authService
     * @param authNoticeService
     * @param translate
     * @param router
     * @param fb
     * @param cdr
     */
    function ForgotPasswordComponent(translate, router, fb) {
        this.translate = translate;
        this.router = router;
        this.fb = fb;
        this.loading = false;
        this.errors = [];
    }
    /**
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
     */
    /**
     * On init
     */
    ForgotPasswordComponent.prototype.ngOnInit = function () {
        this.initRegistrationForm();
    };
    /**
     * On destroy
     */
    ForgotPasswordComponent.prototype.ngOnDestroy = function () {
        this.unsubscribe.next();
        this.unsubscribe.complete();
        this.loading = false;
    };
    /**
     * Form initalization
     * Default params, validators
     */
    ForgotPasswordComponent.prototype.initRegistrationForm = function () {
        this.forgotPasswordForm = this.fb.group({
            email: ['', Validators.compose([
                    Validators.required,
                    Validators.email,
                    Validators.minLength(3),
                    Validators.maxLength(320) // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
                ])
            ]
        });
    };
    /**
     * Form Submit
     */
    ForgotPasswordComponent.prototype.submit = function () { };
    /**
     * Checking control validation
     *
     * @param controlName: string => Equals to formControlName
     * @param validationType: string => Equals to valitors name
     */
    ForgotPasswordComponent.prototype.isControlHasError = function (controlName, validationType) {
        var control = this.forgotPasswordForm.controls[controlName];
        if (!control) {
            return false;
        }
        var result = control.hasError(validationType) &&
            (control.dirty || control.touched);
        return result;
    };
    ForgotPasswordComponent = __decorate([
        Component({
            selector: 'kt-forgot-password',
            templateUrl: './forgot-password.component.html',
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [TranslateService,
            Router,
            FormBuilder])
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
}());
export { ForgotPasswordComponent };
//# sourceMappingURL=forgot-password.component.js.map