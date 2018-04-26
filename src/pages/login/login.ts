import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignUp } from '../signup/signup';
import { ForgotPassword } from '../forgot/forgot';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { ResetPage } from '../reset/reset'

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LogIn {

	homePage: any = HomePage;
	sign: any = SignUp;
	forgot: any = ForgotPassword;
	loginForm : FormGroup;
	resetPage: any = ResetPage;
	
	responseData: any = {};
	
	accountData: any = {};
	
	hideResponse: boolean = true;
  
	constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public plt: Platform, public http: Http) {
		this.plt.ready();
		this.http = http;
		this.navCtrl = navCtrl;
		this.loginForm = this.formBuilder.group({
			email: ['', Validators.compose([Validators.maxLength(70), Validators.required])],
			password2: ['', Validators.required]
		});
	}
	
	verifyLogin(){
		this.hideResponse = true;
		
		var link2 = "http://localhost:80/OnPoynt/login.php";
		var data = JSON.stringify({
			email: this.loginForm.controls['email'].value,
			password2: this.loginForm.controls['password2'].value
		});
		
		
		
		this.http.post(link2,data)
			.subscribe(data => {
				this.responseData.response = data["_body"];
				console.log(this.responseData.response);
				this.checkStatus();
			}, error => {
				console.log("Some error occurred.");
			});
	}
	
	checkStatus(){
		// Account Data
		// 0: status
		// 1: fname
		// 2: lname
		// 3: role
		// 4: state
		// 5: city
		// 6: zipcode
		// 7: racer_nickname
		// 8: tinyWhoop class
		// 9: category180220
		// 10: category250330
		
		
		this.accountData = JSON.parse(this.responseData.response);
	
		var page = this.homePage;
		if(this.accountData[0] == "OK"){
			// Check if password is 'DRONERANGER100'. If so, send to reset
			if(this.loginForm.controls['password2'].value == "DRONERANGER100"){
				page = this.resetPage;
			}
			
			// Restrict what's being sent based on role
			if(this.accountData[3] == "Fan"){
				// Only send info from Users
				this.navCtrl.setRoot(page, {
					email: this.loginForm.controls['email'].value,
					fname: this.accountData[1],
					lname: this.accountData[2],
					role: this.accountData[3],
					state: this.accountData[4],
					city: this.accountData[5],
					zipcode: this.accountData[6]
				});
			}else{
				// Send all information
				this.navCtrl.setRoot(page, {
					email: this.loginForm.controls['email'].value,
					fname: this.accountData[1],
					lname: this.accountData[2],
					role: this.accountData[3],
					state: this.accountData[4],
					city: this.accountData[5],
					zipcode: this.accountData[6],
					nickname: this.accountData[7],
					team: this.accountData[11],
					tinyWhoopClass: this.accountData[8],
					category180220Class: this.accountData[9],
					category250300Class: this.accountData[10]
				});
			}
			
			
		}else{
			this.responseData.response = this.accountData[1];
			this.hideResponse = false;
		}
		
	}
		

}


