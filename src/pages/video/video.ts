import { Component } from '@angular/core';
import {VideoPlayer, VideoOptions} from '@ionic-native/video-player';


@Component({
  selector: 'page-video',
  templateUrl: 'video.html'
})
export class Video {

  videoOptions: VideoOptions;
  videoUrl: string;

  constructor(private videoPlayer: VideoPlayer){
  
  }

  async playVideo(){
    try{
      this.videoOptions = {
        volume: 0.7
      }
      this.videoUrl = "https://www.youtube.com/watch?v=u6s5144AYO8"
      this.videoPlayer.play(this.videoUrl, this.videoOptions)
    }
    catch(e){
      console.error(e);
    }
  }
    
}
