import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LogIn {

  constructor(public navCtrl: NavController) {

  }

  home(){
    this.navCtrl.push(HomePage);
  }



}


