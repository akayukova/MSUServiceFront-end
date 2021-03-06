import {Component, OnInit} from '@angular/core';
import {MessageService} from './services/message.service';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isSignedIn = false;
  masterName: string = '';

  constructor(public messageService: MessageService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isSignedIn = this.authService.isSignedIn();
    if (this.isSignedIn)
      this.masterName = localStorage.getItem('masterName');
    this.authService.events.subscribe(() => {
      this.isSignedIn = this.authService.isSignedIn();
      this.masterName = localStorage.getItem('masterName');
      this.messageService.clear();
    });
  }

}
