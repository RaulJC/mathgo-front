import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

const defaults = {
  stex:
    '\\usepackage[T1]{fontenc}\n'
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
  value : string = '\\usepackage[T1]{fontenc}\n';
  options = {
    lineNumbers: true,
    mode: this.mode,
  };
  defaults = defaults;

  constructor() { }
  
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
    this.value = this.value.concat(data)
  }

}
