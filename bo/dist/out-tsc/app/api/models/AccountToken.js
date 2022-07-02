var AccountToken = /** @class */ (function () {
    function AccountToken(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `AccountToken`.
     */
    AccountToken.getModelName = function () {
        return "AccountToken";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of AccountToken for dynamic purposes.
    **/
    AccountToken.factory = function (data) {
        return new AccountToken(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    AccountToken.getModelDefinition = function () {
        return {
            name: 'AccountToken',
            plural: 'AccountTokens',
            path: 'AccountTokens',
            idName: 'id',
            properties: {
                "id": {
                    name: 'id',
                    type: 'string'
                },
                "ttl": {
                    name: 'ttl',
                    type: 'number',
                    default: 1209600
                },
                "scopes": {
                    name: 'scopes',
                    type: 'Array&lt;any&gt;'
                },
                "created": {
                    name: 'created',
                    type: 'Date'
                },
                "userId": {
                    name: 'userId',
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
                user: {
                    name: 'user',
                    type: 'Account',
                    model: 'Account',
                    relationType: 'belongsTo',
                    keyFrom: 'userId',
                    keyTo: 'id'
                },
            }
        };
    };
    return AccountToken;
}());
export { AccountToken };
//# sourceMappingURL=AccountToken.js.map