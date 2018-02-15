import {Component, OnInit, HostListener} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Authorities} from '../authorities';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isSignedIn: boolean = true;
  isMenuHidden = false;
  authorities: string[] = [];

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isSignedIn = this.authService.isSignedIn();
    console.log("SIGNED " + this.isSignedIn);
    this.authService.events.subscribe(() => {
      this.isSignedIn = this.authService.isSignedIn();
      this.authorities = Authorities.list;
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
