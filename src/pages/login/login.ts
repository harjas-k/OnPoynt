import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignUp } from '../signup/signup';
import { ForgotPassword } from '../forgot/forgot';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';


@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LogIn {


	homePage: any = HomePage;
	sign = SignUp;
	forgot = ForgotPassword;
	loginForm : FormGroup;
	responseData: any = {};
	
	// Possibility: Passthrough row from email address
  
	constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public plt: Platform, public http: Http) {
		this.plt.ready();
		this.http = http;
		this.loginForm = this.formBuilder.group({
			email: ['', Validators.compose([Validators.maxLength(70), Validators.required])],
			password2: ['', Validators.required]
		});
	}
	
	verifyLogin(){
		var link2 = "http://localhost:80/OnPoynt/login.php";
		var data = JSON.stringify({
			email: this.loginForm.controls['email'].value,
			password2: this.loginForm.controls['password2'].value
		});
		
		
		
		this.http.post(link2,data)
			.subscribe(data => {
				this.responseData.response = data["_body"];
				this.checkStatus();
			}, error => {
				console.log("Some error occurred.");
			});
	}
	
	checkStatus(){
		if(this.responseData.response=="Correct Login"){
			this.navCtrl.setRoot(this.homePage);
		}
	}

}


