import { Injectable } from '@angular/core';
import { HabitDay } from './habit.model';
import { Habit } from './habit.model';
import { HabitsService } from './habits.service';
import { DateService } from './date.service';

@Injectable()
export class HabitsProgressService {
	habitProgress: Map<Habit, Map<number, HabitDay>> = new Map<Habit, Map<number, HabitDay>>();

  constructor(private habitsService: HabitsService,
              private dateService: DateService) {
    this.habitsService.habits.forEach(habit => {
      const habitDay: Map<number, HabitDay> = new Map();
      this.dateService.currentWeek().forEach(day => {
        habitDay.set(day.unix(), new HabitDay(day, habit, Math.round(Math.random() * 60)));
      });
      this.habitProgress.set(habit, habitDay);
    });
    console.log(this.habitProgress);
  }

}
