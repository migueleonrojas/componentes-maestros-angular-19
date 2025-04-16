import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from '../../../shared/service/local-storage/local-storage.service';
import { VideoState } from '../../../core/models/video-state.model';
import { Observable, of } from 'rxjs';
import { VIDEO_KEY } from '../../../shared/constants/video.constants';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

   private localStorageService = inject(LocalStorageService);

   getVideoPreferences(): Observable<VideoState> {
   
      return of(this.localStorageService.getData(VIDEO_KEY) || {} as VideoState)
   
   }
   
   setVideoPreferences(videoState: VideoState): void {

      this.localStorageService.setData(VIDEO_KEY, videoState);

   }


}
