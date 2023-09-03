import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuSummaryComponent } from './bu-summary/bu-summary.component';
import { VirtualAccountComponent } from './virtual-account/virtual-account.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { RouterModule, Routes } from '@angular/router';
import { TransactionComponent } from './transaction.component';

const routing: Routes = [
  {path:'', component: TransactionComponent},
  {
    path: 'business-summary',
    component: BuSummaryComponent
  },
  {
    path: 'vpa-statement',
    component: VirtualAccountComponent
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    TransactionComponent,
    BuSummaryComponent,
    VirtualAccountComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    LayoutModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TransactionModule { }
