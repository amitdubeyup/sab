import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';
import { BusinessSummaryComponent } from './business-summary/business-summary.component';


const routing: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'business_summary',
    component: BusinessSummaryComponent
  },
  {
    path: 'money-transfer',
    loadChildren: () => import('./money-transfer1/money-transfer1.module').then(m => m.MoneyTransfer1Module)
  },
  {
    path: 'merchant-transfer',
    loadChildren: () => import('./merchant-pay/merchant-pay.module').then(m => m.MerchantPayModule)
  },
  {
    path: 'transaction-list',
    loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule)
  },
  {
    path: 'account-list',
    loadChildren: () => import('./account-statement/account-statement.module').then(m => m.AccountStatementModule)
  },
  {
    path: 'money-request',
    loadChildren: () => import('./fund-request/fund-request.module').then(m => m.FundRequestModule)
  },
  {
    path: 'pendingrefund',
    loadChildren: () => import('./pending-refund/pending-refund.module').then(m => m.PendingRefundModule)
  },
  {
    path: 'mobilerecharge',
    loadChildren: () => import('./recharge/recharge.module').then(m => m.RechargeModule)
  },
  {
    path: 'bbps',
    loadChildren: () => import('./bbps/bbps.module').then(m => m.BbpsModule)
  },
  {
    path: 'bbpsonline',
    loadChildren: () => import('./bbps-online/bbps-online.module').then(m => m.BbpsOnlineModule)
  },
  {
    path: 'aeps-report',
    loadChildren: () => import('./aeps-transaction/aeps-transaction.module').then(m => m.AepsTransactionModule)
  },
  {
    path: 'wallet-to-wallet',
    loadChildren: () => import('./wallet-to-wallet/wallet-to-wallet.module').then(m => m.WalletToWalletModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile-details/profile-details.module').then(m => m.ProfileDetailsModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule)
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    LayoutModule
  ],
  declarations: [
    DashboardComponent,
    BusinessSummaryComponent
  ],
  exports: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RetailerModule { }
