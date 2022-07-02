import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Account, ShipBrand } from 'src/app/api/models';
import { LoopBackAuth } from 'src/app/api/services/core';
import { ShipBrandApi } from 'src/app/api/services/custom';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
var ShipBrandFormComponent = /** @class */ (function () {
    function ShipBrandFormComponent(bsModalRef, auth, notifierService, shipBrandApi, spinner) {
        this.bsModalRef = bsModalRef;
        this.auth = auth;
        this.notifierService = notifierService;
        this.shipBrandApi = shipBrandApi;
        this.spinner = spinner;
        this.roles = [];
        this.currentuser = new Account();
        this.isRoleAdmin = false;
        this.isRoleSuperAdmin = false;
        this.admins = [];
    }
    ShipBrandFormComponent.prototype.ngOnInit = function () {
        this.currentuser = this.auth.getCurrentUserData();
        this.isRoleSuperAdmin =
            this.currentuser.roles[0].name === 'SUPERADMIN' ||
                this.currentuser.roles[0].name === 'ADMIN';
        this.isRoleAdmin = this.currentuser.roles[0].name === 'ADMIN';
        this.onResult = new EventEmitter();
    };
    ShipBrandFormComponent.prototype.upsertShipBrand = function () {
        var _this = this;
        this.spinner.show().then().catch();
        var observable;
        if (this.shipBrand.id) {
            observable = (this.shipBrandApi.patchAttributes(this.shipBrand.id, this.shipBrand));
        }
        else {
            observable = (this.shipBrandApi.create(this.shipBrand));
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
    ShipBrandFormComponent.prototype.cancel = function () {
        this.onResult.emit({
            isCancelled: true,
        });
        this.bsModalRef.hide();
    };
    ShipBrandFormComponent.prototype.compareById = function (item1, item2) {
        return item1 && item2 && (item1.id === item2.id || item1 === item2);
    };
    ShipBrandFormComponent.prototype.compareByName = function (item1, item2) {
        return item1 && item2
            ? item1.toLowerCase() === item2.toLowerCase()
            : (item2 = item1);
    };
    __decorate([
        Input(),
        __metadata("design:type", ShipBrand)
    ], ShipBrandFormComponent.prototype, "shipBrand", void 0);
    ShipBrandFormComponent = __decorate([
        Component({
            selector: 'app-ship-brand-form',
            templateUrl: './ship-brand-form.component.html',
            styleUrls: ['./ship-brand-form.component.scss']
        }),
        __metadata("design:paramtypes", [BsModalRef,
            LoopBackAuth,
            NotificationWrapperService,
            ShipBrandApi,
            NgxSpinnerService])
    ], ShipBrandFormComponent);
    return ShipBrandFormComponent;
}());
export { ShipBrandFormComponent };
//# sourceMappingURL=ship-brand-form.component.js.map