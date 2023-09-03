import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from 'src/app/layout/layout.module';
import { RouterModule, Routes } from '@angular/router';
import { CreateMemberTypeComponent } from './create-member-type.component';

const routing: Routes = [
  {path:'', component: CreateMemberTypeComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    CreateMemberTypeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    LayoutModule
  ]
})
export class CreateMemberTypeModule { }
