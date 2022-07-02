import { __decorate, __extends, __metadata, __param } from "tslib";
/* tslint:disable */
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SDKModels } from './SDKModels';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackConfig } from '../../lb.config';
import { LoopBackAuth } from '../core/auth.service';
import { ErrorHandler } from '../core/error.service';
import { SocketConnection } from '../../sockets/socket.connections';
/**
 * Api services for the `StatusOfForeignBill` model.
 */
var StatusOfForeignBillApi = /** @class */ (function (_super) {
    __extends(StatusOfForeignBillApi, _super);
    function StatusOfForeignBillApi(http, connection, models, auth, errorHandler) {
        var _this = _super.call(this, http, connection, models, auth, errorHandler) || this;
        _this.http = http;
        _this.connection = connection;
        _this.models = models;
        _this.auth = auth;
        _this.errorHandler = errorHandler;
        return _this;
    }
    /**
     * Fetches belongsTo relation foreignBill.
     *
     * @param {any} id StatusOfForeignBill id
     *
     * @param {boolean} refresh
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `StatusOfForeignBill` object.)
     * </em>
     */
    StatusOfForeignBillApi.prototype.getForeignBill = function (id, refresh, customHeaders) {
        if (refresh === void 0) { refresh = {}; }
        var _method = "GET";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/StatusOfForeignBills/:id/foreignBill";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        if (typeof refresh !== 'undefined' && refresh !== null)
            _urlParams.refresh = refresh;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Fetches belongsTo relation status.
     *
     * @param {any} id StatusOfForeignBill id
     *
     * @param {boolean} refresh
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `StatusOfForeignBill` object.)
     * </em>
     */
    StatusOfForeignBillApi.prototype.getStatus = function (id, refresh, customHeaders) {
        if (refresh === void 0) { refresh = {}; }
        var _method = "GET";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/StatusOfForeignBills/:id/status";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        if (typeof refresh !== 'undefined' && refresh !== null)
            _urlParams.refresh = refresh;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Fetches belongsTo relation stores.
     *
     * @param {any} id StatusOfForeignBill id
     *
     * @param {boolean} refresh
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `StatusOfForeignBill` object.)
     * </em>
     */
    StatusOfForeignBillApi.prototype.getStores = function (id, refresh, customHeaders) {
        if (refresh === void 0) { refresh = {}; }
        var _method = "GET";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/StatusOfForeignBills/:id/stores";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        if (typeof refresh !== 'undefined' && refresh !== null)
            _urlParams.refresh = refresh;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Patch an existing model instance or insert a new one into the data source.
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{object}` - Model instance data
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `StatusOfForeignBill` object.)
     * </em>
     */
    StatusOfForeignBillApi.prototype.patchOrCreate = function (data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PATCH";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/StatusOfForeignBills";
        var _routeParams = {};
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Patch attributes for a model instance and persist it into the data source.
     *
     * @param {any} id StatusOfForeignBill id
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{object}` - An object of model property name/value pairs
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `StatusOfForeignBill` object.)
     * </em>
     */
    StatusOfForeignBillApi.prototype.patchAttributes = function (id, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PATCH";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/StatusOfForeignBills/:id";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * create data with array
     *
     * @param {object} data Request data.
     *
     *  - `arr` – `{any}` -
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `StatusOfForeignBill` object.)
     * </em>
     */
    StatusOfForeignBillApi.prototype.createArray = function (arr, customHeaders) {
        if (arr === void 0) { arr = {}; }
        var _method = "POST";
        var _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/StatusOfForeignBills/createArray";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        if (typeof arr !== 'undefined' && arr !== null)
            _urlParams.arr = arr;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * The name of the model represented by this $resource,
     * i.e. `StatusOfForeignBill`.
     */
    StatusOfForeignBillApi.prototype.getModelName = function () {
        return "StatusOfForeignBill";
    };
    StatusOfForeignBillApi = __decorate([
        Injectable(),
        __param(0, Inject(HttpClient)),
        __param(1, Inject(SocketConnection)),
        __param(2, Inject(SDKModels)),
        __param(3, Inject(LoopBackAuth)),
        __param(4, Optional()),
        __param(4, Inject(ErrorHandler)),
        __metadata("design:paramtypes", [HttpClient,
            SocketConnection,
            SDKModels,
            LoopBackAuth,
            ErrorHandler])
    ], StatusOfForeignBillApi);
    return StatusOfForeignBillApi;
}(BaseLoopBackApi));
export { StatusOfForeignBillApi };
//# sourceMappingURL=StatusOfForeignBill.js.map