import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeektableComponent } from './weektable.component';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { FormsModule } from '@angular/forms';
import { HabitsService } from '../habits.service';
import { DateService } from '../date.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';

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
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      providers: [DateService, HabitsService, AuthService]
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
