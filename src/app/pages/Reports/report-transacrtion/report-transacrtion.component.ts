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
  templateUrl: './report-transacrtion.component.html',
  styleUrl: './report-transacrtion.component.scss'
})
export class ReportTransacrtionComponent {
  DataReport: any[] = [];
  totalPa = 0;
  margin = 'margin: 2px;'
  constructor(
    public reportsService: ReportsService,
    private toast: ToastrService,
    private authService: JwtService
  ) { }

  ngOnInit() {
    this.GetData();
  }
  GetData() {
    var IdUsuario = this.authService.getUserId();
    var app = this.authService.getApp();
    this.reportsService.requestReportTransaction.IdUsuario = parseInt(IdUsuario ?? '0');
    this.reportsService.requestReportTransaction.IdAplicacion = app ?? '';
    this.reportsService.GetReportTransaction().subscribe(
      (data) => {
        if (data.Respuesta) {
          this.DataReport = data.Data;
          this.totalPa = this.DataReport[0].Conteo;
        } else {
          this.toast.error(data.Mensaje);
        }
      }, (error) => {
        this.toast.error('No logramos realizar tu gestión, intenta nuevamente.');
      }
    );
  }

  clear() {
    this.reportsService.requestReportTransaction.ini= 1,
    this.reportsService.requestReportTransaction.fin= 15,
    this.reportsService.requestReportTransaction.idTransaccion= null,
    this.reportsService.requestReportTransaction.referencia= '',
    this.reportsService.requestReportTransaction.documento= '',
    this.reportsService.requestReportTransaction.fechaInicio= null,
    this.reportsService.requestReportTransaction.fechaFin= null
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
        this.toast.error('No logramos realizar tu gestión, intenta nuevamente.');
      }
    );
  }

  getSeverity(status: string) {
    switch (status) {
      case 'Aprobado':
        return 'success';

      case 'Rechazado':
        return 'danger';

      case 'Pendiente PSE':
      case 'Pendiente':
        return 'info';

      default:
        return 'warn';
    }
  }
  PageChange (event: any){
    this.reportsService.contentData.pageNumber =  event.page + 1;
    this.reportsService.contentData.pageSize = event.rows;

    this.reportsService.requestReportTransaction.ini =  this.reportsService.contentData.pageNumber * this.reportsService.contentData.pageSize;
    this.reportsService.requestReportTransaction.fin =   this.reportsService.requestReportTransaction.ini  + this.reportsService.contentData.pageSize;
    
    this.reportsService.GetReportTransaction().subscribe(
      (data) => {
        if (data.Respuesta) {
          this.DataReport = data.Data;
          this.totalPa = this.DataReport[0].Conteo;
        } else {
          this.toast.error(data.Mensaje);
        }
      }, (error) => {
        this.toast.error('No logramos realizar tu gestión, intenta nuevamente.');
      }
    );
  }

}
