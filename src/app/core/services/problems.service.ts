import { Injectable } from '@angular/core';
import { UtilidadesService } from './utilidades.service';
import { API_PROBLEMAS } from '../../shared/constantes/api';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams  } from '@angular/common/http';
import { IEnviarSolucionRequest, IProblema, IProblemaResponse } from 'src/app/shared/interfaces/interfaces';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProblemsService {

  baseUrl = this.utilidades.getApiUrl();
  problemasUrl = this.baseUrl + API_PROBLEMAS;
  problema: IProblemaResponse;

  constructor(private utilidades: UtilidadesService, private http: HttpClient) { }

  obtenerProblemas(tipoProblema:string,nivelProblema:string): Observable<IProblemaResponse>{

    const headers = new HttpHeaders().set("X-CustomHeader", "custom header value")
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization',  `Bearer ${localStorage.getItem('id_token')}`);

    let params: HttpParams = new HttpParams();
    params = params.append('tipoProblema',tipoProblema.toString());
    params = params.append('nivel',nivelProblema.toString());
    return this.http.get<IProblemaResponse>(this.problemasUrl, {headers: headers, observe: "response", params:params, responseType: "json"})
      .pipe(
        map(response =>{
          this.problema = response.body as IProblemaResponse;
          return this.problema;
        }),
        catchError(this.handleError)
      );
      
  }

  enviarSolucion(enviarSolucionRequest: IEnviarSolucionRequest) {
    const headers = new HttpHeaders().set("X-CustomHeader", "custom header value")
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization',  `Bearer ${localStorage.getItem('id_token')}`);

    this.http.post(this.problemasUrl,enviarSolucionRequest,{headers:headers}).subscribe();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}
