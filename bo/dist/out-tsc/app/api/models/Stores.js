var Stores = /** @class */ (function () {
    function Stores(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `Stores`.
     */
    Stores.getModelName = function () {
        return "Stores";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of Stores for dynamic purposes.
    **/
    Stores.factory = function (data) {
        return new Stores(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    Stores.getModelDefinition = function () {
        return {
            name: 'Stores',
            plural: 'Stores',
            path: 'Stores',
            idName: 'id',
            properties: {
                "code": {
                    name: 'code',
                    type: 'string'
                },
                "name": {
                    name: 'name',
                    type: 'string'
                },
                "hotline": {
                    name: 'hotline',
                    type: 'string'
                },
                "address": {
                    name: 'address',
                    type: 'string'
                },
                "owner": {
                    name: 'owner',
                    type: 'string'
                },
                "capacity": {
                    name: 'capacity',
                    type: 'number'
                },
                "region": {
                    name: 'region',
                    type: 'string'
                },
                "isHidden": {
                    name: 'isHidden',
                    type: 'boolean',
                    default: false
                },
                "id": {
                    name: 'id',
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
                "countryId": {
                    name: 'countryId',
                    type: 'number'
                },
            },
            relations: {
                accounts: {
                    name: 'accounts',
                    type: 'Account[]',
                    model: 'Account',
                    relationType: 'hasMany',
                    keyFrom: 'id',
                    keyTo: 'storesId'
                },
                statusOfBills: {
                    name: 'statusOfBills',
                    type: 'StatusOfBill[]',
                    model: 'StatusOfBill',
                    relationType: 'hasMany',
                    keyFrom: 'id',
                    keyTo: 'storesId'
                },
                foreignBill: {
                    name: 'foreignBill',
                    type: 'ForeignBill[]',
                    model: 'ForeignBill',
                    relationType: 'hasMany',
                    modelThrough: 'StatusOfBill',
                    keyThrough: 'foreignBillId',
                    keyFrom: 'id',
                    keyTo: 'storesId'
                },
                statusOfForeignBills: {
                    name: 'statusOfForeignBills',
                    type: 'StatusOfForeignBill[]',
                    model: 'StatusOfForeignBill',
                    relationType: 'hasMany',
                    keyFrom: 'id',
                    keyTo: 'storesId'
                },
                country: {
                    name: 'country',
                    type: 'Country',
                    model: 'Country',
                    relationType: 'belongsTo',
                    keyFrom: 'countryId',
                    keyTo: 'id'
                },
            }
        };
    };
    return Stores;
}());
export { Stores };
//# sourceMappingURL=Stores.js.map