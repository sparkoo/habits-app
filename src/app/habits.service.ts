import { EventEmitter, Injectable } from '@angular/core';
import { Habit } from './habit.model';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class HabitsService {
  private readonly COLLECTION_PATH = 'habits';

  habitsChanged: EventEmitter<Map<string, Habit>> = new EventEmitter();
  private habits: Map<string, Habit> = new Map();
  private habitsCollection: AngularFirestoreCollection<Habit>;

  constructor(private db: AngularFirestore) {
    this.habitsCollection = this.db.collection<Habit>(this.COLLECTION_PATH);
    this.habitsChanged.next(this.habits);
  }

  createHabit(habit: Habit) {
    const itemDoc = this.db.doc<Habit>(this.COLLECTION_PATH + '/' + habit.name);
    this.habitsCollection.add(habit)
      .then(insertedHabit => {
        habit.id = insertedHabit.id;
        insertedHabit.update(habit)
          .then(_ => {
            console.log('habit added: ', _);
            this.getHabits().then(habits => this.habitsChanged.next(habits));
          })
      });
  }

  updateHabit(habitId: string, habit: Habit) {
    console.log(habit);
    this.habits.set(habitId, habit);
    this.habitsCollection.doc(String(habitId))
      .update(habit)
      .catch(e => console.log(e));
    this.getHabits().then(habits => this.habitsChanged.next(habits));
  }

  getHabits(): Promise<Map<string, Habit>> {
    return new Promise<Map<string, Habit>>((resolve, reject) => {
      this.db.collection('habits').valueChanges().subscribe((habits) => {
        const localHabits: Map<string, Habit> = new Map();
        habits.forEach(habit => localHabits.set(habit['id'],
          {id: habit['id'], name: habit['name'], goal: habit['goal'], progress: habit['progress']}));
        console.log(localHabits);
        resolve(localHabits);
      })
    })
  }
}
