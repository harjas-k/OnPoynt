import { Component } from '@angular/core';
import {StreamingMedia , StreamingVideoOptions} from '@ionic-native/streaming-media';


@Component({
  selector: 'page-video',
  templateUrl: 'video.html'
})
export class Video {

  //videoOptions: VideoOptions;
  //videoUrl: string;

  constructor(private streamingMedia: StreamingMedia){
  
  }

  startVideo() {
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Finished Video') },
      errorCallback: (e) => { console.log('Error: ', e)},
      orientation: 'portrait'
    };

    this.streamingMedia.playVideo('https://www.youtube.com/watch?v=u6s5144AYO8', options);
  }

  /*public playVideo() {
    this.videoOptions = {volume : 1.0};
    this.videoPlayer.play('https://www.youtube.com/watch?v=u6s5144AYO8').then(() => {
      console.log('video completed');
    }).catch(err => {
      console.log(err);
    });
   // this.videoUrl = "https://www.youtube.com/watch?v=u6s5144AYO8"
   // this.videoPlayer.play(this.videoUrl)
  }*/

  /**async playVideo(){
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
  }**/
    
}
