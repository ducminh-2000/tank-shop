var Country = /** @class */ (function () {
    function Country(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `Country`.
     */
    Country.getModelName = function () {
        return "Country";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of Country for dynamic purposes.
    **/
    Country.factory = function (data) {
        return new Country(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    Country.getModelDefinition = function () {
        return {
            name: 'Country',
            plural: 'Countries',
            path: 'Countries',
            idName: 'id',
            properties: {
                "name": {
                    name: 'name',
                    type: 'string'
                },
                "description": {
                    name: 'description',
                    type: 'string'
                },
                "id": {
                    name: 'id',
                    type: 'number'
                },
            },
            relations: {
                stores: {
                    name: 'stores',
                    type: 'Stores[]',
                    model: 'Stores',
                    relationType: 'hasMany',
                    keyFrom: 'id',
                    keyTo: 'countryId'
                },
            }
        };
    };
    return Country;
}());
export { Country };
//# sourceMappingURL=Country.js.map