import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoopBackAuth } from '../../../api/services/core';
import { Roles } from '../../constant/constant';
// Auth reducers and selectors
var AuthGuard = /** @class */ (function () {
    function AuthGuard(router, auth) {
        this.router = router;
        this.auth = auth;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var user = this.auth.getCurrentUserData();
        if (user && user.roles && user.roles.some(function (role) { return Roles[role.name]; })) {
            return true;
        }
        this.router.navigate(['/auth']).then();
        return false;
    };
    AuthGuard.prototype.canActivateChild = function (childRoute, state) {
        return this.canActivate(childRoute, state);
    };
    AuthGuard = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Router,
            LoopBackAuth])
    ], AuthGuard);
    return AuthGuard;
}());
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map