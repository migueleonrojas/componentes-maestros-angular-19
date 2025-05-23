import { Component, inject, OnInit } from '@angular/core';
import { VideoContainerComponent } from "../../components/video-container/video-container.component";
import { VideoStore } from '../../services/video/video.store';
import { Quality } from '../../../core/models/quality.enum';
import { BitrateOptions } from '@videogular/ngx-videogular/core';
import { Subtitle } from '../../../core/models/subtitle.model';
import { NavBarService } from '../../services/nav-bar/nav-bar.service';

@Component({
  selector: 'app-video',
  imports: [VideoContainerComponent],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss'
})
export class VideoComponent implements OnInit {

   videoStore = inject(VideoStore);

   progressVideo = this.videoStore.progress;
   subtitleVideo = this.videoStore.subtitle;
   qualityVideo = this.videoStore.quality;
   pathVideo = this.videoStore.path;

   private navBarService = inject(NavBarService);
   
   
   
   ngOnInit() {
      this.navBarService.setBreakPoint('(min-width: 65rem)')
   }


   setNewPath(path: string) {
      this.videoStore.changePath(path);
   }

   setNewProgress(progress: number) {
      this.videoStore.changeProgress(progress);
   }

   setNewQuality(quality: BitrateOptions) {
      this.videoStore.changeQuality(quality);
   }

   setNewSubtitle(subtitle: Subtitle) {
      this.videoStore.changeSubtitle(subtitle);
   }




}
