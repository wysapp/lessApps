
import { Component } from '@angular/core';
import { Page } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';

@Component({
  templateUrl: 'build/pages/map/map.html'
})
export class MapPage{

  constructor(private confData: ConferenceData) {}
}