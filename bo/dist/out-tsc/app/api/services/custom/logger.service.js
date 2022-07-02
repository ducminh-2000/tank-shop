import { __decorate } from "tslib";
/* tslint:disable */
import { Injectable } from '@angular/core';
import { LoopBackConfig } from '../../lb.config';
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@johncasarrubias>
* @module LoggerService
* @license MIT
* @description
* Console Log wrapper that can be disabled in production mode
**/
var LoggerService = /** @class */ (function () {
    function LoggerService() {
    }
    LoggerService.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (LoopBackConfig.debuggable())
            console.log.apply(console, args);
    };
    LoggerService.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (LoopBackConfig.debuggable())
            console.info.apply(console, args);
    };
    LoggerService.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (LoopBackConfig.debuggable())
            console.error.apply(console, args);
    };
    LoggerService.prototype.count = function (arg) {
        if (LoopBackConfig.debuggable())
            console.count(arg);
    };
    LoggerService.prototype.group = function (arg) {
        if (LoopBackConfig.debuggable())
            console.count(arg);
    };
    LoggerService.prototype.groupEnd = function () {
        if (LoopBackConfig.debuggable())
            console.groupEnd();
    };
    LoggerService.prototype.profile = function (arg) {
        if (LoopBackConfig.debuggable())
            console.count(arg);
    };
    // profileEnd() {
    //   if (LoopBackConfig.debuggable())
    //   console.profileEnd();
    // }
    LoggerService.prototype.time = function (arg) {
        if (LoopBackConfig.debuggable())
            console.time(arg);
    };
    LoggerService.prototype.timeEnd = function (arg) {
        if (LoopBackConfig.debuggable())
            console.timeEnd(arg);
    };
    LoggerService = __decorate([
        Injectable()
    ], LoggerService);
    return LoggerService;
}());
export { LoggerService };
//# sourceMappingURL=logger.service.js.map