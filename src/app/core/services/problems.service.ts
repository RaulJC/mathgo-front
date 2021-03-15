import { Injectable } from '@angular/core';
import { UtilidadesService } from './utilidades.service';
import { API_PROBLEMAS } from '../../shared/constantes/api';
import { HttpClient } from '@angular/common/http';
import { IProblema } from 'src/app/shared/interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProblemsService {

  baseUrl = this.utilidades.getApiUrl();
  problemasUrl = this.baseUrl + API_PROBLEMAS;

  constructor(private utilidades: UtilidadesService, private http: HttpClient) { }

  obtenerProblemas(): Observable<IProblema>{
    return this.http.get<IProblema>(this.problemasUrl);
  }

}
