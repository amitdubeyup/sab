import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DistributorComponent } from './distributor.component';
import { LayoutModule } from '../layout/layout.module';

const routing: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DistributorComponent
  },
  {
    path: 'create-member',
    loadChildren: () => import('./create-member/create-member.module').then(m => m.CreateMemberModule)
  },
  {
    path: 'kyc-details',
    loadChildren: () => import('./kyc-details/kyc-details.module').then(m => m.KycDetailsModule)
  },
  {
    path: 'member-details',
    loadChildren: () => import('./member-details/member-details.module').then(m => m.MemberDetailsModule)
  },
  {
    path: 'user-details',
    loadChildren: () => import('./user-details/user-details.module').then(m => m.UserDetailsModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule)
  },
  {
    path: 'account-statement',
    loadChildren: () => import('./account-statement/account-statement.module').then(m => m.AccountStatementModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./retailer-statement/retailer-statement.module').then(m => m.RetailerModule)
  },
  {
    path: 'money-request',
    loadChildren: () => import('./fund-request/fund-request.module').then(m => m.FundRequestModule)
  },
  {
    path: 'fund-manage',
    loadChildren: () => import('./balance-manager/balance-manager.module').then(m => m.BalanceManagerModule)
  },
  {
    path: 'wallet-to-wallet',
    loadChildren: () => import('./wallet-to-wallet/wallet-to-wallet.module').then(m => m.WalletToWalletModule)
  },
  {
    path: 'profile-details',
    loadChildren: () => import('./profile-details/profile-details.module').then(m => m.ProfileDetailsModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule)
  },
  {
    path: 'transaction-report',
    loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule)
  },
  // {
  //   path: 'contact-us',
  //   loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsModule)
  // },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    LayoutModule
  ],
  declarations: [
    DistributorComponent
  ],
  exports: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DistributorModule { }
