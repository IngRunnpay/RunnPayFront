import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { LayoutService } from '@/layout/service/layout.service';
import { Fluid } from 'primeng/fluid';
import { AppConfigurator } from "@/layout/components/app.configurator";
import { CommonModule } from "@angular/common";
import { InputNumber } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { JwtService } from '@/core/services/jwt.service';
import { ResponseJwt } from '@/core/interface/jwt.interface';
import { jwtInterceptor } from '../../core/interceptors/jwt.interceptor';
import { SpinnerComponent } from "../../apps/spinner/spinner.component";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        PasswordModule,
        FormsModule,
        RouterModule,
        RippleModule,
        InputIcon,
        IconField,
        Fluid,
        AppConfigurator,
        InputNumber,
        ReactiveFormsModule,
        NgxSpinnerModule,
        SpinnerComponent
    ],
    template: `
    <ngx-spinner>
    <app-spinner></app-spinner>
    </ngx-spinner>
        <div [class]="'flex min-h-screen  ' + (layoutService.isDarkTheme() ? 'layout-dark' : 'layout-light')">
            <div *ngIf="layoutService.isDarkTheme()" class="w-6/12 h-screen hidden md:block flex-shrink-0" style="max-width: 490px; background-image: url('/images/pages/login-ondark.png'); background-repeat: no-repeat; background-size: cover"></div>
            <div *ngIf="!layoutService.isDarkTheme()" class="w-6/12 h-screen hidden md:block flex-shrink-0" style="max-width: 490px; background-image: url('/images/pages/login-onlight.png'); background-repeat: no-repeat; background-size: cover"></div>
            <div class="w-full" style="background: var(--surface-ground)">
                <p-fluid class="min-h-screen text-center w-full flex items-center md:items-start justify-center flex-col bg-auto md:bg-contain !bg-no-repeat" style="padding: 20% 10% 20% 10%; background: var(--exception-pages-image); background-size: contain;">
                    <div class="flex flex-col">
                        <div class="flex items-center mb-12">
                            <!-- <img src="/images/RunPay.ico" style="width: 45px" alt="logo" /> -->
                            <img src="/images/LogoRunnPay.png"  style="width: 150px" alt="logo" />
                        </div>
                        <div class="form-container">
                            <form [formGroup]="LoginForm"> 
                                <p-iconfield>
                                    <p-inputicon class="pi pi-envelope" />
                                    <input formControlName="Email" pInputText type="text" placeholder="Email" class="block mb-4" style="max-width: 320px; min-width: 270px" [disabled]="MostrarOtp"/>
                                </p-iconfield>
                            </form>
                         
                            @if(MostrarOtp){
                                <p-iconfield>
                                <p-inputicon class="pi pi-mobile" />
                                <input pInputText type="text" placeholder="Codigo" class="block mb-4" [(ngModel)]="value" style="max-width: 320px; min-width: 270px" [disabled]="!MostrarOtp" />
                            </p-iconfield>
                            }
                        </div>
                        <div class="mt-6">
                            @if(MostrarOtp){
                                <button pButton pRipple type="button" class="block" style="max-width: 320px; margin-bottom: 32px" (click)="ValidarOtp()">Validar</button>
                            }@else {
                                <button pButton pRipple type="button" class="block" style="max-width: 320px; margin-bottom: 32px" (click)="Login()">Enviar</button>
                            }
                        </div>
                    </div>

                    <div class="flex items-center absolute" style="bottom: 75px">
                        <div class="flex items-center pr-6 mr-6 border-r border-surface-200 dark:border-surface-700">
                            <img src="/images/RunPay.ico" style="width: 22px" />
                        </div>
                        <span class="text-sm text-surface-500 dark:text-surface-400 mr-4">Copyright 2025</span>
                    </div>
                </p-fluid>
            </div>
        </div>
        <app-configurator [simple]="true"/>`
})
export class Login {
    layoutService = inject(LayoutService);
    public ResponseJwt: ResponseJwt | any;

    public LoginForm: FormGroup = new FormGroup({
        Email: new FormControl('')

    });

    value: string = '';
    MostrarOtp: boolean = false;
    datoUsuario: any;
    constructor(
        private Toast: ToastrService,
        private router: Router,
        private fb: FormBuilder,
        private spinner: NgxSpinnerService,
        private authService: JwtService,
        private toastr: ToastrService,
    ) {
        this.LoginForm = this.fb.group({
            Email: ['', [Validators.required, Validators.email]]
        });
    }

    ngOnInit(): void {
        this.authService.emptySession();
    }

    Login() {
        this.spinner.show();
        if (this.LoginForm.valid) {
            this.authService.emptySession();
            this.authService.tokenJwt().subscribe(
                (e) => {
                    if (e.Respuesta) {
                        this.ResponseJwt = e.Data;
                        this.authService.setTokenJwt(this.ResponseJwt.Token);
                        this.authService.RequestloginPortal.Correo = this.LoginForm.value['Email'];
                        this.authService.loginEmail().subscribe(
                            (data) => {
                                if (data.Respuesta) {
                                    this.LoginForm.controls['Email'].disable();
                                    this.MostrarOtp = true;
                                    this.spinner.hide();
                                } else {
                                    this.spinner.hide();
                                    this.authService.emptySession();
                                    this.toastr.error(data.Mensaje);
                                }
                            }, (error) => {
                                this.spinner.hide();
                                this.authService.emptySession();
                                this.toastr.error('No logramos realizar tu gestión, intenta nuevamente.');
                            }
                        );
                    } else {
                        this.spinner.hide();
                        this.authService.emptySession();
                        this.toastr.error(e.Mensaje);
                    }
                }, (error) => {
                    this.spinner.hide();
                    this.toastr.error('No logramos realizar tu gestión, intenta nuevamente.');
                }
            )

        } else {
            this.spinner.hide();
            this.LoginForm.controls['Email'].enable();
            this.MostrarOtp = false;
            this.Toast.warning('Por favor ingrese el correo.');
        }
    }

    ValidarOtp() {
        if (this.value != null || this.value != undefined || this.value != "") {
            this.spinner.show();
            this.authService.RequestvalidOtp.Correo = this.LoginForm.value['Email'];
            this.authService.RequestvalidOtp.Otp = this.value;
            this.authService.ValidCodigo().subscribe(
                (d) => {
                    if (d.Respuesta) {
                        this.datoUsuario = d.Data;
                        this.authService.setUserId(this.datoUsuario.idusuario);
                        this.authService.setApp(this.datoUsuario.cod);
                        this.authService.setNIT(this.datoUsuario.nit);
                        this.authService.setPT(this.datoUsuario.pt);
                        this.spinner.hide();
                        this.toastr.success('Código validado correctamente.');
                        this.authService.startExpirationTimer();
                        this.router.navigate(['/pages']);
                    } else {
                        this.spinner.hide();
                        this.toastr.error(d.Mensaje);
                    }

                }, (error) => {
                    this.spinner.hide();
                    this.toastr.error('No logramos realizar tu gestión, intenta nuevamente.');
                }
            );
        } else {
            this.spinner.hide();
            this.Toast.warning('El código diligenciado debe tener 4 caracteres.');
        }

    }
}
