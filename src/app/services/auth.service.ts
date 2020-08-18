import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.models';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userToken:string;
  private URL1 = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDI26br5zdpnlCGtQSg6d_KyRSfyx7PGJY';
  private URL2 = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDI26br5zdpnlCGtQSg6d_KyRSfyx7PGJY';

  //CREAR
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  //LOGEAR
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  //KEY
  //AIzaSyDI26br5zdpnlCGtQSg6d_KyRSfyx7PGJY

  constructor( private http:HttpClient) {
    this.readToken();
  }


  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('expira');
    // localStorage.removeItem('email');
  }


  login(usuario:UsuarioModel){
    const authData = {
      email:usuario.email,
      password:usuario.password,
      returnSecureToken: true
    };
    return this.http.post(
      `${this.URL2}`,
      authData
    ).pipe(
        map(resp => {
          this.saveToken(resp['idToken']);
          return resp;
        })
    );

  }

  registrar(usuario:UsuarioModel){
    const authData = {
      
      ...usuario,
      returnSecureToken: true

    };
    return this.http.post(
      `${this.URL1}`,
      authData
    ).pipe(
      map(resp => {
        console.log('ENTRO EN EL MAPEO');
        this.saveToken(resp['idToken']);
        return resp;
      })
  );
  }

  private saveToken(idtoken :string){
    this.userToken = idtoken;
    localStorage.setItem('token',idtoken);

    let hoy = new Date();
    hoy.setSeconds(3600);
    localStorage.setItem('expira',hoy.getTime().toString());



  }


  readToken(){
    if(localStorage.getItem('token')){

      this.userToken = localStorage.getItem('token');

    }else{

      this.userToken = '';

    }
    return this.userToken;
  }
  startAuth() : boolean {
    if(this.userToken.length<2){

      return false;

    }
    const expira = Number( localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);
    if (expiraDate> new Date()){
      return true;
    }else{
      return false
    }

  }
}
