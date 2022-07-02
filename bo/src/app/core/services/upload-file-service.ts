import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoopBackConfig } from '../../api';

@Injectable({
  providedIn: 'root'
})

export class UploadFileService {

  constructor(
    private httpClient: HttpClient,
    private ng2ImgMaxService: Ng2ImgMaxService
  ) {
  }

  uploadImage(file, containerId: string): Observable<any> {
    const url = `${LoopBackConfig.getPath()}/${LoopBackConfig.getApiVersion()}/Containers/` + containerId + '/upload';
    return Observable.create((obs) => {
      // this.ng2ImgMaxService.resizeImage(file, 400, 300)
      //   .pipe(flatMap((blob => {
          const formData = new FormData();
      // formData.append('file', blob);
          formData.append('file', file, (new Date().toISOString()) + '_' + file.name);
          formData.append('fileName', file.name);
          formData.append('size', file.size);
          formData.append('type', file.type);
      //     return this.httpClient.post(url, formData);
      //   })))
      this.httpClient.post(url, formData)
        .subscribe((result: any) => {
            obs.next(result);
          },
          error => {
            obs.error(error);
          });
    });
  }

  uploadFile(file): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient
      .post(`${LoopBackConfig.getPath()}/${LoopBackConfig.getApiVersion()}/Containers/files/upload`, formData);
  }

  loadImage(url: string): Observable<any> {
    return this.httpClient
    // load the image as a blob
      .get(`${LoopBackConfig.getPath()}/${LoopBackConfig.getApiVersion()}/Containers/photos/download/${url}`, {responseType: 'blob'});
      // create an object url of that blob that we can use in the src attribute
  }
}
