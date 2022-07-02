var StatusOfBill = /** @class */ (function () {
    function StatusOfBill(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `StatusOfBill`.
     */
    StatusOfBill.getModelName = function () {
        return "StatusOfBill";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of StatusOfBill for dynamic purposes.
    **/
    StatusOfBill.factory = function (data) {
        return new StatusOfBill(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    StatusOfBill.getModelDefinition = function () {
        return {
            name: 'StatusOfBill',
            plural: 'StatusOfBills',
            path: 'StatusOfBills',
            idName: 'id',
            properties: {
                "id": {
                    name: 'id',
                    type: 'number'
                },
                "billId": {
                    name: 'billId',
                    type: 'string'
                },
                "statusId": {
                    name: 'statusId',
                    type: 'number'
                },
                "storesId": {
                    name: 'storesId',
                    type: 'number'
                },
                "billsId": {
                    name: 'billsId',
                    type: 'string'
                },
                "createdAt": {
                    name: 'createdAt',
                    type: 'Date'
                },
                "updatedAt": {
                    name: 'updatedAt',
                    type: 'Date'
                },
                "shipperId": {
                    name: 'shipperId',
                    type: 'number'
                },
                "shipBrandId": {
                    name: 'shipBrandId',
                    type: 'number'
                },
            },
            relations: {
                bill: {
                    name: 'bill',
                    type: 'Bills',
                    model: 'Bills',
                    relationType: 'belongsTo',
                    keyFrom: 'billId',
                    keyTo: 'id'
                },
                status: {
                    name: 'status',
                    type: 'Status',
                    model: 'Status',
                    relationType: 'belongsTo',
                    keyFrom: 'statusId',
                    keyTo: 'id'
                },
                stores: {
                    name: 'stores',
                    type: 'Stores',
                    model: 'Stores',
                    relationType: 'belongsTo',
                    keyFrom: 'storesId',
                    keyTo: 'id'
                },
                shipper: {
                    name: 'shipper',
                    type: 'Shipper',
                    model: 'Shipper',
                    relationType: 'belongsTo',
                    keyFrom: 'shipperId',
                    keyTo: 'id'
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
    return StatusOfBill;
}());
export { StatusOfBill };
//# sourceMappingURL=StatusOfBill.js.map