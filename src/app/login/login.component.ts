import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registro: boolean = true;
  
  constructor() { }

  ngOnInit(): void {
  }

  cargarFormularioRegistro(){
    this.registro = true;
  }

  cargarFormularioLogin(){
    this.registro = false;
  }
}
