import { Directive, ElementRef, Renderer} from '@angular/core';


import { Platform, Navbar } from 'ionic-angular';

import * as actionSheets from '../pages/action-sheets/action-sheets';
import * as alerts from '../pages/alerts/alerts';
import * as badges from '../pages/badges/badges';
import * as buttons from '../pages/buttons/buttons';
import * as cards from '../pages/cards/cards';

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
    'alert-checkbox': alerts.CheckboxPage,
    'badges' : badges.BasicPage,

    'buttons': buttons.BasicPage,
    'block-buttons': buttons.BlockPage,
    'clear-buttons': buttons.ClearPage,
    'full-buttons': buttons.FullPage,
    'outline-buttons': buttons.OutlinePage,
    'round-buttons': buttons.RoundPage,
    'floating-action-buttons': buttons.FabPage,
    'buttons-in-components': buttons.ComponentsPage,
    'button-sizes': buttons.SizesPage,
    'icon-buttons': buttons.IconsPage,

    'cards': cards.BasicPage,
    'card-header': cards.HeaderPage,
    'card-list': cards.ListPage,
    'card-image': cards.ImagePage,
    'card-background': cards.BackgroundPage,
    
  };
}


export function getPageFor(hash) {
  return getPages()[hash];
}


export function debounce(func, wait, immediate) {

}