import { Component } from '@angular/core';
import { SponsorConfirmation } from '../sponsorconf/sponsorconf';

@Component({
  selector: 'page-sponsor',
  templateUrl: 'sponsor.html'
})
export class Sponsor {
  conf = SponsorConfirmation;
}
