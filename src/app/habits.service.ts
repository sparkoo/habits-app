import { EventEmitter, Injectable } from '@angular/core';
import { Habit } from './habit.model';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from './auth/auth.service';

@Injectable()
export class HabitsService {
  private readonly COLLECTION_PATH = 'habits';

  habitsChanged: EventEmitter<Map<string, Habit>> = new EventEmitter();
  private habitsCollection: AngularFirestoreCollection<Habit>;

  constructor(private db: AngularFirestore,
              private authService: AuthService) {
    this.habitsCollection = this.db.collection<Habit>(this.COLLECTION_PATH);
  }

  createHabit(habit: Habit) {
    this.habitsCollection.add(habit)
      .then(insertedHabit => {
        habit.id = insertedHabit.id;
        insertedHabit.update(habit)
          .then(() => this.getHabits().then(habits => this.habitsChanged.next(habits)));
      });
  }

  updateHabit(habitId: string, habit: Habit) {
    this.habitsCollection.doc(String(habitId))
      .update(habit)
      .catch(e => console.log(e));
    this.getHabits().then(habits => this.habitsChanged.next(habits));
  }

  updateHabits(habits: Array<Habit>) {
    habits.forEach(habit => {
      this.habitsCollection.doc(String(habit.id))
        .update(habit)
        .catch(e => console.log(e));
    });
    this.getHabits().then(receivedHabits => this.habitsChanged.next(receivedHabits));
  }

  getHabits(): Promise<Map<string, Habit>> {
    return new Promise<Map<string, Habit>>((resolve, reject) => {
      this.db.collection('habits', ref => ref.where('userId', '==', this.authService.signedUser.id))
        .valueChanges()
        .subscribe((habits) => {
          const localHabits: Map<string, Habit> = new Map();
          habits.forEach(habit => localHabits.set(habit['id'],
            {
              id: habit['id'],
              userId: habit['userId'],
              order: habit['order'],
              name: habit['name'],
              goal: habit['goal'],
              progress: habit['progress']
            }));
          resolve(localHabits);
        });
    });
  }

  deleteHabit(habit: Habit) {
    this.habitsCollection.doc(habit.id)
      .delete()
      .then(_ => this.getHabits().then(habits => this.habitsChanged.next(habits)))
      .catch(e => console.log(e));
  }
}
