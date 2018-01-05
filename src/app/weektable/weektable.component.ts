import { Component, OnInit } from '@angular/core';
import { DateService } from '../date.service';
import { Habit } from '../habit.model';
import { HabitsService } from '../habits.service';
import { Moment } from 'moment';
import { InlineEditorEvent } from '@qontu/ngx-inline-editor';
import { AuthService } from '../auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-weektable',
  templateUrl: './weektable.component.html',
  styleUrls: ['./weektable.component.scss']
})
export class WeektableComponent implements OnInit {
  weekDays: Array<Moment>;
  habits: Array<Habit> = [];
  today: Moment = this.dateService.today();
  newHabitText = '';
  newHabitGoal = '1';

  newHabitForm: FormGroup;

  constructor(private dateService: DateService,
              private habitsService: HabitsService,
              private authService: AuthService) {
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

    this.newHabitForm = new FormGroup({
      'newHabitText': new FormControl('', [Validators.required]),
      'newHabitGoal': new FormControl('1', [Validators.min(1)])
    });
  }

  saveProgress(habit: Habit, day: Moment, value: number) {
    habit.progress[DateService.getKeyFromMoment(day)] = value;
    this.habitsService.updateHabit(habit.id, habit);
  }

  saveHabitName(habit: Habit, $event: InlineEditorEvent | any) {
    habit.name = $event;
    this.habitsService.updateHabit(habit.id, habit);
  }

  newHabitSubmitted() {
    if (this.newHabitForm.valid) {
      this.habitsService.createHabit({
        id: '',
        userId: this.authService.signedUser.id,
        name: this.newHabitForm.get('newHabitText').value,
        goal: +this.newHabitForm.get('newHabitGoal').value,
        progress: {}
      });
      this.newHabitForm.reset({newHabitText: '', newHabitGoal: '1'});
    }
  }

  getKeyFromMoment(moment: Moment): string {
    return DateService.getKeyFromMoment(moment);
  }

  deleteHabit(habit: Habit) {
    this.habitsService.deleteHabit(habit);
  }
}
