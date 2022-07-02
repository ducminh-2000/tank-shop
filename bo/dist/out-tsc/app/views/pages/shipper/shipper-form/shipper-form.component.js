import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Account, Shipper } from 'src/app/api/models';
import { LoopBackAuth } from 'src/app/api/services/core';
import { ShipperApi } from 'src/app/api/services/custom';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
var ShipperFormComponent = /** @class */ (function () {
    function ShipperFormComponent(bsModalRef, auth, notifierService, shipperApi, spinner) {
        this.bsModalRef = bsModalRef;
        this.auth = auth;
        this.notifierService = notifierService;
        this.shipperApi = shipperApi;
        this.spinner = spinner;
        this.roles = [];
        this.currentuser = new Account();
        this.isRoleAdmin = false;
        this.isRoleSuperAdmin = false;
        this.admins = [];
    }
    ShipperFormComponent.prototype.ngOnInit = function () {
        this.currentuser = this.auth.getCurrentUserData();
        this.isRoleSuperAdmin =
            this.currentuser.roles[0].name === 'SUPERADMIN' ||
                this.currentuser.roles[0].name === 'ADMIN';
        this.isRoleAdmin = this.currentuser.roles[0].name === 'ADMIN';
        this.onResult = new EventEmitter();
    };
    ShipperFormComponent.prototype.upsertShipper = function () {
        var _this = this;
        this.spinner.show().then().catch();
        var observable;
        if (this.shipper.id) {
            observable = (this.shipperApi.patchAttributes(this.shipper.id, this.shipper));
        }
        else {
            observable = (this.shipperApi.create(this.shipper));
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
    ShipperFormComponent.prototype.cancel = function () {
        this.onResult.emit({
            isCancelled: true,
        });
        this.bsModalRef.hide();
    };
    ShipperFormComponent.prototype.compareById = function (item1, item2) {
        return item1 && item2 && (item1.id === item2.id || item1 === item2);
    };
    ShipperFormComponent.prototype.compareByName = function (item1, item2) {
        return item1 && item2
            ? item1.toLowerCase() === item2.toLowerCase()
            : (item2 = item1);
    };
    __decorate([
        Input(),
        __metadata("design:type", Shipper)
    ], ShipperFormComponent.prototype, "shipper", void 0);
    ShipperFormComponent = __decorate([
        Component({
            selector: 'app-shipper-form',
            templateUrl: './shipper-form.component.html',
            styleUrls: ['./shipper-form.component.scss']
        }),
        __metadata("design:paramtypes", [BsModalRef,
            LoopBackAuth,
            NotificationWrapperService,
            ShipperApi,
            NgxSpinnerService])
    ], ShipperFormComponent);
    return ShipperFormComponent;
}());
export { ShipperFormComponent };
//# sourceMappingURL=shipper-form.component.js.map