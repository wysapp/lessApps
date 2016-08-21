
import { Injectable } from '@angular/core';
import { Events, LocalStorage, Storage} from 'ionic-angular';


@Injectable()
export class UserData {

  _favorites = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  storage = new Storage(LocalStorage);

  constructor(private events: Events){}


  hasFavorite(sessionName) {
    return (this._favorites.indexOf(sessionName) > -1);
  }

  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value;
    })
  }
}