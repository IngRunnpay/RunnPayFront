import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@envs/environment';
import { BaseResponse } from '../interface/baseResponse.interface';
@Injectable({
  providedIn: 'root'
})
export class TransaccionService {
  private baseUrl: string = `${environment.API_URL}/ApiPrincipal`; // URL base de la API

  constructor(private http: HttpClient,) { }

  GetDataTransaction(transaccion: string) {
    return this.http.get<BaseResponse>(`${this.baseUrl}/Gateway/GatewayGetDataTransaction?IdTransaccion=${transaccion}`);
  }
  
  GetBankTransaction(transaccion: string) {
    return this.http.get<BaseResponse>(`${this.baseUrl}/Gateway/GatewayBank?IdTransaccion=${transaccion}`);
  }
  GetResumePay(transaccion: string) {
    return this.http.get<BaseResponse>(`${this.baseUrl}/Gateway/ResumePay?IdTransaccion=${transaccion}`);
  }
}
