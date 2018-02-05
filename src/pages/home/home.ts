import { Component } from '@angular/core';
import { App, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(app: App, menu: MenuController) {
    menu.enable(true);
  }

    openPage(Page){
    this.navCtrl.push(Page);
  }
}
  

