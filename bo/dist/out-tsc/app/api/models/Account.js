var Account = /** @class */ (function () {
    function Account(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `Account`.
     */
    Account.getModelName = function () {
        return "Account";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of Account for dynamic purposes.
    **/
    Account.factory = function (data) {
        return new Account(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    Account.getModelDefinition = function () {
        return {
            name: 'Account',
            plural: 'Accounts',
            path: 'Accounts',
            idName: 'id',
            properties: {
                "id": {
                    name: 'id',
                    type: 'string'
                },
                "name": {
                    name: 'name',
                    type: 'string'
                },
                "dateOfBirth": {
                    name: 'dateOfBirth',
                    type: 'Date'
                },
                "kind": {
                    name: 'kind',
                    type: 'string'
                },
                "sex": {
                    name: 'sex',
                    type: 'boolean'
                },
                "avatar": {
                    name: 'avatar',
                    type: 'string'
                },
                "address": {
                    name: 'address',
                    type: 'string'
                },
                "country": {
                    name: 'country',
                    type: 'string'
                },
                "realm": {
                    name: 'realm',
                    type: 'string'
                },
                "username": {
                    name: 'username',
                    type: 'string'
                },
                "email": {
                    name: 'email',
                    type: 'string'
                },
                "emailVerified": {
                    name: 'emailVerified',
                    type: 'boolean'
                },
                "createdAt": {
                    name: 'createdAt',
                    type: 'Date'
                },
                "updatedAt": {
                    name: 'updatedAt',
                    type: 'Date'
                },
                "storesId": {
                    name: 'storesId',
                    type: 'number'
                },
                "password": {
                    name: 'password',
                    type: 'string'
                },
            },
            relations: {
                roles: {
                    name: 'roles',
                    type: 'any[]',
                    model: '',
                    relationType: 'hasMany',
                    modelThrough: 'RoleMapping',
                    keyThrough: 'roleId',
                    keyFrom: 'id',
                    keyTo: 'principalId'
                },
                accessTokens: {
                    name: 'accessTokens',
                    type: 'AccountToken[]',
                    model: 'AccountToken',
                    relationType: 'hasMany',
                    keyFrom: 'id',
                    keyTo: 'userId'
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
    return Account;
}());
export { Account };
//# sourceMappingURL=Account.js.map