import { Component } from '@angular/core';
import moment = require('moment');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  days: Array<Date> = [];
  habits: Array<habit> = [];

  today;

  constructor() {
    this.today = moment().locale('cs').format('dd');
    for (let i = 0; i < 7; i++) {
      this.days.push(new Date(+new Date + (86400000 * i)));
    }

    this.habits.push({
      name: 'brush teeth',
      accomplished: {
        '2017-12-28': true,
        '2017-12-29': false,
        '2017-12-30': true
      }
    });

    this.habits.push({
      name: 'read a book',
      accomplished: {
        '2017-12-28': true,
        '2017-12-29': true,
        '2017-12-30': false
      }
    });
  }

}

export interface habit {
  name: string;
  accomplished: any;
}
