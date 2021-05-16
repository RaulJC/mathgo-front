import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { IRegistrarUsuarioRequest } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    edad: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    rol: new FormControl('Selecciona tu rol')
  });

  alertMsg : string;

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
  }

  onSubmit(){
  
    let registroRequest: IRegistrarUsuarioRequest = {
      usuario : {
        nombre: this.registerForm.controls.nombre.value,
        edad: this.registerForm.controls.edad.value,
        username: this.registerForm.controls.username.value,
        password: this.registerForm.controls.password.value,
        rol: this.registerForm.controls.username.value
      }
    }
    this.auth.registrarUsuario(registroRequest).subscribe(response =>{
      this.alertMsg = response.response;
    });
  }

}
