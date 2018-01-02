import { EventEmitter, Injectable } from '@angular/core';
import { Habit} from './habit.model';

@Injectable()
export class HabitsService {
  habitsChanged: EventEmitter<Array<Habit>> = new EventEmitter<Array<Habit>>();
  habits: Array<Habit> = [];

  constructor() {
    this.habits.push(new Habit(0, 'read a book', 50));
    this.habits.push(new Habit(1, 'run', 5));
    this.habits.push(new Habit(2, 'wake up early', 1));
    this.habitsChanged.next(this.habits);
  }
}
