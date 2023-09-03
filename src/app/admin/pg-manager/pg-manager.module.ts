import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PgManagerComponent } from './pg-manager.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from 'src/app/layout/layout.module';
const routing: Routes = [
  { path: '', component: PgManagerComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];


@NgModule({
  declarations: [PgManagerComponent],
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
export class PgManagerModule { }
