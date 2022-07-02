import { __decorate } from "tslib";
// Angular
import { Pipe } from '@angular/core';
// Object-Path
import * as objectPath from 'object-path';
/**
 * Returns object from parent object
 */
var GetObjectPipe = /** @class */ (function () {
    function GetObjectPipe() {
    }
    /**
     * Transform
     *
     * @param value: any
     * @param args: any
     */
    GetObjectPipe.prototype.transform = function (value, args) {
        return objectPath.get(value, args);
    };
    GetObjectPipe = __decorate([
        Pipe({
            name: 'getObject'
        })
    ], GetObjectPipe);
    return GetObjectPipe;
}());
export { GetObjectPipe };
//# sourceMappingURL=get-object.pipe.js.map