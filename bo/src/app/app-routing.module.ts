// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './views/theme/base/base.component';
import { ErrorPageComponent } from './views/theme/content/error-page/error-page.component';
// Auth
import { AuthGuard } from './core/auth/_guard/auth.guard';
import { AccountComponent } from './views/pages/account/account.component';
import { HealthChatboxComponent } from './views/pages/health-chatbox/health-chatbox.component';
import { ConversationsComponent } from './views/pages/conversations/conversations.component';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./views/pages/auth/auth.module').then((m) => m.AuthModule),
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
        path: 'flowout',
        component: HealthChatboxComponent,
      },
      {
        path: 'tank',
        component: ConversationsComponent,
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
