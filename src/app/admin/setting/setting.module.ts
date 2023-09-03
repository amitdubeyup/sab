import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordComponent } from './password/password.component';
import { MpinComponent } from './mpin/mpin.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from 'src/app/layout/layout.module';
import { ServicesComponent } from './services/services.component';

const routing: Routes = [
  { path: '', redirectTo: 'password',pathMatch: 'full' },
  { path: 'password', component: PasswordComponent },
  { path: 'mpin', component: MpinComponent },
  { path: 'api-right', component: ServicesComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [PasswordComponent, MpinComponent, ServicesComponent],
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
export class SettingModule { }
