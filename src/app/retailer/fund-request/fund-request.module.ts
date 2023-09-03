import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FundRequestComponent } from './fund-request.component';
import { ImportComponent } from './import/import.component';
import { SuccessComponent } from './success/success.component';
import { PrintBoundComponent } from './print-bound/print-bound.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { NewRequestComponent } from './new-request/new-request.component';
const routing: Routes = [
  { path: '', component: FundRequestComponent },
  { path: 'newrequest', component: NewRequestComponent },
  { path: 'success', component: SuccessComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [FundRequestComponent, ImportComponent, SuccessComponent,PrintBoundComponent, NewRequestComponent],
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
export class FundRequestModule { }
