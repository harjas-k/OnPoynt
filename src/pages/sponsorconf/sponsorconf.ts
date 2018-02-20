import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import {PickMode} from '../modescreen/modescreen';

@Component({
  selector: 'page-sponsorconf',
  templateUrl: 'sponsorconf.html'
})
export class SponsorConfirmation {
     mode= PickMode;

  
}
