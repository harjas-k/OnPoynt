import { Component } from '@angular/core';
import { App, MenuController } from 'ionic-angular';
import { Profile } from '../profile/profile';
import { Sponsor } from '../sponsor/sponsor';
//import { SponsorConf } from '../sponsorconf/sponsorconf';
import { UpcomingEvents } from '../upcoming/upcoming';
import { MyStats } from '../mystats/mystats';
import { RacerSafety } from '../safety/safety';
import { Mode } from '../modescreen/modescreen';
import { RacerStats } from '../racerstats/racerstats';
import { RacerLeaderboard } from '../rleader/rleader';
import { TeamLeaderboard } from '../tleader/tleader';
import { NavParams } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { TeamStats } from '../teamstats/teamstats';
import { Video } from '../video/video';
import { Live } from '../live/live';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
})
export class HomePage {
	profile = Profile;
	sponsor = Sponsor;
	upcoming = UpcomingEvents;
	myStats: any = MyStats;
	safe = RacerSafety;
	mode = Mode;
	racerstats = RacerStats;
	rlead = RacerLeaderboard;
	tlead = TeamLeaderboard;
	teamStats = TeamStats;
	//sponsorConf: any = SponsorConf;
  past = Video;
  live = Live;
	
	accountData: any = {};
	responseData: any = {};
	profileData: any = {};
	teamData: any = {};
	zipcodeData: any = {};
	raceData: any = {};
	
	//menuCtrl: MenuController;

	constructor(public app: App, public menuCtrl: MenuController, public navCtrl: NavController, private navParams: NavParams, public plt: Platform, public http: Http) {
		this.menuCtrl = menuCtrl;
		this.menuCtrl.enable(true);
		
		this.plt.ready();
		this.http = http;
		this.navCtrl = navCtrl;
		this.accountData = navParams.data;
		
		//console.log(this.accountData);
		
	}
	
	activateMenu(){
		this.menuCtrl.open();
		console.log("Opened");
	}
	
	getAllTeamLeaderboard(){
		var link2 = "http://localhost:80/OnPoynt/teamLeaderboard.php";
		
		this.http.get(link2)
			.subscribe( data => {
				this.responseData.response = data["_body"];
				console.log(this.responseData.response);
				this.navCtrl.push( this.tlead, {
					leaderboard: JSON.parse(this.responseData.response)
				});
			});
	}
	
	getAllRacerLeaderboard(){
		//this.navCtrl.push(this.rlead);
		var link2 = "http://localhost:80/OnPoynt/racerLeaderboard.php";
		
		var data = JSON.stringify({
			sortBy: "points"
		});
		
		this.http.post(link2, data)
		    .subscribe(data => {
				this.responseData.response = data["_body"];
				console.log(this.responseData.response);
				this.navCtrl.push(this.rlead, {
					leaderboard: JSON.parse(this.responseData.response)
				});
			});
	}
	
	
	
	checkProfile(){
		if(this.accountData.role == "Fan"){
			console.log("Fan Account");
				// Only send info from Users
				this.navCtrl.push(this.profile, this.accountData);
			}else{
				//Get Profile Info
				var link2 = "http://localhost:80/OnPoynt/getProfile.php";
				var data = JSON.stringify({
					email: this.accountData.email,
					racerNickname: this.accountData.nickname
				});
				
				
		
				this.http.post(link2, data)
					.subscribe(data => {
						
						this.responseData.response = data["_body"];
						console.log(this.responseData.response);
						this.checkStatusOnProfile();
					});
			}
		
	}
	
	checkStatusOnProfile(){
		this.profileData = JSON.parse(this.responseData.response);
		this.responseData.response = "";
		if(this.profileData[0] == "OK"){
			// 5-7, 8 - 15
			this.profileData.fname = this.accountData.fname;
			this.profileData.lname = this.accountData.lname;
			this.profileData.nickname = this.accountData.nickname;
			this.profileData.tinyWhoopClass = this.profileData[5];
			this.profileData.category180220Class = this.accountData[6];
			this.profileData.category250300Class = this.accountData[7];
			this.profileData.firstPlacements = this.profileData[8];
			this.profileData.secondPlacements = this.profileData[9];
			this.profileData.thirdPlacements = this.profileData[10];
			this.profileData.other_placements = this.profileData[11];
			this.profileData.bestLapTime = this.profileData[12];
			this.profileData.bestLapSpeed = this.profileData[13];
			this.profileData.bestScore = this.profileData[14];
			this.profileData.accumulatedPoints = this.profileData[15];
			
			console.log("Finished: "+this.profileData);
			// Send all information
				this.navCtrl.push(this.myStats, {
					profileData: this.profileData,
					accountData: this.accountData,
				});
		}else{
			this.responseData.response = this.profileData[1];
		}
	}
	
	getTeamStats(){
		var link2 = "http://localhost:80/OnPoynt/getTeamStats.php";
				//console.log(this.accountData.nickname);
				var data = JSON.stringify({
					nickname: this.accountData.nickname
				});
				
				
		
				this.http.post(link2, data)
					.subscribe(data => {
						
						this.responseData.response = data["_body"];
						//console.log(this.responseData.response);
						this.checkStatusOnTeam();
					});
	}
	
	checkStatusOnTeam(){
		this.teamData = JSON.parse(this.responseData.response);
		console.log(this.teamData);
		if(this.teamData[0] == "OK"){
			this.navCtrl.push(this.teamStats, {
				array: this.teamData
			});
		}else{
			this.responseData.response = this.teamData[1];
		}
	}
	
	getUpcomingRaces(){
		//ZIPCODE API
		
		var zipcodeLink = "https://www.zipcodeapi.com/rest/SFNgIoWdpBPPbnurMxsa3FnFFIvpjMjS2EKHQBo5CQQLmxiJpfZ3DlW3dvzZTNam/radius.json/"+this.accountData.zipcode+"/10/miles?minimal";
		this.http.get(zipcodeLink)
			.subscribe(data=> {
				this.responseData.response = data["_body"];
				this.zipcodeData = JSON.parse(this.responseData.response);
				this.responseData.response = "";
				this.getUpcomingRacesDatabase();
			});
	}
	
	getUpcomingRacesDatabase(){
		var link2 = "http://localhost:80/OnPoynt/getUpcomingRaces.php";
		
		var data = JSON.stringify({
			zipcodes: this.zipcodeData.zip_codes
		})
		
		this.http.post(link2, data)
			.subscribe(data =>{
				this.responseData.response = data["_body"];
				//console.log(this.responseData.response);
				this.raceData = JSON.parse(this.responseData.response);
				this.responseData.response = "";
				console.log(this.raceData);
				this.pushPage();
				
			});
	}
	
	pushPage(){
		this.navCtrl.push(this.upcoming, {
					raceData: this.raceData,
					accountData: this.accountData
				});
	}

  

}
  

