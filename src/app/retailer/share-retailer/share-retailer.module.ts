import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { UiSwitchModule } from 'ngx-ui-switch';
import { MatDialogModule } from '@angular/material/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { BankButtonComponent } from './bank-button/bank-button.component';



@NgModule({
  declarations: [BankButtonComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    HttpClientModule,
    TableModule,
    UiSwitchModule,
    MatDialogModule,
    TooltipModule,
    CalendarModule,
    MultiSelectModule,
    TabViewModule,
    DropdownModule,
  ],
  exports: [
    BankButtonComponent,
    ],
})
export class ShareRetailerModule { }
