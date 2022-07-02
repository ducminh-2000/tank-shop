import { __decorate, __metadata } from "tslib";
// Angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// RxJS
import { filter } from 'rxjs/operators';
// Object-Path
import * as objectPath from 'object-path';
// Layout
import { LayoutConfigService, MenuConfigService, MenuHorizontalService } from '../../../../core/_base/layout';
// HTML Class
import { HtmlClassService } from '../../html-class.service';
var MenuHorizontalComponent = /** @class */ (function () {
    /**
     * Component Conctructor
     *
     * @param el: ElementRef
     * @param htmlClassService: HtmlClassService
     * @param menuHorService: MenuHorService
     * @param menuConfigService: MenuConfigService
     * @param layoutConfigService: LayouConfigService
     * @param router: Router
     * @param render: Renderer2
     * @param cdr: ChangeDetectorRef
     */
    function MenuHorizontalComponent(el, htmlClassService, menuHorService, menuConfigService, layoutConfigService, router, render, cdr) {
        this.el = el;
        this.htmlClassService = htmlClassService;
        this.menuHorService = menuHorService;
        this.menuConfigService = menuConfigService;
        this.layoutConfigService = layoutConfigService;
        this.router = router;
        this.render = render;
        this.cdr = cdr;
        // Public properties
        this.currentRouteUrl = '';
        this.menuOptions = {
            submenu: {
                desktop: 'dropdown',
                tablet: 'accordion',
                mobile: 'accordion'
            },
            accordion: {
                slideSpeed: 200,
                expandAll: false // allow having multiple expanded accordions in the menu
            },
            dropdown: {
                timeout: 50
            }
        };
        this.offcanvasOptions = {
            overlay: true,
            baseClass: 'kt-header-menu-wrapper',
            closeBy: 'kt_header_menu_mobile_close_btn',
            toggleBy: {
                target: 'kt_header_mobile_toggler',
                state: 'kt-header-mobile__toolbar-toggler--active'
            }
        };
    }
    /**
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
     */
    /**
     * After view init
     */
    MenuHorizontalComponent.prototype.ngAfterViewInit = function () {
    };
    /**
     * On init
     */
    MenuHorizontalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.rootArrowEnabled = this.layoutConfigService.getConfig('header.menu.self.root-arrow');
        this.currentRouteUrl = this.router.url;
        this.router.events
            .pipe(filter(function (event) { return event instanceof NavigationEnd; }))
            .subscribe(function (event) {
            _this.currentRouteUrl = _this.router.url;
            _this.cdr.markForCheck();
        });
    };
    /**
     * Return Css Class Name
     * @param item: any
     */
    MenuHorizontalComponent.prototype.getItemCssClasses = function (item) {
        var classes = 'kt-menu__item';
        if (objectPath.get(item, 'submenu')) {
            classes += ' kt-menu__item--submenu';
        }
        if (!item.submenu && this.isMenuItemIsActive(item)) {
            classes += ' kt-menu__item--active kt-menu__item--here';
        }
        if (item.submenu && this.isMenuItemIsActive(item)) {
            classes += ' kt-menu__item--open kt-menu__item--here';
        }
        if (objectPath.get(item, 'resizer')) {
            classes += ' kt-menu__item--resize';
        }
        var menuType = objectPath.get(item, 'submenu.type') || 'classic';
        if ((objectPath.get(item, 'root') && menuType === 'classic')
            || parseInt(objectPath.get(item, 'submenu.width'), 10) > 0) {
            classes += ' kt-menu__item--rel';
        }
        var customClass = objectPath.get(item, 'custom-class');
        if (customClass) {
            classes += ' ' + customClass;
        }
        if (objectPath.get(item, 'icon-only')) {
            classes += ' kt-menu__item--icon-only';
        }
        return classes;
    };
    /**
     * Returns Attribute SubMenu Toggle
     * @param item: any
     */
    MenuHorizontalComponent.prototype.getItemAttrSubmenuToggle = function (item) {
        var toggle = 'hover';
        if (objectPath.get(item, 'toggle') === 'click') {
            toggle = 'click';
        }
        else if (objectPath.get(item, 'submenu.type') === 'tabs') {
            toggle = 'tabs';
        }
        else {
            // submenu toggle default to 'hover'
        }
        return toggle;
    };
    /**
     * Returns Submenu CSS Class Name
     * @param item: any
     */
    MenuHorizontalComponent.prototype.getItemMenuSubmenuClass = function (item) {
        var classes = '';
        var alignment = objectPath.get(item, 'alignment') || 'right';
        if (alignment) {
            classes += ' kt-menu__submenu--' + alignment;
        }
        var type = objectPath.get(item, 'type') || 'classic';
        if (type === 'classic') {
            classes += ' kt-menu__submenu--classic';
        }
        if (type === 'tabs') {
            classes += ' kt-menu__submenu--tabs';
        }
        if (type === 'mega') {
            if (objectPath.get(item, 'width')) {
                classes += ' kt-menu__submenu--fixed';
            }
        }
        if (objectPath.get(item, 'pull')) {
            classes += ' kt-menu__submenu--pull';
        }
        return classes;
    };
    /**
     * Check Menu is active
     * @param item: any
     */
    MenuHorizontalComponent.prototype.isMenuItemIsActive = function (item) {
        if (item.submenu) {
            return this.isMenuRootItemIsActive(item);
        }
        if (!item.page) {
            return false;
        }
        return this.currentRouteUrl.indexOf(item.page) !== -1;
    };
    /**
     * Check Menu Root Item is active
     * @param item: any
     */
    MenuHorizontalComponent.prototype.isMenuRootItemIsActive = function (item) {
        if (item.submenu.items) {
            for (var _i = 0, _a = item.submenu.items; _i < _a.length; _i++) {
                var subItem = _a[_i];
                if (this.isMenuItemIsActive(subItem)) {
                    return true;
                }
            }
        }
        if (item.submenu.columns) {
            for (var _b = 0, _c = item.submenu.columns; _b < _c.length; _b++) {
                var subItem = _c[_b];
                if (this.isMenuItemIsActive(subItem)) {
                    return true;
                }
            }
        }
        if (typeof item.submenu[Symbol.iterator] === 'function') {
            for (var _d = 0, _e = item.submenu; _d < _e.length; _d++) {
                var subItem = _e[_d];
                var active = this.isMenuItemIsActive(subItem);
                if (active) {
                    return true;
                }
            }
        }
        return false;
    };
    MenuHorizontalComponent = __decorate([
        Component({
            selector: 'kt-menu-horizontal',
            templateUrl: './menu-horizontal.component.html',
            styleUrls: ['./menu-horizontal.component.scss'],
            changeDetection: ChangeDetectionStrategy.OnPush,
        }),
        __metadata("design:paramtypes", [ElementRef,
            HtmlClassService,
            MenuHorizontalService,
            MenuConfigService,
            LayoutConfigService,
            Router,
            Renderer2,
            ChangeDetectorRef])
    ], MenuHorizontalComponent);
    return MenuHorizontalComponent;
}());
export { MenuHorizontalComponent };
//# sourceMappingURL=menu-horizontal.component.js.map