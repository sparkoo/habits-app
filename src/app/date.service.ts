import { Injectable } from '@angular/core';
import moment = require('moment');
import { Moment } from 'moment';

@Injectable()
export class DateService {

  constructor() { }

  static getKeyFromMoment(date: Moment): string {
    return date.format('YYYY-MM-DD');
  }

  currentWeek(): Array<Moment> {
    const weekDays: Array<moment.Moment> = [];
    let dayOfWeek = this.startOfWeek();
    weekDays.push(dayOfWeek.clone());
    while (dayOfWeek.isoWeekday() < 7) {
      dayOfWeek = dayOfWeek.add(1, 'days');
      weekDays.push(dayOfWeek.clone());
    }
    return weekDays;
  }

  today(): Moment {
    return moment().startOf('day');
  }

  private startOfWeek(): moment.Moment {
    return moment().startOf('isoWeek').startOf('day');
  }
}
