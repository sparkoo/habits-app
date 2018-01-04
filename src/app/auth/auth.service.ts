import { Injectable } from '@angular/core';
import { User } from '../user.model';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  public signedUser: User;

  constructor(public afAuth: AngularFireAuth) {
    this.observeAuthState();
  }

  private observeAuthState() {
    this.afAuth.authState.subscribe(user => {
      console.log(user);
      if (user !== null) {
        this.signedUser = {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoURL
        };
      } else {
        this.signedUser = null;
      }
    });
  }

  signIn() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(result => {
        console.log(result);
        this.signedUser = {
          id: result.user.gid,
          name: result.user.displayName,
          email: result.user.email,
          photoUrl: result.user.photoUrl
        };
      })
      .catch(e => console.log('err ==> ', e));
  }

  signOut() {
    this.afAuth.auth.signOut()
      .then(() => {
        this.signedUser = null;
      })
      .catch(e => console.log('err ==> ', e));
  }

  signedIn(): User | null {
    return this.signedUser;
  }
}
