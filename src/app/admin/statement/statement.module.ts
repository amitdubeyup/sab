import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from 'src/app/layout/layout.module';
import { VirtualAccountComponent } from './virtual-account/virtual-account.component';
import { RechargeUtilityComponent } from './recharge-utility/recharge-utility.component';
import { MoneyRequestComponent } from './money-request/money-request.component';
import { ManageFundReportComponent } from './manage-fund-report/manage-fund-report.component';
import { AepsStatementComponent } from './aeps-statement/aeps-statement.component';

const routing: Routes = [
  { path: '', redirectTo: 'statement', pathMatch: 'full' },
  { path: 'vpa-statement', component: VirtualAccountComponent },
  { path: 'rechargeutility', component: RechargeUtilityComponent },
  { path: 'moneyrequest', component: MoneyRequestComponent },
  { path: 'managefund', component: ManageFundReportComponent },
  { path: 'aepstransaction', component: AepsStatementComponent },
  {
    path: 'statement',
    loadChildren: () => import('./statement/statement.module').then(m => m.StatementModule)
  },
  {
    path: 'commision',
    loadChildren: () => import('./retailer-commision/retailer-commision.module').then(m => m.RetailerCommisionModule)
  }, 
  {
    path: 'outlet-statement',
    loadChildren: () => import('./all-member-ledger/all-member-ledger.module').then(m => m.AllMemberLedgerModule)
  },
  {
    path: 'fund-reverse',
    loadChildren: () => import('./fund-reverse/fund-reverse.module').then(m => m.FundReverseModule)
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [VirtualAccountComponent, RechargeUtilityComponent, MoneyRequestComponent, ManageFundReportComponent, AepsStatementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    LayoutModule,
  ],
  exports: [
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StatementModule { }
