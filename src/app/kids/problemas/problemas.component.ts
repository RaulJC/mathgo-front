import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ProblemsService } from 'src/app/core/services/problems.service';
import { IProblema } from 'src/app/shared/interfaces/interfaces';


@Component({
  selector: 'app-problemas',
  templateUrl: './problemas.component.html',
  styleUrls: ['./problemas.component.css']
})

export class ProblemasComponent implements OnInit {

  @Input() tipoProblema: String;
  @Input() nivel: String;

  problemaActual : IProblema;

  problemaForm = new FormGroup({
    ejercicios: new FormArray([])
  });

  ejercicios = this.problemaForm.get('ejercicios') as FormArray;
  
  constructor(private problemasService : ProblemsService) {   
    this.problemasService.obtenerProblemas().subscribe(problema =>{
      this.problemaActual = problema; 
      problema.ejercicios.map(ejercicio =>{
        let  ejercicioF = new FormGroup({
          enunciado : new FormControl({value:ejercicio.enunciado,disabled : true}),
          operaciones: new FormArray([])
        })
        let operacionesF = ejercicioF.get('operaciones') as FormArray;
        ejercicio.operaciones.forEach(operacion =>{
          let operacionF = new FormGroup({
            tipo : new FormControl(operacion.tipo),
            operandos : new FormArray ([])
          })
          let operandosF = operacionF.get('operandos') as FormArray;
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
          operacionesF.push(operacionF);
        })
        this.ejercicios.push(ejercicioF);
      })
      
      console.log(this.problemaActual);
      console.log(this.problemaForm);
    });
  }

  ngOnInit(): void {
     
  }

  onSubmit(){
    console.log(this.problemaForm.value);
  }
  getEjercicio(abstractEjercicio:AbstractControl){
    return <FormArray>abstractEjercicio.get('operaciones');
  }
 
  getOperandos(abstractEjercicio:AbstractControl){
    return <FormArray>abstractEjercicio.get('operandos');
  }
  
}
