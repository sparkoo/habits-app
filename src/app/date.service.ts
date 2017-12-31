import { Injectable } from '@angular/core';
import moment = require('moment');

@Injectable()
export class DateService {

  constructor() { }

  currentWeek(): Array<moment.Moment> {
    const weekDays: Array<moment.Moment> = [];
    let dayOfWeek = this.startOfWeek();
    weekDays.push(dayOfWeek.clone());
    while (dayOfWeek.isoWeekday() < 7) {
      dayOfWeek = dayOfWeek.add(1, 'days');
      weekDays.push(dayOfWeek.clone());
    }
    return weekDays;
  }

  private startOfWeek(): moment.Moment {
    let day = moment().startOf('day');
    while (day.isoWeekday() != 1) {
      day = day.subtract(1, 'days');
    }
    return day;
  }
  }
