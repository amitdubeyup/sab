import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
;
import { UserDetailsComponent } from './user-details.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { AepsOnboardingComponent } from './aeps-onboarding/aeps-onboarding.component';

const routing: Routes = [
  { path: '', component: UserDetailsComponent },
  { path: 'aepsonboarding', component: AepsOnboardingComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
@NgModule({
  declarations: [
    UserDetailsComponent,
    AepsOnboardingComponent,
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
export class UserDetailsModule { }
