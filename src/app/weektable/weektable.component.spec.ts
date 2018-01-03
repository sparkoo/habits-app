import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeektableComponent } from './weektable.component';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { FormsModule } from '@angular/forms';
import { HabitsService } from '../habits.service';
import { DateService } from '../date.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';

describe('WeektableComponent', () => {
  let component: WeektableComponent;
  let fixture: ComponentFixture<WeektableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeektableComponent],
      imports: [
        InlineEditorModule,
        FormsModule,
        AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      providers: [DateService, HabitsService]
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
