import { Injectable } from '@angular/core';
import { UtilidadesService } from './utilidades.service';
import { API_PROBLEMAS } from '../../shared/constantes/api';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { IProblema } from 'src/app/shared/interfaces/interfaces';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProblemsService {

  baseUrl = this.utilidades.getApiUrl();
  problemasUrl = this.baseUrl + API_PROBLEMAS;
  problema: IProblema;

  constructor(private utilidades: UtilidadesService, private http: HttpClient) { }

  obtenerProblemas(): Observable<IProblema>{

    return this.http.get<IProblema>(this.problemasUrl, {observe: "response", responseType: "json"})
      .pipe(
        map(response =>{
          this.problema = response.body as IProblema;
          return this.problema;
        }),
        catchError(this.handleError)
      );
      
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
