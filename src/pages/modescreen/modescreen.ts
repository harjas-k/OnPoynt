import { Component } from '@angular/core';
import { Profile } from '../profile/profile';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-mode',
  templateUrl: 'modescreen.html'
})
export class Mode {

    prof = Profile;
    home = HomePage;
 
}

