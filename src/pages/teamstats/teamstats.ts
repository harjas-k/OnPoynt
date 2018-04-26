import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { MyStats } from '../mystats/mystats';

@Component({
	selector: 'page-teamstats',
	templateUrl: 'teamstats.html'
})
export class TeamStats {
	accountData: any = {};
	profileData: any = {};
	teamData: any = {};
	racerName: any = {};
	responseData: any = {};
	myStats: any = MyStats;

	constructor(public navCtrl: NavController, public plt: Platform, public http: Http, public navParams: NavParams){
		
		this.plt = plt;
		this.plt.ready();
		this.http = http;
		this.navCtrl = navCtrl;
		this.teamData = navParams.data.array;
		
		this.teamData.numRacers = this.teamData[5];
		
		this.teamData.racers = [];
		
		for(var i=0; i<this.teamData.numRacers;i++){
			this.teamData.racers.push(this.teamData[6+i]);
		}
		
		console.log(this.teamData.racers);
		
	}
	
	searchRacer(racerName){
		this.racerName = racerName;
		
		
		var link2 = "http://localhost:80/OnPoynt/getProfile.php";
		var data = JSON.stringify({
			racerNickname: this.racerName 
		});
		
		this.http.post(link2, data)
			.subscribe( data => {
				console.log("Here");
				this.responseData.response = data["_body"];
				
				console.log(this.responseData.response);
				this.checkStatusOnProfile();
			});
	}
	
	checkStatusOnProfile(){
		this.profileData = JSON.parse(this.responseData.response);
		this.responseData.response = "";
		if(this.profileData[0] == "OK"){
			// 5-7, 8 - 15
			this.profileData.fname = this.profileData[1];
			this.profileData.lname = this.profileData[2];
			this.profileData.nickname = this.profileData[3];
			this.profileData.tinyWhoopClass = this.profileData[4];
			this.profileData.category180220Class = this.profileData[5];
			this.profileData.category250300Class = this.profileData[6];
			this.profileData.firstPlacements = this.profileData[7];
			this.profileData.secondPlacements = this.profileData[8];
			this.profileData.thirdPlacements = this.profileData[9];
			//this.profileData.other_placements = this.profileData[10];
			this.profileData.bestLapTime = this.profileData[10];
			this.profileData.bestLapSpeed = this.profileData[11];
			this.profileData.bestScore = this.profileData[12];
			this.profileData.accumulatedPoints = this.profileData[13];
			
			
			// Send all information
				this.navCtrl.push(this.myStats, {
					profileData: this.profileData,
					accountData: this.accountData,
				});
		}else{
			this.responseData.response = this.profileData[1];
		}
	}
	
    
}
