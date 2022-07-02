import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { of, Subject, zip } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { ForeignBillApi } from 'src/app/api';
import { DownloadFileService } from 'src/app/core/services/download-file.service';
import { ExportFileService } from 'src/app/core/services/export-file.service';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
var PopupExportXlsxComponent = /** @class */ (function () {
    function PopupExportXlsxComponent(bsModalRef, foreignBillApi, notifierService, translateService, spinner, notificationWrapperService, downloadService, exportService) {
        this.bsModalRef = bsModalRef;
        this.foreignBillApi = foreignBillApi;
        this.notifierService = notifierService;
        this.translateService = translateService;
        this.spinner = spinner;
        this.notificationWrapperService = notificationWrapperService;
        this.downloadService = downloadService;
        this.exportService = exportService;
        this._onDestroy = new Subject();
        this.startDate = new Date();
        this.endDate = new Date();
        this.onResult = new EventEmitter();
    }
    PopupExportXlsxComponent.prototype.ngOnInit = function () {
    };
    PopupExportXlsxComponent.prototype.export = function (container, form) {
        var _this = this;
        if (form.invalid) {
            this.notifierService.warning('Hãy chọn ngày muốn xuất file');
            return;
        }
        if (this.startDate > this.endDate) {
            this.notifierService.warning('Ngày bắt đầu sau ngày kết thúc');
            return;
        }
        var ob = [];
        ob.push(
        // this.foreignBillApi.exportCsv()
        // this.exportService.exportExcel(,'tracking_noi_dia');
        );
        zip.apply(void 0, ob).pipe(flatMap(function (result) {
            var sub = [];
            if (container === 'images') {
                // sub.push(this.httpClient
                //   .get(
                //     `${LoopBackConfig.getPath()}/${LoopBackConfig.getApiVersion()}/Containers/${container}/download/tracking_noi_dia.xlsx?access_token=${this.auth.getAccessTokenId()}`))
                // const path = (this.downloadService.getFileUrl("tracking_noi_dia.xlsx",container))
                // console.log(path)
                _this.downloadService.downloadFile("tracking_noi_dia.xlsx", container);
                sub.push();
            }
            else {
                _this.notificationWrapperService.error('Có lỗi xảy ra trong quá trình download !');
            }
            if (sub.length > 0) {
                return zip.apply(void 0, sub);
            }
            else {
                return of(true);
            }
        }))
            .subscribe(function (result) {
            console.log(result);
            _this.spinner.hide().then().catch();
            // console.log(new Blob(result));
            console.log(result);
            // this.getBillOfStores();
        }, function (error) {
            _this.spinner.hide().then().catch();
            console.log(error);
            _this.notifierService.error(_this.translateService.instant('Có lỗi xảy ra trong quá trình download !'));
        });
    };
    PopupExportXlsxComponent.prototype.ngOnDestroy = function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    PopupExportXlsxComponent.prototype.cancel = function () {
        this.onResult.emit({
            isCancelled: true,
        });
        this.bsModalRef.hide();
    };
    PopupExportXlsxComponent = __decorate([
        Component({
            selector: 'app-popup-export-xlsx',
            templateUrl: './popup-export-xlsx.component.html',
            styleUrls: ['./popup-export-xlsx.component.scss']
        }),
        __metadata("design:paramtypes", [BsModalRef,
            ForeignBillApi,
            NotificationWrapperService,
            TranslateService,
            NgxSpinnerService,
            NotificationWrapperService,
            DownloadFileService,
            ExportFileService])
    ], PopupExportXlsxComponent);
    return PopupExportXlsxComponent;
}());
export { PopupExportXlsxComponent };
//# sourceMappingURL=popup-export-xlsx.component.js.map