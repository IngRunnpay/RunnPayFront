import {Component} from '@angular/core';
import {StatsWidget} from '@/pages/dashboard/components/statswidget';
import {UniqueVisitorWidget} from '@/pages/dashboard/components/uniquevisitorwidget';
import {TransactionHistoryWidget} from '@/pages/dashboard/components/transactionhistorywidget';
import {CustomerService} from '@/pages/service/customer.service';

@Component({
    selector: 'app-ecommerce-dashboard',
    standalone: true,
    imports: [StatsWidget, UniqueVisitorWidget, TransactionHistoryWidget],
    providers: [CustomerService],
    template: `<div class="grid grid-cols-12 gap-8">
        <stats-widget />

        <div class="col-span-12 xl:col-span-8">
            <unique-visitor-widget />
        </div>

        <div class="col-span-12 xl:col-span-4">
            <transaction-history-widget />
        </div>
    </div>`
})
export class EcommerceDashboard {}
