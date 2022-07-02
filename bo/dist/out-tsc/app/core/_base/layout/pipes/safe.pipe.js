import { __decorate, __metadata } from "tslib";
// Angular
import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Sanitize HTML
 */
var SafePipe = /** @class */ (function () {
    /**
     * Pipe Constructor
     *
     * @param _sanitizer: DomSanitezer
     */
    function SafePipe(_sanitizer) {
        this._sanitizer = _sanitizer;
    }
    /**
     * Transform
     *
     * @param value: string
     * @param type: string
     */
    SafePipe.prototype.transform = function (value, type) {
        switch (type) {
            case 'html':
                return this._sanitizer.bypassSecurityTrustHtml(value);
            case 'style':
                return this._sanitizer.bypassSecurityTrustStyle(value);
            case 'script':
                return this._sanitizer.bypassSecurityTrustScript(value);
            case 'url':
                return this._sanitizer.bypassSecurityTrustUrl(value);
            case 'resourceUrl':
                return this._sanitizer.bypassSecurityTrustResourceUrl(value);
            default:
                return this._sanitizer.bypassSecurityTrustHtml(value);
        }
    };
    SafePipe = __decorate([
        Pipe({
            name: 'safe'
        }),
        __metadata("design:paramtypes", [DomSanitizer])
    ], SafePipe);
    return SafePipe;
}());
export { SafePipe };
//# sourceMappingURL=safe.pipe.js.map