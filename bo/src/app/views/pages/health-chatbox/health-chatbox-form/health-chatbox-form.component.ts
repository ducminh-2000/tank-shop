import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReplaySubject, Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Account, LoopBackAuth, AccountApi,FlowOutApi,FlowOut, TankApi, Tank } from 'src/app/api';
import { Roles } from 'src/app/core/constant/constant';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';

@Component({
  selector: 'app-health-chatbox-form',
  templateUrl: './health-chatbox-form.component.html',
  styleUrls: ['./health-chatbox-form.component.scss']
})
export class HealthChatboxFormComponent implements OnInit {

  @Input() data:FlowOut;

  onResult: EventEmitter<{ isCancelled: boolean }>;
  roles: Roles[] = [];
  selectedRole: Roles;
  currentAccount: Account = new Account();
  isRoleAdmin = false;
  isRoleSuperAdmin = false;
  admins: Account[] = [];
  tanks: Tank[] = []

  public roleForm = new FormControl();
  public tankForm: FormControl = new FormControl();
  public tankFormFilterCtrl: FormControl = new FormControl();
  public filteredTankForm: ReplaySubject<any> = new ReplaySubject(1);

  public trainForm: FormControl = new FormControl();
  public checkForm: FormControl = new FormControl();
  public resultForm: FormControl = new FormControl();



  protected _onDestroy = new Subject();



  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;


  constructor(
    private bsModalRef: BsModalRef,
    private auth: LoopBackAuth,
    private notifierService: NotificationWrapperService,
    private dataApi:FlowOutApi,
    private tankApi: TankApi,
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
      this.tankApi.find().subscribe(
      (tanks: Tank[]) => {
        this.tanks = tanks;
        // this.addStatus = statusOne[0];
        this.tanks.filter((tank) => {
          if (this.data.tank && this.data.tankId === tank.id) {
            this.tankForm.setValue(tank);
          }
        });

        this.filteredTankForm.next(this.tanks.slice());

        this.tankFormFilterCtrl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterTankMulti();
          });
        }
    );
  }
  protected filterTankMulti() {
    if (!this.tanks) {
      return;
    }

    let search = this.tankFormFilterCtrl.value;
    if (!search) {
      this.filteredTankForm.next(this.tanks.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredTankForm.next(
      this.tanks.filter(
        (bank) => bank.name.toLowerCase().indexOf(search) > -1
      )
    );
  }

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
    // this.data.accountId = this.currentAccount.id
    if (form.invalid) {
      this.notifierService.warning('Chưa nhập đủ thông tin')
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
      () => {
        this.onResult.emit({
          isCancelled: false,
        });
        this.bsModalRef.hide();
        this.notifierService.success('Thành công !');
        this.spinner.hide().then().catch();
      },
      () => {
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
