import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-secuencias',
  templateUrl: './secuencias.component.html',
  styleUrls: ['./secuencias.component.css']
})
export class SecuenciasComponent implements OnInit {

  @Output() nivel = new EventEmitter<String>();
  
  constructor() { }

  ngOnInit(): void {
  }

  seleccionarNivel(nivel : String){
    this.nivel.emit(nivel);
  }
}
