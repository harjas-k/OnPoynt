import { HomePage } from '../home/home';
import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { SponsorConfirmation } from '../sponsorconf/sponsorconf';





@Component({
  selector: 'page-sponsor',
  templateUrl: 'sponsor.html'
})


export class Sponsor {
	raceID: any = {};
	accountData: any = {};
	sponsorConf: any = SponsorConfirmation;
	responseData: any = {};
	response: any = {};
	home: any = HomePage;

	constructor(public navCtrl: NavController, private navParams: NavParams, public plt: Platform, public http: Http) {
		this.plt.ready();
		this.http = http;
		this.navCtrl = navCtrl;
		this.raceID = navParams.data.raceID;
		this.accountData = navParams.data.accountData;
		
		//console.log(this.raceData);
		
	}
	
	register(){
		var link2 = "http://localhost:80/OnPoynt/registerEvent.php";
		
		var data = JSON.stringify({
			racerNickname: this.accountData.nickname,
			eventID: this.raceID
		});
		
		this.http.post(link2, data)
			.subscribe(data=> {
				this.responseData.response = data["_body"];
				this.checkStatus();
			});
	}
	
	checkStatus(){
		console.log(this.responseData.response);
		this.response = JSON.parse(this.responseData.response);
		this.responseData.response = "";
		if(this.response[0] == "OK"){
			this.navCtrl.push(this.home, this.accountData);
		}else{
			this.responseData.response = "Could not register, please try again.";
		}
	}
	
}
