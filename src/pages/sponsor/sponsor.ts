import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';
import { SafetyPage } from '../safety/safety';


@Component({
  selector: 'page-sponsor',
  templateUrl: 'sponsor.html'
})


export class Sponsor {
  safetypg = SafetyPage;

}



