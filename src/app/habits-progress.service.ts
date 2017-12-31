import { Injectable } from '@angular/core';
import { HabitDay } from './habit.model';
import { Habit } from './habit.model';
import { Moment } from 'moment';

@Injectable()
export class HabitsProgressService {
	private habits: Map<Habit, Map<Moment, HabitDay>> = new Map<Habit, Map<Moment, HabitDay>>();

  constructor() { }

}
