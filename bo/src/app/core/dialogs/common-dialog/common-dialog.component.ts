import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.css']
})
export class CommonDialogComponent implements OnInit {
  @Input() title: string;
  @Input() content: string;
  public onClose: Subject<boolean>;

  constructor(private bsModalRef: BsModalRef) {
  }

  ngOnInit() {
    this.onClose = new Subject();
  }

  action() {
    this.onClose.next(true);
    this.bsModalRef.hide();
  }

  cancel() {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }

}
