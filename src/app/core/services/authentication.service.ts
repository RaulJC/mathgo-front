import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IRegistrarUsuarioRequest, IRegistrarUsuarioResponse, JwtRequest, JwtResponse } from 'src/app/shared/interfaces/interfaces';
import { tap, shareReplay, catchError, map } from 'rxjs/operators';
import { DateService } from './date.service';
import { UtilidadesService } from './utilidades.service';
import { API_AUTENTICACION, API_REGISTRO } from '../../shared/constantes/api';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl = this.utilidades.getApiUrl();
  authenticationUrl = this.baseUrl + API_AUTENTICACION;
  registerUrl = this.baseUrl + API_REGISTRO;
  registerResponse : IRegistrarUsuarioResponse;

  constructor(
    private http:HttpClient, 
    private dateService: DateService,
    private utilidades: UtilidadesService) { }
  
  registrarUsuario(registroRequest: IRegistrarUsuarioRequest): Observable<IRegistrarUsuarioResponse>{
    if(registroRequest.usuario.edad == null) registroRequest.usuario.edad = 0;
    return this.http.post<IRegistrarUsuarioResponse>(this.registerUrl,registroRequest,{observe: "response", responseType: "json"})
      .pipe(
        map(response =>{
          this.registerResponse = response.body as IRegistrarUsuarioResponse;
          return this.registerResponse;
        }),
        catchError(this.handleError)
      );
  }
  
  login(username: string, password: string): Observable<JwtResponse> {
    let jwtRequest: JwtRequest = { username: username, password: password };

    return this.http.post<JwtResponse>(this.authenticationUrl,
        jwtRequest).pipe(
            tap((resp: JwtResponse) => this.setSession(resp)),
            shareReplay()
        );
  }

  private setSession(authResult: JwtResponse) {
    const expiresAt = authResult.expirationDate;
    console.log("Token expires at " + expiresAt);
    console.log("Token date and time is " + this.dateService.getShortDateAndTimeDisplay(expiresAt));

    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn(): boolean {
      return Date.now() < this.getExpiration();
  }

  isLoggedOut(): boolean {
      return !this.isLoggedIn();
  }

  getExpiration(): number {
      const expiration = localStorage.getItem("expires_at");
      let expiresAt = 1;
      if(expiration != null) expiresAt = JSON.parse(expiration);
      return expiresAt;
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
