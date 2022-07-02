import { __decorate } from "tslib";
// Angular
import { Injectable } from '@angular/core';
// RxJS
import { BehaviorSubject } from 'rxjs';
var LayoutRefService = /** @class */ (function () {
    function LayoutRefService() {
        // Public properties
        this.layoutRefs$ = new BehaviorSubject({});
        this.layoutRefs = {};
    }
    /**
     * Add element to Ref
     *
     * @param name: any
     * @param element: any
     */
    LayoutRefService.prototype.addElement = function (name, element) {
        var obj = {};
        obj[name] = element;
        this.layoutRefs = Object.assign({}, this.layoutRefs, obj);
        this.layoutRefs$.next(this.layoutRefs);
    };
    LayoutRefService = __decorate([
        Injectable()
    ], LayoutRefService);
    return LayoutRefService;
}());
export { LayoutRefService };
//# sourceMappingURL=layout-ref.service.js.map