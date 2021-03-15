import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sumas',
  templateUrl: './sumas.component.html',
  styleUrls: ['./sumas.component.css']
})
export class SumasComponent implements OnInit {

  @Output() nivel = new EventEmitter<String>();

  constructor() { }

  ngOnInit(): void {
  }

  seleccionarNivel(nivel : String){
    this.nivel.emit(nivel);
  }
}
