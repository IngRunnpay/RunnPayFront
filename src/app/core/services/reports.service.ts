import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@envs/environment';
import { BaseResponse } from '../interface/baseResponse.interface';
import { RequestReportTransaction } from '../interface/reports';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private baseUrl: string = `${environment.API_URL}/ApiPrincipal`; // URL base de la API
  public requestReportTransaction: RequestReportTransaction = {
    IdUsuario: 0,
    IdAplicacion: ''
  }

  constructor(private http: HttpClient,) { }

  GetReportTransaction() {
    return this.http.post<BaseResponse>(`${this.baseUrl}/Reports/Transactions`, this.requestReportTransaction);
  }  
}
