// Angular
import { Component, Input, OnInit } from '@angular/core';
// RxJS
// NGRX

import { Router } from '@angular/router';
import { Account, AccountApi, LoopBackAuth } from 'src/app/api';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';

@Component({
  selector: 'kt-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  // Public properties
  user: Account = new Account();

  @Input() avatar = true;
  @Input() greeting = true;
  @Input() badge: boolean;
  @Input() icon: boolean;

  /**
   * Component constructor
   *
   * @param store: Store<AppState>
   */
  constructor(
    private accountApi: AccountApi,
    private auth: LoopBackAuth,
    private notificationWrapperService: NotificationWrapperService,
    private router: Router
  ) {}

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit(): void {
    this.user = this.auth.getCurrentUserData();
  }

  /**
   * Log out
   */
  logout() {
    this.accountApi.logout().subscribe(
      () => {
        this.auth.clear();
        this.notificationWrapperService.success('Logout');
        this.router.navigate(['auth']);
      },
      (error) => {
        this.auth.clear();
        this.router.navigate(['auth']);
      }
    );
  }
}
