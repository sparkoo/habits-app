import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WeektableComponent } from './weektable/weektable.component';
import { DateService } from './date.service';
import { HabitsService } from './habits.service';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './auth/auth.service';
import { SigninComponent } from './auth/signin/signin.component';
import { SignoutComponent } from './auth/signout/signout.component';
import { DragulaModule } from 'ng2-dragula';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    WeektableComponent,
    SigninComponent,
    SignoutComponent
  ],
  imports: [
    BrowserModule,
    InlineEditorModule,
    FormsModule,
    ReactiveFormsModule,
    DragulaModule,
    NgbModule.forRoot(),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [DateService, HabitsService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
