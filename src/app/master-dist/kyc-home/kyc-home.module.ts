import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from 'src/app/layout/layout.module';
import { RouterModule, Routes } from '@angular/router';
import { KycHomeComponent } from './kyc-home.component';

const routing: Routes = [
  { path: '', component: KycHomeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    KycHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    LayoutModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KycHomeModule { }
