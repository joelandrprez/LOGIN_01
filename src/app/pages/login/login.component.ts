import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'

import { UsuarioModel} from './../../models/usuario.models';
import { AuthService } from 'src/app/services/auth.service';


import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  recordar = false;

  constructor( private auth:AuthService,
                private router:Router) { 

                  
                }



  ngOnInit() {
    this.usuario = new UsuarioModel;
    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
    }
  }


  onSubmit(form : NgForm){

    if(form.invalid){return;}

        Swal.fire({
          allowOutsideClick:false,
          text:'ESPERE PORFAVOR'
        });
        Swal.showLoading();
       

        this.auth.login(this.usuario).subscribe(resp => {
          Swal.close();
          // console.log(resp);

          this.router.navigateByUrl('/home');
          if(this.recordar){
            localStorage.setItem('email',this.usuario.email);
          }

        },(err) =>{
            // console.log(err.error.error.message);
            Swal.fire({
              title: 'Error!',
              text: 'Error al autenticar',
              icon: 'error',
            });
            // console.log(err.error.error.message);
        });
  }


}
