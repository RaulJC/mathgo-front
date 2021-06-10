import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-formulario-secuencias',
  templateUrl: './formulario-secuencias.component.html',
  styleUrls: ['./formulario-secuencias.component.css']
})
export class FormularioSecuenciasComponent implements OnInit {

  secuenciasForm: FormGroup = new FormGroup({
    tipo: new FormControl(''),
    nbitems: new FormControl(''),
    geq: new FormControl(''),
    leq: new FormControl(''),
    cantidad: new FormControl('1')
  });

  @Output() problema = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    let tipo = this.secuenciasForm.controls.tipo.value;
    let nbitems = this.secuenciasForm.controls.nbitems.value;
    let geq = this.secuenciasForm.controls.geq.value;
    let leq = this.secuenciasForm.controls.leq.value;
    let cantidad = this.secuenciasForm.controls.cantidad.value;
    let str = `{{range .Slice ${cantidad}}}{{.Sequence (dict "type" ${tipo} "nbitems" ${nbitems} "geq" ${geq} "leq" ${leq})}}{{end}}\n`;
    this.emitProblema(str);
    this.secuenciasForm.reset();
  }

  emitProblema(msgContent: string){
    this.problema.emit(msgContent);
  }
}
