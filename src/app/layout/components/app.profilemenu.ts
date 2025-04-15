import { Component, inject } from '@angular/core';
import { DrawerModule } from "primeng/drawer";
import { LayoutService } from "@/layout/service/layout.service";
import { DatePickerModule } from "primeng/datepicker";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { JwtService } from '../../core/services/jwt.service';
import { dashboardService } from '../../core/services/dashboard.service';
import { FormatoDineroPipe } from "../../core/pipes/formato-dinero.pipe";

@Component({
    selector: 'app-profile-menu',
    imports: [DrawerModule, DatePickerModule, FormsModule, CommonModule, FormatoDineroPipe],
    standalone: true,
    template: `<p-drawer [(visible)]="rightMenuVisible" header="Wallet" position="right" styleClass="layout-profile-sidebar !w-full sm:!w-[28rem]" [ngClass]="{ 'layout-rightmenu-active': rightMenuVisible }">
    <div class="layout-rightmenu h-full overflow-y-auto overflow-x-hidden">
        <div class="flex flex-col items-center" style="padding: 4.5rem 0 2rem 0">
            <div class="flex flex-col items-center mb-6">
            <img class="rounded-full" src="/images/RunPay.ico" style="width: 30%; height: auto;"/>
                <!-- <img src="/images/ecommerce-dashboard/gene.png" alt="atlantis" class="user-image" /> -->
                <span class="user-name text-2xl text-center block mt-6 mb-1">{{authService.getPT()}}</span>
                <span class="user-number">{{authService.getNIT()}}</span>

            </div>
            <div class="flex items-center py-6 px-4 gap-8">
                <div class="in-progress font-medium flex flex-col items-center">
                    <span class="task-number text-blue-500 flex justify-center items-center rounded" style="background: rgba(114, 172, 226, 0.05); padding: 9px; width: 50px; height: 50px; font-size: 30px">{{this.Data.montoDisponible | currency}}</span>
                    <span class="task-name block mt-4">Available Amount</span>
                </div>
            </div>
            <div class="flex items-center py-6 px-4 gap-8">
                <div class="font-medium flex flex-col items-center">
                    <a class="task-number text-blue-500 flex justify-center items-center rounded" style="background: rgba(255, 255, 255, 0.05); padding: 9px; width: 50px; height: 50px; font-size: 30px">{{this.Data.montoRetirado | currency}}</a>
                    <span class="task-name block mt-4">Amount Withdrawn</span>
                </div>
            </div>
            <div class="flex items-center py-6 px-4 gap-8">
                <div class="font-medium flex flex-col items-center">
                    <a class="task-number text-blue-500 flex justify-center items-center rounded" style="background: rgba(255, 255, 255, 0.05); padding: 9px; width: 50px; height: 50px; font-size: 30px">{{this.Data.pendienteDispersion | currency}}</a>
                    <span class="task-name block mt-4">Payout Amount</span>
                </div>
            </div>
        </div>
       
    </div>
</p-drawer>`
})
export class AppProfileMenu {
    layoutService = inject(LayoutService);
    public Data: any;

    constructor(public authService: JwtService, private dashboardService: dashboardService) {
        this.dashboardService.GetBilletera().subscribe(
            (data) => {
                this.Data = data.Data;
            }, (error) => {

            }
        );
    }

    get rightMenuVisible() {
        return this.layoutService.layoutState().rightMenuActive;
    }

    set rightMenuVisible(val: boolean) {
        this.layoutService.layoutState.update((prev) => ({ ...prev, rightMenuActive: val }))
    }

    date = new Date();

}
