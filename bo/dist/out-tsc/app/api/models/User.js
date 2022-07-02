var User = /** @class */ (function () {
    function User(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `User`.
     */
    User.getModelName = function () {
        return "User";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of User for dynamic purposes.
    **/
    User.factory = function (data) {
        return new User(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    User.getModelDefinition = function () {
        return {
            name: 'User',
            plural: 'Users',
            path: 'Users',
            idName: 'id',
            properties: {
                "userCode": {
                    name: 'userCode',
                    type: 'string'
                },
                "name": {
                    name: 'name',
                    type: 'string'
                },
                "address": {
                    name: 'address',
                    type: 'string'
                },
                "phoneNumber": {
                    name: 'phoneNumber',
                    type: 'string'
                },
                "email": {
                    name: 'email',
                    type: 'string'
                },
                "dateRegister": {
                    name: 'dateRegister',
                    type: 'Date'
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
            relations: {
                bills: {
                    name: 'bills',
                    type: 'Bills[]',
                    model: 'Bills',
                    relationType: 'hasMany',
                    keyFrom: 'id',
                    keyTo: 'userId'
                },
            }
        };
    };
    return User;
}());
export { User };
//# sourceMappingURL=User.js.map