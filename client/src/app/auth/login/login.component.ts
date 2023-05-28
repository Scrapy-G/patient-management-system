import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService) {}

  data = {
    email: '',
    password: ''
  }
  error: string | null;
  loading = false;

  login() {
    this.loading = false;
    this.authService.login(this.data.email, this.data.password).subscribe({
      error: err => {
        console.log(err);
        this.error = err.error;
        this.loading = false;
      }
    })
  }
}
