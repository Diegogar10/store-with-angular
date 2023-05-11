import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  register = {
    email: '',
    password: '',
  }
  error = '';


  constructor(
    private authServices: AuthService,
    private router: Router
  ) {}

  login() {
    this.authServices.loginAndGet(this.register.email, this.register.password)
    .subscribe({
      next: ()=>{
        this.router.navigate(['/profile'])
      },
      error: (err)=> {
        this.error = err;
        this.resetInpts();
      }
    })
    /* .subscribe(()=>{
      this.router.navigate(['/profile'])
    }); */
  }

  resetInpts() {
    this.register.email = '';
    this.register.password = '';
  }
}
