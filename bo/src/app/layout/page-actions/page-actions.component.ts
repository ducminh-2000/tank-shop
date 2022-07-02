import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-page-actions',
  templateUrl: './page-actions.component.html',
  styleUrls: ['./page-actions.component.css']
})
export class PageActionsComponent implements OnInit {
  @Input() isUpdateVisible: boolean;
  @Input() isAddVisible: boolean;
  @Input() isDeleteVisible: boolean;
  @Input() isView: boolean;
  @Input() isImportVisible: boolean;
  @Input() isExportVisible: boolean;
  @Input() isUpdateStatusVisible: boolean;
  @Input() isUpdatePickDateVisible: boolean;
  @Input() isUpdateUserVisible: boolean;
  @Input() isImportStoreVisible: boolean;
  @Input() isExportStoreVisible: boolean;
  @Input() isCheckVisible: boolean;


  @Output() addEmitter: EventEmitter<boolean>;
  @Output() updateEmitter: EventEmitter<boolean>;
  @Output() deleteEmitter: EventEmitter<any>;
  @Output() viewEmitter: EventEmitter<any>;
  @Output() importEmitter: EventEmitter<any>;
  @Output() exportEmitter: EventEmitter<any>;
  @Output() updateStatusEmitter: EventEmitter<any>;
  @Output() updateUserEmitter: EventEmitter<any>;
  @Output() updatePickDateEmitter: EventEmitter<any>;
  @Output() importStoreEmitter: EventEmitter<any>;
  @Output() exportStoreEmitter: EventEmitter<any>;
  @Output() checkListEmitter: EventEmitter<any>;



  constructor() {
    this.addEmitter = new EventEmitter();
    this.updateEmitter = new EventEmitter();
    this.deleteEmitter = new EventEmitter();
    this.viewEmitter = new EventEmitter();
    this.importEmitter = new EventEmitter();
    this.exportEmitter = new EventEmitter();
    this.importStoreEmitter = new EventEmitter();
    this.exportStoreEmitter = new EventEmitter();
    this.updateStatusEmitter = new EventEmitter();
    this.updateUserEmitter = new EventEmitter();
    this.updatePickDateEmitter = new EventEmitter();
    this.checkListEmitter = new EventEmitter();
  }

  ngOnInit() {
  }

  update() {
    this.updateEmitter.emit(true);
  }

  add() {
    this.addEmitter.emit(true);
  }

  clear(){
    this.checkListEmitter.emit(true);
  }

  export(){
    this.exportEmitter.emit(true);
  }

  import(){
    this.importEmitter.emit(true);
  }

  exportStore(){
    this.exportStoreEmitter.emit(true);
  }

  importStore(){
    this.importStoreEmitter.emit(true);
  }

  delete() {
    this.deleteEmitter.emit(true);
  }

  updateStatus(){
    this.updateStatusEmitter.emit(true);
  }

  updateUser(){
    this.updateUserEmitter.emit(true);
  }

  updatePickDate(){
    this.updatePickDateEmitter.emit(true);
  }

  view() {
    this.viewEmitter.emit(true);
  }
}
