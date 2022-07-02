/* tslint:disable */
var ShipBrand = /** @class */ (function () {
    function ShipBrand(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `ShipBrand`.
     */
    ShipBrand.getModelName = function () {
        return "ShipBrand";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of ShipBrand for dynamic purposes.
    **/
    ShipBrand.factory = function (data) {
        return new ShipBrand(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    ShipBrand.getModelDefinition = function () {
        return {
            name: 'ShipBrand',
            plural: 'ShipBrands',
            path: 'ShipBrands',
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
    return ShipBrand;
}());
export { ShipBrand };
//# sourceMappingURL=ShipBrand.js.map