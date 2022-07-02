import { __decorate, __metadata } from "tslib";
// Angular
import { Injectable } from '@angular/core';
// RxJS
import { Subject } from 'rxjs';
import { LoopBackAuth } from 'src/app/api';
var MenuConfigService = /** @class */ (function () {
    /**
     * Service Constructor
     */
    function MenuConfigService(auth) {
        this.auth = auth;
        this.isRoleSuperAdmin = false;
        this.isRoleAdmin = false;
        // register on config changed event and set default config
        this.onConfigUpdated$ = new Subject();
        this.userLogin = this.auth.getCurrentUserData();
        this.isRoleSuperAdmin = this.userLogin.roles[0].name === 'SUPERADMIN';
        this.isRoleAdmin = this.userLogin.roles[0].name === 'ADMIN';
    }
    /**
     * Returns the menuConfig
     */
    MenuConfigService.prototype.getMenus = function () {
        if (this.isRoleAdmin) {
            this.menuConfig.aside.items.splice(3, 3);
            // this.menuConfig.aside.items.splice(0,1)
        }
        console.log(this.menuConfig.aside.items);
        return this.menuConfig;
    };
    /**
     * Load config
     *
     * @param config: any
     */
    MenuConfigService.prototype.loadConfigs = function (config) {
        this.menuConfig = config;
        this.onConfigUpdated$.next(this.menuConfig);
    };
    MenuConfigService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [LoopBackAuth])
    ], MenuConfigService);
    return MenuConfigService;
}());
export { MenuConfigService };
//# sourceMappingURL=menu-config.service.js.map