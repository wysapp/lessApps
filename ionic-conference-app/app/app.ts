
import { Component, ViewChild } from '@angular/core';
import { Events, ionicBootstrap, MenuController, Nav, Platform } from 'ionic-angular';

import { Splashscreen, StatusBar } from 'ionic-native';

// import {AccountPage } from './pages/account/account';
import {ConferenceData } from './providers/conference-data';
// import {LoginPage} from './pages/login/login';
// import {SignupPage} from './pages/signup/signup';
// import {TabsPage } from './pages/tabs/tabs';
import {TutorialPage} from './pages/tutorial/tutorial';
import { UserData } from './providers/user-data';

interface PageObj {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

@Component({
  templateUrl: 'build/app.html'
})
class ConferenceApp {
  @ViewChild(Nav) nav : Nav;

  appPages: PageObj[] = [
    // {title: 'Schedule', component: TabsPage, icon: 'calendar'},
    // {title: 'Speakers', component: TabsPage, index: 1, icon: 'contacts'},
    // {title: 'Map', component: TabsPage, index: 2, icon: 'map'},
    // {title: 'About', component: TabsPage, index: 3, icon: 'information-circle'}
  ];


  rootPage: any = TutorialPage;


  constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    platform: Platform,
    confData: ConferenceData
  ) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    confData.load();

    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === 'true');
    });      
    
  }

  enableMenu(loggedIn) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

}

ionicBootstrap(ConferenceApp, [ConferenceData, UserData], {

});