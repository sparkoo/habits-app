import { TestBed, inject } from '@angular/core/testing';

import { HabitsService } from './habits.service';

describe('HabitsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HabitsService]
    });
  });

  it('should be created', inject([HabitsService], (service: HabitsService) => {
    expect(service).toBeTruthy();
  }));
});
