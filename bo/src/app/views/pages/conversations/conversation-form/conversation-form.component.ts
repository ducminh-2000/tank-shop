import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReplaySubject, Subject, Observable } from 'rxjs';
import { Account, LoopBackAuth, AccountApi, Tank, TankApi } from 'src/app/api';
import { Roles } from 'src/app/core/constant/constant';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';

@Component({
  selector: 'app-Tank-form',
  templateUrl: './conversation-form.component.html',
  styleUrls: ['./conversation-form.component.scss']
})
export class ConversationFormComponent implements OnInit {

  @Input() data: Tank;

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

  public trainForm: FormControl = new FormControl();
  public checkForm: FormControl = new FormControl();
  public resultForm: FormControl = new FormControl();



  protected _onDestroy = new Subject();



  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;


  constructor(
    private bsModalRef: BsModalRef,
    private notificationWrapperService: NotificationWrapperService,
    private auth: LoopBackAuth,
    private notifierService: NotificationWrapperService,
    private httpClient: HttpClient,
    private accountApi: AccountApi,
    private dataApi: TankApi,
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

  initData() { }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }


  overlayZindex() {
    const sdk = document.getElementsByClassName('cdk-overlay-container');
    sdk[0].setAttribute('style', 'z-index:1056');
  }

  upsertData(form: NgForm) {
    this.spinner.show().then().catch();
    let observable: Observable<any>;
    // this.data.content.replace(/<p>(.*)<\/p>/g, ""); 

    // this.data.accountId = this.currentAccount.id
    if (form.invalid) {
      this.notifierService.warning('Ch??a nh???p ????? th??ng tin')
    }

      if (this.data.id) {
        // observable.push(this.accountApi.updateStores(this.account.id,this.store));
        observable = (this.dataApi.patchAttributes(
          this.data.id,
          this.data
        ));
      } else {
        // this.account.storesId = this.store.id
        observable = (this.dataApi.create(this.data));
      }

    observable.subscribe(
      (res) => {
        this.onResult.emit({
          isCancelled: false,
        });
        this.bsModalRef.hide();
        this.notifierService.success('Th??nh c??ng !');
        this.spinner.hide().then().catch();
      },
      (error) => {
        this.spinner.hide().then().catch();
        this.notifierService.error('Th???t b???i!');
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
