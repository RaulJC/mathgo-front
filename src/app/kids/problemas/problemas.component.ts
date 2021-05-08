import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ProblemsService } from 'src/app/core/services/problems.service';
import { IEnviarSolucionRequest, IProblema } from 'src/app/shared/interfaces/interfaces';


@Component({
  selector: 'app-problemas',
  templateUrl: './problemas.component.html',
  styleUrls: ['./problemas.component.css']
})

export class ProblemasComponent implements OnInit {

  @Input() tipoProblema: String;
  @Input() nivel: String;

  inicio : Date;
  fin: Date;
  minutos: number;
  segundos: number;
  aciertos : number = 0;
  total : number = 0;
  esCorregido = false;
  problemaActual : IProblema;

  problemaForm = new FormGroup({
    ejercicios: new FormArray([])
  });

  ejercicios = this.problemaForm.get('ejercicios') as FormArray;
  
  constructor(private problemasService : ProblemsService) {   

  }

  ngOnInit(): void {
    let problema:string = this.tipoProblema as string;
    this.problemasService.obtenerProblemas(problema).subscribe(problema =>{
      this.problemaActual = problema.problema; 
      this.problemaActual.ejercicios.map(ejercicio =>{
        let  ejercicioF = new FormGroup({
          enunciado : new FormControl({value:ejercicio.enunciado,disabled : true}),
          operaciones: new FormArray([])
        })
        let operacionesF = ejercicioF.get('operaciones') as FormArray;
        ejercicio.operaciones.forEach(operacion =>{
          let operacionF = new FormGroup({
            tipo : new FormControl(operacion.tipo),
            operandos : new FormArray ([]),
            respuestas : new FormArray([])
          })
          let operandosF = operacionF.get('operandos') as FormArray;
          let respuestasF = operacionF.get('respuestas') as FormArray;
          operacion.operandos.forEach(operando =>{
            if(operando != '?'){
              var operandoForm = new FormGroup({
                operando:  new FormControl({value:operando,disabled:true})
              })
            }else{
              var operandoForm = new FormGroup({
                operando:  new FormControl({value:'',disabled:false})
              })
            }
            operandosF.push(operandoForm);
          })
          operacion.resultado.forEach(resultado=>{
            var resultadoForm = new FormGroup({
              resultado: new FormControl({value:resultado,disabled:false})
            })
            respuestasF.push(resultadoForm);
          })
          operacionesF.push(operacionF);
        })
        this.ejercicios.push(ejercicioF);
      })
    });

    this.inicio = new Date(Date.now());
  }
 
  onSubmit(){
    this.fin = new Date(Date.now());
    this.getEjercicios(this.problemaForm)?.controls.forEach(control=>{
      this.getOperaciones(control)?.controls.forEach(control=>{
       var operandos = this.getOperandos(control)?.controls.map(operacion=>{
          return operacion.value;
        })
        var respuestasDadas = this.getRespuestas(control)?.controls.map(respuesta=>{
          return respuesta.value;
        })
        var esAcierto = true;
        for(let i = 0; i<operandos.length;i++){
          if(operandos[i].operando == respuestasDadas[i].resultado && esAcierto){
            esAcierto = true;
          }else{
            esAcierto = false;
          }
        }
        if(esAcierto) this.aciertos = this.aciertos + 1;
        this.total = this.total + 1;
      })
    });
    var diferencia = Math.abs(this.fin.getSeconds() - this.inicio.getSeconds());
    this.minutos = Math.floor(diferencia / 60);
    this.segundos = diferencia - this.minutos*60;
    let fallos = this.total - this.aciertos;
    let requestSolucion: IEnviarSolucionRequest = {
      problema:this.problemaActual,
      tipo:this.tipoProblema.toString(),
      nAciertos:this.aciertos,
      nFallos: fallos
    }
    this.problemasService.enviarSolucion(requestSolucion);
  }

  getEjercicios(abstractEjercicio:AbstractControl){
    return <FormArray>abstractEjercicio.get('ejercicios');
  }
  getOperaciones(abstractEjercicio:AbstractControl){
    return <FormArray>abstractEjercicio.get('operaciones');
  }
  getOperandos(abstractEjercicio:AbstractControl){
    return <FormArray>abstractEjercicio.get('operandos');
  }
  getRespuestas(abstractEjercicio:AbstractControl){
    return <FormArray>abstractEjercicio.get('respuestas');
  }
  verSolucion(){
    this.esCorregido = true;
    this.getEjercicios(this.problemaForm)?.controls.forEach(control=>{
      this.getOperaciones(control)?.controls.forEach(control=>{
       var operandos = this.getOperandos(control)?.controls.map(operacion=>{
          return operacion.value;
        })
        var respuestasDadas = this.getRespuestas(control)?.controls.map(respuesta=>{
          return respuesta.value;
        })
        for(let i = 0; i<operandos.length;i++){
          if(operandos[i].operando != respuestasDadas[i].resultado){
            this.getOperaciones(control)?.controls[i].disable();
            this.getRespuestas(control)?.controls[i].disable();
          }
        }
      })
    });
  }
}
