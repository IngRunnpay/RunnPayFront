import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@envs/environment';
import { BaseResponse } from '../interface/baseResponse.interface';
import { RequestConciliationFecha, RequestExcelConciliationFecha, RequestReportConsiliation, RequestReportDispersion, RequestReportTransaction } from '../interface/reports';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private baseUrl: string = `${environment.API_URL}/ApiPrincipal`; // URL base de la API
  public EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

  public requestReportTransaction: RequestReportTransaction = {
    IdUsuario: 0,
    IdAplicacion: '',
    ini: 1,
    fin: 15,
    idTransaccion: null,
    referencia: null,
    documento: null,
    fechaInicio: null,
    fechaFin: null
  }
  public contentData: any = {
    pageNumber: 1,
    pageSize: 15,
  }
  public requestReportDispersion: RequestReportDispersion = {
    idAplicacion: '',
    ini: 1,
    fin: 15,
    idDispersion: null,
    referencia: null,
    documento: null,
    fechaInicio: null,
    fechaFin: null
  }

  public conciliationData: RequestConciliationFecha = {
    idAplicacion: '',
    fecha: null
  }
  public requestExcelConciliationFecha: RequestExcelConciliationFecha = {
    idAplicacion: '',
    fechaIni: null,
    fechaFin: null
  }
  public requestReportConsiliation: RequestReportConsiliation = {
    idAplicacion: '',
    ini: 1,
    fin: 15,
    fecha: null
  }

  constructor(private http: HttpClient,) { }

  GetReportTransaction() {
    return this.http.post<BaseResponse>(`${this.baseUrl}/Reports/Transactions`, this.requestReportTransaction);
  }
  GetReportDispersion() {
    return this.http.post<BaseResponse>(`${this.baseUrl}/Reports/Dispersion`, this.requestReportDispersion);
  }
  GetValoresComision() {
    return this.http.post<BaseResponse>(`${this.baseUrl}/Reports/DataComision`, this.conciliationData);
  }
  ExcelPayIn(){
    return this.http.post<BaseResponse>(`${this.baseUrl}/Reports/PayInConsiliationExcel`, this.requestExcelConciliationFecha);
  }
  ExcelPayOut(){
    return this.http.post<BaseResponse>(`${this.baseUrl}/Reports/PayOutConsiliationExcel`, this.requestExcelConciliationFecha);
  }
  ReportPayIn(){
    return this.http.post<BaseResponse>(`${this.baseUrl}/Reports/PayInConsiliation`, this.requestReportConsiliation);
  }
  ReportPayOut(){
    return this.http.post<BaseResponse>(`${this.baseUrl}/Reports/PayOutConsiliation`, this.requestReportConsiliation);
  }
  ConfigPayOut(IdAplicacion: string){
    return this.http.get<BaseResponse>(`${this.baseUrl}/UserPortal/ConfigPayOut?IdAplicacion=${IdAplicacion}`);
  }
  ConfigPayIn(IdAplicacion: string){
    return this.http.get<BaseResponse>(`${this.baseUrl}/UserPortal/ConfigPayIN?IdAplicacion=${IdAplicacion}`);
  }

  exportToExcel(data: any[], fileName: string = 'RunnPayReport'): void {  
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);  
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Datos': worksheet },
      SheetNames: ['Datos']
    };  
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });
  
    this.saveAsExcelFile(excelBuffer, fileName);
  }
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.EXCEL_TYPE });
    FileSaver.saveAs(data, `${fileName}_export_${new Date().getTime()}.xlsx`);
  }
  
}
