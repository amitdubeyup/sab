import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
;
import { UserPrivilegeComponent } from './user-privilege.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { UserRightComponent } from './user-right/user-right.component';

const routing: Routes = [
  { path: '', component: UserPrivilegeComponent },
  { path: 'user-right', component: UserRightComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    UserPrivilegeComponent,
    UserRightComponent
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
export class UserPrivilegeModule { }
