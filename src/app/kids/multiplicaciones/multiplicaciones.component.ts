import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-multiplicaciones',
  templateUrl: './multiplicaciones.component.html',
  styleUrls: ['./multiplicaciones.component.css']
})
export class MultiplicacionesComponent implements OnInit {

  @Output() nivel = new EventEmitter<String>();

  constructor() { }

  ngOnInit(): void {
  }

  seleccionarNivel(nivel : String){
    this.nivel.emit(nivel);
  }

}
