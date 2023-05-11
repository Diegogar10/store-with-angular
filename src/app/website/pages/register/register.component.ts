import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import { OnExit } from 'src/app/guards/exit.guard';
import { CreateUserDTO, User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnExit, OnInit{

  constructor(
    private userService: UsersService,
    private router: Router
  ) {}

  register: CreateUserDTO = {
    name: '',
    email: '',
    password: '',
    role: 'user'
  }

  private users: User[] = [];

  emailValid = false;
  password_confirm = '';
  passValid = false;
  error = '';

  ngOnInit(): void {
    this.userService.getAll()
    .subscribe(users=>{
      this.users = users;
    });
  }

  onExit() {
    const rta = confirm('Logica desde el componente, esta seguro de salir?');
    return rta;
  }

  registerUser() {
    this.userService.create(this.register)
    .subscribe(data=>{
      this.register = {
        name: '',
        email: '',
        password: '',
        role: 'user'
      }
      this.router.navigate(['/thanks']);
    })
  }

  samePassword(){
    this.passValid = this.password_confirm !== this.register.password;
  }

  emailValidate() {
    if(this.users){
      const valid: boolean = this.users.map(user=>user.email).includes(this.register.email);
      this.emailValid = valid;
    }
  }
}
