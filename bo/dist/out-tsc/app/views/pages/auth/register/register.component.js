import { __decorate, __metadata } from "tslib";
// Angular
import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
// Translate
import { TranslateService } from '@ngx-translate/core';
// Auth
import { Subject } from 'rxjs';
var ConfirmPasswordValidator = /** @class */ (function () {
    function ConfirmPasswordValidator() {
    }
    /**
     * Check matching password with confirm password
     * @param control AbstractControl
     */
    ConfirmPasswordValidator.MatchPassword = function (control) {
        var password = control.get('password').value;
        var confirmPassword = control.get('confirmPassword').value;
        if (password !== confirmPassword) {
            control.get('confirmPassword').setErrors({ ConfirmPassword: true });
        }
        else {
            return null;
        }
    };
    return ConfirmPasswordValidator;
}());
export { ConfirmPasswordValidator };
var RegisterComponent = /** @class */ (function () {
    /**
     * Component constructor
     *
     * @param authNoticeService: AuthNoticeService
     * @param translate: TranslateService
     * @param router: Router
     * @param auth: AuthService
     * @param store: Store<AppState>
     * @param fb: FormBuilder
     * @param cdr
     */
    function RegisterComponent(translate, router, fb, cdr) {
        this.translate = translate;
        this.router = router;
        this.fb = fb;
        this.cdr = cdr;
        this.loading = false;
        this.errors = [];
        this.unsubscribe = new Subject();
    }
    /*
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
    */
    /**
     * On init
     */
    RegisterComponent.prototype.ngOnInit = function () {
        this.initRegisterForm();
    };
    /*
    * On destroy
    */
    RegisterComponent.prototype.ngOnDestroy = function () {
        this.unsubscribe.next();
        this.unsubscribe.complete();
        this.loading = false;
    };
    /**
     * Form initalization
     * Default params, validators
     */
    RegisterComponent.prototype.initRegisterForm = function () {
        this.registerForm = this.fb.group({
            fullname: ['', Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(100)
                ])
            ],
            email: ['', Validators.compose([
                    Validators.required,
                    Validators.email,
                    Validators.minLength(3),
                    // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
                    Validators.maxLength(320)
                ]),
            ],
            username: ['', Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(100)
                ]),
            ],
            password: ['', Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(100)
                ])
            ],
            confirmPassword: ['', Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(100)
                ])
            ],
            agree: [false, Validators.compose([Validators.required])]
        }, {
            validator: ConfirmPasswordValidator.MatchPassword
        });
    };
    /**
     * Form Submit
     */
    RegisterComponent.prototype.submit = function () { };
    /**
     * Checking control validation
     *
     * @param controlName: string => Equals to formControlName
     * @param validationType: string => Equals to valitors name
     */
    RegisterComponent.prototype.isControlHasError = function (controlName, validationType) {
        var control = this.registerForm.controls[controlName];
        if (!control) {
            return false;
        }
        var result = control.hasError(validationType) && (control.dirty || control.touched);
        return result;
    };
    RegisterComponent = __decorate([
        Component({
            selector: 'kt-register',
            templateUrl: './register.component.html',
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [TranslateService,
            Router,
            FormBuilder,
            ChangeDetectorRef])
    ], RegisterComponent);
    return RegisterComponent;
}());
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map