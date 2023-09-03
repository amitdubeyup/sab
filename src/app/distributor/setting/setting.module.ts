import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AxisBankComponent } from './axis-bank/axis-bank.component';
import { BankingPointComponent } from './banking-point/banking-point.component';
import { DownloadComponent } from './download/download.component';
import { EssentialServicesComponent } from './essential-services/essential-services.component';
import { MpinComponent } from './mpin/mpin.component';
import { PasswordComponent } from './password/password.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from 'src/app/layout/layout.module';

const routing: Routes = [
  { path: 'passwordchange', component: PasswordComponent },
  { path: 'mpinchange', component: MpinComponent },
  { path: 'axisbanksliep', component: AxisBankComponent },
  { path: 'banking-point', component: BankingPointComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    AxisBankComponent,
    BankingPointComponent,
    DownloadComponent,
    EssentialServicesComponent,
    MpinComponent,
    PasswordComponent
  ],
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
export class SettingModule { }
