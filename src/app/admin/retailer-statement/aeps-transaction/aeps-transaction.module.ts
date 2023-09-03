import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AepsTransactionComponent } from './aeps-transaction.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from 'src/app/layout/layout.module';
const routing: Routes = [
  { path: '', component: AepsTransactionComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];


@NgModule({
  declarations: [AepsTransactionComponent],
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
export class AepsTransactionModule { }
