import { Component, OnInit } from '@angular/core';
import { ProblemsService } from 'src/app/core/services/problems.service';
import { IEjercicio, IProblema } from 'src/app/shared/interfaces/interfaces';


@Component({
  selector: 'app-problemas',
  templateUrl: './problemas.component.html',
  styleUrls: ['./problemas.component.css']
})
export class ProblemasComponent implements OnInit {

  problemaActual : IProblema = {};


  constructor(private problemasService : ProblemsService) { }

  ngOnInit(): void {
    this.problemasService.obtenerProblemas().subscribe(problema =>{
      this.problemaActual = problema;
    });
  }

}
