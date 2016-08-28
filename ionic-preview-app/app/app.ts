import { Component, NgZone, ViewChild, AfterContentInit} from '@angular/core';
import { App, ionicBootstrap, Platform, ActionSheet, MenuController, NavController, Menu} from 'ionic-angular';

import { Config, Events } from 'ionic-angular';

import * as helpers from './directives/helpers';

import { BasicPage as ActionPage} from './pages/action-sheets/action-sheets';

@Component({
  templateUrl: './build/app.html'
})
class DemoApp {
  isProductionMode: boolean = false;
  rootPage: any;
  nextPage: any;
  currentPlatform: string = 'ios';
  currentPageIndex: number = 29;

  @ViewChild('content') content: NavController;
  @ViewChild(Menu) menu: Menu;

  constructor(
    private platform: Platform,
    private config: Config,
    private zone: NgZone
  ) {
    this.rootPage = ActionPage;
    console.log(helpers.getPages());
  }

  ngAfterContentInit() {
   
    if(this.platform.query('production') === 'true') {
      this.isProductionMode = true;

      if (this.platform.is('android')) {
        this.currentPlatform = 'android';
      } else if(this.platform.is('windows')) {
        this.currentPlatform = 'windows';
      }

      if( helpers.hasScrollbar() === true) {
        setTimeout(function() {
          var body = document.getElementsByTagName('body')[0];
          body.className = body.className + ' has-scrollbar';
        }, 500);
      }

      window.parent.postMessage(this.currentPlatform, '*');
      window.addEventListener('message', (e) => {
        this.zone.run(() => {
          if (e.data) {
            var data;
            try {
              data = JSON.parse(e.data);
            } catch(e) {
              console.error(e);
            }

            if (data.hash) {
              this.nextPage = helpers.getPageFor(data.hash.replace('#', ''));
              if ( data.hash !== 'menus') {
                this.menu.enable(false);
              }
            } else {
              this.currentPageIndex = 1;
              this.nextPage = ActionPage;
            }

            setTimeout(() => {
              helpers.debounce(this.content.setRoot(this.nextPage), 60, false);
            })
          }
        });
      });
    }
  }


  previousSection() {
    let pageName = Object.keys(helpers.getPages())[this.currentPageIndex - 1];
    console.log('ffffffffffff', pageName);
    this.content.setRoot(helpers.getPageFor(pageName), {}, {animate: false});
    this.currentPageIndex = this.currentPageIndex -1;
  }

  nextSection() {
    let pageName = Object.keys(helpers.getPages())[this.currentPageIndex + 1];
    console.log('nextPage:', pageName);
    this.content.setRoot(helpers.getPageFor(pageName), {}, { animate: false });
    this.currentPageIndex = this.currentPageIndex + 1;
  }

  openPage(page) {

  }
}

ionicBootstrap(DemoApp, [], {
  statusbarPadding: true,
  platform: {
    android: {
      activator: 'ripple',
      backButtonIcon: 'md-arrow-back'
    }
  }
});