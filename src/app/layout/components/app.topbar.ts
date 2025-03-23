import {Component, computed, ElementRef, inject, ViewChild} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {StyleClassModule} from 'primeng/styleclass';
import {LayoutService} from '@/layout/service/layout.service';
import {Ripple} from 'primeng/ripple';
import {InputText} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {FormsModule} from '@angular/forms';
import {AppSidebar} from '@/layout/components/app.sidebar';
import {AppBreadcrumb} from '@/layout/components/app.breadcrumb';
import { JwtService } from '../../core/services/jwt.service';

@Component({
    selector: '[app-topbar]',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, FormsModule, Ripple, InputText, ButtonModule, IconField, InputIcon, AppBreadcrumb, AppSidebar],
    template: `
        <div class="topbar-start">
            <button pButton pRipple #menubutton type="button" class="topbar-menubutton p-trigger" text rounded severity="secondary" (click)="onMenuButtonClick()">
                <i class="pi pi-bars"></i>
            </button>

            <div class="topbar-breadcrumb">
                <div app-breadcrumb></div>
            </div>
        </div>
        <div class="layout-topbar-menu-section">
            <div app-sidebar></div>
        </div>
        <div class="topbar-end">
            <ul class="topbar-menu">
                <li class="ml-4">
                    <button pButton pRipple type="button" icon="pi pi-palette" class="flex-shrink-0 config-button" text rounded (click)="onConfigButtonClick()"></button>
                </li>

                <li class="profile-item topbar-item">
                    <a pStyleClass="@next" enterFromClass="!hidden" enterActiveClass="animate-scalein" leaveToClass="!hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true" class="cursor-pointer">
                        <img class="rounded-full" src="/images/RunPay.ico" />
                    </a>

                    <ul class="topbar-menu active-topbar-menu !p-6 w-60 z-50 !hidden rounded">
                        <li role="menuitem" class="!m-0 !mb-4" (click)="CerrarSesion()" style="cursor: pointer;">
                           <a
                                class="flex items-center hover:text-primary-500 duration-200"
                                pStyleClass="@grandparent"
                                enterFromClass="!hidden"
                                enterActiveClass="animate-scalein"
                                leaveToClass="!hidden"
                                leaveActiveClass="animate-fadeout"
                                [hideOnOutsideClick]="true"
                            >
                                <i class="pi pi-fw pi-sign-out mr-2"></i>
                                <span>Cerrar Sesión</span>
                            </a>
                        </li>

                        <!-- <li role="menuitem" class="!m-0 !mb-4">
                            <a
                                href="#"
                                class="flex items-center hover:text-primary-500 duration-200"
                                pStyleClass="@grandparent"
                                enterFromClass="!hidden"
                                enterActiveClass="animate-scalein"
                                leaveToClass="!hidden"
                                leaveActiveClass="animate-fadeout"
                                [hideOnOutsideClick]="true"
                            >
                                <i class="pi pi-fw pi-cog mr-2"></i>
                                <span>Settings</span>
                            </a>
                        </li> -->
                        <!-- <li role="menuitem" class="!m-0" (click)="CerrarSesion()" style="cursor: pointer;">
                            <a
                                class="flex items-center hover:text-primary-500 duration-200"
                                pStyleClass="@grandparent"
                                enterFromClass="!hidden"
                                enterActiveClass="animate-scalein"
                                leaveToClass="!hidden"
                                leaveActiveClass="animate-fadeout"
                                [hideOnOutsideClick]="true"
                            >
                                <i class="pi pi-fw pi-sign-out mr-2"></i>
                                <span>Cerrar Sesión</span>
                            </a>
                        </li> -->
                    </ul>
                </li>

                <li class="right-panel-button relative !hidden lg:!block">
                    <!-- <button pButton pRipple type="button" label="Today" style="width: 5.7rem" icon="pi pi-bookmark" class="layout-rightmenu-button !hidden md:!inline-flex font-normal" (click)="onProfileMenuButtonClick()"></button> -->
                    <button pButton pRipple type="button" icon="pi pi-bookmark" class="layout-rightmenu-button !block md:!hidden font-normal" (click)="onSidebarButtonClick()"></button>
                </li>
            </ul>
        </div>
    `,
    host: {
        class: 'layout-topbar'
    }
})
export class AppTopbar {
    menu: MenuItem[] = [];

    @ViewChild('searchinput') searchInput!: ElementRef<HTMLElement>;

    @ViewChild('menubutton') menuButton!: ElementRef<HTMLElement>;

    @ViewChild(AppSidebar) appSidebar!: AppSidebar;

    el = inject(ElementRef);

    constructor(public layoutService: LayoutService, private authService: JwtService, private route: Router) {}

    searchBarActive = computed(() => this.layoutService.layoutState().searchBarActive);

    CerrarSesion(){
        this.authService.emptySession();
        this.route.navigate(['/auth/login']);
    }

    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    activateSearch(el: HTMLElement | null = null) {
        this.layoutService.layoutState.update((val) => ({
            ...val,
            searchBarActive: true
        }));
        setTimeout(() => {
            this.searchInput.nativeElement?.focus();
        }, 250);
    }

    deactivateSearch() {
        this.layoutService.layoutState.update((val) => ({
            ...val,
            searchBarActive: false
        }));

    }

    onConfigButtonClick() {
        this.layoutService.showConfigSidebar();
    }

    onSidebarButtonClick() {
        this.layoutService.layoutState.update((val) => ({
            ...val,
            rightMenuVisible: true
        }));
    }

    onProfileMenuButtonClick(){
        this.layoutService.layoutState.update((val) => ({
            ...val,
            rightMenuActive: true
        }));
    }
}
