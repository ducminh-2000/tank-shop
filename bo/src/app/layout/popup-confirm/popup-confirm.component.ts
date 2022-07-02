import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-popup-confirm',
  templateUrl: './popup-confirm.component.html',
  styleUrls: ['./popup-confirm.component.scss']
})
export class PopupConfirmComponent implements OnInit {
  @Input() idModal = '';
  @Input() titleText = '';
  @Input() bodyText = '';
  @Input() haveNo = true;
  @Output() closedEvent = new EventEmitter<boolean>();
  constructor(
    private bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
  }
  confirmYes() {
    this.closedEvent.emit(true);
    this.bsModalRef.hide();
  }
  dismissModal() {
    this.closedEvent.emit(false);
    this.bsModalRef.hide();
  }
}
