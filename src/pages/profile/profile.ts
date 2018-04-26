import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { NavParams } from 'ionic-angular';


@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html'
})
export class Profile {

	homePage: any = HomePage;
	profileForm: FormGroup;
	
	// Category Values
	// 1: Tiny Whoop
	// 2: 180mm-220mm
	// 3: 250mm-300mm
	
	// Class Values
	// 0: None/Not selected
	// 1: Beginner
	// 2: Competitive
	// 3: Expert
	tinyWhoopClass: number = 0;
	category180220Class: number = 0;
	category250300Class: number = 0;
	
	/*
	public buttonColorTinyWhoop: String = 'light';
	public buttonColor180_220: String = 'light';
	public buttonColor250_300: String = 'light';
	
	public buttonColorBeginner: String = 'light-gray';
	public buttonColorCompetitive: String = 'maroon';
	public buttonColorExpert: String = 'dark';
	
	light_color: String = 'light';
	light_gray_color: String = 'light-gray';
	onpoynt_red_color: String = 'onpoynt-red';
	purple_color: String = 'purple';
	dark_color: String = 'dark';
	maroon_color: String = 'maroon';
	*/
	
	responseData: any = {};
	teamData: any = {};
	
	accountData: any = {};
	profileData: any = {};
	
	beginnerTiny: boolean = false;
	beginner180220: boolean = false;
	beginner250300: boolean = false;
	
	competitiveTiny: boolean = false;
	competitive180220: boolean = false;
	competitive250300: boolean = false;
	
	expertTiny: boolean = false;
	expert180220: boolean = false;
	expert250300: boolean = false;
	
	teamItems: any = {};
	teamName: string = '';
	items: string[];
	tempItems: string[];
	item: any = {};
	hideList: boolean = true;
  
	constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public http: Http, public plt: Platform, private navParams: NavParams){
		this.plt.ready();
		
		this.http = http;
		
		this.navCtrl = navCtrl;
		
		this.accountData = navParams.data;
		
		console.log(this.accountData);
		
		// Get list of teams based off of zipcode
		/// https://www.joshmorony.com/high-performance-list-filtering-in-ionic-2/
		var link3 = "http://localhost:80/OnPoynt/getTeams.php";
		var data = JSON.stringify({
			zipcode: this.accountData.zipcode
		});
		
		this.http.post(link3,data)
			.subscribe(data => {
				this.teamData = data["_body"];
				console.log(this.teamData);
				if(this.teamData[2] == "O" && this.teamData[3] == "K"){
					//console.log("Good");
					this.setTeamList();
				}else{
					this.responseData.response = "Could not load teams, please try again.";
				}
				
			});
		
		
		this.profileForm = this.formBuilder.group({
			racerNickname: ['', Validators.required],
			FAAregistrationNumber: ['', Validators.compose([Validators.minLength(10),Validators.maxLength(10),Validators.required])],
			
		});
		
		
	}		

	setTeamList(){
		this.hideList = true;
		var teamListInit = JSON.parse(this.teamData);
		delete teamListInit[0];
		
		var teamList = [];
		
		for(var i in teamListInit){
			teamList.push(teamListInit[i]);
		}
		// before list
		//	console.log(typeof(this.items));
		this.items = teamList;
		
		
		// after list
		
		
	}
	
	getItems(ev: any){
		this.setTeamList();
		
		
		let val = ev.target.value;
		
		if(val && val.trim() != ''){
			
			this.items = this.checkStrings(val, this.items);
			
			this.hideList = false;
			
		}
	}
	
	//return ((this.item.team_name).toLowerCase().indexOf(val.toLowerCase()) > -1);
	
	checkStrings(userString, expected){
		var validList = [];
		
		for(var i in expected){
			//console.log(expected[i] + " " + );
				if((expected[i].team_name).toLowerCase().indexOf(userString.toLowerCase()) > -1){
					validList.push(expected[i]);
				}
		}
		
		return validList;
	}
	
	setTeamName(teamName){
		this.teamName = teamName;
		console.log(this.teamName);
		this.hideList = true;
	}

	verifyContents(){
		if(this.tinyWhoopClass == 0 && this.category180220Class==0 && this.category250300Class==0){
			this.responseData.response = "Please select a racer class and category.";
		}else{
			//console.log("account.email "+typeof(this.account.email));
			if(this.teamName == ""){
				this.responseData.response = "Please select a team to join.";
			}else{
				var link2 = "http://localhost:80/OnPoynt/profileRegister.php";
				var data = JSON.stringify({
					racerNickname: this.profileForm.controls['racerNickname'].value,
					FAAnumber: this.profileForm.controls['FAAregistrationNumber'].value,
					emailAddress: this.accountData.email,
					teamName: this.teamName,
					tinyWhoopClass: this.tinyWhoopClass,
					category180220Class: this.category180220Class,
					category250300Class: this.category250300Class
				});
				
				this.http.post(link2, data)
					.subscribe(data => {
						this.responseData.response = data["_body"];
						this.checkOnStatus();
					});
			}	
		}
	}
	
	newSelection(categoryNum,classNum){
		// Vertical Adjustments, NOT HORIZONTAL
		if(categoryNum == 1){				//Tiny Whoop
			this.tinyWhoopClass = classNum;
			if(classNum == 1){				//Beginner
				this.beginnerTiny = true;
				this.competitiveTiny = false;
				this.expertTiny = false;
			}else if(classNum == 2){		//Competitive
				this.competitiveTiny = true;
				this.beginnerTiny = false;
				this.expertTiny = false;
			}else{							//Expert
				this.expertTiny = true;
				this.beginnerTiny = false;
				this.competitiveTiny = false;
			}
		}else if(categoryNum == 2){			// 180mm-220mm
			this.category180220Class = classNum;
			if(classNum == 1){				//Beginner
				this.competitive180220 = false;
				this.beginner180220 = true;
				this.expert180220 = false;
			}else if(classNum == 2){		//Competitive
				this.beginner180220 = false;
				this.competitive180220 = true;
				this.expert180220 = false;
			}else{							//Expert
				this.beginner180220 = false;
				this.expert180220 = true;
				this.competitive180220 = false;
			}
		}else{								//250mm-300mm
			this.category250300Class = classNum;
			if(classNum == 1){				//Beginner
				this.competitive250300 = false;
				this.expert250300 = false;
				this.beginner250300 = true;
			}else if(classNum == 2){		//Competitive
				this.beginner250300 = false;
				this.expert250300 = false;
				this.competitive250300 = true;
			}else{							//Expert
				this.beginner250300 = false;
				this.competitive250300 = false;
				this.expert250300 = true;
			}
		}
		
		
	}
	
	// Server Methods
	checkOnStatus(){
		this.profileData = JSON.parse(this.responseData.response);
		if(this.profileData[0] == "OK"){
			console.log("REgistration Completed");
			//Send to home with all available info
			this.navCtrl.setRoot(this.homePage, {
				email: this.accountData.email,
				fname: this.accountData.fname,
				lname: this.accountData.lname,
				role: this.profileData[6],
				state: this.accountData.state,
				city: this.accountData.city,
				zipcode: this.accountData.zipcode,
				nickname: this.profileData[1],
				team: this.profileData[2],
				tinyWhoopClass: this.profileData[3],
				category180220Class: this.profileData[4],
				category250300Class: this.profileData[5]
			});
		}else{
			this.responseData.response = "Could not create profile.";
		}
	}

}

