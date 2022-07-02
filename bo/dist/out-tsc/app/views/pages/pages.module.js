import { __decorate } from "tslib";
import { NgChartsModule } from 'ng2-charts';
import { MatTabsModule } from '@angular/material/tabs';
// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QrCodeModule } from 'ng-qrcode';
import { NgxBarcodeModule } from 'ngx-barcode';
// Partials
import { PartialsModule } from '../partials/partials.module';
import { CKEditorModule } from 'ngx-ckeditor';
import { CoreModule } from '../../core/core.module';
import { NgbPaginationModule, NgbRatingModule, NgbTooltipModule, } from '@ng-bootstrap/ng-bootstrap';
import { LoadingContentComponent } from '../../layout/loading-content/loading-content.component';
import { DirectivesModule } from '../../core/directives/directives.module';
import { TranslateModule } from '@ngx-translate/core';
import { PageActionsComponent } from '../../layout/page-actions/page-actions.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FileSaverModule, FileSaverService } from 'ngx-filesaver';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AccountComponent } from './account/account.component';
import { BillComponent } from './bill/bill.component';
import { StoreComponent } from './store/store.component';
import { StatusComponent } from './status/status.component';
import { AccountformComponent } from './account/accountform/accountform.component';
import { StatusformComponent } from './status/statusform/statusform.component';
import { StoreformComponent } from './store/storeform/storeform.component';
import { ImportformComponent } from './store/importform/importform.component';
import { ExportformComponent } from './store/exportform/exportform.component';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { BillformComponent } from './bill/billform/billform.component';
import { HistoryComponent } from './bill/history/history.component';
import { AddbillComponent } from './bill/addbill/addbill.component';
import { ForeignBillComponent } from './foreign-bill/foreign-bill.component';
import { ShipBrandComponent } from './ship-brand/ship-brand.component';
import { ShipBrandFormComponent } from './ship-brand/ship-brand-form/ship-brand-form.component';
import { ShipperComponent } from './shipper/shipper.component';
import { ShipperFormComponent } from './shipper/shipper-form/shipper-form.component';
import { AddForeignBillComponent } from './foreign-bill/add-foreign-bill/add-foreign-bill.component';
import { HistoryForeignBillComponent } from './foreign-bill/history-foreign-bill/history-foreign-bill.component';
import { ForeignBillFormComponent } from './foreign-bill/foreign-bill-form/foreign-bill-form.component';
import { StatusGroupComponent } from './status-group/status-group.component';
import { StatusGroupFormComponent } from './status-group/status-group-form/status-group-form.component';
import { PopupExportXlsxComponent } from './bill/popup-export-xlsx/popup-export-xlsx.component';
import { PopupImportComponent } from './foreign-bill/popup-import/popup-import.component';
import { PopupUpdateStatusComponent } from './foreign-bill/popup-update-status/popup-update-status.component';
import { PopupUpdateStatusBillComponent } from './bill/popup-update-status/popup-update-status.component';
import { PopupUpdatePickDateComponent } from './foreign-bill/popup-update-pick-date/popup-update-pick-date.component';
import { PopupExportComponent } from './foreign-bill/popup-export/popup-export.component';
import { PopupUpdateUsercodeComponent } from './foreign-bill/popup-update-usercode/popup-update-usercode.component';
var PagesModule = /** @class */ (function () {
    function PagesModule() {
    }
    PagesModule = __decorate([
        NgModule({
            declarations: [
                LoadingContentComponent,
                PageActionsComponent,
                AccountComponent,
                BillComponent,
                StoreComponent,
                StatusComponent,
                AccountformComponent,
                StatusformComponent,
                StoreformComponent,
                ImportformComponent,
                ExportformComponent,
                UserComponent,
                UserFormComponent,
                BillformComponent,
                HistoryComponent,
                AddbillComponent,
                ForeignBillComponent,
                ShipBrandComponent,
                ShipBrandFormComponent,
                ShipperComponent,
                ShipperFormComponent,
                AddForeignBillComponent,
                HistoryForeignBillComponent,
                ForeignBillFormComponent,
                StatusGroupComponent,
                StatusGroupFormComponent,
                PopupExportXlsxComponent,
                PopupImportComponent,
                PopupUpdateStatusComponent,
                PopupUpdateStatusBillComponent,
                PopupUpdatePickDateComponent,
                PopupExportComponent,
                PopupUpdateUsercodeComponent
            ],
            exports: [LoadingContentComponent, MatFormFieldModule],
            imports: [
                NgChartsModule,
                NgxBarcodeModule,
                QrCodeModule,
                CommonModule,
                HttpClientModule,
                FormsModule,
                CoreModule,
                PartialsModule,
                NgbPaginationModule,
                DirectivesModule,
                ModalModule.forRoot(),
                TranslateModule,
                NgbRatingModule,
                NgSelectModule,
                NgMultiSelectDropDownModule,
                FileSaverModule,
                NgImageFullscreenViewModule,
                RouterModule,
                NgxSpinnerModule,
                CKEditorModule,
                NgbTooltipModule,
                MatTabsModule,
                MatFormFieldModule,
                MatChipsModule,
                ReactiveFormsModule,
                MatAutocompleteModule,
                MatIconModule,
                MatSelectModule,
                MatSlideToggleModule,
                NgxMatSelectSearchModule,
                MatButtonModule,
            ],
            providers: [BsModalService, BsModalRef, FileSaverService],
        })
    ], PagesModule);
    return PagesModule;
}());
export { PagesModule };
//# sourceMappingURL=pages.module.js.map