import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-basic-operations-form',
  templateUrl: './basic-operations-form.component.html',
  styleUrls: ['./basic-operations-form.component.css']
})
export class BasicOperationsFormComponent implements OnInit {

  basicOperationForm: FormGroup = new FormGroup({
    type: new FormControl('0'),
    operator: new FormControl(''),
    nboperands: new FormControl(''),
    nbdigitsop: new FormControl(''),
    nbdigitsrslt: new FormControl(''),
    cantidad: new FormControl('1')
  });

  @Output() problema = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    let type = this.basicOperationForm.controls.type.value;
    let operator = this.basicOperationForm.controls.operator.value;
    let nboperands = this.basicOperationForm.controls.nboperands.value;
    let nbdigitsop = this.basicOperationForm.controls.nbdigitsop.value;
    let nbdigitsrslt = this.basicOperationForm.controls.nbdigitsrslt.value;
    let cantidad = this.basicOperationForm.controls.cantidad.value;
    let str = `{{range .Slice ${cantidad}}}{{.BasicOperation (dict "type" ${type} "operator" "${operator}" "nboperands" ${nboperands} "nbdigitsop" ${nbdigitsop} "nbdigitsrslt" ${nbdigitsrslt})}}{{end}}\n`;
    this.emitProblema(str);
    this.basicOperationForm.reset();
  }

  emitProblema(msgContent: string){
    this.problema.emit(msgContent);
  }

}
