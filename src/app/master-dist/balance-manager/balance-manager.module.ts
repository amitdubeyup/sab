import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from 'src/app/layout/layout.module';
import { BalanceManagerComponent } from './balance-manager.component';
import { WithdrawMoneyComponent } from './withdraw-money/withdraw-money.component';

const routing: Routes = [
  { path: '', component: BalanceManagerComponent },
  {path:'fundwithdrawal', component: WithdrawMoneyComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    BalanceManagerComponent,
    WithdrawMoneyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    LayoutModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BalanceManagerModule { }
