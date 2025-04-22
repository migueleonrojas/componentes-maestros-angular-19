import { Component, ElementRef, inject, input, output, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { BitrateOptions, IDRMLicenseServer, VgApiService, VgCoreModule, VgMediaDirective } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { Subtitle } from '../../../core/models/subtitle.model';
import { ALL_QUALITYS, ALL_SUBTITLES, ALL_VIDEO_PATHS, PATH_SUBTITLE_NONE } from '../../../shared/constants/video.constants';
import { VideoPaths } from '../../../core/models/video-path.type';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-video-container',
  imports: [ VgCoreModule, VgControlsModule, VgOverlayPlayModule, VgBufferingModule, FormsModule ],
  templateUrl: './video-container.component.html',
  styleUrl: './video-container.component.scss'
})
export class VideoContainerComponent {

   @ViewChild(VgApiService) vgApi: VgApiService = {} as VgApiService;
   @ViewChild(VgMediaDirective, { static: false }) media: VgMediaDirective = {} as VgMediaDirective;
   @ViewChildren('tracks') tracks: QueryList<ElementRef<HTMLTrackElement>> = {} as QueryList<ElementRef<HTMLTrackElement>>;
   vgApiService = inject(VgApiService)

   allSubtitles: Subtitle[] = Object.values(ALL_SUBTITLES);
   allQualitys: BitrateOptions[] = Object.values(ALL_QUALITYS);
   
   subtitle = input.required<Subtitle>();
   setSubtitle = output<Subtitle>();

   progress = input.required<number>();
   setProgress = output<number>();

   quality = input.required<BitrateOptions>();
   setQuality = output<BitrateOptions>();

   path = input.required<string>();
   setPath = output<string>();

   currentTextSubtitle = signal<string>('');
   private timeoutId: any;
   private tracksChanged = false;
   trackShowing: TextTrack =  {} as TextTrack;

   private setTextCurrentSubtitle = () => {

      if(!this.trackShowing) {

         this.currentTextSubtitle.set('');
          
         return;
      }
      const activeCue = this.trackShowing.activeCues;

      if(!activeCue) {
         this.currentTextSubtitle.set('');
         return;
      }

      if (activeCue!.length < 1) {
         this.currentTextSubtitle.set('');
         return;
      }
      let text = (activeCue![0] as VTTCue).text;
      this.currentTextSubtitle.set(text);
    };

   

   ngAfterViewInit() {

      this.setProgressVideo();

      this.setLabelQualityVideo();
      
      this.changeQuality(this.quality());

      this.setSubtitleVideo();
      
   }
   
   
   setProgressVideo() {
      
      this.vgApi.currentTime = this.progress();

      
   }

   setLabelQualityVideo() {
      const $qualitySelector = document.querySelector('.quality-selected');
      
      $qualitySelector?.classList.remove("vg-icon-hd");

      const span = document.createElement('span');

      span.textContent = this.quality().label!;

      $qualitySelector?.insertAdjacentElement('beforeend', span);
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

   setSubtitleVideo() {
      
      (this.media.elem as HTMLVideoElement).textTracks.addEventListener('change', (event) => {

         this.tracksChanged = true;

         clearTimeout(this.timeoutId);

         this.timeoutId = setTimeout(
            () => {
               
               const allTracks = event.currentTarget as TextTrackList;
               this.trackShowing = Object.values(allTracks).filter((track: TextTrack) => track.mode === "showing")[0];

               this.setContainerSubtitle();

               if(this.trackShowing === undefined) {

                  this.setSubtitle.emit({
                     label: '',
                     srclang: '',
                     path: PATH_SUBTITLE_NONE
                  });
                  
                  return;
               }

               const pathLanguage = Object.values(ALL_SUBTITLES).filter(subtitleFilter => subtitleFilter.label === this.trackShowing.label)[0];
     
               this.setSubtitle.emit({
                  label: this.trackShowing.label,
                  srclang: this.trackShowing.language,
                  path: pathLanguage.path
               });

               this.tracksChanged = false;

            }, 
            100
         );
         
      });

   }

   setContainerSubtitle() {

      if(!this.trackShowing) return;

      this.setTextCurrentSubtitle();
         
      this.trackShowing.removeEventListener('cuechange', this.setTextCurrentSubtitle)   
      
      this.trackShowing.addEventListener('cuechange', this.setTextCurrentSubtitle);
      

   }
}
