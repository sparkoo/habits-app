import { Moment } from 'moment';

export class Habit {
  constructor(public id: number,
              public name: string,
              public count: number) {}
}

export class HabitDay {
  constructor(public day: Moment,
              public habit: Habit,
              public accomplished: number) {}
}
