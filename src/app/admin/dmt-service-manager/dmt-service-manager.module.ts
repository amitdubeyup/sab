import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
;
import { DmtServiceManagerComponent } from './dmt-service-manager.component';
import { LayoutModule } from 'src/app/layout/layout.module';

const routing: Routes = [
  { path: '', component: DmtServiceManagerComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    DmtServiceManagerComponent,
  ],
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
export class DmtServiceManagerModule { }
