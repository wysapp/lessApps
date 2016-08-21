
import { Component } from '@angular/core';
import { ActionSheet, NavController, Page } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';

@Component({
  templateUrl: 'build/pages/speaker-list/speaker-list.html'
})
export class SpeakerListPage {

  actionSheet: ActionSheet;
  speakers = [];

  constructor(private nav: NavController, confData: ConferenceData) {

  }
}