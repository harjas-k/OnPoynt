import { Component } from '@angular/core';
import { LogIn } from '../login/login';


@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html'
})
export class ForgotPassword {

  login = LogIn;
  
}
