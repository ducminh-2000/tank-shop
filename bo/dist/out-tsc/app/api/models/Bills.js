var Bills = /** @class */ (function () {
    function Bills(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `Bills`.
     */
    Bills.getModelName = function () {
        return "Bills";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of Bills for dynamic purposes.
    **/
    Bills.factory = function (data) {
        return new Bills(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    Bills.getModelDefinition = function () {
        return {
            name: 'Bills',
            plural: 'Bills',
            path: 'Bills',
            idName: 'id',
            properties: {
                "id": {
                    name: 'id',
                    type: 'string'
                },
                "code": {
                    name: 'code',
                    type: 'string'
                },
                "userCode": {
                    name: 'userCode',
                    type: 'string'
                },
                "recive": {
                    name: 'recive',
                    type: 'string'
                },
                "to": {
                    name: 'to',
                    type: 'string'
                },
                "shipper": {
                    name: 'shipper',
                    type: 'string'
                },
                "phone": {
                    name: 'phone',
                    type: 'string'
                },
                "shipmentCode": {
                    name: 'shipmentCode',
                    type: 'string'
                },
                "weight": {
                    name: 'weight',
                    type: 'string'
                },
                "isHidden": {
                    name: 'isHidden',
                    type: 'boolean',
                    default: false
                },
                "pickDate": {
                    name: 'pickDate',
                    type: 'Date'
                },
                "createdAt": {
                    name: 'createdAt',
                    type: 'Date'
                },
                "updatedAt": {
                    name: 'updatedAt',
                    type: 'Date'
                },
                "userId": {
                    name: 'userId',
                    type: 'number'
                },
                "shipBrandId": {
                    name: 'shipBrandId',
                    type: 'number'
                },
            },
            relations: {
                statuses: {
                    name: 'statuses',
                    type: 'Status[]',
                    model: 'Status',
                    relationType: 'hasMany',
                    modelThrough: 'StatusOfBill',
                    keyThrough: 'statusId',
                    keyFrom: 'id',
                    keyTo: 'billsId'
                },
                statusOfBill: {
                    name: 'statusOfBill',
                    type: 'StatusOfBill[]',
                    model: 'StatusOfBill',
                    relationType: 'hasMany',
                    keyFrom: 'id',
                    keyTo: 'billsId'
                },
                stores: {
                    name: 'stores',
                    type: 'Stores[]',
                    model: 'Stores',
                    relationType: 'hasMany',
                    modelThrough: 'StatusOfBill',
                    keyThrough: 'storesId',
                    keyFrom: 'id',
                    keyTo: 'billsId'
                },
                user: {
                    name: 'user',
                    type: 'User',
                    model: 'User',
                    relationType: 'belongsTo',
                    keyFrom: 'userId',
                    keyTo: 'id'
                },
                foreignBill: {
                    name: 'foreignBill',
                    type: 'ForeignBill[]',
                    model: 'ForeignBill',
                    relationType: 'hasMany',
                    keyFrom: 'id',
                    keyTo: 'billsId'
                },
                shipBrand: {
                    name: 'shipBrand',
                    type: 'ShipBrand',
                    model: 'ShipBrand',
                    relationType: 'belongsTo',
                    keyFrom: 'shipBrandId',
                    keyTo: 'id'
                },
            }
        };
    };
    return Bills;
}());
export { Bills };
//# sourceMappingURL=Bills.js.map