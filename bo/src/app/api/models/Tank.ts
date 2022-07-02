/* tslint:disable */
import {
  FlowOut
} from '../index';

declare var Object: any;
export interface TankInterface {
  "name"?: string;
  "status"?: string;
  "tempt"?: number;
  "flow"?: number;
  "fuel"?: string;
  "m3"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  flowOuts?: FlowOut[];
}

export class Tank implements TankInterface {
  "name": string;
  "status": string;
  "tempt": number;
  "flow": number;
  "fuel": string;
  "m3": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  flowOuts: FlowOut[];
  constructor(data?: TankInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Tank`.
   */
  public static getModelName() {
    return "Tank";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Tank for dynamic purposes.
  **/
  public static factory(data: TankInterface): Tank{
    return new Tank(data);
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
      name: 'Tank',
      plural: 'Tanks',
      path: 'Tanks',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string',
          default: 'status'
        },
        "status": {
          name: 'status',
          type: 'string'
        },
        "tempt": {
          name: 'tempt',
          type: 'number'
        },
        "flow": {
          name: 'flow',
          type: 'number'
        },
        "fuel": {
          name: 'fuel',
          type: 'string'
        },
        "m3": {
          name: 'm3',
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
      relations: {
        flowOuts: {
          name: 'flowOuts',
          type: 'FlowOut[]',
          model: 'FlowOut',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'tankId'
        },
      }
    }
  }
}
