import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { IRegistrarUsuarioRequest } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    nombre: new FormControl('',[Validators.required]),
    edad: new FormControl('',Validators.compose([
      Validators.required,
      Validators.pattern('([4-9]|1[0-5])')
    ])),
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    rol: new FormControl('KID')
  });

  registroCorrecto:Boolean = true;
  alertMsg : string;

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.registerForm.get('rol')?.value == 'PROFESIONAL') this.registerForm.controls.edad.setValue('0');
    if(this.checkValidators()){
      let registroRequest: IRegistrarUsuarioRequest = {
        usuario : {
          nombre: this.registerForm.controls.nombre.value,
          edad: this.registerForm.controls.edad.value,
          username: this.registerForm.controls.username.value,
          password: this.registerForm.controls.password.value,
          rol: this.registerForm.controls.rol.value
        }
      }
      this.auth.registrarUsuario(registroRequest).subscribe(response =>{
        if(response.response == 'El nombre de usuario ya está en uso.') this.registroCorrecto = false;
        if(response.response == 'Usuario creado con éxito.') this.registroCorrecto = true;
        this.alertMsg = response.response;
      });
    }else{
      this.markFieldsAsTouched();
    }
    
  }

  checkValidators():Boolean{
    let checked:Boolean = true;
    // Comprobar que todos los campos cumplen con las validaciones
    if(this.registerForm.get('rol')?.value == 'PROFESIONAL') checked = true;
    if(this.registerForm.get('nombre')?.hasError('required')) checked = false;
    if(this.registerForm.get('edad')?.hasError('required')) checked = false;
    if(this.registerForm.get('edad')?.hasError('pattern') && this.registerForm.get('rol')?.value == 'KID') checked = false;
    if(this.registerForm.get('username')?.hasError('required')) checked = false;
    if(this.registerForm.get('password')?.hasError('required')) checked = false;
    return checked;
  }

  markFieldsAsTouched(){
    this.registerForm.get('nombre')?.markAsTouched();
    this.registerForm.get('edad')?.markAsTouched();
    this.registerForm.get('username')?.markAsTouched();
    this.registerForm.get('password')?.markAsTouched();
  }
}
