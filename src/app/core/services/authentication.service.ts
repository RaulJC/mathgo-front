import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtRequest, JwtResponse } from 'src/app/shared/interfaces/interfaces';
import { tap, shareReplay } from 'rxjs/operators';
import { DateService } from './date.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient, private dateService: DateService) { }
  
  login(username: string, password: string): Observable<JwtResponse> {
    let jwtRequest: JwtRequest = { username: username, password: password };

    return this.http.post<JwtResponse>('http://localhost:8080/api/v1/authenticate',
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

}
