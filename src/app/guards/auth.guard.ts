import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (private auth:AuthService,
                private router:Router){

  }
  canActivate(): boolean {

    console.log('Guard');
    if( this.auth.startAuth() ){
      return true;
    }
    else{
      this.router.navigateByUrl('/login');
    }
  }
  
}
