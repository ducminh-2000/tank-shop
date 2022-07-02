import { ChangeDetectorRef, Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { Account, Tank, TankApi, LoopBackAuth } from 'src/app/api';
import { PAGE_SIZE } from 'src/app/core/constant/constant';
import { DeleteDialogComponent } from 'src/app/core/dialogs/delete-dialog/delete-dialog.component';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
import { ConversationFormComponent } from './conversation-form/conversation-form.component';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit {

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

  selectedItems: Map<number, Tank>;
  deleteList: Map<number, Tank>;

  isCheckbox = false;
  isRoleAdmin = false;
  filterName: string = '';
  filterServerName: string = '';
  filterStatus: string = '';
  isRoleSuperAdmin = false;
  checkAll: boolean = false;
  filterRole: string = '';
  toolIds = [];
  listData: Tank[] = []
  filterTemp: number
  filterFlow: number


  public trainForm: FormControl = new FormControl();
  public checkForm: FormControl = new FormControl();



  onResult: EventEmitter<{ isCancelled: boolean }>;

  constructor(
    private dataApi: TankApi,
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
    this.deleteList = new Map();

    this.onResult = new EventEmitter();
    // this.getInit();
    this.getData()
  }

  overlayZindex() {
    const sdk = document.getElementsByClassName('cdk-overlay-container');
    sdk[0].setAttribute('style', 'z-index:1056');
  }



  getData(skip: number = 0, limit: number = this.PAGE_SIZE) {
    if (skip <= 0) {
      skip = 0;
      this.currentPage = 1;
    }
    const filterServer = {
      where: {
        name: {
          like: `%${this.filterName}%`
        },
        tempt: this.filterTemp ? this.filterTemp : undefined,
        flow: this.filterFlow ? this.filterFlow : undefined,
        status: {
          like: `%${this.filterStatus}%`
        }
      },
      include: [],
      limit,
      skip
    }
    this.selectedItems.clear();
    this.deleteList.clear();

    this.checkAll = false;
    this.isCheckbox = this.selectedItems.size !== 0;
    forkJoin(
      this.dataApi.find(filterServer),
      this.dataApi.count(filterServer.where)
    ).subscribe(
      (data: [Tank[], { count: number }]) => {
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

  toggleCheckItems(data: Tank, checked: boolean): void {
    if (checked) {
      this.selectedItems.set(data.id, data);
    } else {
      this.selectedItems.delete(data.id);
      this.checkAll = false;
    }
  }

  toggleCheckAll(videos: Tank[], checked: boolean): void {
    if (checked) {
      videos.forEach((it: Tank) => {
        this.selectedItems.set(it.id, it);
      });
    } else {
      videos.forEach((it: Tank) => {
        this.selectedItems.delete(it.id);
      });
    }
    this.checkAll = true;
    this.isCheckbox = this.selectedItems.size !== 0;
  }

  showAddItemModal() {
    const video: Tank = new Tank();
    this.showCRUDItemModal(video, 1);
  }

  // showEditSelect(o: Tank, s: string, p: string) {
  //   const modalRef = this.bsModalService.show(PopupSelectComponent, {
  //     initialState: {
  //       data: s,
  //       property: p,
  //       obj: o
  //     },
  //     class: 'modal-lg',
  //   });
  //   modalRef.content.onResult.subscribe((result) => {
  //     if (!result.isCancelled) {
  //       this.getData(PAGE_SIZE * (this.currentPage - 1));
  //     }
  //   });
  // }

  

  update() {
    let ob = [];
    for (let i = 0; i < this.listData.length; i++) {
      ob.push(
        this.dataApi.patchAttributes(this.listData[i].id, this.listData[i])
      )
    }
    if(this.deleteList.size > 0){
      this.deleteList.forEach((it: Tank) => {
        ob.push(
          this.dataApi.deleteById(it.id)
        )
      })
     
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


  showCRUDItemModal(video: Tank, option: number) {
    if (option == 1) {
      const modalRef = this.bsModalService.show(ConversationFormComponent, {
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

  deleteItem(video: Tank) {
    this.deleteList.set(video.id,video);
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

  deleteItems(videos: Tank[]) {
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
          videos.map((video: Tank) => {
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
