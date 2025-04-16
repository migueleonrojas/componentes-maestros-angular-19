
import { BitrateOptions } from "@videogular/ngx-videogular/core";
import { Quality } from "./quality.enum";
import { Subtitle } from "./subtitle.model";





export type VideoState = {
   path: string,
   quality: BitrateOptions,
   subtitle: Subtitle,
   progress: number
}