import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MobileComponent } from './mobile/mobile.component';
import { StatusComponent } from './status/status.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { DthComponent } from './dth/dth.component';
const routing: Routes = [
  { path: '', component: MobileComponent},
  { path: 'mobile-rech', component: MobileComponent },
  { path: 'rech-status', component: StatusComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    MobileComponent,
    DthComponent,
    StatusComponent
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
export class RechargeModule { }
