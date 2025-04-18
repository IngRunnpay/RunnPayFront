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
    DatePickerModule
  ],
  templateUrl: './report-dispersion.component.html',
  styleUrl: './report-dispersion.component.scss'
})
export class ReportDispersionComponent {
  DataReport: any[] = [];
  totalPa = 0;
  margin = 'margin: 2px;'
  constructor(
    public reportsService: ReportsService,
    private toast: ToastrService,
    private authService: JwtService
  ) { }
//requestReportDispersion
  ngOnInit() {
    this.GetData();
  }
  GetData() {
    var app = this.authService.getApp();
    this.reportsService.requestReportDispersion.idAplicacion = app ?? '';
    this.reportsService.requestReportDispersion.ini = 1;
    this.reportsService.requestReportDispersion.fin = 15;

    this.reportsService.GetReportDispersion().subscribe(
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

  clear() {
    this.reportsService.requestReportDispersion.ini= 1,
    this.reportsService.requestReportDispersion.fin= 15,
    this.reportsService.requestReportDispersion.idDispersion= null,
    this.reportsService.requestReportDispersion.referencia= '',
    this.reportsService.requestReportDispersion.documento= '',
    this.reportsService.requestReportDispersion.fechaInicio= null,
    this.reportsService.requestReportDispersion.fechaFin= null
    this.reportsService.contentData.pageNumber = 1;
    this.reportsService.GetReportDispersion().subscribe(
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
      case 'Dispersión Finalizada':
        return 'success';

      case 'Rechazo Dispersión':
        return 'danger';

      case 'Por Dispersar':
      case 'Por Dispersar':
        return 'info';

      default:
        return 'warn';
    }
  }
  PageChange (event: any){
    this.reportsService.contentData.pageNumber =  event.page + 1;
    this.reportsService.contentData.pageSize = event.rows;

    this.reportsService.requestReportDispersion.fin =   this.reportsService.contentData.pageNumber * this.reportsService.contentData.pageSize;
    this.reportsService.requestReportDispersion.ini =  this.reportsService.requestReportDispersion.fin  - this.reportsService.contentData.pageSize;
    this.reportsService.requestReportDispersion.ini  = (this.reportsService.requestReportDispersion.ini  == 0) ? 1 : this.reportsService.requestReportDispersion.ini;

    this.reportsService.GetReportDispersion().subscribe(
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
