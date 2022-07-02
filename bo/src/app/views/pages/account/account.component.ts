import { AccountApi } from './../../../api/services/custom/Account';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { Account, LoopBackAuth } from 'src/app/api';
import { PAGE_SIZE } from 'src/app/core/constant/constant';
import { DeleteDialogComponent } from 'src/app/core/dialogs/delete-dialog/delete-dialog.component';
import { NotificationWrapperService } from 'src/app/core/services/notification-wrapper.service';
import { AccountformComponent } from './accountform/accountform.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  datas = new Account();
  typeCurrentUser = 0;
  userLogin: Account = new Account();
  isValidate = false;
  search = '';

  users: Account[] = [];
  PAGE_SIZE = PAGE_SIZE;
  currentPage: number;
  totalItems: number;
  selectPageSize = '5';
  isShowLoading = false;
  deleteValue = [];

  selectedItems: Map<string, Account>;
  isCheckbox = false;
  isRoleAdmin = false;
  filterUserName: string = '';
  filterGrade: number = 0;
  isRoleSuperAdmin = false;
  checkAll: boolean = false;
  filterRole: string = '';

  constructor(
    private accountApi: AccountApi,
    private auth: LoopBackAuth,
    private notifierService: NotificationWrapperService,
    private changeDetectorRef: ChangeDetectorRef,
    private translateService: TranslateService,
    private bsModalService: BsModalService,
    private spinner: NgxSpinnerService,
    private notificationWrapperService: NotificationWrapperService
  ) { }

  ngOnInit() {
    this.userLogin = this.auth.getCurrentUserData();
    this.isRoleSuperAdmin = this.userLogin.roles[0].name === 'SUPERADMIN';
    this.isRoleAdmin = this.userLogin.roles[0].name === 'ADMIN';
    this.selectedItems = new Map();
    this.getUsers();
  }

  getUsers(skip: number = 0, limit: number = this.PAGE_SIZE) {
    if (this.isRoleSuperAdmin) {
      if (skip <= 0) {
        skip = 0;
        this.currentPage = 1;
      }
      let whereFilter: any;
      {
        whereFilter = {
          name: {
            like: `%${this.filterUserName}%` ? this.filterUserName : undefined
          }
        };
      }

      const filter = {
        include: [
          {
            relation: 'roles',
          },
          // {
          //   relation: 'stores',
          // },
          // {
          //   relation: 'bills',
          // },
        ],
        where: whereFilter,
        limit,
        skip,
        order: ['name ASC'],
      };
      this.spinner.show().then().catch();
      this.selectedItems.clear();
      this.checkAll = false;
      this.isCheckbox = this.selectedItems.size !== 0;
      forkJoin(
        this.accountApi.find(filter),
        this.accountApi.count(filter.where)
      ).subscribe(
        (data: [Account[], { count: number }]) => {
          this.spinner.hide().then().catch();
          this.users = data[0];
          console.log(data[0])
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
    } else {
      if (skip <= 0) {
        skip = 0;
        this.currentPage = 1;
      }
      const filter = {
        include: [
          {
            relation: 'roles',
          },
          // {
          //   relation: 'stores',
          // },
          // {
          //   relation: 'bills',
          // },
        ],
      };
      this.spinner.show().then().catch();
      this.selectedItems.clear();
      this.checkAll = false;
      this.isCheckbox = this.selectedItems.size !== 0;
      this.accountApi.findById(this.auth.getCurrentUserId(), filter).subscribe(
        (account: Account) => {
          this.spinner.hide().then().catch();
          this.users = [account];
          this.totalItems = 1;
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
  }

  changePage() {
    this.getUsers(this.PAGE_SIZE * (this.currentPage - 1));
  }

  updateList() {
    this.PAGE_SIZE = +this.selectPageSize;
    this.getUsers(this.PAGE_SIZE * (this.currentPage - 1));
  }

  toggleCheckItems(user: Account, checked: boolean): void {
    if (checked) {
      this.selectedItems.set(user.id + '', user);
    } else {
      this.selectedItems.delete(user.id + '');
      this.checkAll = false;
    }
  }

  toggleCheckAll(users: Account[], checked: boolean): void {
    if (checked) {
      users.forEach((it: Account) => {
        this.selectedItems.set(it.id + '', it);
      });
    } else {
      users.forEach((it: Account) => {
        this.selectedItems.delete(it.id + '');
      });
    }
    this.checkAll = true;
    this.isCheckbox = this.selectedItems.size !== 0;
  }

  showAddItemModal() {
    const account: Account = new Account();
    this.showCRUDItemModal(account, 1);
  }

  showEditItemModal(item: Account) {
    const itemToEdit = Object.assign({}, item);
    this.showCRUDItemModal(itemToEdit, 1);
  }

  showBillOfUserModal(item: Account) {
    const itemToEdit = Object.assign({}, item);
    this.showCRUDItemModal(itemToEdit, 2);
  }

  showCRUDItemModal(account: Account, option: number) {
    if (option == 1) {
      const modalRef = this.bsModalService.show(AccountformComponent, {
        initialState: {
          account: account,
        },
        class: 'modal-lg',
      });
      modalRef.content.onResult.subscribe((result) => {
        if (!result.isCancelled) {
          this.getUsers(PAGE_SIZE * (this.currentPage - 1));
        }
      });
    }
  }

  deleteItem(account: Account) {
    this.deleteItems([account]);
  }

  deleteMultipleItems() {
    if (this.selectedItems.size === 0) {
      this.notifierService.warning(
        this.translateService.instant('SELECT EMPTY')
      );
    } else {
      this.deleteItems(Array.from(this.selectedItems.values()));
    }
  }

  deleteItems(accounts: Account[]) {
    const modalRef = this.bsModalService.show(DeleteDialogComponent, {
      initialState: {
        title: this.translateService.instant('users.messages.delete.title'),
        content: this.translateService.instant(
          'users.messages.delete.confirmation'
        ),
      },
    });
    modalRef.content.onClose.subscribe((result) => {
      if (result) {
        forkJoin(
          accounts.map((account: Account) => {
            return this.accountApi.deleteById(account.id);
          })
        ).subscribe(
          (results) => {
            this.getUsers(this.PAGE_SIZE * (this.currentPage - 1));
            this.notifierService.success(
              this.translateService.instant('users.messages.delete.success')
            );
          },
          (error) => {
            this.notifierService.error(
              this.translateService.instant('users.messages.delete.error')
            );
          }
        );
      }
    });
  }

  getFileUrl(user: Account) {
    // return `${LoopBackConfig.getPath()}/${LoopBackConfig.getApiVersion()}/Containers/files/download/${user.file}`;
  }
}
