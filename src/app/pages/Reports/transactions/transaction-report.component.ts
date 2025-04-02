// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { ButtonModule } from 'primeng/button';
// import { IconFieldModule } from 'primeng/iconfield';
// import { InputIconModule } from 'primeng/inputicon';
// import { ToastModule } from 'primeng/toast';
// import { Table, TableModule } from 'primeng/table';
// import { TagModule } from 'primeng/tag';
// import { ConfirmationService, MessageService } from 'primeng/api';
// import { InputTextModule } from 'primeng/inputtext';
// import { ReportsService } from '../../../core/services/reports.service';
// import { ToastrService } from 'ngx-toastr';
// import { FormatoDineroPipe } from "../../../core/pipes/formato-dinero.pipe";
// import { JwtService } from '@/core/services/jwt.service';
// import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';




// @Component({
//     selector: 'app-transaction-report',
//     standalone: true,
//     imports: [
//     TableModule,
//     InputIconModule,
//     TagModule,
//     ButtonModule,
//     ToastModule,
//     CommonModule,
//     FormsModule,
//     IconFieldModule,
//     InputTextModule,
//     FormatoDineroPipe
// ],
//     template: ` <div class="card">
//   <div class="font-semibold text-xl mb-4">Transacciones</div>
//   <p-table
//       #dt1
//       [value]="DataReport"
//       dataKey="id"
//       [rows]="15"
//       [rowHover]="true"
//       [showGridlines]="true"
//       [paginator]="true"
//       responsiveLayout="scroll"
//       currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"

//   >
//       <ng-template #caption>
//           <div class="flex justify-between items-center flex-col sm:flex-row">
//               <!-- <button pButton label="Clear" class="p-button-outlined mb-2" icon="pi pi-filter-slash" (click)="clear(dt1)"></button>
//               <p-iconfield iconPosition="left" class="ml-auto">
//                   <p-inputicon>
//                       <i class="pi pi-search"></i>
//                   </p-inputicon>
//                   <input pInputText type="text" (input)="onGlobalFilter(dt1, $event)" placeholder="Search keyword" />
//               </p-iconfield> -->
//           </div>
//       </ng-template>
//       <ng-template #header>
//           <tr>
//               <th style="min-width: 12rem">
//                   <div class="flex justify-between items-center">
//                       Id transacción
//                   </div>
//               </th>
//               <th style="min-width: 12rem">
//                   <div class="flex justify-between items-center">
//                       Pago
//                   </div>
//               </th>
//               <th style="min-width: 14rem">
//                   <div class="flex justify-between items-center">
//                       Estado                      
//                   </div>
//               </th>
//               <th style="min-width: 10rem">
//                   <div class="flex justify-between items-center">
//                       Referencia
//                   </div>
//               </th>
//               <th style="min-width: 10rem">
//                   <div class="flex justify-between items-center">
//                        Monto
//                   </div>
//               </th>
//               <th style="min-width: 10rem">
//                   <div class="flex justify-between items-center">
//                        Moneda
//                   </div>
//               </th>
//               <th style="min-width: 12rem">
//                   <div class="flex justify-between items-center">
//                       Fecha creación
//                   </div>
//               </th>
//               <th style="min-width: 12rem">
//                   <div class="flex justify-between items-center">
//                       Documento usuario
//                   </div>
//               </th>
//               <th style="min-width: 12rem">
//                   <div class="flex justify-between items-center">
//                       Nombre usuario
//                   </div>
//               </th>
//           </tr>
//       </ng-template>
//       <ng-template #body let-customer>
//           <tr>
//               <td>
//                 <span>{{ customer.Idtransaccion }}</span>
//               </td>
//               <td>
//                   <span>{{ customer.MedioPago }}</span>
//               </td>
//               <td>
//                  <p-tag [value]="customer.EstadoTransaccion" [severity]="getSeverity(customer.EstadoTransaccion)" />
//               </td>
//               <td>
//                   {{ customer.Referencia}}
//               </td>
//               <td>
//                   {{ customer.MontoFinal | formatoDinero}}
//               </td>
//               <td>
//                   {{ customer.Moneda}}
//               </td>
//               <td>
//                   {{ customer.FechaCreacion | date: "dd/MM/yyyy"}}
//               </td>
//               <td>
//                     {{ customer.UsuDocumento}}

//               </td>
//               <td>
//                   {{ customer.UsuNombre}}
//               </td>              
//           </tr>
//       </ng-template>
//       <ng-template #emptymessage>
//           <tr>
//               <td colspan="9">No customers found.</td>
//           </tr>
//       </ng-template>
//       <ng-template #loadingbody>
//           <tr>
//               <td colspan="9">Loading customers data. Please wait.</td>
//           </tr>
//       </ng-template>
//   </p-table>
//   <div class="col-6">
//             <ngb-pagination class="d-flex justify-content-center"
//               [collectionSize]="reportService.contentData.totalItems" [(page)]="reportService.contentData.pageNumber"
//               [maxSize]="3" [rotate]="true" [boundaryLinks]="true" (pageChange)="PageChange($event)">
//             </ngb-pagination>
//           </div>
// </div>`,
//     styles: `
//   .p-datatable-frozen-tbody {
//       font-weight: bold;
//   }

//   .p-datatable-scrollable .p-frozen-column {
//       font-weight: bold;
//   }
// `,
//     providers: [ConfirmationService, MessageService, NgbPaginationModule]

// })
// export class TransactionReportComponent {
//     DataReport: any[] = [];
//     constructor(
//         private reportsService: ReportsService,
//         private toast: ToastrService,
//         private authService: JwtService 
//     ) { }

//     ngOnInit() {
//         this.GetData();
//     }
//     GetData() {
//         var IdUsuario = this.authService.getUserId();
//         var app = this.authService.getApp();
//         this.reportsService.requestReportTransaction.IdUsuario = parseInt(IdUsuario ?? '0');
//         this.reportsService.requestReportTransaction.IdAplicacion = app ?? '';
//         this.reportsService.GetReportTransaction().subscribe(
//             (data)=> {
//                 if(data.Respuesta){
//                     this.DataReport = data.Data;
//                 }else{
//                     this.toast.error(data.Mensaje);
//                 }
//             },(error)=> {
//                 this.toast.error('No logramos realizar tu gestión, intenta nuevamente.');
//             }
//         );
//     }

//     // clear(table: Table) {
//     //     table.clear();
//     //     this.filter.nativeElement.value = '';
//     // }

//     getSeverity(status: string) {
//         switch (status) {
//             case 'Aprobado':
//                 return 'success';

//             case 'Rechazado':
//                 return 'danger';

//             case 'Pendiente PSE':
//             case 'Pendiente':
//                 return 'info';

//             default:
//                 return 'warn';
//         }
//     }


// }
