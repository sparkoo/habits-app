import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WeektableComponent } from './weektable/weektable.component';
import { AngularFireModule } from 'angularfire2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { HabitsService } from './habits.service';
import { DateService } from './date.service';
import { AuthService } from './auth/auth.service';
import { SigninComponent } from './auth/signin/signin.component';
import { SignoutComponent } from './auth/signout/signout.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { DragulaModule } from 'ng2-dragula/components/dragular.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        WeektableComponent,
        SigninComponent,
        SignoutComponent
      ],
      imports: [
        InlineEditorModule,
        FormsModule,
        ReactiveFormsModule,
        DragulaModule,
        NgbModule.forRoot(),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      providers: [DateService, HabitsService, AuthService]
    }).compileComponents();
  }));
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
