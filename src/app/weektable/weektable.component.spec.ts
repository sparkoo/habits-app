import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeektableComponent } from './weektable.component';

describe('WeektableComponent', () => {
  let component: WeektableComponent;
  let fixture: ComponentFixture<WeektableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeektableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeektableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
