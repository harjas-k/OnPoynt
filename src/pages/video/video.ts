import { Component } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-video',
  templateUrl: 'video.html'
})
export class Video {

   video: any = {
    url: 'https://www.youtube.com/embed/WVB2GSlyrSk',
    //url: 'https://youtube/embed/cF2J2bFBUZ8',
    title: 'video'
  };




  //<iframe width="560" height="315" src="https://www.youtube.com/embed/a3ICNMQW7Ok" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  trustedVideoUrl: SafeResourceUrl;


  constructor(private domSanitizer: DomSanitizer){}

  ionViewWillEnter(): void {
    this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.video.url);
     
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
