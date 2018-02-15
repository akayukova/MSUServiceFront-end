import {Component, OnInit, HostListener} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isSignedIn: boolean;
  isMenuHidden = false;

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isSignedIn = this.authService.isSignedIn();
    console.log("SIGNED " + this.isSignedIn);
    this.authService.events.subscribe(() => {
      this.isSignedIn = this.authService.isSignedIn();
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleMenu(e: Event) {
    this.isMenuHidden = !this.isMenuHidden;
    e.stopPropagation();
  }

  @HostListener('document:click') hideMenu() {
    this.isMenuHidden = true;
  }
}
