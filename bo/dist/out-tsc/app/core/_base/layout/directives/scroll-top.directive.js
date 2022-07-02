import { __decorate, __metadata } from "tslib";
// Angular
import { Directive, ElementRef, Input } from '@angular/core';
/**
 * Scroll to top
 */
var ScrollTopDirective = /** @class */ (function () {
    /**
     * Directive Conctructor
     * @param el: ElementRef
     */
    function ScrollTopDirective(el) {
        this.el = el;
    }
    /**
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
     */
    /**
     * After view init
     */
    ScrollTopDirective.prototype.ngAfterViewInit = function () {
        this.scrollTop = new KTScrolltop(this.el.nativeElement, this.options);
    };
    /**
     * Returns ScrollTop
     */
    ScrollTopDirective.prototype.getScrollTop = function () {
        return this.scrollTop;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ScrollTopDirective.prototype, "options", void 0);
    ScrollTopDirective = __decorate([
        Directive({
            selector: '[ktScrollTop]'
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], ScrollTopDirective);
    return ScrollTopDirective;
}());
export { ScrollTopDirective };
//# sourceMappingURL=scroll-top.directive.js.map