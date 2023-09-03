import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AepsTransactionComponent } from './aeps-transaction.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from 'src/app/layout/layout.module';
import { AepsStatementComponent } from './aeps-statement/aeps-statement.component';
const routing: Routes = [
  { path: '', component: AepsTransactionComponent },
  { path: 'statement', component: AepsStatementComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];


@NgModule({
  declarations: [AepsTransactionComponent, AepsStatementComponent],
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
