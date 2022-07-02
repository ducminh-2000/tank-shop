import { __decorate } from "tslib";
// Angular
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {
// 	MatAutocompleteModule,
// 	MatButtonModule,
// 	MatCardModule,
// 	MatCheckboxModule,
// 	MatDatepickerModule,
// 	MatDialogModule,
// 	MatIconModule,
// 	MatInputModule,
// 	MatMenuModule,
// 	MatNativeDateModule,
// 	MatPaginatorModule,
// 	MatProgressBarModule,
// 	MatProgressSpinnerModule,
// 	MatRadioModule,
// 	MatSelectModule,
// 	MatSnackBarModule,
// 	MatSortModule,
// 	MatTableModule,
// 	MatTabsModule,
// 	MatTooltipModule,
// } from '@angular/material';
// NgBootstrap
import { NgbDropdownModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
// Perfect Scrollbar
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// Core module
import { CoreModule } from '../../core/core.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { WidgetModule } from './content/widgets/widget.module';
import { ErrorComponent } from './content/general/error/error.component';
import { NotificationComponent } from './layout/topbar/notification/notification.component';
import { LanguageSelectorComponent } from './layout/topbar/language-selector/language-selector.component';
import { SearchDropdownComponent } from './layout/topbar/search-dropdown/search-dropdown.component';
import { UserProfileComponent } from './layout/topbar/user-profile/user-profile.component';
import { SearchResultComponent } from './layout/search-result/search-result.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
var PartialsModule = /** @class */ (function () {
    function PartialsModule() {
    }
    PartialsModule = __decorate([
        NgModule({
            declarations: [
                ErrorComponent,
                LanguageSelectorComponent,
                NotificationComponent,
                SearchDropdownComponent,
                UserProfileComponent,
                SearchResultComponent
            ],
            exports: [
                ErrorComponent,
                LanguageSelectorComponent,
                NotificationComponent,
                SearchDropdownComponent,
                UserProfileComponent,
                SearchResultComponent
            ],
            imports: [
                CommonModule,
                RouterModule,
                FormsModule,
                ReactiveFormsModule,
                PerfectScrollbarModule,
                InlineSVGModule,
                CoreModule,
                WidgetModule,
                // angular material modules
                MatButtonModule,
                MatMenuModule,
                MatSelectModule,
                MatInputModule,
                MatTableModule,
                MatAutocompleteModule,
                MatRadioModule,
                MatIconModule,
                MatNativeDateModule,
                MatProgressBarModule,
                MatDatepickerModule,
                MatCardModule,
                MatPaginatorModule,
                MatSortModule,
                MatCheckboxModule,
                MatProgressSpinnerModule,
                MatSnackBarModule,
                MatTabsModule,
                MatTooltipModule,
                MatDialogModule,
                // ng-bootstrap modules
                NgbDropdownModule,
                NgbTabsetModule,
                NgbTooltipModule,
            ],
        })
    ], PartialsModule);
    return PartialsModule;
}());
export { PartialsModule };
//# sourceMappingURL=partials.module.js.map