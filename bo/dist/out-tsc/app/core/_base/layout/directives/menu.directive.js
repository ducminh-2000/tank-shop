import { __decorate, __metadata } from "tslib";
// Angular
import { Directive, ElementRef, Input } from '@angular/core';
// Object-Path
import * as objectPath from 'object-path';
/**
 * Configure menu
 */
var MenuDirective = /** @class */ (function () {
    /**
     * Directive Constructor
     * @param el: ElementRef
     */
    function MenuDirective(el) {
        this.el = el;
    }
    /**
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
     */
    /**
     * After view init
     */
    MenuDirective.prototype.ngAfterViewInit = function () {
        this.setupOptions();
        this.menu = new KTMenu(this.el.nativeElement, this.options);
    };
    /**
     * Return the menu
     */
    MenuDirective.prototype.getMenu = function () {
        return this.menu;
    };
    /**
     * Setup menu options
     */
    MenuDirective.prototype.setupOptions = function () {
        // init aside menu
        var menuDesktopMode = 'accordion';
        if (this.el.nativeElement.getAttribute('data-ktmenu-dropdown') === '1') {
            menuDesktopMode = 'dropdown';
        }
        if (typeof objectPath.get(this.options, 'submenu.desktop') === 'object') {
            objectPath.set(this.options, 'submenu.desktop', menuDesktopMode);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MenuDirective.prototype, "options", void 0);
    MenuDirective = __decorate([
        Directive({
            selector: '[ktMenu]',
            exportAs: 'ktMenu',
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], MenuDirective);
    return MenuDirective;
}());
export { MenuDirective };
//# sourceMappingURL=menu.directive.js.map