import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.registerForm.value);
  }
}
