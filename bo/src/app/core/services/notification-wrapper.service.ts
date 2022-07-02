import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationWrapperService {
  constructor(private notifierService: NotifierService,
              private translateService: TranslateService
  ) {
  }

  success(message: string) {
    this.notifierService.notify('success', this.translateService.instant(message));
  }

  infor(message: string) {
    this.notifierService.notify('info', this.translateService.instant(message));
  }

  error(message: string) {
    this.notifierService.notify('error', this.translateService.instant(message));
  }
  warning(message: string) {
    this.notifierService.notify('warning', this.translateService.instant(message));
  }
}
