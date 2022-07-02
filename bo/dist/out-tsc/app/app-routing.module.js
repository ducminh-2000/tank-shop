import { __decorate } from "tslib";
// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// Components
import { BaseComponent } from './views/theme/base/base.component';
import { ErrorPageComponent } from './views/theme/content/error-page/error-page.component';
// Auth
import { AuthGuard } from './core/auth/_guard/auth.guard';
import { AccountComponent } from './views/pages/account/account.component';
import { BillComponent } from './views/pages/bill/bill.component';
import { StoreComponent } from './views/pages/store/store.component';
import { StatusComponent } from './views/pages/status/status.component';
import { ImportformComponent } from './views/pages/store/importform/importform.component';
import { ExportformComponent } from './views/pages/store/exportform/exportform.component';
import { UserComponent } from './views/pages/user/user.component';
import { AddbillComponent } from './views/pages/bill/addbill/addbill.component';
import { ForeignBillComponent } from './views/pages/foreign-bill/foreign-bill.component';
import { ShipBrandComponent } from './views/pages/ship-brand/ship-brand.component';
import { ShipperComponent } from './views/pages/shipper/shipper.component';
import { AddForeignBillComponent } from './views/pages/foreign-bill/add-foreign-bill/add-foreign-bill.component';
import { StatusGroupComponent } from './views/pages/status-group/status-group.component';
var routes = [
    {
        path: 'auth',
        loadChildren: function () {
            return import('./views/pages/auth/auth.module').then(function (m) { return m.AuthModule; });
        },
    },
    {
        path: '',
        component: BaseComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'account',
                component: AccountComponent,
            },
            {
                path: '',
                component: ForeignBillComponent,
            },
            {
                path: 'bill',
                component: BillComponent,
            },
            {
                path: 'bill/addBill',
                component: AddbillComponent,
            },
            {
                path: 'foreign-bill',
                component: ForeignBillComponent,
            },
            {
                path: 'foreign-bill/add-bill',
                component: AddForeignBillComponent,
            },
            {
                path: 'status',
                component: StatusComponent,
            },
            {
                path: 'store/list',
                component: StoreComponent,
            },
            {
                path: 'store/import',
                component: ImportformComponent,
            },
            {
                path: 'store/export',
                component: ExportformComponent,
            },
            {
                path: 'store/detail/:id',
                component: ForeignBillComponent,
            },
            {
                path: 'user',
                component: UserComponent,
            },
            {
                path: 'ship-brand',
                component: ShipBrandComponent,
            },
            {
                path: 'shipper',
                component: ShipperComponent,
            },
            {
                path: 'status-group',
                component: StatusGroupComponent,
            },
            {
                path: 'error/403',
                component: ErrorPageComponent,
                data: {
                    type: 'error-v6',
                    code: 403,
                    title: '403... Access forbidden',
                    desc: "Looks like you don't have permission to access for requested page.<br> Please, contact administrator",
                },
            },
            { path: 'error/:type', component: ErrorPageComponent },
            { path: '', redirectTo: 'contest', pathMatch: 'full' },
            { path: '**', redirectTo: 'contest', pathMatch: 'full' },
        ],
    },
    // { path: 'auth', component: LoginComponent },
    { path: '**', redirectTo: 'error/403', pathMatch: 'full' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule],
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map