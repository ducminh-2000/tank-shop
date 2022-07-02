var Status = /** @class */ (function () {
    function Status(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `Status`.
     */
    Status.getModelName = function () {
        return "Status";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of Status for dynamic purposes.
    **/
    Status.factory = function (data) {
        return new Status(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    Status.getModelDefinition = function () {
        return {
            name: 'Status',
            plural: 'Statuses',
            path: 'Statuses',
            idName: 'id',
            properties: {
                "id": {
                    name: 'id',
                    type: 'number'
                },
                "name": {
                    name: 'name',
                    type: 'string'
                },
                "order": {
                    name: 'order',
                    type: 'number'
                },
                "description": {
                    name: 'description',
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
                "statusGroupId": {
                    name: 'statusGroupId',
                    type: 'number'
                },
                "groupId": {
                    name: 'groupId',
                    type: 'number'
                },
            },
            relations: {
                bill: {
                    name: 'bill',
                    type: 'ForeignBill[]',
                    model: 'ForeignBill',
                    relationType: 'hasMany',
                    modelThrough: 'StatusOfBill',
                    keyThrough: 'foreignBillId',
                    keyFrom: 'id',
                    keyTo: 'statusId'
                },
                foreignBill: {
                    name: 'foreignBill',
                    type: 'ForeignBill[]',
                    model: 'ForeignBill',
                    relationType: 'hasMany',
                    modelThrough: 'StatusOfForeignBill',
                    keyThrough: 'foreignBillId',
                    keyFrom: 'id',
                    keyTo: 'statusId'
                },
                group: {
                    name: 'group',
                    type: 'StatusGroup',
                    model: 'StatusGroup',
                    relationType: 'belongsTo',
                    keyFrom: 'groupId',
                    keyTo: 'id'
                },
            }
        };
    };
    return Status;
}());
export { Status };
//# sourceMappingURL=Status.js.map