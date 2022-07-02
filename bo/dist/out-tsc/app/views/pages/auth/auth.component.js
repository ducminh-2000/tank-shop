import { __decorate, __metadata } from "tslib";
// Angular
import { Component, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
// Layout
import { LayoutConfigService, TranslationService } from '../../../core/_base/layout';
// Auth
var AuthComponent = /** @class */ (function () {
    /**
     * Component constructor
     *
     * @param el
     * @param render
     * @param layoutConfigService: LayoutConfigService
     * @param translationService: TranslationService
     */
    function AuthComponent(el, render, layoutConfigService, translationService) {
        this.el = el;
        this.render = render;
        this.layoutConfigService = layoutConfigService;
        this.translationService = translationService;
        // Public properties
        this.today = Date.now();
    }
    /**
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
     */
    /**
     * On init
     */
    AuthComponent.prototype.ngOnInit = function () {
        // this.translationService.setLanguage('fr');
        this.headerLogo = this.layoutConfigService.getLogo();
    };
    /**
     * Load CSS for this specific page only, and destroy when navigate away
     * @param styleUrl
     */
    AuthComponent.prototype.loadCSS = function (styleUrl) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var styleElement = document.createElement('link');
            styleElement.href = styleUrl;
            styleElement.type = 'text/css';
            styleElement.rel = 'stylesheet';
            styleElement.onload = resolve;
            _this.render.appendChild(_this.el.nativeElement, styleElement);
        });
    };
    AuthComponent = __decorate([
        Component({
            selector: 'kt-auth',
            templateUrl: './auth.component.html',
            styleUrls: ['./auth.component.scss'],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [ElementRef,
            Renderer2,
            LayoutConfigService,
            TranslationService])
    ], AuthComponent);
    return AuthComponent;
}());
export { AuthComponent };
//# sourceMappingURL=auth.component.js.map