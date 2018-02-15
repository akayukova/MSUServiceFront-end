import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

//import {styles} from './auth.component.styles';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {

  //styles: any = styles;

  constructor(private router: Router,
              private authService: AuthService) {
  }

  login(email, password) {
    this.authService.login(email, password)
      .subscribe(() => {
        this.router.navigate(['/home']);
      }, e => this.handleError(e));
  }

  handleError(error) {
    switch (error.status) {
      case 401:
        alert('401');
    }
  }

}
