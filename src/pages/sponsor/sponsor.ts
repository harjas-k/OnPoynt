import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { NavController } from 'ionic-angular';
import {SponsorConfirmation} from '../sponsorconf/sponsorconf';



@Component({
  selector: 'page-sponsor',
  templateUrl: 'sponsor.html'
})


export class Sponsor {

  sc = SponsorConfirmation;

  constructor(public navCtrl: NavController) {
    
  }

}
