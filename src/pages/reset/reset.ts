import { Component } from '@angular/core';
import { LogIn } from '../login/login';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
	selector: 'page-reset',
	templateUrl: 'reset.html'
})
export class ResetPage {

	login: any = LogIn;
	resetForm: FormGroup;
	accountData: any = {};
	responseData: any = {};
	statusData: any = {};
	
	constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public plt: Platform, public http: Http, private navParams: NavParams){
		this.plt.ready();
		this.http = http;
		this.accountData = navParams.data;
		
		this.resetForm = formBuilder.group({
			email: this.accountData.email,
			oldPassword: ['', Validators.required],
			newPassword1: ['', Validators.required],
			newPassword2: ['', Validators.required]
		});
			
	}
	
	// passed information: email
	verifyAttempt(){
		var link2 = "http://localhost:80/OnPoynt/resetPassword.php";
		var data = JSON.stringify({
			email: this.accountData.email,
			oldPassword: this.resetForm.controls['oldPassword'].value,
			newPassword1: this.resetForm.controls['newPassword1'].value,
			newPassword2: this.resetForm.controls['newPassword2'].value
		});
		
		this.http.post(link2, data)
			.subscribe( data => {
				this.responseData.response = data["_body"];
				console.log(this.responseData.response);
				this.statusData = JSON.parse(this.responseData.response);
				
				this.responseData.response = "";
				if(this.statusData[0] == "OK"){
					this.navCtrl.setRoot(this.login);
				}else{
					this.responseData.response = this.statusData[1];
				}
			});
	}
}
