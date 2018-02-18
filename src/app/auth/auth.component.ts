import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {

  constructor(private router: Router,
              private authService: AuthService) {
  }

  login(email, password) {
    this.authService.login(email, password)
      .subscribe(() => {
        this.router.navigate(['/']);
      }, e => this.handleError(e));
  }

  handleError(error) {
    switch (error.status) {
      case 403:
        alert('Неверные имя пользователя или пароль!');
    }
  }

}
