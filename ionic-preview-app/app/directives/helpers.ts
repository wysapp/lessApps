import { Directive, ElementRef, Renderer} from '@angular/core';


import { Platform, Navbar } from 'ionic-angular';

import * as actionSheets from '../pages/action-sheets/action-sheets';
import * as alerts from '../pages/alerts/alerts';

export function hasScrollbar() {

  return true;
}


export function getPages() {
  return {
    'overview': actionSheets.BasicPage,
    'action-sheets': actionSheets.BasicPage,
    'alert': alerts.BasicPage,
    'alert-confirm': alerts.ConfirmPage ,
    'alert-prompt': alerts.PromptPage,
    'alert-radio': alerts.RadioPage,
    'alert-checkbox': alerts.CheckboxPage
  };
}


export function getPageFor(hash) {
  return getPages()[hash];
}


export function debounce(func, wait, immediate) {

}