import { Component, OnInit } from '@angular/core';
import { DateService } from '../date.service';
import { Habit, HabitDay } from '../habit.model';
import { HabitsService } from '../habits.service';
import { Moment } from 'moment';
import { HabitsProgressService } from '../habits-progress.service';

@Component({
  selector: 'app-weektable',
  templateUrl: './weektable.component.html',
  styleUrls: ['./weektable.component.scss']
})
export class WeektableComponent implements OnInit {
  weekDays: Array<Moment>;
  habits: Array<Habit>;
  habitsProgress: Map<number, Map<number, HabitDay>> = new Map();
  today: Moment = this.dateService.today();

  constructor(private dateService: DateService,
              private habitsService: HabitsService,
              private habitsProgressService: HabitsProgressService) {
  }

  ngOnInit() {
    this.weekDays = this.dateService.currentWeek();
    this.habits = this.habitsService.habits;
    this.habitsService.habitsChanged.subscribe(habits => this.habits = habits);
    this.habitsProgress = this.habitsProgressService.habitProgress;
  }

  getHabitProgress(habit: Habit, day: Moment): string {
    if (this.habitsProgress.has(habit.id)) {
      const habitProgress: Map<number, HabitDay> = this.habitsProgress.get(habit.id);
      if (habitProgress.has(day.unix())) {
        return String(habitProgress.get(day.unix()).accomplished);
      }
    }
    return '0';
  }

  saveEditable(habit: Habit, day: Moment, value: number) {
    this.habitsProgressService.saveProgress(habit, day, value);
  }
}
