import { TestBed, inject } from '@angular/core/testing';

import { HabitsProgressService } from './habits-progress.service';

describe('HabitsProgressService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HabitsProgressService]
    });
  });

  it('should be created', inject([HabitsProgressService], (service: HabitsProgressService) => {
    expect(service).toBeTruthy();
  }));
});
