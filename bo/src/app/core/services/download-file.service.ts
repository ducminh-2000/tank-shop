import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoopBackAuth, LoopBackConfig } from '../../api';
import { FileSaverService } from 'ngx-filesaver';

@Injectable({
  providedIn: 'root'
})
export class DownloadFileService {

  constructor(
      private http: HttpClient,
      private fileSaverService: FileSaverService,
      private auth: LoopBackAuth
  ) { }

  getFileUrl(path: string, container: string) {
    return `${LoopBackConfig.getPath()}/${LoopBackConfig.getApiVersion()}/Containers/${container}/download/${path}?access_token=${this.auth.getAccessTokenId()}`;
  }

  downloadFile(path: string, container: string) {
    this.http.get(this.getFileUrl(path, container), {
      observe: 'response',
      responseType: 'blob'
    }).subscribe(res => {

      this.fileSaverService.save(res.body, path);
    });
  }

  handleDownload(path: string, container: string, name: string) {
    this.http.get(this.getFileUrl(path, container), {
      observe: 'response',
      responseType: 'blob'
    }).subscribe(res => {

      this.fileSaverService.save(res.body, name);
    });
  }
}
