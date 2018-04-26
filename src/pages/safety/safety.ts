import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { NavParams } from 'ionic-angular';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-safety',
  templateUrl: 'safety.html'
})
export class RacerSafety {

    home = HomePage;
	accountData: any = {};
	 
	/*constructor(public navCtrl: NavController, public plt: Platform, public navParams: NavParams) {
		this.plt.ready();
		this.accountData = navParams.data;
		//console.log(this.accountData);
		this.navCtrl = navCtrl;
	}
	
	accepted(){
		this.navCtrl.pop(this.home, this.accountData);
	}*/
}

