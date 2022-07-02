import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forkJoin, Subject } from 'rxjs';
import { ForeignBillApi, UserApi } from 'src/app/api';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
var PopupUpdateUsercodeComponent = /** @class */ (function () {
    function PopupUpdateUsercodeComponent(userApi, foreignBillApi, notifierService, translateService, bsModalRef) {
        this.userApi = userApi;
        this.foreignBillApi = foreignBillApi;
        this.notifierService = notifierService;
        this.translateService = translateService;
        this.bsModalRef = bsModalRef;
        this._onDestroy = new Subject();
        this.users = [];
        this.userForm = new FormControl();
        this.onResult = new EventEmitter();
    }
    PopupUpdateUsercodeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.onResult = new EventEmitter();
        this.userApi.find().subscribe(function (data) {
            _this.users = data;
        });
    };
    PopupUpdateUsercodeComponent.prototype.overlayZindex = function () {
        var sdk = document.getElementsByClassName('cdk-overlay-container');
        sdk[0].setAttribute('style', 'z-index:1056');
    };
    PopupUpdateUsercodeComponent.prototype.update = function () {
        var _this = this;
        var sub = [];
        for (var _i = 0, _a = this.bills; _i < _a.length; _i++) {
            var i = _a[_i];
            i.userName = this.userName.name;
            sub.push(this.foreignBillApi.patchAttributes(i.id, i));
        }
        forkJoin(sub).subscribe(function () {
            _this.bsModalRef.hide();
            _this.onResult.emit({
                isCancelled: false,
            });
            _this.notifierService.success(_this.translateService.instant('Thành công'));
        }, function (error) {
            _this.bsModalRef.hide();
            _this.notifierService.error(_this.translateService.instant('Thất bại'));
        });
    };
    PopupUpdateUsercodeComponent.prototype.ngOnDestroy = function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    PopupUpdateUsercodeComponent.prototype.cancel = function () {
        this.onResult.emit({
            isCancelled: true,
        });
        this.bsModalRef.hide();
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], PopupUpdateUsercodeComponent.prototype, "bills", void 0);
    PopupUpdateUsercodeComponent = __decorate([
        Component({
            selector: 'app-popup-update-usercode',
            templateUrl: './popup-update-usercode.component.html',
            styleUrls: ['./popup-update-usercode.component.scss']
        }),
        __metadata("design:paramtypes", [UserApi,
            ForeignBillApi,
            NotificationWrapperService,
            TranslateService,
            BsModalRef])
    ], PopupUpdateUsercodeComponent);
    return PopupUpdateUsercodeComponent;
}());
export { PopupUpdateUsercodeComponent };
//# sourceMappingURL=popup-update-usercode.component.js.map