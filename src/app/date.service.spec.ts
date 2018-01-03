import { TestBed, inject } from '@angular/core/testing';

import { DateService } from './date.service';
import moment = require('moment');

describe('DateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateService]
    });
  });

  it('should be created', inject([DateService], (service: DateService) => {
    expect(service).toBeTruthy();
  }));

  it('create key from moment should create string of format 2017-01-15', () => {
    expect(DateService.getKeyFromMoment(moment('2017-12-25'))).toBe('2017-12-25');
    expect(DateService.getKeyFromMoment(moment('2017-02-25'))).toBe('2017-02-25');
  });
});
