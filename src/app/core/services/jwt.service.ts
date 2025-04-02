import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@envs/environment';
import { BehaviorSubject, Observable, of, timestamp } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BaseResponse } from '../interface/baseResponse.interface';
import { LoginPortal, RequestJwt, SendTokenUser, ValidOtp } from '../interface/jwt.interface';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private baseUrl: string = `${environment.API_URL}/ApiPrincipal`; // URL base de la API
  public Valid: boolean = false;
  private expirationTime: number = 30 * 60 * 1000; 
  private expirationTimeout: any;
  private expirationSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router, private Toast: ToastrService) { }
  public sendTokenUser: SendTokenUser = {
    Token: ''
  }
  public requestJwt: RequestJwt = {
    Usuario: environment.USER_JWT,
    Contrasena: environment.PASS_JWT,
    Codigo: environment.CODE_JWT
  }
  public RequestloginPortal: LoginPortal = {
    Correo: ''
  }
  public RequestvalidOtp: ValidOtp = {
    Correo: '',
    Otp: ''
  }

  getTokenJwt() { return localStorage.getItem('tokenJwt'); }
  setTokenJwt(Token: any) { return localStorage.setItem('tokenJwt', Token); }
  removeToken() { return localStorage.removeItem('tokenJwt'); }
  getUserId() { return localStorage.getItem('UserID'); }
  setUserId(Token: any) { return localStorage.setItem('UserID', Token); }
  removeUserId() { return localStorage.removeItem('UserID'); }
  getApp() { return localStorage.getItem('App'); }
  setApp(Token: any) { return localStorage.setItem('App', Token); }
  removeApp() { return localStorage.removeItem('App'); }
  getNIT() { return localStorage.getItem('NIT'); }
  setNIT(Token: any) { return localStorage.setItem('NIT', Token); }
  removeNIT() { return localStorage.removeItem('NIT'); }
  getPT() { return localStorage.getItem('PT'); }
  setPT(Token: any) { return localStorage.setItem('PT', Token); }
  removePT() { return localStorage.removeItem('PT'); }
  
  tokenJwt() {
    return this.http.post<BaseResponse>(`${this.baseUrl}/Aplicacion/Login`, this.requestJwt);
  }
  loginEmail(){
    return this.http.post<BaseResponse>(`${this.baseUrl}/UserPortal/LoginUser`, this.RequestloginPortal);
  }
  ValidCodigo(){
    return this.http.post<BaseResponse>(`${this.baseUrl}/UserPortal/ValidOtp`, this.RequestvalidOtp);
  }

  emptySession() {
    this.removeToken();
    this.removeUserId();
    this.removeApp();
    this.removeNIT();
    this.removePT();
  }

  getAuthToken(): Observable<boolean> {
    const Token = this.getTokenJwt();
    if (Token == null || Token == undefined || Token == '') {
      this.Valid = false;
      this.Toast.error('Sin acceso a peticiones, inicia sesión nuevamente.');
      this.emptySession();
    } else {
      this.Valid = true;
    }
    return of(this.Valid);
  }


  startExpirationTimer() {
    const expirationTime = new Date().getTime() + this.expirationTime;

    // Actualizar el estado después de 30 minutos
    this.expirationTimeout = setTimeout(() => {
      this.expirationSubject.next(true); // Indica que el tiempo ha expirado
      this.Toast.warning('¡El tiempo ha expirado!');
      this.emptySession();
      this.router.navigate(['/auth/login']);
    }, this.expirationTime);

    console.log(`Expiración programada para: ${new Date(expirationTime)}`);
  }


}
