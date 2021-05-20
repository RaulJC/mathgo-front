import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IGrupo } from 'src/app/shared/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProblemSharingService {

  problemaActual: BehaviorSubject<IGrupo> = new BehaviorSubject<IGrupo>({id:0,titulo:"",descripcion:"",masterfile:"",variables:[],datos:[]});
  constructor() { }

  public getProblemaActual(): BehaviorSubject<IGrupo>{
    return this.problemaActual;
  }

  public setProblemaActual(grupo:IGrupo){
    this.problemaActual.next(grupo);
  }
}
