import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SenderComponent } from './sender/sender.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from 'src/app/layout/layout.module';
const routing: Routes = [
  { path: '', component: SenderComponent },
  {
    path: 'beneficiary',
    loadChildren: () => import('./beneficiary/beneficiary.module').then(m => m.BeneficiaryModule)
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }

];
@NgModule({
  declarations: [
    SenderComponent
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
export class MoneyTransfer1Module { }
