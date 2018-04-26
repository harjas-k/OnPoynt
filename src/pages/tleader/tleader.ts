import { Component } from '@angular/core';
import { TeamStats } from '../teamstats/teamstats';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';



@Component({
  selector: 'page-tleader',
  templateUrl: 'tleader.html'
})
export class TeamLeaderboard {
	leaderboard: any = {};
    
	constructor(public navCtrl: NavController, public http: Http, public plt: Platform, public navParams: NavParams){
		this.navCtrl = navCtrl;
		this.http = http;
		this.plt.ready();
		
		this.leaderboard = this.navParams.data.leaderboard;
	}
}
