import { Component } from '@angular/core';
import { LogIn } from '../login/login';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';


@Component({
	selector: 'page-forgot',
	templateUrl: 'forgot.html'
})
export class ForgotPassword {

	login: any = LogIn;
	forgotForm: FormGroup;
	responseData: any = {};
	forgotData: any = {};
	hideResponse: boolean = true;
	
	constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public plt: Platform, public http: Http){
		this.plt.ready();
		this.http = http;
		this.forgotForm = this.formBuilder.group({
			email: ['',Validators.compose([Validators.maxLength(70), Validators.required])]
		});		
	}
	
	verifyEmail(){
		this.hideResponse = true;
		//console.log(this.forgotForm.controls['email'].value);
		var link2 = "http://localhost:80/OnPoynt/forgotPassword.php";
		var data = JSON.stringify({
			email: this.forgotForm.controls['email'].value
		});
		
		

		this.http.post(link2, data)
			.subscribe(data => {
				//console.log("Went through server");
				this.responseData.response = data["_body"];
				//console.log(this.responseData.response);
				this.checkStatus();
			},error => {
				this.responseData.response = "Could not connect to our servers. Try again soon.";
			});
	}
	
	checkStatus(){
		this.forgotData = JSON.parse(this.responseData.response);
		this.responseData.response = "";
		if(this.forgotData[0] == "OK"){
			// message
			this.responseData.response = "We sent an email to your address.";
		}else{
			this.responseData.response = this.forgotData[1];
		}
		
		this.hideResponse = false;
	}
}
