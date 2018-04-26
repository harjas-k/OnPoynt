import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

@Component({
	selector: 'page-mystats',
	templateUrl: 'mystats.html'
})
export class MyStats {
	profileData: any = {};
	accountData: any = {};
	
	hideProfileInfo: boolean = false;

	constructor(public navCtrl: NavController, public plt: Platform/*, public http: Http*/, public navParams: NavParams){
		this.hideProfileInfo = true;
		this.plt = plt;
		this.plt.ready();
		//this.http = http;
		this.navCtrl = navCtrl;
		this.profileData = navParams.data.profileData;
		console.log(this.profileData);
		this.accountData = navParams.data.accountData;
		this.getCategoryClassText();
		
	}
	
	getCategoryClassText(){
		// Tiny Whoop
		if(this.profileData.tinyWhoopClass == 0){
			this.profileData.tinyWhoopText = "None";
		}else if(this.profileData.tinyWhoopClass == 1){
			this.profileData.tinyWhoopText = "Beginner";
		}else if(this.profileData.tinyWhoopClass == 2){
			this.profileData.tinyWhoopText = "Competitive";
		}else{
			this.profileData.tinyWhoopText = "Expert";
		}
		
		// 180mm-220mm
		if(this.profileData.category180220Class == 0){
			this.profileData.category180220Text = "None";
		}else if(this.profileData.category180220Class == 1){
			this.profileData.category180220Text = "Beginner";
		}else if(this.profileData.category180220Class == 2){
			this.profileData.category180220Text = "Competitive";
		}else{
			this.profileData.category180220Text = "Expert";
		}
		
		// 250mm-300mm
		if(this.profileData.category250300Class == 0){
			this.profileData.category180220Text = "None";
		}else if(this.profileData.category250300Class == 1){
			this.profileData.category250300Text = "Beginner";
		}else if(this.profileData.category250300Class == 2){
			this.profileData.category250300Text = "Competitive";
		}else{
			this.profileData.category250300Text = "Expert";
		}
		
		this.hideProfileInfo = false;
	}
	
    
}
