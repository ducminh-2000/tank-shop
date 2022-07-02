import { __decorate, __metadata } from "tslib";
// Angular
import { Directive, ElementRef, Input } from '@angular/core';
/**
 * Setup off Convas
 */
var OffcanvasDirective = /** @class */ (function () {
    /**
     * Directive Constructor
     * @param el: ElementRef
     */
    function OffcanvasDirective(el) {
        this.el = el;
    }
    /**
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
     */
    /**
     * After view init
     */
    OffcanvasDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.offcanvas = new KTOffcanvas(_this.el.nativeElement, _this.options);
        });
    };
    /**
     * Returns the offCanvas
     */
    OffcanvasDirective.prototype.getOffcanvas = function () {
        return this.offcanvas;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], OffcanvasDirective.prototype, "options", void 0);
    OffcanvasDirective = __decorate([
        Directive({
            selector: '[ktOffcanvas]',
            exportAs: 'ktOffcanvas',
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], OffcanvasDirective);
    return OffcanvasDirective;
}());
export { OffcanvasDirective };
//# sourceMappingURL=offcanvas.directive.js.map