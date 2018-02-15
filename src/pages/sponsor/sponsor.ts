import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { NavController } from 'ionic-angular';
import {SponsorshipConfirmation} from '../sponsorconf/sponsorconf';



@Component({
  selector: 'page-sponsor',
  templateUrl: 'sponsor.html'
})


export class Sponsor {

  sc = SponsorshipConfirmation;

  constructor(public navCtrl: NavController) {
    
  }

}
