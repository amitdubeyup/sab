import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/services/ApiService.service';

@Component({
  selector: 'app-cdm-manager',
  templateUrl: './cdm-manager.component.html',
  styleUrls: ['./cdm-manager.component.css'],
})
export class CdmManagerComponent implements OnInit {
  cdmModal: any = {};

  cdmList: any;

  constructor(
    public commonService:ApiService,
    public sharedService: SharedMethodService,
    public route: ActivatedRoute,
    public router: Router,
    public location: Location
  ) {}

  ngOnInit(): void {}

  goBack(): any {
    this.location.back();
  }

  submit(): any {
    if (this.cdmModal.card_number != '' && this.cdmModal.card_number) {
      const passingData = {
        CardNumber: this.cdmModal.card_number,
        MobileNumber: this.cdmModal.mobile_number,
        CardAgent_Id: this.cdmModal.agent_id,
      };
      this.commonService.isLoader = true;
      this.commonService
        .postAuth(`cdm/add-cdm-detail`, JSON.stringify(passingData))
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.cdmList = res.data;
              Swal.fire({
                icon: 'success',
                text: res.mhOutcome,
                confirmButtonText: 'OK',
              });
            } else {
              this.cdmList = res.data;
              Swal.fire({
                icon: 'warning',
                text: res.mhOutcome,
                confirmButtonText: 'OK',
              });
            }
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
            this.commonService.displayToaster(
              'something went wrong',
              'error'
            );
          }
        );
    } else {
      Swal.fire({
        icon: 'warning',
        text: 'Credit card number is required.',
        confirmButtonText: 'OK',
      });
    }

    console.log('Testing.');
  }

  fetchCdmDetails(): any {
    if (this.cdmModal.card_number != '' && this.cdmModal.card_number) {
      this.commonService.isLoader = true;
      this.commonService
        .getAuth(`cdm/get-cdm-search?searchParam=` + this.cdmModal.card_number)
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.cdmList = res.data;

              Swal.fire({
                icon: 'success',
                text: res.mhOutcome,
                confirmButtonText: 'OK',
              });
            } else {
              Swal.fire({
                icon: 'warning',
                text: res.mhOutcome,
                confirmButtonText: 'OK',
              });
            }
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
            this.commonService.displayToaster(
              'something went wrong',
              'error'
            );
          }
        );
    } else {
      Swal.fire({
        icon: 'warning',
        text: 'Axis card number is required.',
        confirmButtonText: 'OK',
      });
    }
  }
}
