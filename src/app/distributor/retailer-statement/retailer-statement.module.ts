import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from 'src/app/layout/layout.module';
import { RouterModule, Routes } from '@angular/router';
import { RechargeUtilityComponent } from './recharge-utility/recharge-utility.component';

const routing: Routes = [
  {
    path: 'money-transaction',
    loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule)
  },
  {
    path: 'account-statement',
    loadChildren: () => import('./account-statement/account-statement.module').then(m => m.AccountStatementModule)
  },
  { path: 'recharge-utility', component: RechargeUtilityComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [  
    RechargeUtilityComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    LayoutModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RetailerModule { }
