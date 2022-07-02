import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ExportFileService } from 'src/app/core/services/export-file.service';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
var PopupExportComponent = /** @class */ (function () {
    function PopupExportComponent(exportService, bsModalRef, notifierService, translateService) {
        this.exportService = exportService;
        this.bsModalRef = bsModalRef;
        this.notifierService = notifierService;
        this.translateService = translateService;
        this._onDestroy = new Subject();
        this.pickDate = new Date();
        this.reciveDate = new Date();
        this.onResult = new EventEmitter();
    }
    PopupExportComponent.prototype.ngOnInit = function () {
        this.onResult = new EventEmitter();
        console.log(this.bills);
    };
    PopupExportComponent.prototype.export = function () {
        this.exportService.exportExcel(this.bills, this.nameCo, this.number, this.pickDate, this.totalRealWeight, this.weightShare, this.reciveDate, 'phieu_giao_hang.xlsx');
        this.bsModalRef.hide();
        this.onResult.emit({
            isCancelled: false,
        });
        this.notifierService.success(this.translateService.instant('Thành công'));
    };
    PopupExportComponent.prototype.ngOnDestroy = function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    PopupExportComponent.prototype.cancel = function () {
        this.onResult.emit({
            isCancelled: true,
        });
        this.bsModalRef.hide();
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], PopupExportComponent.prototype, "bills", void 0);
    PopupExportComponent = __decorate([
        Component({
            selector: 'app-popup-export',
            templateUrl: './popup-export.component.html',
            styleUrls: ['./popup-export.component.scss']
        }),
        __metadata("design:paramtypes", [ExportFileService,
            BsModalRef,
            NotificationWrapperService,
            TranslateService])
    ], PopupExportComponent);
    return PopupExportComponent;
}());
export { PopupExportComponent };
//# sourceMappingURL=popup-export.component.js.map