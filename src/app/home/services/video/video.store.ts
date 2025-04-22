import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { VideoState } from "../../../core/models/video-state.model";
import { ALL_QUALITYS, ALL_SUBTITLES, ALL_VIDEO_PATHS, PATH_SUBTITLE_NONE } from "../../../shared/constants/video.constants";
import { Language } from "../../../core/models/language.enum";
import { Quality } from "../../../core/models/quality.enum";
import { Subtitle } from "../../../core/models/subtitle.model";
import { BitrateOptions } from "@videogular/ngx-videogular/core";
import { inject } from "@angular/core";
import { VideoService } from "./video.service";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap } from "rxjs";
import { tapResponse } from "@ngrx/operators";

const initialState: VideoState = {
   path: ALL_VIDEO_PATHS[Quality.STANTARD],
   quality: ALL_QUALITYS[Quality.STANTARD],
   subtitle: {
      label: '',
      path: PATH_SUBTITLE_NONE,
      srclang: ''
   },
   progress: 0
}

export const VideoStore = signalStore(
   { providedIn: 'root' },
   withState(initialState),
   withMethods((store, videoService = inject(VideoService)) => ({
      loadVideoPreferences: rxMethod<void>(
         pipe(
            switchMap(() => videoService.getVideoPreferences().pipe(
               tapResponse({
                  next: ( videoState: VideoState ) => {
                     patchState(store, (state) => ({
                        ...videoState
                     }));
                  },
                  error: () => {

                  }
               })

            ))
         )
      ),
      changePath: (newPath: string) =>  {

         patchState(store, (state) => ({
            ...state,
            path: newPath
         }));

         patchState(store, (state) => {
            videoService.setVideoPreferences({...state});
            return {...state}
         });

         

      },
      changeQuality: (newQuality: BitrateOptions) =>  {

         patchState(store, (state) => ({
            ...state,
            quality: newQuality
         }));

         patchState(store, (state) => {
            videoService.setVideoPreferences({...state});
            return {...state}
         });

      },
      changeSubtitle: (newSubtitle: Subtitle) => {

         patchState(store, (state) => ({
            ...state,
            subtitle: newSubtitle
         }));

         patchState(store, (state) => {
            videoService.setVideoPreferences({...state});
            return {...state}
         });

      },
      changeProgress: (newProgress: number) => {

         patchState(store, (state) => ({
            ...state,
            progress: newProgress
         }));

         patchState(store, (state) => {
            videoService.setVideoPreferences({...state});
            return {...state}
         });
         
      }
   })),
   withHooks({
      onInit: (store) => {
         store.loadVideoPreferences(); 
      }
   })
)