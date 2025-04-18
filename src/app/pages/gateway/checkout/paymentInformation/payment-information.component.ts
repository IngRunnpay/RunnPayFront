import { ResponseJwt } from '@/core/interface/jwt.interface';
import { BankPse, MedioPago } from '@/core/interface/transaction.interface';
import { GatewayService } from '@/core/services/gateway.service';
import { JwtService } from '@/core/services/jwt.service';
import { TransaccionService } from '@/core/services/transaccion.service';
import { LayoutService } from '@/layout/service/layout.service';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AppConfigurator } from "../../../../layout/components/app.configurator";
import { FormatoDineroPipe } from "../../../../core/pipes/formato-dinero.pipe";
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { SpinnerComponent } from '@/apps/spinner/spinner.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prueba',
  imports: [
    FormsModule,
    DropdownModule,
    InputGroupModule,
    RippleModule,
    ButtonModule,
    NgxSpinnerModule,
    SpinnerComponent,
    ToastrModule,
    FormatoDineroPipe,
    InputTextModule,
    InputNumberModule,
    CheckboxModule,
    AppConfigurator,
    DialogModule,
    CommonModule
  ],
  templateUrl: './payment-information.component.html',
  styleUrl: './payment-information.component.scss'
})
export class paymentInformation {

  public ResponseJwt: ResponseJwt | any;
  public ResponseDataPay!: any;
  public ResponseDatabank: BankPse[] = [];
  public transaccion: string = '';
  private routeSub: Subscription | any;
  public Banco: string = '';
  public Persona: string = '';
  public TipoPersona: any[] = [];
  layoutService = inject(LayoutService);
  public pse: boolean = false;
  public nequiCode: string = '';
  public DaviPlataCode: string = '';
  public medioPago: MedioPago[] = [];
  public MedioPse: boolean = false;
  public MedioNequiPush: boolean = false;
  public Modal: boolean = false;
  public redirect: string = '';



  constructor(
    private authService: JwtService,
    private transaccionService: TransaccionService,
    private route: ActivatedRoute,
    private gatewayService: GatewayService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.Modal = false;
    this.TipoPersona = [
      { Nombre: "NATURAL" },
      { Nombre: "JURÍDICA" }

    ];
  }
  ngOnInit(): void {
    this.Modal = false;
    this.spinner.show();
    this.authService.emptySession();
    this.authService.tokenJwt().subscribe(
      (e) => {
        if (e.Respuesta) {
          this.ResponseJwt = e.Data;
          this.authService.setTokenJwt(this.ResponseJwt.Token);
          this.routeSub = this.route.params.subscribe((params) => {
            this.transaccion = params['token'];
            this.transaccionService.GetDataTransaction(params['token']).subscribe(
              (t) => {
                this.spinner.hide();
                this.ResponseDataPay = t.Data;
                if (this.ResponseDataPay.idEstadoTransaccion == 1) {
                  if (t.Respuesta) {
                    this.transaccionService.GetMedioPago(params['token']).subscribe(
                      (data) => {
                        if (data.Respuesta) {
                          this.medioPago = data.Data;
                          this.medioPago.forEach(e => {
                            switch (e.IdMedioPago) {
                              case 1:
                                this.MedioPse = true;
                                break;
                              case 3:
                                this.MedioNequiPush = true;
                                break;
                              default:
                                break;
                            }
                          });
                          this.transaccionService.GetBankTransaction(params['token']).subscribe(
                            (b) => {
                              if (b.Respuesta) {
                                this.ResponseDatabank = b.Data;
                                b.Data.forEach(
                                  (d) => {
                                    if (d.name.toUpperCase().includes('NEQUI')) {
                                      this.nequiCode = d.code
                                    }
                                    if (d.name.toUpperCase().includes('DAVIPLATA')) {
                                      this.DaviPlataCode = d.code
                                    }
                                  }
                                )
                              }
                            }, (error) => {
                              this.spinner.hide();
                              this.toastr.error('We were unable to complete your request, please try again.');
                            }
                          );
                        } else {
                          this.spinner.hide();
                          this.toastr.error('We were unable to complete your request, please try again.');
                        }
                      }, (error) => {
                        this.spinner.hide();
                        this.toastr.error('We were unable to complete your request, please try again.');
                      }
                    );
                  } else {
                    this.toastr.error(t.Mensaje);
                  }
                } else {
                  this.router.navigate(['gateway/checkout/payResume/' + this.transaccion]);
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

  Payment(IdMedioPago: number) {
    this.spinner.show();
    this.Modal = false;
    if (IdMedioPago == 1) {
      if (this.Persona == null || this.Persona == '') {
        this.spinner.hide();
        this.toastr.warning('Seleccione el tipo de persona.');
        return;
      }
      if (this.Banco == null || this.Banco == '') {
        this.spinner.hide();
        this.toastr.warning('Seleccione el banco deseado.');
        return;
      }
    }
    this.gatewayService.requestCreatePse.banco = this.Banco;
    this.gatewayService.requestCreatePse.persona = this.Persona;
    this.gatewayService.requestCreatePse.idTransaccion = this.transaccion;
    this.gatewayService.requestCreatePse.idmedioPago = IdMedioPago;

    this.gatewayService.Payment().subscribe(
      (e) => {
        if (e.Respuesta) {
          this.spinner.hide();
          this.redirect = e.Data.toString();
          if (IdMedioPago == 1) {
            window.open(e.Data.toString(), '_self');
          } else {
            this.Modal = true;
          }
        } else {
          this.spinner.hide();
          this.toastr.error(e.Mensaje);
        }
      }, (error) => {
        this.spinner.hide();
        this.toastr.error('We were unable to complete your request, please try again.');
      }
    );
  }
  closeModal() {
    this.Modal = false;
    window.open(this.redirect, '_self');

  }
  
}
