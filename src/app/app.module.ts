import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from '@ionic-native/sqlite';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LogIn } from '../pages/login/login';
import { SignUp } from '../pages/signup/signup';
import { Profile } from '../pages/profile/profile';
import { Sponsor } from '../pages/sponsor/sponsor';
import { SponsorConfirmation } from '../pages/sponsorconf/sponsorconf';
import { UpcomingEvents } from '../pages/upcoming/upcoming';
import { ForgotPassword } from '../pages/forgot/forgot';
import { MyStats } from '../pages/mystats/mystats';
import { RacerSafety } from '..pages/safety/safety';


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
    RacerSafety
    
  ],
  imports: [
    BrowserModule,
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
