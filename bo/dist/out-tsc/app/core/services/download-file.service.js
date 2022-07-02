import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoopBackAuth, LoopBackConfig } from '../../api';
import { FileSaverService } from 'ngx-filesaver';
var DownloadFileService = /** @class */ (function () {
    function DownloadFileService(http, fileSaverService, auth) {
        this.http = http;
        this.fileSaverService = fileSaverService;
        this.auth = auth;
    }
    DownloadFileService.prototype.getFileUrl = function (path, container) {
        return "".concat(LoopBackConfig.getPath(), "/").concat(LoopBackConfig.getApiVersion(), "/Containers/").concat(container, "/download/").concat(path, "?access_token=").concat(this.auth.getAccessTokenId());
    };
    DownloadFileService.prototype.downloadFile = function (path, container) {
        var _this = this;
        this.http.get(this.getFileUrl(path, container), {
            observe: 'response',
            responseType: 'blob'
        }).subscribe(function (res) {
            _this.fileSaverService.save(res.body, path);
        });
    };
    DownloadFileService.prototype.handleDownload = function (path, container, name) {
        var _this = this;
        this.http.get(this.getFileUrl(path, container), {
            observe: 'response',
            responseType: 'blob'
        }).subscribe(function (res) {
            _this.fileSaverService.save(res.body, name);
        });
    };
    DownloadFileService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            FileSaverService,
            LoopBackAuth])
    ], DownloadFileService);
    return DownloadFileService;
}());
export { DownloadFileService };
//# sourceMappingURL=download-file.service.js.map