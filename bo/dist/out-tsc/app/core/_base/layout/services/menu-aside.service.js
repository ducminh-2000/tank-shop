import { __decorate, __metadata } from "tslib";
// Angular
import { Injectable } from '@angular/core';
// RxJS
import { BehaviorSubject } from 'rxjs';
// Object path
import * as objectPath from 'object-path';
// Services
import { MenuConfigService } from './menu-config.service';
var MenuAsideService = /** @class */ (function () {
    /**
     * Service constructor
     *
     * @param menuConfigService: MenuConfigService
     */
    function MenuAsideService(menuConfigService) {
        this.menuConfigService = menuConfigService;
        // Public properties
        this.menuList$ = new BehaviorSubject([]);
        this.loadMenu();
    }
    /**
     * Load menu list
     */
    MenuAsideService.prototype.loadMenu = function () {
        // get menu list
        var menuItems = objectPath.get(this.menuConfigService.getMenus(), 'aside.items');
        this.menuList$.next(menuItems);
    };
    MenuAsideService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [MenuConfigService])
    ], MenuAsideService);
    return MenuAsideService;
}());
export { MenuAsideService };
//# sourceMappingURL=menu-aside.service.js.map