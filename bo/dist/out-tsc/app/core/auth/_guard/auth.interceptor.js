import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { LoopBackAuth } from '../../../api/services/core';
var AuthInterceptor = /** @class */ (function () {
    function AuthInterceptor(router, auth) {
        this.router = router;
        this.auth = auth;
    }
    AuthInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        return next.handle(request).pipe(catchError(function (error) {
            if (error.status === 401) {
                _this.auth.clear();
                _this.router.navigate(['auth']);
            }
            return throwError(error);
        }));
    };
    AuthInterceptor = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Router,
            LoopBackAuth])
    ], AuthInterceptor);
    return AuthInterceptor;
}());
export { AuthInterceptor };
//# sourceMappingURL=auth.interceptor.js.map