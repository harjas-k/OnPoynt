import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { NavParams } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-sponsorconf',
  templateUrl: 'sponsorconf.html'
})
export class SponsorConfirmation {
    home= HomePage;
	raceID: any = {};
	accountData: any = {};
	responseData: any = {};
	response: any = {};
	
	constructor(public navCtrl: NavController, private navParams: NavParams, public plt: Platform, public http: Http) {
		this.plt.ready();
		this.http = http;
		this.navCtrl = navCtrl;
		this.raceID = navParams.data.raceID;
		this.accountData = navParams.data.accountData;
	}
	
	register(){
		var link2 = "http://localhost:80/OnPoynt/registerEvent.php";
		
		var data = JSON.stringify({
			racerNickname: this.accountData.nickname,
			eventID: this.raceID
		});
		
		this.http.post(link2, data)
			.subscribe(data=> {
				this.responseData.response = ["_data"];
				this.checkStatus();
			});
	}
	
	checkStatus(){
		this.response = JSON.parse(this.responseData.response);
		this.responseData.response = "";
		if(this.response[0] == "OK"){
			this.navCtrl.push(this.home, this.accountData);
		}else{
			this.responseData.response = "Could not register, please try again.";
		}
	}

  
}
