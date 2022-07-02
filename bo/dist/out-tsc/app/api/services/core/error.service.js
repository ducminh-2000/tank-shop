import { __decorate } from "tslib";
/* tslint:disable */
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
/**
 * Default error handler
 */
var ErrorHandler = /** @class */ (function () {
    function ErrorHandler() {
    }
    ErrorHandler.prototype.handleError = function (errorResponse) {
        return throwError(errorResponse.error.error || 'Server error');
    };
    ErrorHandler = __decorate([
        Injectable()
    ], ErrorHandler);
    return ErrorHandler;
}());
export { ErrorHandler };
//# sourceMappingURL=error.service.js.map