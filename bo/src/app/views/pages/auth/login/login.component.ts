import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AccountApi } from '../../../../api';
import {
  AccessToken,
  Account,
  AccountToken,
  LoopBackAuth,
} from '../../../../api';
import { NotificationWrapperService } from '../../../../core/services/notification-wrapper.service';
import { Roles } from '../../../../core/constant/constant';
import { flatMap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'kt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit, OnDestroy {
  // Public params
  loginForm: FormGroup;
  loading = false;
  errors: any = [];
  private returnUrl: any;

  account = new Account();
  roles = Roles;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private accountApi: AccountApi,
    private auth: LoopBackAuth,
    private notificationWrapperService: NotificationWrapperService,
    private spinner: NgxSpinnerService
  ) {
    if (accountApi.getCurrentId()) {
      console.log('auto login');
    }
    this.router.navigate(['']).then();
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.loading = false;
  }

  validateEmail(email) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  login(email: string, password: string) {
    const emailInput = window.document.getElementById('email');
    const passwordInput = window.document.getElementById('password');
    const data = {
      email: email,
      password: password,
    };

    if (this.validateEmail(email) == false) {
      emailInput.classList.add('is-invalid');
    } else {
      emailInput.classList.remove('is-invalid');

      this.spinner.show().then().catch();
      this.accountApi
        .login(data)
        .pipe(
          flatMap((token: AccountToken) => {
            return this.accountApi.findById(token.userId, {
              include: ['roles'],
            });
          })
        )
        .subscribe(
          (account: Account) => {
            const roleID =
              account.roles && account.roles.length > 0
                ? account.roles[0].id
                : undefined;
            this.auth.setUser(account);
            this.spinner.hide().then().catch();
            this.router.navigate(['/tank']).then();
          },
          (error) => {
            this.spinner.hide().then().catch();
            this.auth.clear();
            this.router.navigate(['']).then();
            if (error.code === 'LOGIN_FAILED') {
              this.notificationWrapperService.error('Login failed!');
            } else this.notificationWrapperService.error('message.error');
          }
        );
    }
  }
}
