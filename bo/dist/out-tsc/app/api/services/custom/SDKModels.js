import { __decorate } from "tslib";
/* tslint:disable */
import { Injectable } from '@angular/core';
import { Account } from '../../models/Account';
import { AccountToken } from '../../models/AccountToken';
import { Status } from '../../models/Status';
import { Stores } from '../../models/Stores';
import { Bills } from '../../models/Bills';
import { StatusOfBill } from '../../models/StatusOfBill';
import { User } from '../../models/User';
import { ForeignBill } from '../../models/ForeignBill';
import { Shipper } from '../../models/Shipper';
import { ShipBrand } from '../../models/ShipBrand';
import { StatusOfForeignBill } from '../../models/StatusOfForeignBill';
import { Country } from '../../models/Country';
import { StatusGroup } from '../../models/StatusGroup';
import { Container } from '../../models/Container';
var SDKModels = /** @class */ (function () {
    function SDKModels() {
        this.models = {
            Account: Account,
            AccountToken: AccountToken,
            Status: Status,
            Stores: Stores,
            Bills: Bills,
            StatusOfBill: StatusOfBill,
            User: User,
            ForeignBill: ForeignBill,
            Shipper: Shipper,
            ShipBrand: ShipBrand,
            StatusOfForeignBill: StatusOfForeignBill,
            Country: Country,
            StatusGroup: StatusGroup,
            Container: Container,
        };
    }
    SDKModels.prototype.get = function (modelName) {
        return this.models[modelName];
    };
    SDKModels.prototype.getAll = function () {
        return this.models;
    };
    SDKModels.prototype.getModelNames = function () {
        return Object.keys(this.models);
    };
    SDKModels = __decorate([
        Injectable()
    ], SDKModels);
    return SDKModels;
}());
export { SDKModels };
//# sourceMappingURL=SDKModels.js.map