import { TestBed, inject } from '@angular/core/testing';

import { HabitsService } from './habits.service';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

describe('HabitsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HabitsService],
      imports: [
        AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebase)
      ]
    });
  });

  it('should be created', inject([HabitsService], (service: HabitsService) => {
    expect(service).toBeTruthy();
  }));
});
