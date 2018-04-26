import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { Sponsor } from '../sponsor/sponsor';

@Component({
  selector: 'page-upcoming',
  templateUrl: 'upcoming.html'
})
export class UpcomingEvents {
	raceData: any = {};
	accountData: any = {};
	sponsor: any = Sponsor;
	
	constructor(public navCtrl: NavController, private navParams: NavParams, public plt: Platform, public http: Http) {
		this.plt.ready();
		this.http = http;
		this.navCtrl = navCtrl;
		this.raceData = navParams.data.raceData;
		this.accountData = navParams.data.accountData;
		//console.log(this.raceData);
		
	}
	
	registerEvent(raceID){
		this.navCtrl.push(this.sponsor, {
			raceID: raceID,
			accountData: this.accountData
		});
	}
}
