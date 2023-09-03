import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectricityComponent } from './electricity/electricity.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from 'src/app/layout/layout.module';
import { GasComponent } from './gas/gas.component';
import { WaterComponent } from './water/water.component';
import { LicComponent } from './lic/lic.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { LandlineComponent } from './landline/landline.component';
import { BroadbandComponent } from './broadband/broadband.component';
import { GasCylinderComponent } from './gas-cylinder/gas-cylinder.component';
import { PartPaymentComponent } from './part-payment/part-payment.component';
import { FastagComponent } from './fastag/fastag.component';
import { ReceiptComponent } from './receipt/receipt.component';
const routing: Routes = [
  { path: '', component: ElectricityComponent},
  { path: 'receipt', component: ReceiptComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    ElectricityComponent,
    GasComponent,
    WaterComponent,
    LicComponent,
    InsuranceComponent,
    LandlineComponent,
    BroadbandComponent,
    GasCylinderComponent,
    PartPaymentComponent,
    FastagComponent,
    ReceiptComponent
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
export class BbpsModule { }
