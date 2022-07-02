/* tslint:disable */
import {
  AccountToken
} from '../index';

declare var Object: any;
export interface AccountInterface {
  "name"?: string;
  "dateOfBirth"?: Date;
  "kind"?: string;
  "sex"?: boolean;
  "avatar"?: string;
  "address"?: string;
  "country"?: string;
  "realm"?: string;
  "username"?: string;
  "email": string;
  "emailVerified"?: boolean;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "password"?: string;
  roles?: any[];
  accessTokens?: AccountToken[];
}

export class Account implements AccountInterface {
  "name": string;
  "dateOfBirth": Date;
  "kind": string;
  "sex": boolean;
  "avatar": string;
  "address": string;
  "country": string;
  "realm": string;
  "username": string;
  "email": string;
  "emailVerified": boolean;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  "password": string;
  roles: any[];
  accessTokens: AccountToken[];
  constructor(data?: AccountInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Account`.
   */
  public static getModelName() {
    return "Account";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Account for dynamic purposes.
  **/
  public static factory(data: AccountInterface): Account{
    return new Account(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Account',
      plural: 'Accounts',
      path: 'Accounts',
      idName: 'id',
      properties: {
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
      }
    }
  }
}
