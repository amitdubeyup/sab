import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/services/ApiService.service';

@Component({
  selector: 'app-api-service',
  templateUrl: './api-service.component.html',
  styleUrls: ['./api-service.component.css']
})
export class ApiServiceComponent implements OnInit {

  mbType: any = {};
  userList: any;
  respData: any;
  loading = false;
  RateTypeList: any;

  isModel = false;
  isUpdate = false;
  serviceData: any = {};

  constructor(public sharedMethod: SharedMethodService, public commonService:ApiService, public route: ActivatedRoute, public router: Router) {
  }

  ngOnInit(): void {
    this.RateTypeList = this.sharedMethod.CommissionType();
    this.GetApiMember();
  }

  public GetApiMember(): any {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('services/get-services?memberId='+this.commonService.userPram.userId+'&docType=List')
        .subscribe(
          (res: any) => {
            if (res.isSuccess) {
              this.respData = res.respData;
              console.log(this.respData);
            }
          },
          (err: any) => {
            if (err.status === 0) {
              this.router.navigateByUrl('signin');
            }
          });
    }
  }


  getapiDescRate(st: any): any {
    if (st) {
      return this.RateTypeList.find((e: any) => e.code === st)?.desc;
    }
    return;
  }


  openForm(): any {
    this.isUpdate = false;
    this.serviceData = {};
    this.toggleModal();
  }

  toggleModal(): any {
    this.isModel = !this.isModel;
  }

  addService(): any {
    console.log(this.serviceData);
    this.toggleModal();
    this.commonService.isLoader = true;
    this.serviceData.apiType = 'BBPS';
    this.serviceData.apiOnOff = (this.serviceData.apiOnOff === 'true') ? true : false;
    this.serviceData.apiOnline = (this.serviceData.apiOnline === 'true') ? true : false;
    this.commonService.postAuth('servicemanager/SaveApiManager', JSON.stringify(this.serviceData)).subscribe((res: any) => {
      console.log(res);
      this.commonService.isLoader = false;
      this.GetApiMember();
      if (res.isSuccess) {
        Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
      else {
        Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
    },
      (err: any) => {
        console.log(err);
        this.commonService.isLoader = false;
        if (err.message) {
          Swal.fire({ icon: 'warning', text: err.message, confirmButtonText: 'OK' });
        }
      });
  }

  updateService(serviceData: any): any {
    console.log(serviceData);
    this.commonService.isLoader = true;
    this.commonService.postAuth('services/update-services-priority', JSON.stringify(serviceData)).subscribe((res: any) => {
      console.log(res);
      this.commonService.isLoader = false;
      this.GetApiMember();
      if (res.isSuccess) {
        Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
      else {
        Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
    },
      (err: any) => {
        console.log(err);
        this.commonService.isLoader = false;
        if (err.message) {
          Swal.fire({ icon: 'warning', text: err.message, confirmButtonText: 'OK' });
        }
      });
  }
}
