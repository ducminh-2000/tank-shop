var StatusOfForeignBill = /** @class */ (function () {
    function StatusOfForeignBill(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `StatusOfForeignBill`.
     */
    StatusOfForeignBill.getModelName = function () {
        return "StatusOfForeignBill";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of StatusOfForeignBill for dynamic purposes.
    **/
    StatusOfForeignBill.factory = function (data) {
        return new StatusOfForeignBill(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    StatusOfForeignBill.getModelDefinition = function () {
        return {
            name: 'StatusOfForeignBill',
            plural: 'StatusOfForeignBills',
            path: 'StatusOfForeignBills',
            idName: 'id',
            properties: {
                "id": {
                    name: 'id',
                    type: 'number'
                },
                "foreignBillId": {
                    name: 'foreignBillId',
                    type: 'number'
                },
                "statusId": {
                    name: 'statusId',
                    type: 'number'
                },
                "storesId": {
                    name: 'storesId',
                    type: 'number'
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
                foreignBill: {
                    name: 'foreignBill',
                    type: 'ForeignBill',
                    model: 'ForeignBill',
                    relationType: 'belongsTo',
                    keyFrom: 'foreignBillId',
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
            }
        };
    };
    return StatusOfForeignBill;
}());
export { StatusOfForeignBill };
//# sourceMappingURL=StatusOfForeignBill.js.map