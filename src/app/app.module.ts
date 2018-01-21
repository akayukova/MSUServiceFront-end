import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';


import {AppComponent} from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { AppRoutingModule } from './/app-routing.module';
import { RequestComponent } from './request/request.component';
import {MessageService} from './message.service';
import { RequestService } from './request.service';
import { MessageComponent } from './message/message.component';
import { EditorComponent } from './editor/editor.component';
import { MastersComponent } from './masters/masters.component';



@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    RequestComponent,
    MessageComponent,
    EditorComponent,
    MastersComponent
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  providers: [RequestService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
