import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
import { Profile } from '../profile/profile';
import { NavParams } from 'ionic-angular';
//import { Safety } from '../safety/safety';

declare global {
	interface Window { sqlPlugin : any}
}

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})

export class SignUp {
	homePage: any = HomePage;
	racerProfile: any = Profile;
	//safetyPage: any = Safety;
	
	accountForm : FormGroup;	
	
	responseData: any = {};
	addressData: any = {};
	accountData: any = {};
	
	// Assumption: Initially, everyone is a fan (no additional registration needed)
	racerButton: number = 0;
	fanButton: number = 1;
	role: String = "Fan";
	
	public buttonColorFan: String = 'onpoynt-red';
	public buttonColorRacer: String = 'light';
	
	state: String = "";
	city: String = "";
	
	response: any = {};
	
	constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public plt: Platform, public http: Http) {
		this.accountForm = this.formBuilder.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			email: ['', Validators.compose([Validators.maxLength(70),Validators.required])],
			password: ['', Validators.required],
			confPassword: ['', Validators.required],
			dob: ['', Validators.required],
			zipcode: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(5), Validators.required])]
		});
	
		this.plt.ready();
	
		this.http = http;
		
		this.navCtrl = navCtrl;
	}
	
	verifyContents(){	
		// Get City and State from Zipcode
		/// https://ionicframework.com/docs/native/http/
		/// https://stackoverflow.com/questions/38116048/i-am-creating-weather-app-by-using-ionic
		/// http://maps.googleapis.com/maps/api/geocode/json?address=75056
		
		
		
		// Need to add components: 

		this.http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+this.accountForm.controls['zipcode'].value+"&components=country:US|postal_code:"+this.accountForm.controls['zipcode'].value+"&key=AIzaSyDqx8ew7_UL2bSwLYoQn1sKmKUmWs6Srn4")
			.subscribe(data => {
				this.addressData = data["_body"];
				this.addressData = JSON.parse(this.addressData);
				//console.log(this.addressData);
				// Check on status of request
				this.checkOnStatus(this.addressData);
				this.submitToServer();
			},error => {
				console.log("Error occurred during location.");
			});			
	}
	
	// Server Methods
	
	checkOnStatus(addressData){
		console.log(this.addressData.status);
		if(addressData.status == "OK"){
			// Assumption: Our users are in the US
			for(let i in this.addressData.results[0].address_components){
				// city - locality
				if(this.addressData.results[0].address_components[i].types[0] == "locality"){
					console.log("Found City: "+this.addressData.results[0].address_components[i].long_name);
					this.city = this.addressData.results[0].address_components[i].long_name;
				}
				// state - administrative_area_level_1
				if(this.addressData.results[0].address_components[i].types[0] == "administrative_area_level_1"){
					this.state = this.addressData.results[0].address_components[i].long_name;
					console.log("Found State: "+this.addressData.results[0].address_components[i].long_name);
				}
			}
		}else{
			if(addressData.status == "ZERO_RESULTS"){
				this.responseData.response = "We could not locate the ZIPCODE. Please try again.";
			}else{
			this.responseData.response = "Error connecting to Google Geocode API. Please try again in a few minutes.";	
			}
		}
	}
	
	submitToServer(){
		var link2 = "http://localhost:80/OnPoynt/register.php";
		var data = JSON.stringify({
			firstName: 	this.accountForm.controls['firstName'].value,
			lastName:  	this.accountForm.controls['lastName'].value,
			email:		this.accountForm.controls['email'].value,
			password2:	this.accountForm.controls['password'].value,
			cPassword2: this.accountForm.controls['confPassword'].value,
			dob: 		this.accountForm.controls['dob'].value,
			zipcode:	this.accountForm.controls['zipcode'].value,
			state: 		this.state,
			city:		this.city,
			role:		"Fan"
		});
		
		this.http.post(link2, data)
			.subscribe(data => {
				this.responseData.response = data["_body"];
				// Look for success message
				this.accountCreation();
			}, error => {
				console.log("Some error occurred.");
			});
	}
	
	// Website Functionality

	fanButtonClicked(){
		if(this.fanButton == 0 && this.racerButton == 1){
			this.racerButton = 0;
			this.fanButton = 1;
			this.role = "Fan";
			
		}else{
			if(this.fanButton == 0){
				this.fanButton = 1;
				this.role = "Fan";
			}
		}
		
		this.buttonColorRacer = 'light';
		this.buttonColorFan = 'onpoynt-red';
		
		console.log("fanButton: "+this.fanButton);
		console.log("racerButton :"+this.racerButton);
		console.log("role: "+this.role);
	}
	
	racerButtonClicked(){
		if(this.racerButton == 0 && this.fanButton == 1){
			this.fanButton = 0;
			this.racerButton = 1;
			this.role = "Racer";
			
		}else{
			if(this.racerButton == 0){
				this.racerButton = 1;
				this.role = "Racer";
			}
		}
		
		this.buttonColorFan = 'light';
		this.buttonColorRacer = 'onpoynt-red';
		
		console.log("fanButton: "+this.fanButton);
		console.log("racerButton :"+this.racerButton);
		console.log("role: "+this.role);
	}
	
	accountCreation(){
		// Changing pages once account is created
		// passthrough email, fname, lname, city, state, zipcode, role
		console.log(this.responseData.response);
		this.accountData = JSON.parse(this.responseData.response);
		this.responseData.response = "";
		if(this.accountData[0] == "OK"){
			if(this.accountData[7] == "Fan"){
				this.navCtrl.setRoot(this.homePage, {
					email: this.accountData[3],
					fname: this.accountData[1],
					lname: this.accountData[2],
					role: this.accountData[7],
					state: this.accountData[5],
					city: this.accountData[6],
					zipcode: this.accountData[4]
				});
			}else{
				this.navCtrl.setRoot(this.racerProfile, {
					email: this.accountData[3],
					fname: this.accountData[1],
					lname: this.accountData[2],
					role: this.accountData[7],
					state: this.accountData[5],
					city: this.accountData[6],
					zipcode: this.accountData[4]
				});
			}
		}else{
			this.responseData.response = "Could not create account: ".concat(this.responseData.response);
		}
	}
}

