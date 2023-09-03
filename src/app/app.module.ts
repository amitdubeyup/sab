import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RetailerGuard } from './guards/retailer.guard';
import { LayoutModule } from './layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminGuard } from './guards/admin.guard';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DistributorGuard } from './guards/distributor.guard';
import { MdGuard } from './guards/md.guard';
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    loadChildren: () => import('./sign/sign.module').then(m => m.SignModule)
  },
  {
    path: 'merchant',
    canActivate: [RetailerGuard],
    loadChildren: () => import('./retailer/retailer.module').then(m => m.RetailerModule)
  },
  {
    path: 'administrator',
    canActivate: [AdminGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'ds',
    canActivate: [DistributorGuard],
    loadChildren: () => import('./distributor/distributor.module').then(m => m.DistributorModule)
  },
  {
    path: 'master-dist',
    canActivate: [MdGuard],
    loadChildren: () => import('./master-dist/master-dist.module').then(m => m.MasterDistModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
