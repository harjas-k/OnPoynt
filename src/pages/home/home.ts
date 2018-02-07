import { Component } from '@angular/core';
import { App, MenuController } from 'ionic-angular';
import { Profile } from '../profile/profile';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  profile = Profile;

  constructor(app: App, menu: MenuController) {
    menu.enable(true);
    }

  

}
  

