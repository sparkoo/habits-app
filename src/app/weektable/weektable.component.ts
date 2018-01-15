import { Component, OnInit } from '@angular/core';
import { DateService } from '../date.service';
import { Habit } from '../habit.model';
import { HabitsService } from '../habits.service';
import { Moment } from 'moment';
import { InlineEditorEvent } from '@qontu/ngx-inline-editor';
import { AuthService } from '../auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DragulaService } from 'ng2-dragula';
import moment = require('moment');

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

  graphData = [
    { 'name': 'goal', 'series': [] },
    { 'name': 'progress', 'series': [] }
  ];
  graphColors = { domain: ['#f5c6cb', '#c3e6cb'] };

  constructor(private dateService: DateService,
              private habitsService: HabitsService,
              private authService: AuthService,
              private dragulaService: DragulaService) {
  }

  ngOnInit() {
    this.weekDays = this.dateService.currentWeek();

    this.dragulaService.drop.subscribe(() => {
      this.updateHabitsOrder();
    });

    this.habitsService.getHabits()
      .then(this.updateHabitsView)
      .catch(e => console.log(e));
    this.habitsService.habitsChanged
      .subscribe(this.updateHabitsView);

    this.newHabitForm = new FormGroup({
      newHabitText: new FormControl('', Validators.required),
      newHabitGoal: new FormControl('1', Validators.min(1))
    });
  }

  updateHabitsView: (habits: Map<string, Habit>) => void =
    (habits) => {
      this.habits = [];
      habits.forEach(habit => this.habits.push(habit));
      this.habits.sort((a, b) => a.order - b.order);
      this.initGraphData();
    };

  updateHabitsOrder() {
    this.habits.forEach((habit, index) => habit.order = index);
    this.habitsService.updateHabits(this.habits);
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
        order: 999,
        name: this.newHabitForm.get('newHabitText').value,
        goal: +this.newHabitForm.get('newHabitGoal').value,
        progress: {}
      });
      this.newHabitForm.reset({ newHabitText: '', newHabitGoal: '1' });
    }
  }

  getKeyFromMoment(moment: Moment): string {
    return DateService.getKeyFromMoment(moment);
  }

  deleteHabit(habit: Habit) {
    this.habitsService.deleteHabit(habit);
  }

  increment(habit: Habit, day: Moment) {
    if (habit.progress[DateService.getKeyFromMoment(day)]) {
      this.saveProgress(habit, day, habit.progress[DateService.getKeyFromMoment(day)] + 1);
    } else {
      this.saveProgress(habit, day, 1);
    }
  }

  decrement(habit: Habit, day: Moment) {
    if (habit.progress[DateService.getKeyFromMoment(day)]) {
      this.saveProgress(habit, day, habit.progress[DateService.getKeyFromMoment(day)] - 1);
    }
  }

  weekProgress(habit: Habit): number {
    let weekProgress = 0;
    this.dateService.currentWeek()
      .filter(day => habit.progress[DateService.getKeyFromMoment(day)])
      .forEach(day => weekProgress += habit.progress[DateService.getKeyFromMoment(day)]);
    return weekProgress;
  }

  weekGoal(habit: Habit): number {
    return habit.goal * 7;
  }

  percentageProgressDay(habit: Habit, day: Moment): number {
    return habit.progress[this.getKeyFromMoment(day)] / habit.goal * 100;
  }

  percentageProgressWeek(habit: Habit) {
    return this.weekProgress(habit) / this.weekGoal(habit) * 100;
  }

  mouseEnter(event: MouseEvent) {
    event.toElement.classList.add('mousehere');
  }

  mouseLeave(event: MouseEvent) {
    event.fromElement.classList.remove('mousehere');
  }

  private initGraphData() {
    const graphData = [
      { 'name': 'goal', 'series': [] },
      { 'name': 'progress', 'series': [] }
    ];
    const dailyGoal = this.habits.map(habit => habit.goal).reduce((a, b) => a + b);
    this.weekDays.forEach(day => {
      const dayProgress = this.habits
        .map(habit => habit.progress[this.getKeyFromMoment(day)] ? habit.progress[this.getKeyFromMoment(day)] : 0)
        .reduce((a, b) => a + b);
      graphData[0].series.push({ 'name': String(day.unix()), 'value': dailyGoal });
      graphData[1].series.push({ 'name': String(day.unix()), 'value': dayProgress });
    });
    this.graphData = graphData;
  }

  previousWeek() {
    this.weekDays = this.dateService.previousWeekOf(this.weekDays[0].clone());
    this.initGraphData();
  }

  nextWeek() {
    this.weekDays = this.dateService.nextWeekOf(this.weekDays[0].clone());
    this.initGraphData();
  }

  thisWeek() {
    this.weekDays = this.dateService.currentWeek();
    this.initGraphData();
  }
}
