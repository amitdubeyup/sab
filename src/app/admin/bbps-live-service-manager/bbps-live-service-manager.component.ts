import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/services/ApiService.service';

@Component({
  selector: 'app-bbps-live-service-manager',
  templateUrl: './bbps-live-service-manager.component.html',
  styleUrls: ['./bbps-live-service-manager.component.css']
})
export class BbpsLiveServiceManagerComponent implements OnInit {
  mbType: any = {};
  userList: any;
  respData: any;
  walletList: any;
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
    this.GetMemberType();
  }

  public GetApiMember(): any {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('servicemanager/get-api-service?mid=&docType=RE')
        .subscribe(
          (res: any) => {
            if (res.isSuccess) {
              this.walletList = res.respData;
            }
          },
          (err: any) => {
            if (err.status === 0) {
              this.router.navigateByUrl('signin');
            }
          });
    }
  }

  GetMemberType(): any {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('servicemanager/get-service-manager?mid=&docType=BBPS-LIVE')
        .subscribe(
          (res: any) => {
            console.log(res);
            if (res.isSuccess) {
              this.respData = res.respData;
            }
          },
          (err: any) => {
            console.log(err);
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

  getapiDesc(st: any): any {
    if (st) {
      const plan: any = this.walletList;
      if (plan) {
        return plan.find((e: any) => e.apiId === st)?.apiName;
      }
      return;
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
    this.serviceData.apiType = 'BBPS-LIVE';
    this.serviceData.apiOnOff = (this.serviceData.apiOnOff === 'true') ? true : false;
    this.serviceData.apiOnline = (this.serviceData.apiOnline === 'true') ? true : false;
    this.commonService.postAuth('servicemanager/SaveApiManager', JSON.stringify(this.serviceData)).subscribe((res: any) => {
      console.log(res);
      this.commonService.isLoader = false;
      this.GetApiMember();
      this.GetMemberType();
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
    this.commonService.postAuth('servicemanager/upd-service-manager', JSON.stringify(serviceData)).subscribe((res: any) => {
      console.log(res);
      this.commonService.isLoader = false;
      this.GetApiMember();
      this.GetMemberType();
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
