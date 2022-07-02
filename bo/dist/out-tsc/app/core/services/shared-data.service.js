import { __decorate, __metadata } from "tslib";
import { EventEmitter, Injectable } from '@angular/core';
var SharedDataService = /** @class */ (function () {
    function SharedDataService() {
        this.signalCountMessage = new EventEmitter();
    }
    SharedDataService.prototype.countReadMessage = function (len) {
        this.signalCountMessage.emit(len);
    };
    SharedDataService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], SharedDataService);
    return SharedDataService;
}());
export { SharedDataService };
//# sourceMappingURL=shared-data.service.js.map