import { __decorate, __metadata } from "tslib";
// Angular
import { Directive, ElementRef, Input } from '@angular/core';
// ObjectPath
import * as objectPath from 'object-path';
/**
 * Configure Header
 */
var HeaderDirective = /** @class */ (function () {
    /**
     * Directive Constructor
     * @param el: ElementRef
     */
    function HeaderDirective(el) {
        this.el = el;
        this.options = {};
    }
    /**
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
     */
    /**
     * After view init
     */
    HeaderDirective.prototype.ngAfterViewInit = function () {
        this.setupOptions();
        var header = new KTHeader(this.el.nativeElement, this.options);
    };
    /**
     * Setup options to header
     */
    HeaderDirective.prototype.setupOptions = function () {
        this.options = {
            classic: {
                desktop: true,
                mobile: false
            },
        };
        if (this.el.nativeElement.getAttribute('data-ktheader-minimize') == '1') {
            objectPath.set(this.options, 'minimize', {
                desktop: {
                    on: 'kt-header--minimize'
                },
                mobile: {
                    on: 'kt-header--minimize'
                }
            });
            objectPath.set(this.options, 'offset', {
                desktop: 200,
                mobile: 150
            });
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeaderDirective.prototype, "options", void 0);
    HeaderDirective = __decorate([
        Directive({
            selector: '[ktHeader]',
            exportAs: 'ktHeader',
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], HeaderDirective);
    return HeaderDirective;
}());
export { HeaderDirective };
//# sourceMappingURL=header.directive.js.map