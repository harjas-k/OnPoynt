import { Component } from '@angular/core';
import { MyStats } from '../mystats/mystats';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-rleader',
  templateUrl: 'rleader.html'
})
export class RacerLeaderboard {
	
	mystats: any = MyStats;
	leaderboard : any = {};
	sortBy: any = "points";
	responseData: any = {};

    constructor(public navCtrl: NavController, public plt: Platform, public http: Http, public navParams: NavParams){
		this.navCtrl = navCtrl;
		this.http = http;
		this.plt.ready();
		
		this.leaderboard = navParams.data.leaderboard;
	}
	
	gatherLeaderboard(){
		console.log(this.sortBy);
		
		var link2 = "http://localhost:80/OnPoynt/racerLeaderboard.php";
		
		var data = JSON.stringify({
			sortBy: this.sortBy
		});
		
		this.http.post(link2, data)
			.subscribe(data => {
				this.responseData.response = data["_body"];
				console.log(this.responseData.response);
				this.leaderboard = JSON.parse(this.responseData.response);
			});
	}
}
