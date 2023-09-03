import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeneficiaryComponent } from './beneficiary.component';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { LayoutModule } from 'src/app/layout/layout.module';

const routing: Routes = [
  { path: '', component: BeneficiaryComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  {
    path: 'receipt',
    loadChildren: () => import('./receipt/receipt.module').then(m => m.ReceiptModule)
  },
  {
    path: 'addbene',
    loadChildren: () => import('./beneficiary-add/beneficiary-add.module').then(m => m.BeneficiaryAddModule)
  },
  {
    path: 'importbene',
    loadChildren: () => import('./beneficiary-import/beneficiary-import.module').then(m => m.BeneficiaryImportModule)
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    BeneficiaryComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    LayoutModule
  ],
  exports: [
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BeneficiaryModule { }
