import { Injectable } from '@angular/core';
import { UtilidadesService } from './utilidades.service';
import { API_PUBLIC } from '../../shared/constantes/api';
@Injectable({
  providedIn: 'root'
})
export class PublicServicesService {

  baseUrl = this.utilidades.getApiUrl();
  constructor(private utilidades: UtilidadesService) { }

  visualizarPdf(){
    window.open(`${this.baseUrl}${API_PUBLIC}`,"_blank");
  }
}
