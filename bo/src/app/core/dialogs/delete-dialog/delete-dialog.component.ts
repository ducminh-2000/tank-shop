import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
  @Input() title: string;
  @Input() content: string;
  public onClose: Subject<boolean>;

  constructor(private bsModalRef: BsModalRef) {
  }

  ngOnInit() {
    this.onClose = new Subject();
  }

  delete() {
    this.onClose.next(true);
    this.bsModalRef.hide();
  }

  cancel() {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }

}
