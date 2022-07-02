import { __decorate } from "tslib";
/* tslint:disable */
/**
* @module SDKModule
* @author Jonathan Casarrubias <t:@johncasarrubias> <gh:jonathan-casarrubias>
* @license MIT 2016 Jonathan Casarrubias
* @version 2.1.0
* @description
* The SDKModule is a generated Software Development Kit automatically built by
* the LoopBack SDK Builder open source module.
*
* The SDKModule provides Angular 2 >= RC.5 support, which means that NgModules
* can import this Software Development Kit as follows:
*
*
* APP Route Module Context
* ============================================================================
* import { NgModule }       from '@angular/core';
* import { BrowserModule }  from '@angular/platform-browser';
* // App Root
* import { AppComponent }   from './app.component';
* // Feature Modules
* import { SDK[Browser|Node|Native]Module } from './shared/sdk/sdk.module';
* // Import Routing
* import { routing }        from './app.routing';
* @NgModule({
*  imports: [
*    BrowserModule,
*    routing,
*    SDK[Browser|Node|Native]Module.forRoot()
*  ],
*  declarations: [ AppComponent ],
*  bootstrap:    [ AppComponent ]
* })
* export class AppModule { }
*
**/
import { ErrorHandler } from './services/core/error.service';
import { LoopBackAuth } from './services/core/auth.service';
import { LoggerService } from './services/custom/logger.service';
import { SDKModels } from './services/custom/SDKModels';
import { InternalStorage, SDKStorage } from './storage/storage.swaps';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CookieBrowser } from './storage/cookie.browser';
import { StorageBrowser } from './storage/storage.browser';
import { SocketBrowser } from './sockets/socket.browser';
import { SocketDriver } from './sockets/socket.driver';
import { SocketConnection } from './sockets/socket.connections';
import { RealTime } from './services/core/real.time';
import { AccountApi } from './services/custom/Account';
import { AccountTokenApi } from './services/custom/AccountToken';
import { StatusApi } from './services/custom/Status';
import { StoresApi } from './services/custom/Stores';
import { BillsApi } from './services/custom/Bills';
import { StatusOfBillApi } from './services/custom/StatusOfBill';
import { UserApi } from './services/custom/User';
import { ForeignBillApi } from './services/custom/ForeignBill';
import { ShipperApi } from './services/custom/Shipper';
import { ShipBrandApi } from './services/custom/ShipBrand';
import { StatusOfForeignBillApi } from './services/custom/StatusOfForeignBill';
import { CountryApi } from './services/custom/Country';
import { StatusGroupApi } from './services/custom/StatusGroup';
import { ContainerApi } from './services/custom/Container';
/**
* @module SDKBrowserModule
* @description
* This module should be imported when building a Web Application in the following scenarios:
*
*  1.- Regular web application
*  2.- Angular universal application (Browser Portion)
*  3.- Progressive applications (Angular Mobile, Ionic, WebViews, etc)
**/
var SDKBrowserModule = /** @class */ (function () {
    function SDKBrowserModule() {
    }
    SDKBrowserModule_1 = SDKBrowserModule;
    SDKBrowserModule.forRoot = function (internalStorageProvider) {
        if (internalStorageProvider === void 0) { internalStorageProvider = {
            provide: InternalStorage,
            useClass: CookieBrowser
        }; }
        return {
            ngModule: SDKBrowserModule_1,
            providers: [
                LoopBackAuth,
                LoggerService,
                SDKModels,
                RealTime,
                AccountApi,
                AccountTokenApi,
                StatusApi,
                StoresApi,
                BillsApi,
                StatusOfBillApi,
                UserApi,
                ForeignBillApi,
                ShipperApi,
                ShipBrandApi,
                StatusOfForeignBillApi,
                CountryApi,
                StatusGroupApi,
                ContainerApi,
                internalStorageProvider,
                { provide: SDKStorage, useClass: StorageBrowser },
                { provide: SocketDriver, useClass: SocketBrowser }
            ]
        };
    };
    var SDKBrowserModule_1;
    SDKBrowserModule = SDKBrowserModule_1 = __decorate([
        NgModule({
            imports: [CommonModule, HttpClientModule],
            declarations: [],
            exports: [],
            providers: [
                ErrorHandler,
                SocketConnection
            ]
        })
    ], SDKBrowserModule);
    return SDKBrowserModule;
}());
export { SDKBrowserModule };
/**
* Have Fun!!!
* - Jon
**/
export * from './models/index';
export * from './services/index';
export * from './lb.config';
export * from './storage/storage.swaps';
export { CookieBrowser } from './storage/cookie.browser';
export { StorageBrowser } from './storage/storage.browser';
//# sourceMappingURL=index.js.map