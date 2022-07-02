import { ChangeDetectorRef, Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Account, FlowOut, FlowOutApi, LoopBackAuth, Tank, TankApi } from 'src/app/api';
import { PAGE_SIZE } from 'src/app/core/constant/constant';
import { DeleteDialogComponent } from 'src/app/core/dialogs/delete-dialog/delete-dialog.component';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
import { HealthChatboxFormComponent } from './health-chatbox-form/health-chatbox-form.component';

@Component({
  selector: 'app-health-chatbox',
  templateUrl: './health-chatbox.component.html',
  styleUrls: ['./health-chatbox.component.scss']
})
export class HealthChatboxComponent implements OnInit {

  datas = new Account();
  typeCurrentUser = 0;
  userLogin: Account = new Account();
  isValidate = false;
  search = '';
  toolId: number;

  PAGE_SIZE = PAGE_SIZE;
  currentPage: number;
  totalItems: number;
  selectPageSize = '5';
  isShowLoading = false;
  deleteValue = [];
  value: any;

  selectedItems: Map<number, FlowOut>;
  isCheckbox = false;
  isRoleAdmin = false;
  filterName: number = undefined;
  filterServerName: string = '';
  filterStatus: string = '';
  isRoleSuperAdmin = false;
  checkAll: boolean = false;
  filterRole: string = '';
  toolIds = [];
  listData: FlowOut[] = []
  filterCheck: boolean = undefined
  filterTrain: boolean = undefined

  filterTank: Tank = undefined
  tanks: Tank[] = []
  public tankForm: FormControl = new FormControl();
  public tankFormFilterCtrl: FormControl = new FormControl();
  public filteredTankForm: ReplaySubject<any> = new ReplaySubject(1);

  public trainForm: FormControl = new FormControl();
  public checkForm: FormControl = new FormControl();

  protected _onDestroy = new Subject();


  onResult: EventEmitter<{ isCancelled: boolean }>;

  constructor(
    private dataApi: FlowOutApi,
    private tankApi: TankApi,
    private route: ActivatedRoute,
    private auth: LoopBackAuth,
    private notifierService: NotificationWrapperService,
    private changeDetectorRef: ChangeDetectorRef,
    private translateService: TranslateService,
    private bsModalService: BsModalService,
    private spinner: NgxSpinnerService,
    private notificationWrapperService: NotificationWrapperService) { }

  ngOnInit() {
    this.userLogin = this.auth.getCurrentUserData();
    this.isRoleSuperAdmin = this.userLogin.roles[0].name === 'SUPERADMIN';
    this.isRoleAdmin = this.userLogin.roles[0].name === 'ADMIN';
    this.selectedItems = new Map();
    this.onResult = new EventEmitter();
    this.initData();
    this.getData()
  }

  overlayZindex() {
    const sdk = document.getElementsByClassName('cdk-overlay-container');
    sdk[0].setAttribute('style', 'z-index:1056');
  }

  initData() {
    this.tankApi.find().subscribe(
      (tanks: Tank[]) => {
        this.tanks = tanks;
        // this.tanks.filter((tank) => {
        //   if (this.data.tank && this.data.tankId === tank.id) {
        //     this.tankForm.setValue(tank);
        //   }
        // });

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


  getData(skip: number = 0, limit: number = this.PAGE_SIZE) {
    if (skip <= 0) {
      skip = 0;
      this.currentPage = 1;
    }
    const filterServer = {
      where: {
        tankId: this.filterTank?.id,
      
      },
      include: [
        {
          relation: 'tank'
        }
      ],
      limit,
      skip
    }
    forkJoin(
      this.dataApi.find(filterServer),
      this.dataApi.count(filterServer.where)
    ).subscribe(
      (data: [FlowOut[], { count: number }]) => {
        console.log(data[0])
        this.spinner.hide().then().catch();
        this.listData = data[0];
        this.totalItems = data[1].count;
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        this.spinner.hide().then().catch();
        console.log('error', error);
        this.changeDetectorRef.detectChanges();
        this.notificationWrapperService.error(
          error.message || 'message.error'
        );
      }
    );



  }

  changePage() {
    this.getData(this.PAGE_SIZE * (this.currentPage - 1));
  }

  updateList() {
    this.PAGE_SIZE = +this.selectPageSize;
    this.getData(this.PAGE_SIZE * (this.currentPage - 1));
  }

  toggleCheckItems(data: FlowOut, checked: boolean): void {
    if (checked) {
      this.selectedItems.set(data.id, data);
    } else {
      this.selectedItems.delete(data.id);
      this.checkAll = false;
    }
  }

  toggleCheckAll(videos: FlowOut[], checked: boolean): void {
    if (checked) {
      videos.forEach((it: FlowOut) => {
        this.selectedItems.set(it.id, it);
      });
    } else {
      videos.forEach((it: FlowOut) => {
        this.selectedItems.delete(it.id);
      });
    }
    this.checkAll = true;
    this.isCheckbox = this.selectedItems.size !== 0;
  }

  showAddItemModal() {
    const video: FlowOut = new FlowOut();
    this.showCRUDItemModal(video, 1);
  }

  update() {
    let ob = [];
    for (let i = 0; i < this.listData.length; i++) {
      ob.push(
        this.dataApi.patchAttributes(this.listData[i].id, this.listData[i])
      )
    }
    forkJoin(ob).subscribe(() => {
      this.getData(this.PAGE_SIZE * (this.currentPage - 1));
      this.notifierService.success(
        this.translateService.instant('Cập nhật thành công')
      );
    },
      () => {
        this.notifierService.error(
          this.translateService.instant('Cập nhật thất bại')
        );
      })
  }

  showEditItemModal(item: FlowOut) {
    const itemToEdit = Object.assign({}, item);
    this.showCRUDItemModal(itemToEdit, 1);
  }

  showCRUDItemModal(video: FlowOut, option: number) {
    if (option == 1) {
      const modalRef = this.bsModalService.show(HealthChatboxFormComponent, {
        initialState: {
          data: video,

        },
        class: 'modal-lg',
      });
      modalRef.content.onResult.subscribe((result) => {
        if (!result.isCancelled) {
          this.getData(PAGE_SIZE * (this.currentPage - 1));
        }
      });
    }
  }

  deleteItem(video: FlowOut) {
    this.deleteItems([video]);
  }

  deleteMultipleItems() {
    if (this.selectedItems.size === 0) {
      this.notifierService.warning(
        this.translateService.instant('Chưa có bản ghi được chọn')
      );
    } else {
      this.deleteItems(Array.from(this.selectedItems.values()));
    }
  }

  deleteItems(videos: FlowOut[]) {
    const modalRef = this.bsModalService.show(DeleteDialogComponent, {
      initialState: {
        title: this.translateService.instant('Xóa video'),
        content: this.translateService.instant(
          'Bạn có chắc chắn muốn xóa các bản ghi đã chọn'
        ),
      },
    });
    modalRef.content.onClose.subscribe((result) => {
      if (result) {
        forkJoin(
          videos.map((video: FlowOut) => {
            return this.dataApi.deleteById(video.id);
          })
        ).subscribe(
          () => {
            this.getData(this.PAGE_SIZE * (this.currentPage - 1));
            this.notifierService.success(
              this.translateService.instant('Xóa thành công')
            );
          },
          () => {
            this.notifierService.error(
              this.translateService.instant('Xóa thất bại')
            );
          }
        );
      }
    });
  }

}
