import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { RtSummaryComponent } from './rt-summary/rt-summary.component';
import { RtClaimComponent } from './rt-claim/rt-claim.component';
import { RtVaccountComponent } from './rt-vaccount/rt-vaccount.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from 'src/app/layout/layout.module';
import { RechargeUtilityComponent } from './recharge-utility/recharge-utility.component';
const routing: Routes = [
  { path: '', component: TransactionListComponent },
  { path: 'recharge-utility', component: RechargeUtilityComponent },
  { path: 'rt-summary', component: RtSummaryComponent },
  { path: 'vstatement', component: RtVaccountComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
@NgModule({
  declarations: [
    TransactionListComponent,
    RtSummaryComponent,
    RtClaimComponent,
    RtVaccountComponent,
    RechargeUtilityComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    LayoutModule
  ],
  exports: [
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TransactionModule { }
