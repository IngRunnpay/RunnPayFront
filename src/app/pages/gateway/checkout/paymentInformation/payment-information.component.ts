import { ResponseJwt } from '@/core/interface/jwt.interface';
import { BankPse } from '@/core/interface/transaction.interface';
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
    AppConfigurator
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

  constructor(
    private authService: JwtService,
    private transaccionService: TransaccionService,
    private route: ActivatedRoute,
    private gatewayService: GatewayService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.TipoPersona = [
      { Nombre: "NATURAL" },
      { Nombre: "JURÍDICA" }

    ];
  }
  ngOnInit(): void {
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
                    this.transaccionService.GetBankTransaction(params['token']).subscribe(
                      (b) => {
                        if (b.Respuesta) {
                          this.ResponseDatabank = b.Data;
                          b.Data.forEach(
                            (d)=> {
                              if(d.name.toUpperCase().includes('NEQUI')){
                                  this.nequiCode = d.code
                              }
                              if(d.name.toUpperCase().includes('DAVIPLATA')){
                                  this.DaviPlataCode = d.code
                              }
                            }
                          )
                        }
                      }, (error) => {
                        this.spinner.hide();
                        this.toastr.error('No logramos realizar tu gestión, intenta nuevamente.');
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
                this.toastr.error('No logramos realizar tu gestión, intenta nuevamente.');
              }
            );
          })

        } else {
          this.spinner.hide();
          this.toastr.error(e.Mensaje);
        }
      }, (error) => {
        this.spinner.hide();
        this.toastr.error('No logramos realizar tu gestión, intenta nuevamente.');
      }
    )
  }

  CreateLinkPSE() {
    this.spinner.show();
    if (this.Persona == null || this.Persona == '') {
      this.spinner.hide();
      this.toastr.warning('Seleccione el tipo de persona.');
    } else {
      if (this.Banco == null || this.Banco == '') {
        this.spinner.hide();
        this.toastr.warning('Seleccione el banco deseado.');
      } else {
        this.gatewayService.requestCreatePse.banco = this.Banco;
        this.gatewayService.requestCreatePse.persona = this.Persona;
        this.gatewayService.requestCreatePse.idTransaccion = this.transaccion;
        this.gatewayService.CreatePse().subscribe(
          (e) => {
            if (e.Respuesta) {
              this.spinner.hide();
              window.open(e.Data.toString(), '_self');
            } else {
              this.spinner.hide();
              this.toastr.error(e.Mensaje);
            }
          }, (error) => {
            this.spinner.hide();
            this.toastr.error('No logramos realizar tu gestión, intenta nuevamente.');
          }
        );
      }
    }
  }
  CreateLinkNequi() {
    this.spinner.show();
    this.gatewayService.requestCreatePse.banco = this.nequiCode;
    this.gatewayService.requestCreatePse.persona = 'NATURAL';
    this.gatewayService.requestCreatePse.idTransaccion = this.transaccion;
    this.gatewayService.CreatePse().subscribe(
      (e) => {
        if (e.Respuesta) {
          this.spinner.hide();
          window.open(e.Data.toString(), '_self');
        } else {
          this.spinner.hide();
          this.toastr.error(e.Mensaje);
        }
      }, (error) => {
        this.spinner.hide();
        this.toastr.error('No logramos realizar tu gestión, intenta nuevamente.');
      }
    );
  }
  CreateLinkDavi() {
    this.spinner.show();

    this.gatewayService.requestCreatePse.banco = this.DaviPlataCode;
    this.gatewayService.requestCreatePse.persona = 'NATURAL';
    this.gatewayService.requestCreatePse.idTransaccion = this.transaccion;
    this.gatewayService.CreatePse().subscribe(
      (e) => {
        if (e.Respuesta) {
          this.spinner.hide();
          window.open(e.Data.toString(), '_self');
        } else {
          this.spinner.hide();
          this.toastr.error(e.Mensaje);
        }
      }, (error) => {
        this.spinner.hide();
        this.toastr.error('No logramos realizar tu gestión, intenta nuevamente.');
      }
    );
  }
}
