import { __decorate } from "tslib";
// Angular
import { Pipe } from '@angular/core';
/**
 * Returns only first letter of string
 */
var FirstLetterPipe = /** @class */ (function () {
    function FirstLetterPipe() {
    }
    /**
     * Transform
     *
     * @param value: any
     * @param args: any
     */
    FirstLetterPipe.prototype.transform = function (value, args) {
        return value.split(' ').map(function (n) { return n[0]; }).join('');
    };
    FirstLetterPipe = __decorate([
        Pipe({
            name: 'firstLetter'
        })
    ], FirstLetterPipe);
    return FirstLetterPipe;
}());
export { FirstLetterPipe };
//# sourceMappingURL=first-letter.pipe.js.map