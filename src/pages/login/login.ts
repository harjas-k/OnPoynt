import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignUp } from '../signup/signup';
import { ForgotPassword } from '../forgot/forgot';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LogIn {

  home = HomePage;
  sign = SignUp;
  forgot = ForgotPassword;

  constructor(public navCtrl: NavController) {
    
  }

}


