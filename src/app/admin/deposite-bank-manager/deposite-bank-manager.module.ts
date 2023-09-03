import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepositeBankManagerComponent } from './deposite-bank-manager.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from 'src/app/layout/layout.module';
const routing: Routes = [
  { path: '', component: DepositeBankManagerComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];



@NgModule({
  declarations: [DepositeBankManagerComponent],
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
export class DepositeBankManagerModule { }
