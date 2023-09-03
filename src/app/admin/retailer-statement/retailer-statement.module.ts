import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from 'src/app/layout/layout.module';

const routing: Routes = [
  { path: '', redirectTo: 'transaction', pathMatch: 'full' },
  {
    path: 'transaction',
    loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule)
  },
  {
    path: 'account-statement',
    loadChildren: () => import('./account-statement/account-statement.module').then(m => m.AccountStatementModule)
  },
  {
    path: 'complaint',
    loadChildren: () => import('./complaint/complaint.module').then(m => m.ComplaintModule)
  },
  {
    path: 'refund-pending',
    loadChildren: () => import('./refund-pending/refund-pending.module').then(m => m.RefundPendingModule)
  },
  {
    path: 'aeps-transaction',
    loadChildren: () => import('./aeps-transaction/aeps-transaction.module').then(m => m.AepsTransactionModule)
  },
  {
    path: 'aeps-beneficiary',
    loadChildren: () => import('./aeps-beneficiary/aeps-beneficiary.module').then(m => m.AepsBeneficiaryModule)
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
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
export class RetailerStatementModule { }
