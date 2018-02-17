import {Component, OnInit} from '@angular/core';
import {MessageService} from './services/message.service';
import {Authorities} from './authorities';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  isSignedIn = false;

  constructor(public messageService: MessageService,
              private authService: AuthService) {
}

ngOnInit(): void {
  this.isSignedIn = this.authService.isSignedIn();
console.log("SIGNED " + this.isSignedIn);
this.authService.events.subscribe(() => {
  this.isSignedIn = this.authService.isSignedIn();
  //this.authorities = Authorities.list;
});
}

}
