import { __decorate, __metadata } from "tslib";
// Angular
import { Component, Input } from '@angular/core';
// Lodash
import { shuffle } from 'lodash';
var Widget1Component = /** @class */ (function () {
    function Widget1Component() {
    }
    /**
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
     */
    /**
     * On init
     */
    Widget1Component.prototype.ngOnInit = function () {
        if (!this.data) {
            this.data = shuffle([
                {
                    title: 'Member Profit',
                    desc: 'Awerage Weekly Profit',
                    value: '+$17,800',
                    valueClass: 'kt-font-brand'
                }, {
                    title: 'Orders',
                    desc: 'Weekly Customer Orders',
                    value: '+$1,800',
                    valueClass: 'kt-font-danger'
                }, {
                    title: 'Issue Reports',
                    desc: 'System bugs and issues',
                    value: '-27,49%',
                    valueClass: 'kt-font-success'
                }
            ]);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], Widget1Component.prototype, "data", void 0);
    Widget1Component = __decorate([
        Component({
            selector: 'kt-widget1',
            templateUrl: './widget1.component.html',
            styleUrls: ['./widget1.component.scss']
        })
    ], Widget1Component);
    return Widget1Component;
}());
export { Widget1Component };
//# sourceMappingURL=widget1.component.js.map