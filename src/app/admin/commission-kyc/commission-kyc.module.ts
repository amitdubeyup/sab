import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommissionKycComponent } from './commission-kyc.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from 'src/app/layout/layout.module';

const routing: Routes = [
  { path: '', component: CommissionKycComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    CommissionKycComponent,
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

export class CommissionKycModule { }
