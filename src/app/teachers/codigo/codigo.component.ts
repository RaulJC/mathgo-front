import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProblemSharingService } from 'src/app/core/services/problem-sharing.service';
import { IGrupo } from 'src/app/shared/interfaces/interfaces';

const defaults = {
  stex:
    ''
};

@Component({
  selector: 'app-codigo',
  templateUrl: './codigo.component.html',
  styleUrls: ['./codigo.component.css']
})
export class CodigoComponent implements OnInit, OnChanges {

  readOnly = false;
  mode: keyof typeof defaults = 'stex';
  @Input() nuevoItem : string;
  @Input() nuevoProblema : string;
  @Input() grupoSeleccionado : IGrupo;

  options = {
    lineNumbers: true,
    mode: this.mode,
  };
  defaults = defaults;

  constructor(private problemSharingService:ProblemSharingService) { 

  }
  
  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'nuevoItem': 
            this.añadirEnunciado(changes['nuevoItem'].currentValue);
            break;
          case 'nuevoProblema': 
            this.añadirEnunciado(changes['nuevoProblema'].currentValue);
        }
      }
    }
  }

  private añadirEnunciado(currentValue: string){
    if(currentValue!=null) this.add(currentValue);
  }

  ngOnInit(): void {
  }

  add(data:string){
    this.grupoSeleccionado.masterfile = this.grupoSeleccionado.masterfile.concat(data);
    this.problemSharingService.setProblemaActual(this.grupoSeleccionado);
  }

  refrescarValores(event:any){
    console.log(event);
  }
}
