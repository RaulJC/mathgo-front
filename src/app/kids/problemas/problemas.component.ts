import { Component, Input, OnInit } from '@angular/core';
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


  constructor(private problemasService : ProblemsService) { }

  ngOnInit(): void {
    this.problemasService.obtenerProblemas().subscribe(problema =>{
      this.problemaActual = problema;
    });
  }

}
