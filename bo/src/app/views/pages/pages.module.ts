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
import {
  NgbPaginationModule,
  NgbRatingModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
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

import { AccountformComponent } from './account/accountform/accountform.component';
import { HealthChatboxComponent } from './health-chatbox/health-chatbox.component';
import { HealthChatboxFormComponent } from './health-chatbox/health-chatbox-form/health-chatbox-form.component';
import { ConversationsComponent } from './conversations/conversations.component';
import { ConversationFormComponent } from './conversations/conversation-form/conversation-form.component';


@NgModule({
  declarations: [
    LoadingContentComponent,
    PageActionsComponent,
    AccountComponent,
    AccountformComponent,
    HealthChatboxComponent,
    HealthChatboxFormComponent,
    ConversationsComponent,
    ConversationFormComponent
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
export class PagesModule {}
