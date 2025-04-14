import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ChartModule } from 'primeng/chart';
import { LayoutService } from '@/layout/service/layout.service';
import { debounceTime, Subscription } from 'rxjs';
import { FormatoDineroPipe } from "../../../core/pipes/formato-dinero.pipe";
import { dashboardService } from '../../../core/services/dashboard.service';
import { JwtService } from '../../../core/services/jwt.service';

@Component({
    selector: 'unique-visitor-widget',
    standalone: true,
    imports: [FormsModule, SelectModule, ChartModule, FormatoDineroPipe],
    template: `<div class="card widget-visitor-graph">
        <div class="card-header leading-loose">
            <span>ANNUAL TRANSACTIONS</span>
            <p-select [options]="visitorYear" [(ngModel)]="selectedVisitorYear" optionLabel="name"></p-select>
        </div>

        <div class="graph-content grid grid-cols-12 gap-4 mt-6">
            <div class="col-span-12 md:col-span-6">
                <div class="text-3xl font-semibold"><a>$</a>{{Aprobado.toString()| formatoDinero}}</div>
                <div class="font-semibold my-4">APPROVED</div>
                <p class="text-surface-500 dark:text-surface-400">
                    Total approved transactions. 
                </p>
            </div>
            <div class="col-span-12 md:col-span-6">
                <div class="text-3xl font-semibold"><a>$</a>{{Rechazado.toString() | formatoDinero}}</div>
                <div class="font-semibold my-4">REJECTED</div>
                <p class="text-surface-500 dark:text-surface-400">
                Total in rejected transactions.
                </p>
            </div>
        </div>

        <div class="graph">
            <div class="text-xl font-semibold mt-6">Revenue</div>

            <p-chart #visitor type="bar" height="380" [data]="visitorChart" [options]="visitorChartOptions" id="visitor-chart"></p-chart>
        </div>
    </div>`
})
export class UniqueVisitorWidget implements OnInit, OnDestroy {
    layoutService = inject(LayoutService);

    Aprobado = 0;

    Rechazado = 0;

    visitorYear: any = [
        { name: '2025', code: '0' }
    ];

    visitorChart: any;

    visitorChartOptions: any;

    selectedVisitorYear: any = { name: '2025', code: '0' };

    subscription!: Subscription;
    data: any[] = [];

    constructor(private dashboardService: dashboardService, private authService: JwtService) {
        // this.subscription = this.layoutService.configUpdate$.pipe(debounceTime(25)).subscribe(() => {
        //     this.initChart();
        // });
    }

    ngOnInit() {
        this.initChart();

    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        var meses: any[] = [];
        var montoRechazado: any[] = [];
        var montoAprobado: any[] = [];
        var IdUsuario = this.authService.getUserId();
        this.dashboardService.GetAño(parseInt(IdUsuario ?? '0')).subscribe(
            (data) => {
                this.data = data.Data;
                this.data.forEach(e => {
                    this.Aprobado += e.Valor_Aprobado;
                    this.Rechazado += e.Valor_Rechazado;
                    meses.push(e.Mes);
                    montoRechazado.push(e.Valor_Rechazado);
                    montoAprobado.push(e.Valor_Aprobado);

                });
                const maximorechazado = montoRechazado.reduce((max, num) => Math.max(max, num), -Infinity);
                const maximoaprobado = montoAprobado.reduce((max, num) => Math.max(max, num), -Infinity);
                var valorMaximo = maximoaprobado > maximorechazado ? maximoaprobado : maximorechazado;



                this.visitorChart = {
                    labels: meses,
                    datasets: [
                        {
                            label: 'Rejected',
                            data: montoRechazado,
                            backgroundColor: '#fc6161',
                            fill: true,
                            barPercentage: 0.5,
                            borderRadius: 2,
                            borderSkipped: false,
                        },
                        {
                            label: 'Approved',
                            data: montoAprobado,
                            backgroundColor: '#0bd18a',
                            fill: true,
                            barPercentage: 0.5,
                            borderRadius: 2,
                            borderSkipped: false,
                        }
                    ]
                };

                this.visitorChartOptions = {
                    plugins: {
                        legend: {
                            position: 'top',
                            align: 'end',
                            labels: {
                                color: textColor
                            }
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    hover: {
                        mode: 'index'
                    },
                    scales: {
                        y: {
                            ticks: {
                                color: textColor
                            },
                            min: 0,
                            max: valorMaximo,
                            grid: {
                                display: false
                            }
                        },
                        x: {
                            ticks: {
                                color: textColor
                            },
                            barPercentage: 0.5,
                            grid: {
                                display: false
                            }
                        }
                    }
                };

                this.selectedVisitorYear = this.visitorYear[0];
                // this.datosAños.Valor_Aprobado.forEach(e => {

                // });
                // this.Aprobado += this.datosAños.file

            }, (error) => {

            }
        );


    }

    // changeVisitorChart(event: any) {
    //     const dataSet1 = [
    //         [630, 630, 695, 695, 695, 760, 760, 760, 840, 840, 840, 840],
    //         [600, 671, 660, 665, 700, 610, 810, 790, 710, 860, 810, 780]
    //     ];
    //     const dataSet2 = [
    //         [580, 580, 620, 620, 620, 680, 680, 680, 730, 730, 730, 730],
    //         [550, 592, 600, 605, 630, 649, 660, 690, 710, 720, 730, 780]
    //     ];

    //     if (event.value.code === '1') {
    //         this.growth = '$581,259';
    //         this.avgCustomer = '$973';
    //         this.visitorChart.datasets[0].data = dataSet2[parseInt('0')];
    //         this.visitorChart.datasets[1].data = dataSet2[parseInt('1')];
    //     } else {
    //         this.growth = '$620,076';
    //         this.avgCustomer = '$1,120';
    //         this.visitorChart.datasets[0].data = dataSet1[parseInt('0')];
    //         this.visitorChart.datasets[1].data = dataSet1[parseInt('1')];
    //     }
    // }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
