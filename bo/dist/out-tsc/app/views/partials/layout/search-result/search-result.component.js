import { __decorate, __metadata } from "tslib";
// Angular
import { Component, Input } from '@angular/core';
var SearchResultComponent = /** @class */ (function () {
    function SearchResultComponent() {
    }
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], SearchResultComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SearchResultComponent.prototype, "noRecordText", void 0);
    SearchResultComponent = __decorate([
        Component({
            selector: 'kt-search-result',
            templateUrl: './search-result.component.html',
            styleUrls: ['./search-result.component.scss']
        })
    ], SearchResultComponent);
    return SearchResultComponent;
}());
export { SearchResultComponent };
//# sourceMappingURL=search-result.component.js.map