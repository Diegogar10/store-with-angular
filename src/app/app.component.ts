import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  imgParent = '';
  imgState = false;
  token = '';
  imgRta = '';

  constructor(
    private userServices: UsersService,
    private filesService: FilesService,
    private authServices: AuthService,
    private tokenServices: TokenService
  ) {

  }

  ngOnInit(): void {
    const token = this.tokenServices.getToken();
      if(token) {
      this.authServices.profile()
      .subscribe();
    }
  }

  onLoaded(img: string) {
    console.log('Cargo:' , img);
  }
  toggleImg() {
    this.imgState = !this.imgState;
  }
  createUser() {
    this.userServices.create({
      name: 'Diego',
      email: 'diego@gmail.com',
      password: '12346',
      role:'admin'
    })
    .subscribe(rta => {
      console.log(rta);
    })
  }
  /* login() {
    this.authService.login('dieguit@gmail.com','12345')
    .subscribe(rta => {
      this.token = rta.access_token;
    })
  }
  getProfile() {
    this.authService.profile(this.token);
  } */
  downloadPDF() {
    this.filesService.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe()
  }
  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if(file) {
      this.filesService.uploadFile(file)
      .subscribe(rta => {
        this.imgRta = rta.location;
      })
    }
  }
}
