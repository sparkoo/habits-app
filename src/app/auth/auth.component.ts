import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  signedIn = false;
  user: firebase.User;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.signIn();
  }

  logout() {
    this.authService.signOut();
  }
}
