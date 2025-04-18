import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DialogModule } from 'primeng/dialog';
import { DatePickerModule } from 'primeng/datepicker';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { JwtService } from '@/core/services/jwt.service';
import { ReportsService } from '@/core/services/reports.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { SpinnerComponent } from "../../../apps/spinner/spinner.component";
import { PaginatorModule } from 'primeng/paginator';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-report-conciliation',
  imports: [
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    DialogModule,
    DatePickerModule,
    TableModule,
    RadioButtonModule,
    FormsModule,
    CommonModule,
    NgxSpinnerModule,
    SpinnerComponent,
    PaginatorModule
  ],
  templateUrl: './report-conciliation.component.html',
  styleUrl: './report-conciliation.component.scss',

})
export class ReportConciliationComponent {

  public Pay: string = 'PayIn'
  public FechaPrincipal: Date = new Date;
  public Aplicacion: any = '';
  public DataConciliationDto: any;
  public FechaIni: any;
  public FechaFin: any;
  public table: string = 'PayIn'
  public ActiveInfo: boolean = false;
  public DataPayInDto: any;
  public DataPayOutDto: any;
  public totalPa = 0;
  public CongigPayOutDto: any;
  public CongigPayInDto: any;

  constructor(
    private authService: JwtService,
    public reportsService: ReportsService,
    private toast: ToastrService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.Aplicacion = this.authService.getApp();
    this.reportsService.requestReportConsiliation.fecha = this.FechaPrincipal;
    this.reportsService.requestReportConsiliation.idAplicacion = this.Aplicacion;
    this.DataConciliation();
    this.PayinData();
    this.CongigurationPayou();
    this.CongigurationPayin();
  }

  changeTable() {
    this.reportsService.requestReportConsiliation.ini = 1;
    this.reportsService.requestReportConsiliation.fin = 15;
    this.reportsService.contentData.pageNumber = 1;
    this.reportsService.requestReportConsiliation.fecha = this.FechaPrincipal;
    this.reportsService.requestReportConsiliation.idAplicacion = this.Aplicacion;

    switch (this.table) {
      case 'PayIn':
        this.PayinData()
        break;
      case 'PayOut':
        this.PayOutData()
        break;
    }
  }
  changeFecha() {
    this.reportsService.requestReportConsiliation.fecha = this.FechaPrincipal;
    this.reportsService.requestReportConsiliation.idAplicacion = this.Aplicacion;
    this.reportsService.requestReportConsiliation.ini = 1;
    this.reportsService.requestReportConsiliation.fin = 15;
    this.reportsService.contentData.pageNumber = 1;
    this.DataConciliation();
    this.PayinData();
    this.table = 'PayIn';
  }
  DataConciliation() {
    if (this.FechaPrincipal == null || this.FechaPrincipal == undefined || this.FechaPrincipal.toString() == '') {
      this.toast.error('Enter a date.');

    } else {
      this.reportsService.conciliationData.idAplicacion = this.Aplicacion;
      this.reportsService.conciliationData.fecha = this.FechaPrincipal;
      this.reportsService.GetValoresComision().subscribe(
        (data) => {
          if (data.Respuesta) {
            this.DataConciliationDto = data.Data;
          } else {
            this.toast.error(data.Mensaje);
          }
        }, (error) => {
          this.toast.error('We were unable to complete your request, please try again.');
        }
      );
    }
  }
  PayinData() {
    if (this.FechaPrincipal == null || this.FechaPrincipal == undefined || this.FechaPrincipal.toString() == '') {
      this.toast.error('Enter a date.');
    } else {
      this.reportsService.ReportPayIn().subscribe(
        (data) => {
          if (data.Respuesta) {
            this.DataPayInDto = data.Data
            this.totalPa = this.DataPayInDto[0]?.Conteo;
          } else {
            this.toast.error(data.Mensaje);
          }

        }, (error) => {
          this.toast.error('We were unable to complete your request, please try again.');
        }
      );
    }
  }
  PayOutData() {
    if (this.FechaPrincipal == null || this.FechaPrincipal == undefined || this.FechaPrincipal.toString() == '') {
      this.toast.error('Enter a date.');
    } else {
      this.reportsService.ReportPayOut().subscribe(
        (data) => {
          if (data.Respuesta) {
            this.DataPayOutDto = data.Data
            this.totalPa = this.DataPayOutDto[0].Conteo;
          } else {
            this.toast.error(data.Mensaje);
          }
        }, (error) => {
          this.toast.error('We were unable to complete your request, please try again.');
        }
      );
    }
  }
  Excel() {  
    if (this.FechaIni == null || this.FechaIni == '' || this.FechaIni == '') {
      this.toast.error('Start date');
      this.spinner.hide();

    } else {
      if (this.FechaFin == null || this.FechaFin == '' || this.FechaFin == '') {
        this.toast.error('End date');
        this.spinner.hide();

      } else {
        this.spinner.show();

        this.reportsService.requestExcelConciliationFecha.fechaIni = this.FechaIni;
        this.reportsService.requestExcelConciliationFecha.fechaFin = this.FechaFin;
        this.reportsService.requestExcelConciliationFecha.idAplicacion = this.Aplicacion;
        if (this.table == 'PayIn') {
          this.reportsService.ExcelPayIn().subscribe(
            async (data) => {
              if (data.Respuesta) {
                await this.reportsService.exportToExcel(data.Data, this.table);
                this.spinner.hide();

              } else {
                this.toast.error(data.Mensaje);
                this.spinner.hide();
              }
            }, error => {
              this.spinner.hide();
              this.toast.error('We were unable to complete your request, please try again.');
            }
          );
        }
        if (this.table == 'PayOut') {
          this.reportsService.ExcelPayOut().subscribe(
            async (data) => {
              if (data.Respuesta) {
                await this.reportsService.exportToExcel(data.Data, this.table);
                this.spinner.hide();

              } else {
                this.toast.error(data.Mensaje);
                this.spinner.hide();
              }
            }, error => {
              this.spinner.hide();
              this.toast.error('We were unable to complete your request, please try again.');
            }
          );
        }
      }
    }
  }
  Info() {
    this.ActiveInfo = true;
  }
  PageChange(event: any) {
    this.reportsService.contentData.pageNumber = event.page + 1;
    this.reportsService.contentData.pageSize = event.rows;
    this.reportsService.requestReportConsiliation.fin = this.reportsService.contentData.pageNumber * this.reportsService.contentData.pageSize;
    this.reportsService.requestReportConsiliation.ini = this.reportsService.requestReportConsiliation.fin - this.reportsService.contentData.pageSize;
    this.reportsService.requestReportConsiliation.ini = (this.reportsService.requestReportConsiliation.ini == 0) ? 1 : this.reportsService.requestReportConsiliation.ini;
    switch (this.table) {
      case 'PayIn':
        this.PayinData()
        break;
      case 'PayOut':
        this.PayOutData()
        break;
    }
  }
  CongigurationPayou() {
    this.reportsService.ConfigPayOut(this.Aplicacion).subscribe(
      (data) => {
        if(data.Respuesta){
          this.CongigPayOutDto = data.Data
        }else{
            this.toast.error(data.Mensaje);
        }
      }, (error) => {
        this.toast.error('We were unable to complete your request, please try again.');
      }
    );
  }
  CongigurationPayin() {
    this.reportsService.ConfigPayIn(this.Aplicacion).subscribe(
      (data) => {
        if(data.Respuesta){
          this.CongigPayInDto = data.Data
          console.log(this.CongigPayInDto )
        }else{
            this.toast.error(data.Mensaje);
        }
      }, (error) => {
        this.toast.error('We were unable to complete your request, please try again.');
      }
    );
  }
}
