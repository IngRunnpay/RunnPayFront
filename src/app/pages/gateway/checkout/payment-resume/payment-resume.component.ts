import { SpinnerComponent } from '@/apps/spinner/spinner.component';
import { ResponseJwt } from '@/core/interface/jwt.interface';
import { FormatoDineroPipe } from '@/core/pipes/formato-dinero.pipe';
import { JwtService } from '@/core/services/jwt.service';
import { TransaccionService } from '@/core/services/transaccion.service';
import { AppConfigurator } from '@/layout/components/app.configurator';
import { LayoutService } from '@/layout/service/layout.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CheckboxModule } from 'primeng/checkbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment-resume',
  imports: [CommonModule, SpinnerComponent, NgxSpinnerModule, FormatoDineroPipe, AppConfigurator, CheckboxModule],
  templateUrl: './payment-resume.component.html',
  styleUrl: './payment-resume.component.scss'
})
export class PaymentResumeComponent {
 layoutService = inject(LayoutService);
    public ResponseJwt: ResponseJwt | any;
    public ResponseDataPay!: any;
    public transaccion: string = '';
    private routeSub: Subscription | any;


    constructor(
        private authService: JwtService,
        private transaccionService: TransaccionService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private route: ActivatedRoute) {

    }

    ngOnInit(): void {
      console.log('ing')
        this.spinner.show();
        this.authService.emptySession();
        this.authService.tokenJwt().subscribe(
            (e) => {
                if (e.Respuesta) {
                    this.ResponseJwt = e.Data;
                    this.authService.setTokenJwt(this.ResponseJwt.Token);
                    this.routeSub = this.route.params.subscribe((params) => {
                        this.transaccion = params['token'];
                        this.transaccionService.GetResumePay(this.transaccion).subscribe(
                            (r) => {
                                if (r.Respuesta) {
                                    this.ResponseDataPay = r.Data
                                    
                                    this.spinner.hide();
                                } else {
                                    this.spinner.hide();
                                    this.toastr.error(r.Mensaje);
                                }
                            }, (error) => {
                                this.spinner.hide();
                                this.toastr.error('We were unable to complete your request, please try again.');
                            }
                        );
                    })
                } else {
                    this.spinner.hide();
                    this.toastr.error(e.Mensaje);
                }
            }, (error) => {
                this.spinner.hide();
                this.toastr.error('We were unable to complete your request, please try again.');
            }
        )
    }
}
