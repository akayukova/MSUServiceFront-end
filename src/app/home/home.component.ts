import {Component, OnInit} from '@angular/core';
import {JsonHttp} from '../JsonHttp';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isSignedIn: boolean;
  checked: boolean;

  constructor(private jsonHttp: JsonHttp,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isSignedIn = this.authService.isSignedIn();
    this.authService.events.subscribe(() => {
      this.isSignedIn = this.authService.isSignedIn();
    });
  }

  getCategories() {
    alert("hello!");
  }
}
