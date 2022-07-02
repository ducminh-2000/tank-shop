/* tslint:disable */
import {
  Tank
} from '../index';

declare var Object: any;
export interface FlowOutInterface {
  "flowOut"?: number;
  "id"?: number;
  "tankId"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  tank?: Tank;
}

export class FlowOut implements FlowOutInterface {
  "flowOut": number;
  "id": number;
  "tankId": number;
  "createdAt": Date;
  "updatedAt": Date;
  tank: Tank;
  constructor(data?: FlowOutInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `FlowOut`.
   */
  public static getModelName() {
    return "FlowOut";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of FlowOut for dynamic purposes.
  **/
  public static factory(data: FlowOutInterface): FlowOut{
    return new FlowOut(data);
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
      name: 'FlowOut',
      plural: 'FlowOuts',
      path: 'FlowOuts',
      idName: 'id',
      properties: {
        "flowOut": {
          name: 'flowOut',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "tankId": {
          name: 'tankId',
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
        tank: {
          name: 'tank',
          type: 'Tank',
          model: 'Tank',
          relationType: 'belongsTo',
                  keyFrom: 'tankId',
          keyTo: 'id'
        },
      }
    }
  }
}
