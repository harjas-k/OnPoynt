import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { NavController } from 'ionic-angular';
import {SponsorConfirmation} from '../sponsorconf/sponsorconf';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignUp {
    sc = SponsorConfirmation;

  constructor(public navCtrl: NavController) {
    
  }
}

