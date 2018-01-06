import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthService } from '../auth.service';
import { SignoutComponent } from './signout.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

// An anonymous user
const authState = {
  displayName: null,
  isAnonymous: true,
  uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2'
};

export const mockAngularFireAuth: any = {
  auth: jasmine.createSpyObj('auth', {
    'signInAnonymously': Promise.reject({
      code: 'auth/operation-not-allowed'
    }),
    // 'signInWithPopup': Promise.reject(),
    // 'signOut': Promise.reject()
  }),
  authState: Observable.of(authState)
};

describe('SignoutComponent', () => {
  let component: SignoutComponent;
  let fixture: ComponentFixture<SignoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: mockAngularFireAuth }
      ],
      declarations: [SignoutComponent],
      imports: [
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase)
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
