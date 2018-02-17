import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isSignedIn = true;
  isMenuHidden = false;
  authorities: string[] = [];

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isSignedIn = this.authService.isSignedIn();
    if (this.isSignedIn)
      this.authorities.push(localStorage.getItem('authority0'));
    console.log('SIGNED' + this.isSignedIn);
    this.authService.events.subscribe(() => {
      this.isSignedIn = this.authService.isSignedIn();
      this.authorities.push(localStorage.getItem('authority0'));
    });
  }

  logout() {
    this.authService.logout();
    this.authorities = [];
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
