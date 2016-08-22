
import { Component, ViewChild } from '@angular/core';
import { AlertController, App, ItemSliding, List, ModalController, NavController} from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { SessionDetailPage } from '../session-detail/session-detail';
import { UserData } from '../../providers/user-data';


@Component({
  templateUrl: 'build/pages/schedule/schedule.html'
})
export class SchedulePage {

  @ViewChild('scheduleList', {read: List}) scheduleList: List;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks = [];
  shownSessions = [];
  groups = [];
  
  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public confData: ConferenceData,
    public user: UserData
  ) {
  }

  ionViewDidEnter() {
    this.app.setTitle('Schedule');
  }

  ngAfterViewInit() {
    this.updateSchedule();

  }


  updateSchedule() {
    
    this.scheduleList && this.scheduleList.closeSlidingItems();

    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).then(data => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
  }

  presentFilter() {

    let modal = this.modalCtrl.create(ScheduleFilterPage, this.excludeTracks);
    modal.present();

    modal.onDidDismiss((data: any[]) => {
      if (data) {
        this.excludeTracks = data;
        this.updateSchedule();
      }
    });
  }

  goToSessionDetail(sessionData) {
    this.navCtrl.push(SessionDetailPage, sessionData);
  }

  addFavorite(slidingItem: ItemSliding, sessionData) {
    if (this.user.hasFavorite(sessionData.name)) {
      this.removeFavorite(slidingItem, sessionData, 'Favorite already added');
    } else {
      this.user.addFavorite(sessionData.name);

      let alert = this.alertCtrl.create({
        title: 'Favorite Added',
        buttons: [{
          text: 'OK',
          handler: () => {
            slidingItem.close();
          }
        }]
      });

      alert.present();
    }
  }

  removeFavorite(slidingItem: ItemSliding, sessionData, title) {
    let alert = this.alertCtrl.create({
      title: title,
      message: 'Would you like to remove this session from your favorites?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            slidingItem.close();
          }
        }, {
          text: 'Remove',
          handler: () => {
            this.user.removeFavorite(sessionData.name);
            this.updateSchedule();

            slidingItem.close();
          }
        }
      ]
    });

    alert.present();
  }

  
}