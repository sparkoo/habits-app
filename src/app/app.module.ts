import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WeektableComponent } from './weektable/weektable.component';
import { DateService } from './date.service';
import { HabitsService } from './habits.service';

@NgModule({
  declarations: [
    AppComponent,
    WeektableComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [DateService, HabitsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
