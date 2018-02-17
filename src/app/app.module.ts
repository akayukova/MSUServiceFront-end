import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';


import {AppComponent} from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { AppRoutingModule } from './/app-routing.module';
import { RequestComponent } from './request/request.component';
import {MessageService} from './services/message.service';
import { RequestService } from './services/request.service';
import { MessageComponent } from './message/message.component';
import { EditorComponent } from './editor/editor.component';
import { MastersComponent } from './masters/masters.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import {JsonHttp} from './JsonHttp';
import { AuthComponent } from './auth/auth.component';
import {PublicPageGuard} from './public-page.guard';



@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    RequestComponent,
    MessageComponent,
    EditorComponent,
    MastersComponent,
    HeaderComponent,
    AuthComponent
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  providers: [RequestService, MessageService, AuthService, JsonHttp, PublicPageGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
