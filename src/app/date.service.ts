import { Injectable } from '@angular/core';
import moment = require('moment');
import { Moment } from 'moment';

@Injectable()
export class DateService {

  constructor() { }

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
    let day = moment().startOf('day');
    while (day.isoWeekday() != 1) {
      day = day.subtract(1, 'days');
    }
    return day;
  }

  static getKeyFromMoment(moment: Moment): string {
    return moment.format('YYYY-MM-DD');
  }
}
