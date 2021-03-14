import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kids',
  templateUrl: './kids.component.html',
  styleUrls: ['./kids.component.css']
})
export class KidsComponent implements OnInit {

  tipoOperacion : String = "";
  sumas = "sumas";
  restas = "restas";
  multiplicaciones = "multiplicaciones";
  secuencias = "secuencias";
  divisiones = "divisiones";
  problemas= "problemas";

  constructor() { }

  ngOnInit(): void {
  }

  seleccionarTipoEjercicios(seleccion : String){
    this.tipoOperacion = seleccion;
  }

  volverAtras(){
    this.tipoOperacion = ""; 
  }
}
