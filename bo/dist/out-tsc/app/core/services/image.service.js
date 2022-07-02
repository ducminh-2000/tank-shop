import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { LoopBackAuth, LoopBackConfig } from '../../api';
import { DEFAULT_AVATAR } from '../constant/constant';
var ImageService = /** @class */ (function () {
    function ImageService(auth) {
        this.auth = auth;
    }
    ImageService.prototype.getImageUrl = function (containerId, imageName) {
        if (imageName) {
            return "".concat(LoopBackConfig.getPath(), "/").concat(LoopBackConfig.getApiVersion(), "/Attachments/").concat(containerId, "/download/").concat(imageName, "?access_token=").concat(this.auth.getAccessTokenId());
        }
        else {
            return DEFAULT_AVATAR;
        }
    };
    ImageService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [LoopBackAuth])
    ], ImageService);
    return ImageService;
}());
export { ImageService };
//# sourceMappingURL=image.service.js.map