import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountStatementComponent } from './account-statement.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from 'src/app/layout/layout.module';
import { CreditmoneyComponent } from './creditmoney/creditmoney.component';
import { WithdrawmoneyComponent } from './withdrawmoney/withdrawmoney.component';
import { W2wComponent } from './w2w/w2w.component';
import { MoneyrequestComponent } from './moneyrequest/moneyrequest.component';

const routing: Routes = [
  { path: '', component: AccountStatementComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [AccountStatementComponent, CreditmoneyComponent, WithdrawmoneyComponent, W2wComponent, MoneyrequestComponent],
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
export class AccountStatementModule { }
