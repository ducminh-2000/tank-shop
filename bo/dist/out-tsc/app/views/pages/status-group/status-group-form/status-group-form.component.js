import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Account, StatusGroup } from 'src/app/api/models';
import { LoopBackAuth } from 'src/app/api/services/core';
import { StatusGroupApi } from 'src/app/api/services/custom';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
var StatusGroupFormComponent = /** @class */ (function () {
    function StatusGroupFormComponent(bsModalRef, auth, notifierService, statusGroupApi, spinner) {
        this.bsModalRef = bsModalRef;
        this.auth = auth;
        this.notifierService = notifierService;
        this.statusGroupApi = statusGroupApi;
        this.spinner = spinner;
        this.roles = [];
        this.currentuser = new Account();
        this.isRoleAdmin = false;
        this.isRoleSuperAdmin = false;
        this.admins = [];
    }
    StatusGroupFormComponent.prototype.ngOnInit = function () {
        this.currentuser = this.auth.getCurrentUserData();
        this.isRoleSuperAdmin =
            this.currentuser.roles[0].name === 'SUPERADMIN' ||
                this.currentuser.roles[0].name === 'ADMIN';
        this.isRoleAdmin = this.currentuser.roles[0].name === 'ADMIN';
        this.onResult = new EventEmitter();
    };
    StatusGroupFormComponent.prototype.upsertstatusGroup = function () {
        var _this = this;
        this.spinner.show().then().catch();
        var observable;
        if (this.statusGroup.id) {
            observable = (this.statusGroupApi.patchAttributes(this.statusGroup.id, this.statusGroup));
        }
        else {
            observable = (this.statusGroupApi.create(this.statusGroup));
        }
        observable.subscribe(function (res) {
            _this.onResult.emit({
                isCancelled: false,
            });
            _this.bsModalRef.hide();
            _this.notifierService.success('Thành công !');
            _this.spinner.hide().then().catch();
        }, function (error) {
            _this.spinner.hide().then().catch();
            _this.notifierService.error('Thất bại!');
        });
    };
    StatusGroupFormComponent.prototype.cancel = function () {
        this.onResult.emit({
            isCancelled: true,
        });
        this.bsModalRef.hide();
    };
    StatusGroupFormComponent.prototype.compareById = function (item1, item2) {
        return item1 && item2 && (item1.id === item2.id || item1 === item2);
    };
    StatusGroupFormComponent.prototype.compareByName = function (item1, item2) {
        return item1 && item2
            ? item1.toLowerCase() === item2.toLowerCase()
            : (item2 = item1);
    };
    __decorate([
        Input(),
        __metadata("design:type", StatusGroup)
    ], StatusGroupFormComponent.prototype, "statusGroup", void 0);
    StatusGroupFormComponent = __decorate([
        Component({
            selector: 'app-status-group-form',
            templateUrl: './status-group-form.component.html',
            styleUrls: ['./status-group-form.component.scss']
        }),
        __metadata("design:paramtypes", [BsModalRef,
            LoopBackAuth,
            NotificationWrapperService,
            StatusGroupApi,
            NgxSpinnerService])
    ], StatusGroupFormComponent);
    return StatusGroupFormComponent;
}());
export { StatusGroupFormComponent };
//# sourceMappingURL=status-group-form.component.js.map