import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss']
})
export class SignoutComponent implements OnInit {
  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.signOut();
  }
}
