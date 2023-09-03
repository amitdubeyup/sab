import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dmt-service-manager',
  templateUrl: './dmt-service-manager.component.html',
  styleUrls: ['./dmt-service-manager.component.css']
})
export class DmtServiceManagerComponent implements OnInit {
  mbType: any = {};
  userList: any;
  respData: any;
  walletList: any;
  RateTypeList: any;
  isModel = false;
  isUpdate = false;
  serviceData: any = {};
  type:any="DMT";
  isPipeModel=false;
  payubankpipe="";

  constructor(public commonService:ApiService, public sharedMethod: SharedMethodService, public route: ActivatedRoute, public router: Router) {
   

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.type = params.type;
      if(this.type)
      {
      this.GetApiMember();
      this.GetMemberType();
      }
    });
    this.RateTypeList = this.sharedMethod.CommissionType();
    this.payubankpipe="1";
  
  }
  GetApiMember(): any {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('servicemanager/get-api-service?mid=&docType=DM')
        .subscribe(
          (res: any) => {
            if (res.isSuccess) {
              this.walletList = res.respData;
            }
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
          });
    }
  }

  GetMemberType(): any {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('servicemanager/get-service-manager?mid=&docType='+this.type)
        .subscribe(
          (res: any) => {
            console.log(res);
            if (res.isSuccess) {
              this.respData = res.respData;
            }
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
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

  togglePipeModal(): any {
    this.isPipeModel = !this.isPipeModel;
  }

  addService(): any {
    console.log(this.serviceData);
    this.toggleModal();
    this.commonService.isLoader = true;
    this.serviceData.apiType = this.type;
    this.serviceData.apiOnOff = (this.serviceData.apiOnOff === 'true') ? true : false;
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
        Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
        
        });
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

  setBankPipe():any {
    this.togglePipeModal();    
    this.commonService.isLoader = true;

    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {     
      this.commonService.getAuth('health/setpriorities?udf1='+this.payubankpipe)
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'OK' });
            }
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
          });
    }
  }

  ServiceLink(type: any): any {
    this.router.navigate(['/administrator/dmt-service-manager'], { queryParams: { type: type} });
  }
 
}
