import { Component } from '@angular/core';
import { App, MenuController } from 'ionic-angular';
import { Profile } from '../profile/profile';
import { Sponsor } from '../sponsor/sponsor';
import { UpcomingEvents } from '../upcoming/upcoming';
import { MyStats } from '../mystats/mystats';
import { RacerSafety } from '../safety/safety';
import { Mode } from '../modescreen/modescreen';
import { RacerStats } from '../racerstats/racerstats';
import { RacerLeaderboard } from '../rleader/rleader';
import { EventLeaderboard } from '../eleader/eleader';
import { TeamLeaderboard } from '../tleader/tleader';
import { FanPage } from '../fanpage/fanpage';
import { Video } from '../video/video';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  profile = Profile;
  sponsor = Sponsor;
  upcoming = UpcomingEvents;
  stats = MyStats;
  safe = RacerSafety;
  mode = Mode;
  racerstats = RacerStats;
  rlead = RacerLeaderboard;
  elead = EventLeaderboard;
  tlead = TeamLeaderboard;
  fan = FanPage;
  vid = Video;

  constructor(app: App, menu: MenuController) {
    menu.enable(true);
    }

  

}
  

