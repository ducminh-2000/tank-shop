import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  signalCountMessage = new EventEmitter<number>();
  constructor() { }
  countReadMessage(len: number) {
    this.signalCountMessage.emit(len);
  }
}
