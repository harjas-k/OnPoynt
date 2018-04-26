import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from '@ionic-native/sqlite';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LogIn } from '../pages/login/login';
import { SignUp } from '../pages/signup/signup';
import { Profile } from '../pages/profile/profile';
import { Sponsor } from '../pages/sponsor/sponsor';
import { SponsorConfirmation } from '../pages/sponsorconf/sponsorconf';
import { RacerSafety } from '../pages/safety/safety';
import { UpcomingEvents } from '../pages/upcoming/upcoming';
import { ForgotPassword } from '../pages/forgot/forgot';
import { MyStats } from '../pages/mystats/mystats';
import { ResetPage } from '../pages/reset/reset';
import { TeamStats } from '../pages/teamstats/teamstats';
import { RacerLeaderboard } from '../pages/rleader/rleader';
import { TeamLeaderboard } from '../pages/tleader/tleader';

@NgModule({
  declarations: [
    MyApp,
    LogIn,
    HomePage,
    SignUp,
    Profile,
    Sponsor,
    SponsorConfirmation,
    UpcomingEvents,
    ForgotPassword,
    MyStats,
    ResetPage,
	TeamStats,
	RacerLeaderboard,
	TeamLeaderboard,
	RacerSafety
  ],
  imports: [
    BrowserModule,
		HttpModule,
    IonicModule.forRoot(MyApp)

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LogIn,
    HomePage,
    SignUp,
    Profile,
    Sponsor,
    SponsorConfirmation,
    UpcomingEvents,
    ForgotPassword,
    MyStats,
	ResetPage,
	TeamStats,
	RacerLeaderboard,
    TeamLeaderboard,
	RacerSafety
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
