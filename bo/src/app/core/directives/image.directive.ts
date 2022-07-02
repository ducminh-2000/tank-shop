import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DEFAULT_AVATAR } from '../constant/constant';
import { LoopBackAuth, LoopBackConfig } from '../../api';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
    selector: '[appImage]'
})
export class ImageDirective implements OnChanges {
    @Input('appImage') path: string;
    @Input() containerId: string;

    constructor(private el: ElementRef,
                private sanitizer: DomSanitizer,
                private auth: LoopBackAuth) {
        this.changeImage();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.path) {
            this.changeImage();
        }
    }

    changeImage() {
        switch (this.el.nativeElement.tagName) {
            case 'IMG':
                this.el.nativeElement.src = this.getImageUrl(this.path);
                break;
            case 'DIV':
                this.el.nativeElement.style.background = `url(${this.getImageUrl(this.path)}) transparent`;
                break;
            case 'SOURCE' :
                this.el.nativeElement.src = this.getImageUrl(this.path);
                break;
        }
    }

    getImageUrl(path) {
        if (path) {
            if (path.toString().includes('http')) {
                return path;
            }
            return `${LoopBackConfig.getPath()}/${LoopBackConfig.getApiVersion()}/Containers/${this.containerId}/download/${path}?access_token=${this.auth.getAccessTokenId()}`;
    } else {
      return DEFAULT_AVATAR;
    }
  }

  getVideoUrl(path) {
    if (path) {
      if (path.includes('https://ql6625.live')) {
        return path;
      }
      if (path.includes('download')) {
        const videoPathWithDownload = `${LoopBackConfig.getPath()} /${LoopBackConfig.getApiVersion()}/Containers/${path}`;
        return videoPathWithDownload;
      }

      const videoPath = `${LoopBackConfig.getPath()} /${LoopBackConfig.getApiVersion()}/Containers/${this.containerId}/download/${path}`
        ;
              return videoPath;
            }
          }

          setDefaultAvatar(image: any) {
            image.src = DEFAULT_AVATAR;
          }

        }
