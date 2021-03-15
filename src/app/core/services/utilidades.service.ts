import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {

  constructor(@Inject('Window') private window: Window) { }

  getApiUrl() {
      const port = this.getPort();
      return `${this.window.location.protocol}//${this.window.location.hostname}${port}`;
  }

  private getPort() {
      const port = this.window.location.port;
      if (port) {
          if (port === '4200') {
              return ':8080'; 
          }
          return ':' + this.window.location.port;
      }
      return '';
  }
}
