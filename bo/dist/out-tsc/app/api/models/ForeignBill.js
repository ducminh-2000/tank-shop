var ForeignBill = /** @class */ (function () {
    function ForeignBill(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `ForeignBill`.
     */
    ForeignBill.getModelName = function () {
        return "ForeignBill";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of ForeignBill for dynamic purposes.
    **/
    ForeignBill.factory = function (data) {
        return new ForeignBill(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    ForeignBill.getModelDefinition = function () {
        return {
            name: 'ForeignBill',
            plural: 'ForeignBills',
            path: 'ForeignBills',
            idName: 'id',
            properties: {
                "code": {
                    name: 'code',
                    type: 'string'
                },
                "note1": {
                    name: 'note1',
                    type: 'string'
                },
                "note2": {
                    name: 'note2',
                    type: 'string'
                },
                "boxName": {
                    name: 'boxName',
                    type: 'string'
                },
                "userName": {
                    name: 'userName',
                    type: 'string'
                },
                "brandName": {
                    name: 'brandName',
                    type: 'string'
                },
                "numberOrder": {
                    name: 'numberOrder',
                    type: 'string'
                },
                "quantity": {
                    name: 'quantity',
                    type: 'string'
                },
                "isHidden": {
                    name: 'isHidden',
                    type: 'boolean',
                    default: false
                },
                "pickDate": {
                    name: 'pickDate',
                    type: 'Date',
                    default: new Date(0)
                },
                "id": {
                    name: 'id',
                    type: 'number'
                },
                "billId": {
                    name: 'billId',
                    type: 'string'
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
                statuses: {
                    name: 'statuses',
                    type: 'Status[]',
                    model: 'Status',
                    relationType: 'hasMany',
                    modelThrough: 'StatusOfForeignBill',
                    keyThrough: 'statusId',
                    keyFrom: 'id',
                    keyTo: 'foreignBillId'
                },
                statusOfForeignBill: {
                    name: 'statusOfForeignBill',
                    type: 'StatusOfForeignBill[]',
                    model: 'StatusOfForeignBill',
                    relationType: 'hasMany',
                    keyFrom: 'id',
                    keyTo: 'foreignBillId'
                },
                stores: {
                    name: 'stores',
                    type: 'Stores[]',
                    model: 'Stores',
                    relationType: 'hasMany',
                    modelThrough: 'StatusOfForeignBill',
                    keyThrough: 'storesId',
                    keyFrom: 'id',
                    keyTo: 'foreignBillId'
                },
            }
        };
    };
    return ForeignBill;
}());
export { ForeignBill };
//# sourceMappingURL=ForeignBill.js.map