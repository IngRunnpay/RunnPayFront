import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@envs/environment';
import { BaseResponse } from '../interface/baseResponse.interface';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class dashboardService {

  private baseUrl: string = `${environment.API_URL}/ApiPrincipal`; // URL base de la API

  constructor(private http: HttpClient, private authServices : JwtService) { }

  GetHistory(Id: number) {
    return this.http.get<BaseResponse>(`${this.baseUrl}/DashBoard/HistorialTransacciones?IdUsuario=${Id}`);
  }
  Getporcentaje(Id: number) {
    return this.http.get<BaseResponse>(`${this.baseUrl}/DashBoard/PorcentajeMensual?IdUsuario=${Id}`);
  }
  GetAño(Id: number) {
    return this.http.get<BaseResponse>(`${this.baseUrl}/DashBoard/TransaccionesAño?IdUsuario=${Id}`);
  }
  GetBilletera() {
    var IdAplicacion = this.authServices.getApp();
    return this.http.get<BaseResponse>(`${this.baseUrl}/Dispersion/BilleteraCliente?IdAplicacion=${IdAplicacion}`);
  }
}
