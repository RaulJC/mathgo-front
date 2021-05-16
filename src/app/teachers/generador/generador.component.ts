import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-generador',
  templateUrl: './generador.component.html',
  styleUrls: ['./generador.component.css']
})
export class GeneradorComponent implements OnInit {

  formulario: string = "Tipo de problema";
  nuevaVariable: string = "";
  variables: string[] = ["Nombre","Hermano","Profesion"];
  esEnunciado: boolean = false;
  esProblema: boolean = false;
  problemaEvent: string = "";

  @Output() enunciado = new EventEmitter<string>();
  @Output() problema = new EventEmitter<string>();
  enunciadoValue: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  crearEnunciado(){
    this.esEnunciado = true;
    this.esProblema = false;
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
    this.nuevaVariable = this.nuevaVariable[0].toUpperCase() + this.nuevaVariable.slice(1);
    this.variables.push(this.nuevaVariable);
    this.nuevaVariable = "";
  }

  generarProblema(event:any){
    this.emitProblema(event);
  }

  emitProblema(msg:string){
    this.problema.emit(msg);
    this.esProblema = false;
  }
}
