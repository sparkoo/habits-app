import { Component, OnInit } from '@angular/core';
import { DateService } from '../date.service';
import { Habit, HabitDay } from '../habit.model';
import { HabitsService } from '../habits.service';
import { Moment } from 'moment';

@Component({
  selector: 'app-weektable',
  templateUrl: './weektable.component.html',
  styleUrls: ['./weektable.component.scss']
})
export class WeektableComponent implements OnInit {
  weekDays: Array<Moment>;
  habits: Array<Habit>;
  habitsProgress: Map<Habit, Map<Moment, HabitDay>> = new Map<Habit, Map<Moment, HabitDay>>();

  constructor(private dateService: DateService,
              private habitsService: HabitsService) {
  }

  ngOnInit() {
    this.weekDays = this.dateService.currentWeek();
    this.habits = this.habitsService.habits;
    this.habitsService.habitsChanged.subscribe(habits => this.habits = habits);
  }

  getHabitProgress(habit: Habit, day: Moment): string {
    if (this.habitsProgress.has(habit)) {
      const habitProgress: Map<Moment, HabitDay> = this.habitsProgress.get(habit);
      if (habitProgress.has(day)) {
        return String(habitProgress.get(day).accomplished);
      }
    }
    return '0';
  }
}
