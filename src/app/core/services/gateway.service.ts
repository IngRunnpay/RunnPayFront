import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@envs/environment';
import { BaseResponse } from '../interface/baseResponse.interface';
import { RequestCreatePse } from '../interface/gateway.interface';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {

  private baseUrl: string = `${environment.API_URL}/ApiPrincipal`; // URL base de la API

  public requestCreatePse: RequestCreatePse = {
    idTransaccion: '',
    banco: '',
    persona: ''
  } 
  constructor(private http: HttpClient,) { }

  CreatePse() {
    return this.http.post<BaseResponse>(`${this.baseUrl}/Gateway/GatewayCreated`, this.requestCreatePse);
  }
}
