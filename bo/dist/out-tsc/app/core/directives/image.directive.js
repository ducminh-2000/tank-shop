import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, Input } from '@angular/core';
import { DEFAULT_AVATAR } from '../constant/constant';
import { LoopBackAuth, LoopBackConfig } from '../../api';
import { DomSanitizer } from '@angular/platform-browser';
var ImageDirective = /** @class */ (function () {
    function ImageDirective(el, sanitizer, auth) {
        this.el = el;
        this.sanitizer = sanitizer;
        this.auth = auth;
        this.changeImage();
    }
    ImageDirective.prototype.ngOnChanges = function (changes) {
        if (changes.path) {
            this.changeImage();
        }
    };
    ImageDirective.prototype.changeImage = function () {
        switch (this.el.nativeElement.tagName) {
            case 'IMG':
                this.el.nativeElement.src = this.getImageUrl(this.path);
                break;
            case 'DIV':
                this.el.nativeElement.style.background = "url(".concat(this.getImageUrl(this.path), ") transparent");
                break;
            case 'SOURCE':
                this.el.nativeElement.src = this.getImageUrl(this.path);
                break;
        }
    };
    ImageDirective.prototype.getImageUrl = function (path) {
        if (path) {
            if (path.toString().includes('http')) {
                return path;
            }
            return "".concat(LoopBackConfig.getPath(), "/").concat(LoopBackConfig.getApiVersion(), "/Containers/").concat(this.containerId, "/download/").concat(path, "?access_token=").concat(this.auth.getAccessTokenId());
        }
        else {
            return DEFAULT_AVATAR;
        }
    };
    ImageDirective.prototype.getVideoUrl = function (path) {
        if (path) {
            if (path.includes('https://ql6625.live')) {
                return path;
            }
            if (path.includes('download')) {
                var videoPathWithDownload = "".concat(LoopBackConfig.getPath(), " /").concat(LoopBackConfig.getApiVersion(), "/Containers/").concat(path);
                return videoPathWithDownload;
            }
            var videoPath = "".concat(LoopBackConfig.getPath(), " /").concat(LoopBackConfig.getApiVersion(), "/Containers/").concat(this.containerId, "/download/").concat(path);
            return videoPath;
        }
    };
    ImageDirective.prototype.setDefaultAvatar = function (image) {
        image.src = DEFAULT_AVATAR;
    };
    __decorate([
        Input('appImage'),
        __metadata("design:type", String)
    ], ImageDirective.prototype, "path", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ImageDirective.prototype, "containerId", void 0);
    ImageDirective = __decorate([
        Directive({
            selector: '[appImage]'
        }),
        __metadata("design:paramtypes", [ElementRef,
            DomSanitizer,
            LoopBackAuth])
    ], ImageDirective);
    return ImageDirective;
}());
export { ImageDirective };
//# sourceMappingURL=image.directive.js.map