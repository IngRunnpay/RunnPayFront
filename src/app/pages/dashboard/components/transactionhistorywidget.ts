import { Component } from '@angular/core';
import { TimelineModule } from 'primeng/timeline';
import { Subscription } from 'rxjs';
import { dashboardService } from '../../../core/services/dashboard.service';
import { FormatoDineroPipe } from "../../../core/pipes/formato-dinero.pipe";
import { CommonModule } from '@angular/common';
import { JwtService } from '@/core/services/jwt.service';

@Component({
    selector: 'transaction-history-widget',
    standalone: true,
    imports: [TimelineModule, FormatoDineroPipe, CommonModule],
    template: `<div class="card !p-0">
        <div class="timeline-header p-4 flex justify-between items-center">
            <p class="m-0">TRANSACTION HISTORY</p>
            <div class="header-icons">
                <i class="pi pi-refresh ml-2"></i>
            </div>
        </div>
        <div class="timeline-content pb-4">
            <p-timeline [value]="timelineEvents" styleClass="customized-timeline py-0 px-4">
                <ng-template #marker let-event>
                    <span class="rounded-full p-1 w-8 h-8 flex justify-center items-center text-white" [style]="{ backgroundColor: event.ColorIcono }">
                        <i [class]="event.Icono"></i>
                    </span>
                </ng-template>
                <ng-template #content let-event>
                    <div class="flex items-center justify-between">
                        <p class="m-0">{{ event.Descripcion }}</p>
                        <h6 class="m-0" [style]="{ color: event.ColorMonto }">
                            <a>$</a>{{ event.MontoFinal | formatoDinero }}
                        </h6>
                    </div>
                    <span class="text-sm text-surface-500 dark:text-surface-400">{{ event.FechaCreacion | date: 'dd/MM/yyyy HH:mm:ss'}}</span>
                </ng-template>
            </p-timeline>
        </div>
        <div class="timeline-footer border-t border-surface-200 dark:border-surface-700 p-4 flex items-center justify-center">
            <a href="/pages/reports/transactions" class="text-primary hover:text-primary-400 duration-200">View all transactions</a>
        </div>
    </div>`,
    styles: `
        :host ::ng-deep .customized-timeline {
            .p-timeline-event:nth-child(even) {
                flex-direction: row !important;

                .p-timeline-event-content {
                    text-align: left !important;
                }
            }

            .p-timeline-event-opposite {
                flex: 0;
                padding: 0;
            }
        }

        .p-card {
            margin-top: 1rem;
        }
    `
})
export class TransactionHistoryWidget {
    public timelineEvents: any[]= [];
    constructor(private dashboardService: dashboardService, private authService: JwtService ){

    }
    ngOnInit(): void {
        this.GetData();
    }
    GetData(){
        var IdUsuario = this.authService.getUserId();
        this.dashboardService.GetHistory(parseInt(IdUsuario ?? '0')).subscribe(
            (data)=> {
                this.timelineEvents = data.Data;
            }, (error) => {

            }
        );
    }
}
