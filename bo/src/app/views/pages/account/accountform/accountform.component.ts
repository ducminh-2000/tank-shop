import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoopBackConfig } from 'src/app/api';
import { Account} from 'src/app/api/models';
import { LoopBackAuth } from 'src/app/api/services/core';
import { AccountApi } from 'src/app/api/services/custom';
import { Roles } from 'src/app/core/constant/constant';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';

@Component({
  selector: 'app-accountform',
  templateUrl: './accountform.component.html',
  styleUrls: ['./accountform.component.scss']
})
export class AccountformComponent implements OnInit {

  @Input() account: Account;

  onResult: EventEmitter<{ isCancelled: boolean }>;
  roles: Roles[] = [];
  selectedRole: Roles;
  currentAccount: Account = new Account();
  isRoleAdmin = false;
  isRoleSuperAdmin = false;
  admins: Account[] = [];
  

  public roleForm = new FormControl();
  public storeForm: FormControl = new FormControl();
  public storeFormFilterCtrl: FormControl = new FormControl();
  public filteredStoreForm: ReplaySubject<any> = new ReplaySubject(1);

  protected _onDestroy = new Subject();




  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;


  constructor(
    private bsModalRef: BsModalRef,
    private notificationWrapperService: NotificationWrapperService,
    private auth: LoopBackAuth,
    private notifierService: NotificationWrapperService,
    private httpClient: HttpClient,
    private accountApi: AccountApi,
    private translateService: TranslateService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.currentAccount = this.auth.getCurrentUserData();
    this.isRoleSuperAdmin =
      this.currentAccount.roles[0].name === 'SUPERADMIN' ||
      this.currentAccount.roles[0].name === 'ADMIN';
    this.isRoleAdmin = this.currentAccount.roles[0].name === 'ADMIN';
    this.onResult = new EventEmitter();
    this.initData();
  }

  initData() {
    console.log(this.account)
    const filter = {
      // where: {
      //   fields: ['id', 'name'],
      // },
    };
    this.changeCityFilter();
    this.changeDistrictFilter();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }


  overlayZindex() {
    const sdk = document.getElementsByClassName('cdk-overlay-container');
    sdk[0].setAttribute('style', 'z-index:1056');
  }

  changeCityFilter() { }
  changeDistrictFilter() { }

  onFileChanged(file, container) {
    if (file) {
      this.uploadFile(file, container);
    }
  }

  uploadFile(file, container) {
    this.spinner.show().then().catch();
    const formData = new FormData();
    formData.append('file', file, new Date().toISOString() + '_' + file.name);
    this.httpClient
      .post(
        `${LoopBackConfig.getPath()}/${LoopBackConfig.getApiVersion()}/Containers/${container}/upload?access_token=${this.auth.getAccessTokenId()}`,
        formData
      )
      .subscribe(
        (result: any) => {
          if (container === 'images') {
            this.account.avatar = result.result.files.file[0].name;
          } else {
            this.notificationWrapperService.error(
              'Có lỗi xảy ra trong quá trình thay ảnh !'
            );
          }
          this.spinner.hide().then().catch();
        },
        (error) => {
          this.notifierService.error(
            this.translateService.instant('appCore.errorUpload')
          );
        }
      );
  }

  upsertAccount() {
    this.spinner.show().then().catch();
    let observable: any;
    if (!this.isRoleSuperAdmin) {
      this.account.kind = Roles.USER;
    }
    if (this.account.id) {
      // observable.push(this.accountApi.updateStores(this.account.id,this.store));
      observable = (this.accountApi.patchAttributes(
        this.account.id,
        this.account
      ));
    } else {
      // this.account.storesId = this.store.id
      observable = (this.accountApi.create(this.account));
    }
    observable.subscribe(
      (res) => {
        this.onResult.emit({
          isCancelled: false,
        });
        this.bsModalRef.hide();
        this.notifierService.success('Thành công !');
        this.spinner.hide().then().catch();
      },
      (error) => {
        this.spinner.hide().then().catch();
        this.notifierService.error('Thất bại!');
      }
    );
  }

  cancel() {
    this.onResult.emit({
      isCancelled: true,
    });
    this.bsModalRef.hide();
  }

  compareById(item1: any, item2: any): boolean {
    return item1 && item2 && (item1.id === item2.id || item1 === item2);
  }

  compareByName(item1: any, item2: any): boolean {
    return item1 && item2
      ? item1.toLowerCase() === item2.toLowerCase()
      : (item2 = item1);
  }

}
