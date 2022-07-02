import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { TranslateService } from '@ngx-translate/core';
var NotificationWrapperService = /** @class */ (function () {
    function NotificationWrapperService(notifierService, translateService) {
        this.notifierService = notifierService;
        this.translateService = translateService;
    }
    NotificationWrapperService.prototype.success = function (message) {
        this.notifierService.notify('success', this.translateService.instant(message));
    };
    NotificationWrapperService.prototype.infor = function (message) {
        this.notifierService.notify('info', this.translateService.instant(message));
    };
    NotificationWrapperService.prototype.error = function (message) {
        this.notifierService.notify('error', this.translateService.instant(message));
    };
    NotificationWrapperService.prototype.warning = function (message) {
        this.notifierService.notify('warning', this.translateService.instant(message));
    };
    NotificationWrapperService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [NotifierService,
            TranslateService])
    ], NotificationWrapperService);
    return NotificationWrapperService;
}());
export { NotificationWrapperService };
//# sourceMappingURL=notification-wrapper.service.js.map