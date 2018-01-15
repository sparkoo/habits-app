import { Injectable } from '@angular/core';
import moment = require('moment');
import { Moment } from 'moment';

@Injectable()
export class DateService {

  constructor() { }

  static getKeyFromMoment(date: Moment): string {
    return date.format('YYYY-MM-DD');
  }

  previousWeekOf(day: Moment): Array<Moment> {
    return this.weekOf(day.subtract(1, 'week'));
  }

  nextWeekOf(day: Moment): Array<Moment> {
    return this.weekOf(day.add(1, 'week'));
  }

  currentWeek(): Array<Moment> {
    return this.weekOf(moment());
  }

  weekOf(day: Moment) {
    const weekDays: Array<moment.Moment> = [];
    let dayOfWeek = this.startOfWeek(day);
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

  private startOfWeek(day: Moment): moment.Moment {
    return day.startOf('isoWeek').startOf('day');
  }
}
