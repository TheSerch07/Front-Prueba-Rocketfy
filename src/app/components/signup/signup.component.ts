import { Component } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user: UserModel = {
    email: '',
    password: ''
  }

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  signUp() {
    this.authService.signUp(this.user)
      .subscribe(
        res => {
          localStorage.setItem('token', res.secretKey)
          this.router.navigate(['/sensors'])
        }
        ,
        err => {
          console.log(err.error)
        }
      )
  }
}
