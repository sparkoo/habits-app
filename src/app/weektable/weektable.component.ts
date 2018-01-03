import { Component, OnInit } from '@angular/core';
import { DateService } from '../date.service';
import { Habit } from '../habit.model';
import { HabitsService } from '../habits.service';
import { Moment } from 'moment';
import { InlineEditorEvent } from '@qontu/ngx-inline-editor';

@Component({
  selector: 'app-weektable',
  templateUrl: './weektable.component.html',
  styleUrls: ['./weektable.component.scss']
})
export class WeektableComponent implements OnInit {
  weekDays: Array<Moment>;
  habits: Array<Habit> = [];
  today: Moment = this.dateService.today();
  newHabitText = '1';
  newHabitGoal = '';

  constructor(private dateService: DateService,
              private habitsService: HabitsService) {
  }

  ngOnInit() {
    this.weekDays = this.dateService.currentWeek();

    this.habitsService.getHabits()
      .then(habits => habits.forEach(habit => this.habits.push(habit)))
      .catch(e => console.log(e));
    this.habitsService.habitsChanged
      .subscribe(habits => {
        this.habits = [];
        habits.forEach(habit => {
          this.habits.push(habit)
        })
      });
  }

  saveProgress(habit: Habit, day: Moment, value: number) {
    habit.progress[DateService.getKeyFromMoment(day)] = value;
    console.log(value);
    console.log(habit);
    this.habitsService.updateHabit(habit.id, habit);
  }

  saveHabitName(habit: Habit, $event: InlineEditorEvent | any) {
    habit.name = $event;
    this.habitsService.updateHabit(habit.id, habit);
  }

  newHabit() {
    this.habitsService.createHabit({
      id: '',
      name: this.newHabitText,
      goal: +this.newHabitGoal,
      progress: {}
    });
    this.newHabitText = '';
    this.newHabitGoal = '1';
  }

  getKeyFromMoment(moment: Moment): string {
    return DateService.getKeyFromMoment(moment);
  }
}
