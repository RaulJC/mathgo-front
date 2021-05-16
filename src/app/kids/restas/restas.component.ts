import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-restas',
  templateUrl: './restas.component.html',
  styleUrls: ['./restas.component.css']
})
export class RestasComponent implements OnInit {

  @Output() nivel = new EventEmitter<String>();

  constructor() { }

  ngOnInit(): void {
  }

  seleccionarNivel(nivel : String){
    this.nivel.emit(nivel);
  }
}
