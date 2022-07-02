/* tslint:disable */
var Container = /** @class */ (function () {
    function Container(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `Container`.
     */
    Container.getModelName = function () {
        return "Container";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of Container for dynamic purposes.
    **/
    Container.factory = function (data) {
        return new Container(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    Container.getModelDefinition = function () {
        return {
            name: 'Container',
            plural: 'Containers',
            path: 'Containers',
            idName: 'id',
            properties: {
                "id": {
                    name: 'id',
                    type: 'number'
                },
            },
            relations: {}
        };
    };
    return Container;
}());
export { Container };
//# sourceMappingURL=Container.js.map