import { __decorate, __metadata } from "tslib";
// Angular
import { Injectable } from '@angular/core';
// RxJS
import { BehaviorSubject } from 'rxjs';
// Object path
import * as objectPath from 'object-path';
// Services
import { MenuConfigService } from './menu-config.service';
var MenuHorizontalService = /** @class */ (function () {
    /**
     * Service constructor
     *
     * @param menuConfigService: MenuConfigService
     */
    function MenuHorizontalService(menuConfigService) {
        this.menuConfigService = menuConfigService;
        // Public properties
        this.menuList$ = new BehaviorSubject([]);
        this.loadMenu();
    }
    /**
     * Load menu list
     */
    MenuHorizontalService.prototype.loadMenu = function () {
        // get menu list
        var menuItems = objectPath.get(this.menuConfigService.getMenus(), 'header.items');
        this.menuList$.next(menuItems);
    };
    MenuHorizontalService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [MenuConfigService])
    ], MenuHorizontalService);
    return MenuHorizontalService;
}());
export { MenuHorizontalService };
//# sourceMappingURL=menu-horizontal.service.js.map