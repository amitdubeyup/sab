import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { MdLayoutComponent } from './md-layout/md-layout.component';
import { DistributorLayoutComponent } from './distributor-layout/distributor-layout.component';
import { RetailerLayoutComponent } from './retailer-layout/retailer-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../services/ApiService.service';
import { DataService } from '../services/data.service';
import { ValidatorsService } from '../services/validators.service';
import { SharedMethodService } from '../services/shared-method.service';
import { AdminGuard } from '../guards/admin.guard';
import { DistributorGuard } from '../guards/distributor.guard';
import { RetailerGuard } from '../guards/retailer.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from '../interceptor/httpconfig.interceptor';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { AutocompleteOffDirective } from '../services/autocomplete-off.directive';
import { OnlyCharacter } from '../services/rt-charcater-only.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { ReplacePipe } from '../services/replace.pipe';
import { OnlyNumber } from '../services/rt-number-only.directive';
import { NumberCharDirective } from '../services/number-char.directive';
import { DebounceClickDirective } from '../services/app-debounce-click';
import { ExcelService } from '../services/excel.service';
import { UiSwitchModule } from 'ngx-ui-switch';
import { CarouselModule } from 'primeng/carousel';
import { NgChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [
    ReplacePipe,
    OnlyNumber,
    NumberCharDirective,
    OnlyCharacter,
    DebounceClickDirective,
    AdminLayoutComponent,
    MdLayoutComponent,
    DistributorLayoutComponent,
    RetailerLayoutComponent,
    AutocompleteOffDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    TableModule,
    UiSwitchModule,
    MatDialogModule,
    TooltipModule,
    CalendarModule,
    MultiSelectModule,
    TabViewModule,
    DropdownModule,
    CarouselModule,
    NgChartsModule 
  ],
  exports: [
    CommonModule,
    FormsModule,
    TableModule,
    NgSelectModule,
    ButtonModule,
    DialogModule,
    MatDialogModule,
    TooltipModule,
    CalendarModule,
    MultiSelectModule,
    CarouselModule,
    TabViewModule,
    UiSwitchModule,
    DropdownModule,
    ReactiveFormsModule,
    ReplacePipe,
    OnlyNumber,
    NumberCharDirective,
    OnlyCharacter,
    DebounceClickDirective,
    AdminLayoutComponent,
    MdLayoutComponent,
    DistributorLayoutComponent,
    RetailerLayoutComponent,
    AutocompleteOffDirective,
    NgChartsModule 
    
  ],
  providers: [ApiService, DataService, ValidatorsService, SharedMethodService, ExcelService, AdminGuard,DistributorGuard, RetailerGuard,{ provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutModule { }
