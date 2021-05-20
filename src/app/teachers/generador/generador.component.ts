import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProblemSharingService } from 'src/app/core/services/problem-sharing.service';
import { IGrupo } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-generador',
  templateUrl: './generador.component.html',
  styleUrls: ['./generador.component.css']
})
export class GeneradorComponent implements OnInit {

  formulario: string = "Tipo de problema";
  nuevaVariable: string = "";
  grupoActual: IGrupo;
  esEnunciado: boolean = false;
  esProblema: boolean = false;
  problemaEvent: string = "";
  variablesAux: string[] =[];
  filasSeleccionadas : number[] = [];

  @Output() enunciado = new EventEmitter<string>();
  @Output() problema = new EventEmitter<string>();
  enunciadoValue: string = "";

  constructor(private problemSharingService: ProblemSharingService) { 

  }

  ngOnInit(): void {
  }

  crearEnunciado(){
    this.esEnunciado = true;
    this.esProblema = false;
    this.problemSharingService.getProblemaActual().subscribe(grupo=>{
      this.grupoActual = grupo;
      if(grupo.variables.length != this.variablesAux.length){
        grupo.variables.forEach(variable=>{
          var aux = variable[0].toUpperCase() + variable.slice(1);
          if(this.variablesAux.indexOf(aux) == -1){
            this.variablesAux.push(aux);
          } 
        })
      }
    });
  }

  crearProblema(){
    this.esEnunciado = false;
    this.esProblema = true;
  }

  emitEnunciado(msgContent: string){
    let msgHeader = "\\enunciado ";
    let msgEnd = "\n";
    let msg = `${msgHeader}${msgContent}${msgEnd}`;
    this.enunciado.emit(msg);
    this.esEnunciado = false;
    this.enunciadoValue = "";
  }

  crearVariable(){
    this.nuevaVariable = this.nuevaVariable.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
    this.nuevaVariable = this.nuevaVariable.toLowerCase();
    this.grupoActual.variables.push(this.nuevaVariable);
    this.grupoActual.datos.forEach(tupla=>{
      tupla.push("");
    })
    this.problemSharingService.setProblemaActual(this.grupoActual);
    this.nuevaVariable = "";
  }

  borrarVariable(){
    this.filasSeleccionadas.forEach(indice=>{
      this.grupoActual.variables.splice(indice,1);
      this.grupoActual.datos.forEach(tupla=>{
        tupla.splice(indice,1);
      })
      this.variablesAux.splice(indice,1);
    });
    this.problemSharingService.setProblemaActual(this.grupoActual);
    this.filasSeleccionadas = [];
  }

  onCheckboxChange(numero:number){
    if(this.filasSeleccionadas.includes(numero)){
      var indice = this.filasSeleccionadas.indexOf(numero);
      this.filasSeleccionadas.splice(indice,1);
    }else{
      this.filasSeleccionadas.push(numero);
    }
  }

  generarProblema(event:any){
    this.emitProblema(event);
  }

  emitProblema(msg:string){
    this.problema.emit(msg);
    this.esProblema = false;
  }
}
