import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeektableComponent } from './weektable.component';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HabitsService } from '../habits.service';
import { DateService } from '../date.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { SignoutComponent } from '../auth/signout/signout.component';
import { mockAngularFireAuth } from '../auth/signout/signout.component.spec';
import { DragulaModule } from 'ng2-dragula/components/dragular.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('WeektableComponent', () => {
  let component: WeektableComponent;
  let fixture: ComponentFixture<WeektableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeektableComponent, SignoutComponent],
      imports: [
        BrowserAnimationsModule,
        NgxChartsModule,
        InlineEditorModule,
        FormsModule,
        ReactiveFormsModule,
        DragulaModule,
        NgbModule.forRoot(),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      providers: [DateService, HabitsService, AuthService,
        { provide: AngularFireAuth, useValue: mockAngularFireAuth }
      ]
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
