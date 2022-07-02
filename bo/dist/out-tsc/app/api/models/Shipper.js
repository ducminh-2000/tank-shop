/* tslint:disable */
var Shipper = /** @class */ (function () {
    function Shipper(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `Shipper`.
     */
    Shipper.getModelName = function () {
        return "Shipper";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of Shipper for dynamic purposes.
    **/
    Shipper.factory = function (data) {
        return new Shipper(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    Shipper.getModelDefinition = function () {
        return {
            name: 'Shipper',
            plural: 'Shippers',
            path: 'Shippers',
            idName: 'id',
            properties: {
                "name": {
                    name: 'name',
                    type: 'string'
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
            },
            relations: {}
        };
    };
    return Shipper;
}());
export { Shipper };
//# sourceMappingURL=Shipper.js.map