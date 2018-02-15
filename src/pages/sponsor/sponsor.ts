import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { NavController } from 'ionic-angular';
import {SponsorshipConf} from '../sponsorconf/sponsorconf';



@Component({
  selector: 'page-sponsor',
  templateUrl: 'sponsor.html'
})


export class Sponsor {

  sc = SponsorshipConf;

  constructor(public navCtrl: NavController) {
    
  }

}
