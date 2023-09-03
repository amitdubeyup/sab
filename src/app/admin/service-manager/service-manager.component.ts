import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-manager',
  templateUrl: './service-manager.component.html',
  styleUrls: ['./service-manager.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ServiceManagerComponent implements OnInit {
  mbType: any = {};
  userList: any;
  respData: any;
  walletList: any = [];
  RateTypeList: any;
  loading = false;
  isModel = false;
  isUpdate = false;
  serviceData: any = {};
  categoryList = [
    { code: 'Prepaid-Airtel', desc: 'Prepaid Airtel' },
    { code: 'Postpaid-Airtel', desc: 'Postpaid Airtel' },
    { code: 'Prepaid-BSNL', desc: 'Prepaid BSNL' },
    { code: 'Postpaid-BSNL', desc: 'Postpaid BSNL' },
    { code: 'Prepaid-BSNL-STV', desc: 'Prepaid BSNL STV' },
    { code: 'Postpaid-BSNL-STV', desc: 'Postpaid BSNL STV' },
    { code: 'Prepaid-Vodafone', desc: 'Prepaid Vi' },
    { code: 'Postpaid-Vodafone', desc: 'Postpaid Vi' },
    { code: 'Prepaid-Jio', desc: 'Prepaid Jio' },
    { code: 'Postpaid-Jio', desc: 'Postpaid Jio' },
    { code: 'Airtel-DTH', desc: 'Airtel DTH' },
    { code: 'Dish-TV', desc: 'Dish TV' },
    { code: 'Sun-Direct-TV', desc: 'Sun Direct TV' },
    { code: 'Tata-Sky', desc: 'Tata Sky' },
    { code: 'Videocon-D2H', desc: 'Videocon D2H' },

  ]
  constructor(public commonService:ApiService, public sharedMethod: SharedMethodService, public route: ActivatedRoute, public router: Router) {
  }

  ngOnInit(): void {
    this.RateTypeList = this.sharedMethod.CommissionType();
    this.GetApiMember();
    this.GetMemberType();
  }
  ServiceLink(type: any): any {
    this.router.navigate(['/administrator/dmt-service-manager'],{ queryParams: { type: type} });

  }
  GetApiMember(): any {
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

  GetMemberType(): any {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('servicemanager/get-service-manager?mid=&docType=RECH')
        .subscribe(
          (res: any) => {
            // console.log(res);
            if (res.isSuccess) {
              this.respData = res.respData;
            }
          },
          (err: any) => {
            // console.log(err);
            if (err.status === 0) {
              this.router.navigateByUrl('signin');
            }
          });
    }
  }

  updatePriorityOne(event: any): any {
    this.walletList.forEach((element: any) => {
      if ((element.apiId).toString() === (event.target.value).toString()) {
        this.serviceData.apiServiceName = element.apiName;
      }
    });
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
    // console.log(this.serviceData);
    this.toggleModal();
    this.commonService.isLoader = true;
    this.serviceData.apiType = 'RECH';
    this.serviceData.apiOnOff = (this.serviceData.apiOnOff === 'true') ? true : false;
    this.commonService.postAuth('servicemanager/SaveApiManager', JSON.stringify(this.serviceData)).subscribe((res: any) => {
      // console.log(res);
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
        // console.log(err);
        this.commonService.isLoader = false;
        if (err.message) {
          Swal.fire({ icon: 'warning', text: err.message, confirmButtonText: 'OK' });
        }
      });
  }

  updateService(serviceData: any): any {
    // console.log(serviceData);
    this.commonService.isLoader = true;
    this.commonService.postAuth('servicemanager/upd-service-manager', JSON.stringify(serviceData)).subscribe((res: any) => {
      // console.log(res);
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
        // console.log(err);
        this.commonService.isLoader = false;
        if (err.message) {
          Swal.fire({ icon: 'warning', text: err.message, confirmButtonText: 'OK' });
        }
      });
  }
}
