import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from 'ionic-angular';




@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html'
})
export class Profile {

	homePage: any = HomePage;
	profileForm: FormGroup;
	
	// 	Class:
	///	1: Tiny Whoop
	/// 2: 180-220
	/// 3: 250-300
	classSelection: number = -1;
	
	//	Category:
	///	1: Beginner
	///	2: Competitive
	///	3: Expert
	categorySelection: number = -1;
	
	classString: String = "None";
	categoryString: String = "None";
	
	public buttonColorTinyWhoop: String = 'light';
	public buttonColor180_220: String = 'light';
	public buttonColor250_300: String = 'light';
	
	public buttonColorBeginner: String = 'light-gray';
	public buttonColorCompetitive: String = 'purple';
	public buttonColorExpert: String = 'dark';
	
	light_color: String = 'light';
	light_gray_color: String = 'light-gray';
	onpoynt_red_color: String = 'onpoynt-red';
	purple_color: String = 'purple';
	dark_color: String = 'dark';
	
	
  
	constructor(public navCtrl: NavController, private formBuilder: FormBuilder){
		this.profileForm = this.formBuilder.group({
			racerNickname: ['', Validators.required],
			FAAregistrationNumber: ['', Validators.required],
			teamName: ['', Validators.required],
		});
	}			

	verifyContents(){
		console.log(this.profileForm.value);
	}
	
	classButtonPressed(classValue){
		this.classSelection = classValue;
		if(classValue == 1){
			// Tiny Whoop
			this.buttonColorTinyWhoop = this.onpoynt_red_color;
			this.buttonColor180_220 = this.light_color;
			this.buttonColor250_300 = this.light_color;
			
			this.classString = "Tiny Whoop";
		}else if(classValue == 2){
			this.buttonColorTinyWhoop = this.light_color;
			this.buttonColor180_220 = this.onpoynt_red_color;
			this.buttonColor250_300 = this.light_color;
			
			this.classString = "180mm-220mm";
		}else{
			this.buttonColorTinyWhoop = this.light_color;
			this.buttonColor180_220 = this.light_color;
			this.buttonColor250_300 = this.onpoynt_red_color;
			
			this.classString = "250mm-300mm";
		}
		

	}
	
	categoryButtonPressed(categoryValue){
		this.categorySelection = categoryValue;
		if(categoryValue == 1){
			this.buttonColorBeginner = this.onpoynt_red_color;
			this.buttonColorCompetitive = this.purple_color;
			this.buttonColorExpert = this.dark_color;
			
			this.categoryString = "Beginner";
		}else if(categoryValue == 2){
			this.buttonColorBeginner = this.light_gray_color;
			this.buttonColorCompetitive = this.onpoynt_red_color;
			this.buttonColorExpert = this.dark_color;
			
			this.categoryString = "Competitive";
		}else{
			this.buttonColorBeginner = this.light_gray_color;
			this.buttonColorCompetitive = this.purple_color;
			this.buttonColorExpert = this.onpoynt_red_color;
			
			this.categoryString = "Expert";
		}
	}

}

