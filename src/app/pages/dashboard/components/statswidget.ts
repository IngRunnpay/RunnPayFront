import { Component } from '@angular/core';
import { dashboardService } from '../../../core/services/dashboard.service';
import { JwtService } from '@/core/services/jwt.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'stats-widget',
    standalone: true,
    template: `
        <div class="col-span-12 md:col-span-4">
            <div class="card relative h-28 rounded-xl !p-4">
                <span class="text-sm font-medium leading-none">APPROVED TRANSACTIONS</span>
                <div class="flex justify-between">
                    <div class="flex justify-between items-center">
                        <div class="flex justify-center items-center h-8 w-20 rounded p-2 mr-4 text-black" style="margin-right: 12px; background-color: #0bd18a; box-shadow: 0px 6px 20px rgba(11, 209, 138, 0.3)">
                            <i class="pi pi-arrow-up w-8"></i>
                            <span class="leading-tight">{{DataPorcentaje?.porcentajeAprobado}}%</span>
                        </div>
                        <div class="leading-loose text-3xl">{{DataPorcentaje?.montoAprobado  | currency}}</div>
                    </div>
                </div>
                <img class="absolute" style="bottom: 14px; right: 12px" src="/images/ecommerce-dashboard/value.svg" />
            </div>
        </div>
        <div class="col-span-12 md:col-span-4">
            <div class="card relative h-28 rounded-xl !p-4">
                <span class="text-sm font-medium leading-none">PENDING TRANSACTIONS</span>
                <div class="flex justify-between">
                    <div class="flex justify-between items-center">
                        <div class="flex justify-center items-center h-8 w-20 rounded p-2 mr-4 text-black" style="background-color: #00d0de; box-shadow: 0px 6px 20px rgba(0, 208, 222, 0.3)">
                            <i class="pi pi-minus w-8"></i>
                            <span class="leading-tight">{{DataPorcentaje?.porcentajePendiente}}%</span>
                        </div>
                        <div class="leading-loose text-3xl">{{DataPorcentaje?.montoPendiente  | currency}}</div>
                    </div>
                </div>
                <img class="absolute" style="bottom: 14px; right: 12px" src="/images/ecommerce-dashboard/quantity.svg" />
            </div>
        </div>
        <div class="col-span-12 md:col-span-4">
            <div class="card relative h-28 rounded-xl !p-4">
                <span class="text-sm font-medium leading-none">REJECTED TRANSACTIONS</span>
                <div class="flex justify-between">
                    <div class="flex justify-between items-center">
                        <div class="flex justify-center items-center h-8 w-20 rounded p-2 mr-4 text-black" style="background-color: #fc6161; box-shadow: 0px 6px 20px rgba(252, 97, 97, 0.3)">
                            <i class="pi pi-arrow-down w-8"></i>
                            <span class="leading-tight">{{DataPorcentaje?.porcentajeRechazo}}%</span>
                        </div>
                        <div class="leading-loose text-3xl">{{DataPorcentaje?.montoRechazo  | currency}}</div>
                    </div>
                </div>
                <img class="absolute inline-block" style="bottom: 14px; right: 12px" src="/images/ecommerce-dashboard/rate.svg" />
            </div>
        </div>`,
    host: {
        class: 'col-span-12 grid grid-cols-12 gap-4'
    },
    imports: [CommonModule
    ]
})
export class StatsWidget {
    public DataPorcentaje: any;

    constructor(private dashboardServices: dashboardService, private authService: JwtService) {

    }
    ngOnInit(): void {
        this.GetPorcentaje();
    }

    GetPorcentaje() {
        var IdUsuario = this.authService.getUserId();
        this.dashboardServices.Getporcentaje(parseInt(IdUsuario ?? '0')).subscribe(
            (data) => {
                this.DataPorcentaje = data.Data;
            }, (error) => {

            }
        );
    }
}
