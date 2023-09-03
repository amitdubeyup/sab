import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from 'src/app/layout/layout.module';
import { PendingRefundComponent } from './pending-refund.component';

const routing: Routes = [
  { path: '', component: PendingRefundComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [PendingRefundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    // SharedModule,
    LayoutModule
  ],
  exports: [
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PendingRefundModule { }
