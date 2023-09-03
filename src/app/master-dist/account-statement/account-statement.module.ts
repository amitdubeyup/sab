import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from 'src/app/layout/layout.module';
import { RouterModule, Routes } from '@angular/router';
import { AccountStatementComponent } from './account-statement.component';
import { CommToWalletComponent } from './comm-to-wallet/comm-to-wallet.component';
import { DistCommComponent } from './dist-comm/dist-comm.component';
import { CreditmoneyComponent } from './creditmoney/creditmoney.component';
import { WithdrawmoneyComponent } from './withdrawmoney/withdrawmoney.component';
import { W2wComponent } from './w2w/w2w.component';
import { MoneyrequestComponent } from './moneyrequest/moneyrequest.component';

const routing: Routes = [
  {path:'', component: AccountStatementComponent},
  {path:'distcomm', component: DistCommComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AccountStatementComponent,
    CommToWalletComponent,
    DistCommComponent,
    CreditmoneyComponent,
    WithdrawmoneyComponent,
    W2wComponent,
    MoneyrequestComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    LayoutModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountStatementModule { }
