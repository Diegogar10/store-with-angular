import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';

//import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    //private tokenService: TokenService,
    private router: Router,
    private authServices: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    /*
    const token = this.tokenService.getToken();
    if(!token){
      this.router.navigate(['/home'])
      return false;
    }
    return true ;
    */
    return this.authServices.myUser$
    .pipe(
      map(user=> {
        console.log('user',user);
        if(!user){
          this.router.navigate(['/home']);
          return false;
        }
        return true;
      })
    )
  }

}
