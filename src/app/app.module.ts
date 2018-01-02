import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WeektableComponent } from './weektable/weektable.component';
import { DateService } from './date.service';
import { HabitsService } from './habits.service';
import { HabitsProgressService } from './habits-progress.service';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WeektableComponent
  ],
  imports: [
    BrowserModule,
    InlineEditorModule,
    FormsModule
  ],
  providers: [DateService, HabitsService, HabitsProgressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
