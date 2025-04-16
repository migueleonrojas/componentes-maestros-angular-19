import { Component, inject, Inject, input, output, ViewChild } from '@angular/core';
import { BitrateOptions, VgApiService, VgCoreModule, VgMediaDirective } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { Subtitle } from '../../../core/models/subtitle.model';
import { ALL_QUALITYS, ALL_SUBTITLES, ALL_VIDEO_PATHS } from '../../../shared/constants/video.constants';
import { JsonPipe } from '@angular/common';
import { Quality } from '../../../core/models/quality.enum';
import { VideoPaths } from '../../../core/models/video-path.type';




@Component({
  selector: 'app-video-container',
  imports: [ VgCoreModule, VgControlsModule, VgOverlayPlayModule, VgBufferingModule ],
  templateUrl: './video-container.component.html',
  styleUrl: './video-container.component.scss'
})
export class VideoContainerComponent {

   @ViewChild(VgMediaDirective, { static: false }) media: VgMediaDirective = {} as VgMediaDirective;
   vgApiService = inject(VgApiService)

   allSubtitles: Subtitle[] = Object.values(ALL_SUBTITLES);
   allQualitys: BitrateOptions[] = Object.values(ALL_QUALITYS);
   
   subtitle = input.required<Subtitle>();
   setSubtitle = output<Subtitle>();

   progress = input.required<number>();
   setProgress = output<number>();

   quality = input.required<BitrateOptions>();
   setQuality = output<BitrateOptions>();

   path = input.required();
   setPath = output<string>();

   ngAfterViewInit() {
      
   }
   
   setDataVideo() {
      
      this.vgApiService.seekTime(70)

   }


   changeProgress(event: any) {


      let currentProgress = (event.target as HTMLVideoElement).currentTime;

      this.setProgress.emit(currentProgress);

   }


   changeQuality(quality: BitrateOptions) {

      let newPathVideo = ALL_VIDEO_PATHS[quality.qualityIndex as keyof VideoPaths];
      this.setPath.emit(newPathVideo);
      this.setQuality.emit(quality);
      this.media.loadMedia();
      
   }

   changeSubtitle(subtitle: Subtitle) {
      console.log(subtitle);
   }
}
