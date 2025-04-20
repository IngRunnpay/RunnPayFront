import { FormatoDineroPipe } from '@/core/pipes/formato-dinero.pipe';
import { JwtService } from '@/core/services/jwt.service';
import { ReportsService } from '@/core/services/reports.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { DatePickerModule } from 'primeng/datepicker';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { SpinnerComponent } from "../../../apps/spinner/spinner.component";
@Component({
  selector: 'app-report-transacrtion',
  imports: [
    NgbPaginationModule,
    TableModule,
    InputIconModule,
    TagModule,
    ButtonModule,
    ToastModule,
    CommonModule,
    FormsModule,
    IconFieldModule,
    InputTextModule,
    FormatoDineroPipe,
    PaginatorModule,
    DatePickerModule,
    NgxSpinnerModule,
    SpinnerComponent
],
  templateUrl: './report-transacrtion.component.html',
  styleUrl: './report-transacrtion.component.scss'
})
export class ReportTransacrtionComponent {
  public DataReport: any[] = [];
  public DataReportExcel: any[] = [];

  public totalPa = 0;
  public margin = 'margin: 2px;'
  constructor(
    public reportsService: ReportsService,
    private toast: ToastrService,
    private authService: JwtService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.GetData();
  }
  GetData() {
    if (
      (
        this.reportsService.requestReportTransaction.fechaInicio == null &&
        this.reportsService.requestReportTransaction.fechaFin != null
      ) ||
      (
        this.reportsService.requestReportTransaction.fechaInicio != null &&
        this.reportsService.requestReportTransaction.fechaFin == null
      )) {
      this.toast.error('Please select the correct date range to filter.');
    } else {
      var IdUsuario = this.authService.getUserId();
      var app = this.authService.getApp();
      this.reportsService.requestReportDispersion.ini = 1;
      this.reportsService.requestReportDispersion.fin = 15;
      this.reportsService.requestReportTransaction.IdUsuario = parseInt(IdUsuario ?? '0');
      this.reportsService.requestReportTransaction.IdAplicacion = app ?? '';
      this.reportsService.GetReportTransaction().subscribe(
        (data) => {
          if (data.Respuesta) {
            this.DataReport = data.Data;
            this.totalPa = this.DataReport[0].Conteo;
            this.reportsService.contentData.pageNumber = 1;

          } else {
            this.toast.error(data.Mensaje);
          }
        }, (error) => {
          this.toast.error('We were unable to complete your request, please try again.');
        }
      );
    }
  }

  clear() {
    this.reportsService.requestReportTransaction.ini = 1;
    this.reportsService.requestReportTransaction.fin = 15;
    this.reportsService.requestReportTransaction.idTransaccion = null;
    this.reportsService.requestReportTransaction.referencia = null;
    this.reportsService.requestReportTransaction.documento = null;
    this.reportsService.requestReportTransaction.fechaInicio = null;
    this.reportsService.requestReportTransaction.fechaFin = null;
    this.reportsService.contentData.pageNumber = 1;
    this.reportsService.GetReportTransaction().subscribe(
      (data) => {
        if (data.Respuesta) {
          this.DataReport = data.Data;
          this.totalPa = this.DataReport[0].Conteo;
        } else {
          this.toast.error(data.Mensaje);
        }
      }, (error) => {
        this.toast.error('We were unable to complete your request, please try again.');
      }
    );
  }

  getSeverity(status: string) {
    switch (status) {
      case 'Aprobado':
        return 'success';
      case 'Rechazado':
        return 'danger';
      case 'Pendiente Confirmación':
        return 'warn';
      case 'Pendiente':
        return 'info';
      default:
        return 'warn';
    }
  }
  PageChange(event: any) {
    if (
      (
        this.reportsService.requestReportTransaction.fechaInicio == null &&
        this.reportsService.requestReportTransaction.fechaFin != null
      ) ||
      (
        this.reportsService.requestReportTransaction.fechaInicio != null &&
        this.reportsService.requestReportTransaction.fechaFin == null
      )) {
      this.toast.error('Please select the correct date range to filter.');
      this.reportsService.contentData.pageNumber = event.page + 1;
    } else {
      this.reportsService.contentData.pageNumber = event.page + 1;
      this.reportsService.contentData.pageSize = event.rows;
      this.reportsService.requestReportTransaction.fin = this.reportsService.contentData.pageNumber * this.reportsService.contentData.pageSize;
      this.reportsService.requestReportTransaction.ini = this.reportsService.requestReportTransaction.fin - this.reportsService.contentData.pageSize;
      this.reportsService.requestReportTransaction.ini = (this.reportsService.requestReportTransaction.ini == 0) ? 1 : this.reportsService.requestReportTransaction.ini;

      this.reportsService.GetReportTransaction().subscribe(
        (data) => {
          if (data.Respuesta) {
            this.DataReport = data.Data;
            this.totalPa = this.DataReport[0].Conteo;
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
    if (this.reportsService.requestReportTransaction.idTransaccion == null &&
      this.reportsService.requestReportTransaction.referencia == null &&
      this.reportsService.requestReportTransaction.documento == null &&
      this.reportsService.requestReportTransaction.fechaInicio == null &&
      this.reportsService.requestReportTransaction.fechaFin == null
    ) {
      this.toast.error('Select at least one filter to generate your file');
    } else {
      if (
        (
          this.reportsService.requestReportTransaction.fechaInicio == null &&
          this.reportsService.requestReportTransaction.fechaFin != null
        ) ||
        (
          this.reportsService.requestReportTransaction.fechaInicio != null &&
          this.reportsService.requestReportTransaction.fechaFin == null
        )) {
        this.toast.error('Please select the correct date range to filter.');
      } else {
        this.spinner.show();
        this.reportsService.requestReportTransaction.ini = 1;
        this.reportsService.requestReportTransaction.fin = this.totalPa + 200;
        this.reportsService.GetReportTransaction().subscribe(
          (data) => {
            if (data.Respuesta) {
              this.DataReportExcel = data.Data;
              this.reportsService.exportToExcel(this.DataReportExcel, 'PayinRunnPay');
              this.spinner.hide();
            } else {
              this.toast.error(data.Mensaje);
              this.spinner.hide();
            }
          }, (error) => {
            this.toast.error('We were unable to complete your request, please try again.');
            this.spinner.hide();
          }
        );
      }

    }

  }

}
