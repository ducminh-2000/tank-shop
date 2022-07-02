import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
var PageActionsComponent = /** @class */ (function () {
    function PageActionsComponent() {
        this.addEmitter = new EventEmitter();
        this.deleteEmitter = new EventEmitter();
        this.viewEmitter = new EventEmitter();
        this.importEmitter = new EventEmitter();
        this.exportEmitter = new EventEmitter();
        this.updateStatusEmitter = new EventEmitter();
        this.updateUserEmitter = new EventEmitter();
        this.updatePickDateEmitter = new EventEmitter();
    }
    PageActionsComponent.prototype.ngOnInit = function () {
    };
    PageActionsComponent.prototype.add = function () {
        this.addEmitter.emit(true);
    };
    PageActionsComponent.prototype.export = function () {
        this.exportEmitter.emit(true);
    };
    PageActionsComponent.prototype.import = function () {
        this.importEmitter.emit(true);
    };
    PageActionsComponent.prototype.delete = function () {
        this.deleteEmitter.emit(true);
    };
    PageActionsComponent.prototype.updateStatus = function () {
        this.updateStatusEmitter.emit(true);
    };
    PageActionsComponent.prototype.updateUser = function () {
        this.updateUserEmitter.emit(true);
    };
    PageActionsComponent.prototype.updatePickDate = function () {
        this.updatePickDateEmitter.emit(true);
    };
    PageActionsComponent.prototype.view = function () {
        this.viewEmitter.emit(true);
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PageActionsComponent.prototype, "isAddVisible", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PageActionsComponent.prototype, "isDeleteVisible", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PageActionsComponent.prototype, "isView", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PageActionsComponent.prototype, "isImportVisible", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PageActionsComponent.prototype, "isExportVisible", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PageActionsComponent.prototype, "isUpdateStatusVisible", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PageActionsComponent.prototype, "isUpdatePickDateVisible", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PageActionsComponent.prototype, "isUpdateUserVisible", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PageActionsComponent.prototype, "addEmitter", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PageActionsComponent.prototype, "deleteEmitter", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PageActionsComponent.prototype, "viewEmitter", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PageActionsComponent.prototype, "importEmitter", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PageActionsComponent.prototype, "exportEmitter", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PageActionsComponent.prototype, "updateStatusEmitter", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PageActionsComponent.prototype, "updateUserEmitter", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PageActionsComponent.prototype, "updatePickDateEmitter", void 0);
    PageActionsComponent = __decorate([
        Component({
            selector: 'app-page-actions',
            templateUrl: './page-actions.component.html',
            styleUrls: ['./page-actions.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], PageActionsComponent);
    return PageActionsComponent;
}());
export { PageActionsComponent };
//# sourceMappingURL=page-actions.component.js.map