import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { Observable } from 'rxjs';
import { LoopBackConfig } from '../../api';
var UploadFileService = /** @class */ (function () {
    function UploadFileService(httpClient, ng2ImgMaxService) {
        this.httpClient = httpClient;
        this.ng2ImgMaxService = ng2ImgMaxService;
    }
    UploadFileService.prototype.uploadImage = function (file, containerId) {
        var _this = this;
        var url = "".concat(LoopBackConfig.getPath(), "/").concat(LoopBackConfig.getApiVersion(), "/Containers/") + containerId + '/upload';
        return Observable.create(function (obs) {
            // this.ng2ImgMaxService.resizeImage(file, 400, 300)
            //   .pipe(flatMap((blob => {
            var formData = new FormData();
            // formData.append('file', blob);
            formData.append('file', file, (new Date().toISOString()) + '_' + file.name);
            formData.append('fileName', file.name);
            formData.append('size', file.size);
            formData.append('type', file.type);
            //     return this.httpClient.post(url, formData);
            //   })))
            _this.httpClient.post(url, formData)
                .subscribe(function (result) {
                obs.next(result);
            }, function (error) {
                obs.error(error);
            });
        });
    };
    UploadFileService.prototype.uploadFile = function (file) {
        var formData = new FormData();
        formData.append('file', file);
        return this.httpClient
            .post("".concat(LoopBackConfig.getPath(), "/").concat(LoopBackConfig.getApiVersion(), "/Containers/files/upload"), formData);
    };
    UploadFileService.prototype.loadImage = function (url) {
        return this.httpClient
            // load the image as a blob
            .get("".concat(LoopBackConfig.getPath(), "/").concat(LoopBackConfig.getApiVersion(), "/Containers/photos/download/").concat(url), { responseType: 'blob' });
        // create an object url of that blob that we can use in the src attribute
    };
    UploadFileService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            Ng2ImgMaxService])
    ], UploadFileService);
    return UploadFileService;
}());
export { UploadFileService };
//# sourceMappingURL=upload-file-service.js.map