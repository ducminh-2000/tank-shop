import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import * as objectPath from 'object-path';
// Layout
import { LayoutConfigService, MenuAsideService } from '../../../core/_base/layout';
import { HtmlClassService } from '../html-class.service';
var AsideLeftComponent = /** @class */ (function () {
    /**
     * Component Conctructor
     *
     * @param htmlClassService: HtmlClassService
     * @param menuAsideService
     * @param layoutConfigService: LayouConfigService
     * @param router: Router
     * @param render: Renderer2
     * @param cdr: ChangeDetectorRef
     */
    function AsideLeftComponent(htmlClassService, menuAsideService, layoutConfigService, router, render, cdr) {
        this.htmlClassService = htmlClassService;
        this.menuAsideService = menuAsideService;
        this.layoutConfigService = layoutConfigService;
        this.router = router;
        this.render = render;
        this.cdr = cdr;
        this.currentRouteUrl = '';
        this.menuCanvasOptions = {
            baseClass: 'kt-aside',
            overlay: true,
            closeBy: 'kt_aside_close_btn',
            toggleBy: {
                target: 'kt_aside_mobile_toggler',
                state: 'kt-header-mobile__toolbar-toggler--active'
            }
        };
        this.menuOptions = {
            // vertical scroll
            scroll: null,
            // submenu setup
            submenu: {
                desktop: {
                    // by default the menu mode set to accordion in desktop mode
                    default: 'dropdown',
                },
                tablet: 'accordion',
                mobile: 'accordion' // menu set to accordion in mobile mode
            },
            // accordion setup
            accordion: {
                expandAll: false // allow having multiple expanded accordions in the menu
            }
        };
    }
    AsideLeftComponent.prototype.ngAfterViewInit = function () {
    };
    AsideLeftComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentRouteUrl = this.router.url.split(/[?#]/)[0];
        this.router.events
            .pipe(filter(function (event) { return event instanceof NavigationEnd; }))
            .subscribe(function (event) {
            _this.currentRouteUrl = _this.router.url.split(/[?#]/)[0];
            _this.cdr.markForCheck();
        });
        var config = this.layoutConfigService.getConfig();
        if (objectPath.get(config, 'aside.menu.dropdown')) {
            this.render.setAttribute(this.asideMenu.nativeElement, 'data-ktmenu-dropdown', '1');
            // tslint:disable-next-line:max-line-length
            this.render.setAttribute(this.asideMenu.nativeElement, 'data-ktmenu-dropdown-timeout', objectPath.get(config, 'aside.menu.submenu.dropdown.hover-timeout'));
        }
    };
    /**
     * Check Menu is active
     * @param item: any
     */
    AsideLeftComponent.prototype.isMenuItemIsActive = function (item) {
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
    AsideLeftComponent.prototype.isMenuRootItemIsActive = function (item) {
        var result = false;
        for (var _i = 0, _a = item.submenu; _i < _a.length; _i++) {
            var subItem = _a[_i];
            result = this.isMenuItemIsActive(subItem);
            if (result) {
                return true;
            }
        }
        return false;
    };
    /**
     * Use for fixed left aside menu, to show menu on mouseenter event.
     * @param e Event
     */
    AsideLeftComponent.prototype.mouseEnter = function (e) {
        var _this = this;
        // check if the left aside menu is fixed
        if (document.body.classList.contains('kt-aside--fixed')) {
            if (this.outsideTm) {
                clearTimeout(this.outsideTm);
                this.outsideTm = null;
            }
            this.insideTm = setTimeout(function () {
                // if the left aside menu is minimized
                if (document.body.classList.contains('kt-aside--minimize') && KTUtil.isInResponsiveRange('desktop')) {
                    // show the left aside menu
                    _this.render.removeClass(document.body, 'kt-aside--minimize');
                    _this.render.addClass(document.body, 'kt-aside--minimize-hover');
                }
            }, 50);
        }
    };
    /**
     * Use for fixed left aside menu, to show menu on mouseenter event.
     * @param e Event
     */
    AsideLeftComponent.prototype.mouseLeave = function (e) {
        var _this = this;
        if (document.body.classList.contains('kt-aside--fixed')) {
            if (this.insideTm) {
                clearTimeout(this.insideTm);
                this.insideTm = null;
            }
            this.outsideTm = setTimeout(function () {
                // if the left aside menu is expand
                if (document.body.classList.contains('kt-aside--minimize-hover') && KTUtil.isInResponsiveRange('desktop')) {
                    // hide back the left aside menu
                    _this.render.removeClass(document.body, 'kt-aside--minimize-hover');
                    _this.render.addClass(document.body, 'kt-aside--minimize');
                }
            }, 100);
        }
    };
    /**
     * Returns Submenu CSS Class Name
     * @param item: any
     */
    AsideLeftComponent.prototype.getItemCssClasses = function (item) {
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
        // custom class for menu item
        var customClass = objectPath.get(item, 'custom-class');
        if (customClass) {
            classes += ' ' + customClass;
        }
        if (objectPath.get(item, 'icon-only')) {
            classes += ' kt-menu__item--icon-only';
        }
        return classes;
    };
    AsideLeftComponent.prototype.getItemAttrSubmenuToggle = function (item) {
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
    __decorate([
        ViewChild('asideMenu', { static: true }),
        __metadata("design:type", ElementRef)
    ], AsideLeftComponent.prototype, "asideMenu", void 0);
    AsideLeftComponent = __decorate([
        Component({
            selector: 'kt-aside-left',
            templateUrl: './aside-left.component.html',
            styleUrls: ['./aside-left.component.scss'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [HtmlClassService,
            MenuAsideService,
            LayoutConfigService,
            Router,
            Renderer2,
            ChangeDetectorRef])
    ], AsideLeftComponent);
    return AsideLeftComponent;
}());
export { AsideLeftComponent };
//# sourceMappingURL=aside-left.component.js.map