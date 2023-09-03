import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankManagerComponent } from './bank-manager.component';
import { RouterModule, Routes } from '@angular/router';
import { AccWhitelistedComponent } from './acc-whitelisted/acc-whitelisted.component';
import { LayoutModule } from 'src/app/layout/layout.module';
const routing: Routes = [
  { path: '', component: BankManagerComponent },
  { path: 'acc-whitelisted', component: AccWhitelistedComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];


@NgModule({
  declarations: [BankManagerComponent, AccWhitelistedComponent],
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
export class BankManagerModule { }
