import { __decorate, __metadata } from "tslib";
// Angular
import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
var NotificationComponent = /** @class */ (function () {
    /**
     * Component constructor
     *
     * @param sanitizer: DomSanitizer
     */
    function NotificationComponent(sanitizer) {
        this.sanitizer = sanitizer;
        this.isNotify = 0;
        // Set icon class name
        this.icon = 'flaticon2-bell-alarm-symbol';
        // Set skin color, default to light
        this.skin = 'light';
        this.type = 'success';
    }
    NotificationComponent.prototype.backGroundStyle = function () {
        if (!this.bgImage) {
            return 'none';
        }
        return 'url(' + this.bgImage + ')';
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NotificationComponent.prototype, "dot", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NotificationComponent.prototype, "isNotify", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], NotificationComponent.prototype, "pulse", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], NotificationComponent.prototype, "pulseLight", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NotificationComponent.prototype, "icon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NotificationComponent.prototype, "iconType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], NotificationComponent.prototype, "useSVG", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NotificationComponent.prototype, "bgImage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NotificationComponent.prototype, "skin", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NotificationComponent.prototype, "type", void 0);
    NotificationComponent = __decorate([
        Component({
            selector: 'kt-notification',
            templateUrl: './notification.component.html',
            styleUrls: ['notification.component.scss']
        }),
        __metadata("design:paramtypes", [DomSanitizer])
    ], NotificationComponent);
    return NotificationComponent;
}());
export { NotificationComponent };
//# sourceMappingURL=notification.component.js.map