import { EventEmitter, Injectable } from '@angular/core';
import { Habit, HabitDay } from './habit.model';
import { HabitsService } from './habits.service';
import { DateService } from './date.service';
import { Moment } from 'moment';

@Injectable()
export class HabitsProgressService {
	habitProgress: Map<number, Map<number, HabitDay>> = new Map();
	habitProgressChanged: EventEmitter<Map<number, Map<number, HabitDay>>> = new EventEmitter();

  constructor(private habitsService: HabitsService,
              private dateService: DateService) {
    this.habitsService.habits.forEach(habit => {
      const habitDay: Map<number, HabitDay> = new Map();
      this.dateService.currentWeek().forEach(day => {
        habitDay.set(day.unix(), new HabitDay(day, habit, 0));
      });
      this.habitProgress.set(habit.id, habitDay);
    });
    console.log(this.habitProgress);
  }

  saveProgress(habit: Habit, day: Moment, value) {
    this.habitProgress.get(habit.id).get(day.unix()).accomplished = value;
    this.habitProgressChanged.next(this.habitProgress);
  }
}
