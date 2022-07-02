import { Injectable } from '@angular/core';
import { LoopBackAuth, LoopBackConfig } from '../../api';
import { DEFAULT_AVATAR } from '../constant/constant';

@Injectable()
export class ImageService {
    constructor(
        private auth: LoopBackAuth
    ) {
    }

    getImageUrl(containerId: string, imageName: string): string {
        if (imageName) {
            return `${LoopBackConfig.getPath()}/${LoopBackConfig.getApiVersion()}/Attachments/${containerId}/download/${imageName}?access_token=${this.auth.getAccessTokenId()}`;
        } else {
            return DEFAULT_AVATAR;
        }
    }
}
