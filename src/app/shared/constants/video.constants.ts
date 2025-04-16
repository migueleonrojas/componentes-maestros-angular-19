import { Language } from "../../core/models/language.enum";
import { Quality } from "../../core/models/quality.enum";
import { Qualitys } from "../../core/models/qualitys.type";
import { Subtitles } from "../../core/models/subtitles.type";
import { VideoPaths } from "../../core/models/video-path.type";

export const VIDEO_KEY = 'video';


export const PATH_VIDEO_STANDARD = 'videos/files/video-360p.mp4';
export const PATH_VIDEO_HD = "videos/files/video-720p.mp4";
export const PATH_VIDEO_FULLHD = "videos/files/video-1080p.mp4";

export const PATH_SUBTITLE_ES = 'videos/subtitles/spanish.vtt';
export const PATH_SUBTITLE_EN = 'videos/subtitles/english.vtt';
export const PATH_SUBTITLE_NONE = 'videos/subtitles/none.vtt';

export const ALL_VIDEO_PATHS: VideoPaths = {
   [Quality.STANTARD]: PATH_VIDEO_STANDARD,
   [Quality.HD]: PATH_VIDEO_HD,
   [Quality.FULLHD]: PATH_VIDEO_FULLHD
};

export const ALL_QUALITYS: Qualitys = {
   [Quality.STANTARD]: {
      qualityIndex: 0,
      bitrate: 500000,
      width: 640,
      height: 360,
      label: '360p',
      mediaType: 'video'

   },
   [Quality.HD]: {
      qualityIndex: 1,
      bitrate: 1500000,
      width: 1280,
      height: 720,
      label: '720p',
      mediaType: 'video'
   },
   [Quality.FULLHD]: {
      qualityIndex: 2,
      bitrate: 3000000,
      width: 1920,
      height: 1080,
      label: '1080p',
      mediaType: 'video'
   }
};

export const ALL_SUBTITLES: Subtitles = {
   [Language.SPANISH]: {
      label: 'Spanish',
      srclang: 'es',
      path: PATH_SUBTITLE_ES
   },
   [Language.ENGLISH]: {
      label: 'English',
      srclang: 'en',
      path: PATH_SUBTITLE_EN
   }
};
