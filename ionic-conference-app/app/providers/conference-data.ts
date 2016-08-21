
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UserData } from './user-data';


@Injectable()
export class ConferenceData {
  data: any;

  constructor(private http: Http, private user: UserData) {}

  load() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get('data/data.json').subscribe(res => {
        this.data = this.processData(res.json());
        resolve(this.data);
      });
    });
  }


  processData(data) {

    data.tracks = [];

    data.schedule.forEach(day => {

      day.groups.forEach(group => {
        group.sessions.forEach(session => {
          this.processSession(data, session);
        });
      });
    });

    return data;
  }


  processSession(data, session) {
    session.speakers = [];
    if (session.speakerNames) {
      session.speakerNames.forEach(speakerName => {
        let speaker = data.speakers.find(s => s.name === speakerName);
        if (speaker) {
          session.speakers.push(speaker);
          speaker.sessions = speaker.sessions || [];
          speaker.sessions.push(session);
        }
      });
    }

    if ( session.tracks ) {
      session.tracks.forEach(track => {
        if ( data.tracks.indexOf(track) < 0) {
          data.tracks.push(track);
        }
      });
    }
  }

  getTimeline(dayIndex, queryText = '', excludeTracks = [], segment = 'all') {
    return this.load().then(data => {
      let day = data.schedule[dayIndex];
      day.shownSessions = 0;

      queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
      let queryWords = queryText.split(' ').filter(w => !!w.trim().length);

      day.groups.forEach(group => {

        group.hide = true;
        group.sessions.forEach(session => {
          this.filterSession(session, queryWords, excludeTracks, segment);

          if (!session.hide) {
            group.hide = false;
            day.shownSessions++;
          }
        });
      });

      return day;
    });
  }

  filterSession(session, queryWords, excludeTracks, segment) {
    let matchesQueryText = false;

    if ( queryWords.length) {
      queryWords.forEach(queryWord => {
        if ( session.name.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      matchesQueryText = true;
    }

    let matchesTracks = false;

    session.tracks.forEach(trackName => {
      if ( excludeTracks.indexOf(trackName) === -1) {
        matchesTracks = true;
      }
    });


    let matchesSegment = false;
    if ( segment === 'favorites') {
      if (this.user.hasFavorite(session.name)) {
        matchesSegment = true;
      }
    } else {
      matchesSegment = true;
    }

    session.hide = !(matchesQueryText && matchesTracks && matchesSegment);
  }

}