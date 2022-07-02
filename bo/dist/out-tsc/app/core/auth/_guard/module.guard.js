import { __decorate, __metadata } from "tslib";
// Angular
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// RxJS
import { of } from 'rxjs';
var ModuleGuard = /** @class */ (function () {
    function ModuleGuard(router) {
        this.router = router;
    }
    ModuleGuard.prototype.canActivate = function (route, state) {
        var moduleName = route.data.moduleName;
        if (!moduleName) {
            return of(false);
        }
    };
    ModuleGuard = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Router])
    ], ModuleGuard);
    return ModuleGuard;
}());
export { ModuleGuard };
//# sourceMappingURL=module.guard.js.map