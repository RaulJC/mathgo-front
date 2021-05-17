import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  componente: string = "datos";
  filasSeleccionadas : number[] = [];
  enunciado : string;
  problema : string;
  variables: string[] = ["Nombre","Hermano","Profesion"];
  datos : string[][] = [
    ["Raul","Pedro","bombero"],
    ["Pedro","Raul","astronauta"],
    ["Clara","","física"]
  ]; 
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

  seleccionarDatos(){
    this.componente = "datos";
  }

  volverMisGrupos(){
    this.componente = "grupos";
  }

  onCheckboxChange(numero:number){
    if(this.filasSeleccionadas.includes(numero)){
      var indice = this.filasSeleccionadas.indexOf(numero);
      this.filasSeleccionadas.splice(indice,1);
    }else{
      this.filasSeleccionadas.push(numero);
    }
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  crearFila(){
    let nuevaFila:string[] = [];
    this.variables.forEach(variable=>{
      nuevaFila.push("");
    });
    this.datos.push(nuevaFila);
  }

  borrarFila(){
    this.filasSeleccionadas.forEach(indice=>{
      this.datos.splice(indice,1);
    });
    this.filasSeleccionadas = [];
  }
}
