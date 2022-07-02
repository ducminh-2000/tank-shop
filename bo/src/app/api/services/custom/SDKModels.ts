/* tslint:disable */
import { Injectable } from '@angular/core';
import { Account } from '../../models/Account';
import { AccountToken } from '../../models/AccountToken';
import { Tank } from '../../models/Tank';
import { FlowOut } from '../../models/FlowOut';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Account: Account,
    AccountToken: AccountToken,
    Tank: Tank,
    FlowOut: FlowOut,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
