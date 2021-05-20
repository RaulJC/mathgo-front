import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ICrearGrupoRequest, ICrearGrupoResponse, IGrupo, IObetenerGruposResponse, IObetenerGrupoResponse, IEliminarGrupoResponse, IActualizarGrupoResponse, IActualizarGrupoRequest } from 'src/app/shared/interfaces/interfaces';
import { API_GRUPOS } from '../../shared/constantes/api';
import { UtilidadesService } from './utilidades.service';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  baseUrl = this.utilidades.getApiUrl();
  gruposUrl =  this.baseUrl + API_GRUPOS;
  gruposResponse: IObetenerGruposResponse;
  crearGrupoResponse : ICrearGrupoResponse;
  obtenerGrupoResponse : IObetenerGrupoResponse;
  eliminarGrupoResponse : IEliminarGrupoResponse;
  actualizarGrupoResponse : IActualizarGrupoResponse;

  constructor(
    private utilidades: UtilidadesService, 
    private http: HttpClient) { }

  obtenerGrupos(): Observable<IObetenerGruposResponse>{
    const headers = new HttpHeaders().set("X-CustomHeader", "custom header value")
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization',  `Bearer ${localStorage.getItem('id_token')}`);

    return this.http.get<IObetenerGruposResponse>(this.gruposUrl, {headers: headers, observe: "response", responseType: "json"})
      .pipe(
        map(response =>{
          this.gruposResponse = response.body as IObetenerGruposResponse;
          return this.gruposResponse;
        }),
        catchError(this.handleError)
      );
  }

  crearGrupo(grupo:IGrupo): Observable<ICrearGrupoResponse>{
    const headers = new HttpHeaders().set("X-CustomHeader", "custom header value")
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization',  `Bearer ${localStorage.getItem('id_token')}`);

    let requestBody : ICrearGrupoRequest = {grupo: grupo};
    return this.http.post<ICrearGrupoResponse>(this.gruposUrl,requestBody,{headers: headers, observe: "response", responseType: "json"})
    .pipe(
      map(response=>{
        this.crearGrupoResponse = response.body as ICrearGrupoResponse;
        return this.crearGrupoResponse;
      }),catchError(this.handleError)
    );
  }

  eliminarGrupo(grupoId:number): Observable<IEliminarGrupoResponse>{
    const headers = new HttpHeaders().set("X-CustomHeader", "custom header value")
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization',  `Bearer ${localStorage.getItem('id_token')}`);

      return this.http.delete<IEliminarGrupoResponse>(`${this.gruposUrl}/${grupoId.toString()}`,{headers: headers, observe: "response", responseType: "json"})
      .pipe(
        map(response=>{
          this.eliminarGrupoResponse = response.body as IEliminarGrupoResponse;
          return this.eliminarGrupoResponse;
        }),catchError(this.handleError)
      );
  }

  obtenerGrupo(grupoId:number): Observable<IObetenerGrupoResponse>{
    const headers = new HttpHeaders().set("X-CustomHeader", "custom header value")
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Authorization',  `Bearer ${localStorage.getItem('id_token')}`);

    return this.http.get<IObetenerGrupoResponse>(`${this.gruposUrl}/${grupoId.toString()}`, {headers: headers, observe: "response", responseType: "json"})
      .pipe(
        map(response =>{
          this.obtenerGrupoResponse = response.body as IObetenerGrupoResponse;
          return this.obtenerGrupoResponse;
        }),
        catchError(this.handleError)
      );
  }

  guardarGrupo(grupo:IGrupo): Observable<IActualizarGrupoResponse>{
    const headers = new HttpHeaders().set("X-CustomHeader", "custom header value")
    .append('Content-Type', 'application/json')
    .append('Accept', 'application/json')
    .append('Authorization',  `Bearer ${localStorage.getItem('id_token')}`);

    let requestBody : IActualizarGrupoRequest = {grupo: grupo};
    return this.http.post<IActualizarGrupoResponse>(`${this.gruposUrl}/${grupo.id.toString()}`,requestBody,{headers: headers, observe: "response", responseType: "json"})
    .pipe(
      map(response=>{
        this.actualizarGrupoResponse = response.body as IActualizarGrupoResponse;
        return this.actualizarGrupoResponse;
      }),catchError(this.handleError)
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
