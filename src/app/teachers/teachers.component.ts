import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  componente: string = "editor";

  enunciado : string;
  problema : string;
  constructor() { }

  ngOnInit(): void {
  }

  generarEnunciado(event:any){
    this.enunciado = event;
  }

  generarProblema(event:any){
    this.problema = event;
  }

  seleccionarGrupo(){
    this.componente = "editor";
  }

  insertarDatos(){
    this.componente = "datos";
  }

  volverMisGrupos(){
    this.componente = "grupos";
  }
}
