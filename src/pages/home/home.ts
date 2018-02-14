import { Component } from '@angular/core';
import { App, MenuController } from 'ionic-angular';
import { Profile } from '../profile/profile';
import { Sponsor } from '../sponsor/sponsor';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  profile = Profile;
  sponsor = Sponsor;

  constructor(app: App, menu: MenuController) {
    menu.enable(true);
    }

  

}
  

