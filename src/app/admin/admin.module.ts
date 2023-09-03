import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { MemberTemplateEditComponent } from './member-template-edit/member-template-edit.component';
import { LayoutModule } from '../layout/layout.module';

const routing: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: AdminComponent
  },
  {
    path: 'add-user',
    loadChildren: () => import('./create-member/create-member.module').then(m => m.CreateMemberModule)
  },
  {
    path: 'user-type',
    loadChildren: () => import('./add-member-type/add-member-type.module').then(m => m.AddMemberTypeModule)
  },
  {
    path: 'user-list',
    loadChildren: () => import('./user-details/user-details.module').then(m => m.UserDetailsModule)
  },
  {
    path: 'user-edit',
    loadChildren: () => import('./user-edit/user-edit.module').then(m => m.UserEditModule)
  },
  {
    path: 'user-right',
    loadChildren: () => import('./user-privilege/user-privilege.module').then(m => m.UserPrivilegeModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule)
  },
 
  {
    path: 'credit-money',
    loadChildren: () => import('./balance-manager/balance-manager.module').then(m => m.BalanceManagerModule)
  },
  {
    path: 'aeps-service-manager',
    loadChildren: () => import('./aeps-service-manager/aeps-service-manager.module').then(m => m.AepsServiceManagerModule)
  },
  {
    path: 'cms-service-manager',
    loadChildren: () => import('./cms-service-manager/cms-service-manager.module').then(m => m.CmsServiceManagerModule)
  },
  {
    path: 'bank-list',
    loadChildren: () => import('./bank-manager/bank-manager.module').then(m => m.BankManagerModule)
  },
  {
    path: 'providers',
    loadChildren: () => import('./oprators/oprators.module').then(m => m.OpratorsModule)
  },
  {
    path: 'bbps-service-manager',
    loadChildren: () => import('./bbps-service-manager/bbps-service-manager.module').then(m => m.BbpsServiceManagerModule)
  },
  {
    path: 'commission-aeps',
    loadChildren: () => import('./commission-aeps/commission-aeps.module').then(m => m.CommissionAepsModule)
  },
  {
    path: 'commission-bbps',
    loadChildren: () => import('./commission-bbps/commission-bbps.module').then(m => m.CommissionBbpsModule)
  },
  {
    path: 'commission-cms',
    loadChildren: () => import('./commission-cms/commission-cms.module').then(m => m.CommissionCmsModule)
  },
  {
    path: 'commission-dmt',
    loadChildren: () => import('./commission-dmt/commission-dmt.module').then(m => m.CommissionDmtModule)
  },
  {
    path: 'commission-vendor',
    loadChildren: () => import('./commission-vendor/commission-vendor.module').then(m => m.CommissionVendorModule)
  },
  {
    path: 'commission-recharge',
    loadChildren: () => import('./commission-recharge/commission-recharge.module').then(m => m.CommissionRechargeModule)
  },
  {
    path: 'create-member',
    loadChildren: () => import('./create-member/create-member.module').then(m => m.CreateMemberModule)
  },
  {
    path: 'create-member-type',
    loadChildren: () => import('./create-member-type/create-member-type.module').then(m => m.CreateMemberTypeModule)
  },
  {
    path: 'cashing-bank',
    loadChildren: () => import('./deposite-bank-manager/deposite-bank-manager.module').then(m => m.DepositeBankManagerModule)
  },
  {
    path: 'pg-list',
    loadChildren: () => import('./pg-manager/pg-manager.module').then(m => m.PgManagerModule)
  },
  {
    path: 'dmt-service-manager',
    loadChildren: () => import('./dmt-service-manager/dmt-service-manager.module').then(m => m.DmtServiceManagerModule)
  },
  {
    path: 'vendor-service-manager',
    loadChildren: () => import('./vendor-service-manager/vendor-service-manager.module').then(m => m.VendorServiceManagerModule)
  },
  {
    path: 'cashing-request',
    loadChildren: () => import('./fund-request/fund-request.module').then(m => m.FundRequestModule)
  },
  {
    path: 'pg-cash-request',
    loadChildren: () => import('./fund-request/fund-request.module').then(m => m.FundRequestModule)
  },
  {
    path: 'kycdetails',
    loadChildren: () => import('./kyc-details/kyc-details.module').then(m => m.KycDetailsModule)
  },
  {
    path: 'kycapproved',
    loadChildren: () => import('./kyc-details-approve/kyc-details-approve.module').then(m => m.KycDetailsApproveModule)
  },
  {
    path: 'kyclist',
    loadChildren: () => import('./kyc-home/kyc-home.module').then(m => m.KycHomeModule)
  },
  {
    path: 'product-list',
    loadChildren: () => import('./service-manager/service-manager.module').then(m => m.ServiceManagerModule)
  }, 
  {
    path: 'template-master',
    loadChildren: () => import('./template-master/template-master.module').then(m => m.TemplateMasterModule)
  },

  {
    path: 'reports',
    loadChildren: () => import('./statement/statement.module').then(m => m.StatementModule)
  },
  {
    path: 'retailer-report',
    loadChildren: () => import('./retailer-statement/retailer-statement.module').then(m => m.RetailerStatementModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./profile-details/profile-details.module').then(m => m.ProfileDetailsModule)
  },
  {
    path: 'user-setting',
    loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule)
  },
  {
    path: 'oprators',
    loadChildren: () => import('./oprators/oprators.module').then(m => m.OpratorsModule)
  },
  
  {
    path: 'off-line-bill',
    loadChildren: () => import('./off-line-bill/off-line-bill.module').then(m => m.OffLineBillModule)
  },
  {
    path: 'pg-manager',
    loadChildren: () => import('./pg-manager/pg-manager.module').then(m => m.PgManagerModule)
  },
  {
    path: 'service-list',
    loadChildren: () => import('./wallet-service-manager/wallet-service-manager.module').then(m => m.WalletServiceManagerModule)
  },
  {
    path: 'travel-service-manager',
    loadChildren: () => import('./travel-service-manager/travel-service-manager.module').then(m => m.TravelServiceManagerModule)
  },
  {
    path: 'bbps-live-service-manager',
    loadChildren: () => import('./bbps-live-service-manager/bbps-live-service-manager.module').then(m => m.BbpsLiveServiceManagerModule)
  },
  {
    path: 'commission-travel',
    loadChildren: () => import('./commission-travel/commission-travel.module').then(m => m.CommissionTravelModule)
  },
  {
    path: 'commission-bbps-live',
    loadChildren: () => import('./commission-bbps-live/commission-bbps-live.module').then(m => m.CommissionBbpsLiveModule)
  },
  {
    path: 'upi-payout-service',
    loadChildren: () => import('./upi-payout-service/upi-payout-service.module').then(m => m.UpiPayoutServiceModule)
  },
  {
    path: 'cdm-list',
    loadChildren: () =>import('./cdm-manager/cdm-manager.module').then(m => m.CdmManagerModule)
  },
  {
    path: 'commission-kyc',
    loadChildren: () => import('./commission-kyc/commission-kyc.module').then(m => m.CommissionKycModule)
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    LayoutModule
  ],
  declarations: [
    AdminComponent,
    MemberTemplateEditComponent

  ],
  exports: [
    MemberTemplateEditComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AdminModule { }
