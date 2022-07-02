var StatusGroup = /** @class */ (function () {
    function StatusGroup(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `StatusGroup`.
     */
    StatusGroup.getModelName = function () {
        return "StatusGroup";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of StatusGroup for dynamic purposes.
    **/
    StatusGroup.factory = function (data) {
        return new StatusGroup(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    StatusGroup.getModelDefinition = function () {
        return {
            name: 'StatusGroup',
            plural: 'StatusGroups',
            path: 'StatusGroups',
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
                "description": {
                    name: 'description',
                    type: 'string'
                },
                "order": {
                    name: 'order',
                    type: 'string'
                },
                "id": {
                    name: 'id',
                    type: 'number'
                },
            },
            relations: {
                status: {
                    name: 'status',
                    type: 'Status[]',
                    model: 'Status',
                    relationType: 'hasMany',
                    keyFrom: 'id',
                    keyTo: 'statusGroupId'
                },
            }
        };
    };
    return StatusGroup;
}());
export { StatusGroup };
//# sourceMappingURL=StatusGroup.js.map