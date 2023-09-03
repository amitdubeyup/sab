import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-commission-recharge',
  templateUrl: './commission-recharge.component.html',
  styleUrls: ['./commission-recharge.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CommissionRechargeComponent implements OnInit {
  mbType: any = {};
  userList: any;
  respData: any;
  respApi: any;
  loading = false;
  CommissionTypeList: any;
  uuid: any;
  isstutas = '';
  isloder = false;
  TempltData: any;
  isModel: boolean=false;
  constructor(public commonService:ApiService, public sharedMethod: SharedMethodService, public route: ActivatedRoute, public router: Router) {


  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.uuid = params.uuid;
    });

    this.CommissionTypeList = this.sharedMethod.CommissionType();
    if (this.uuid !== undefined && this.uuid !== '') {
      this.isstutas = 'ID';
      this.GetMemberType(this.uuid);
    }
    else {
      this.isstutas = 'all';
      this.GetMemberType('');
    }

  }

  getapiDesc(st: any): void {
    return this.CommissionTypeList.find((e: any) => e.code === st)?.desc;
  }

  GetMemberType(uid: any): void {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.isLoader = true;
      this.commonService.getAuth('servicemanager/get-commission-template-det?uuid=' + uid + '&docType=all&isstutas=' + this.isstutas)
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.respData = res.respData;
            }
          },
          (err: any) => {
            this.commonService.isLoader = false;
            if (err.status === 0) {
              this.router.navigateByUrl('signin');
            }
          });
    }
  }
  onSubmit(): void {
    let Url = 'servicemanager/add-commission-template';
    if (this.isstutas === 'ID') {
      Url = 'servicemanager/upd-commission-template';
    }
    else {
      Url = 'servicemanager/add-commission-template';
    }
    this.isloder = true;
    this.commonService.postAuth(Url, JSON.stringify(this.respData)).subscribe((res: any) => {
      this.isloder = false;
      if (res.isSuccess) {
        Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigateByUrl('administrator/template-master');
          }
        });
      }
      else {
        Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
    },
      (err: any) => {
        this.isloder = false;
        if (err.message) {
        }
      });
  }
  deleteRow(index:any,cp:any) {
    console.log(cp);
    let dataPost={
      tid:this.uuid,
      cid:cp.cmtId
    }
    console.log(dataPost);
    this.commonService.postAuth("services/delete-commision-template", JSON.stringify(dataPost)).subscribe((res: any) => {
      this.isloder = false;
      if (res.isSuccess) {
        Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' }).then((result) => {
          if (result.isConfirmed) {
            this.respData?.commissionTemplate.splice(index, 1);  
            if (this.uuid !== undefined && this.uuid !== '') {
              this.isstutas = 'ID';
              this.GetMemberType(this.uuid);
            }
            else {
              this.isstutas = 'all';
              this.GetMemberType('');
            }
          }
        });
      }
      else {
        Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
    },
      (err: any) => {
        this.isloder = false;
        if (err.message) {
        }
      });
}
openForm(): any {
  if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
    this.commonService.isLoader = true;
    this.commonService.getAuth('servicemanager/get-commission-template-det?uuid=' + this.uuid + '&docType=all&isstutas=NEW')
      .subscribe(
        (res: any) => {
          this.commonService.isLoader = false;
          if (res.isSuccess) {
            this.TempltData = res.respData;
          }
        },
        (err: any) => {
          this.commonService.isLoader = false;
          if (err.status === 0) {
            this.router.navigateByUrl('signin');
          }
        });
  }
  this.isModel = true;
}
onSubmitAdd(): void {
  let Url = 'servicemanager/add-commission-template';
  if (this.isstutas === 'ID') {
    Url = 'servicemanager/upd-commission-template';
  }
  else {
    Url = 'servicemanager/add-commission-template';
  }
  this.isloder = true;
  this.commonService.postAuth(Url, JSON.stringify(this.respData)).subscribe((res: any) => {
    this.isloder = false;
    if (res.isSuccess) {
      Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' }).then((result) => {
        if (result.isConfirmed) {
          this.GetMemberType(this.uuid);
        }
      });
    }
    else {
      Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'OK' });
    }
  },
    (err: any) => {
      this.isloder = false;
      if (err.message) {
      }
    });
}
SelectData(data:any): any {
  if(this.respData?.commissionTemplate.find((e: any) => e.apiMid ===data.apiMid ))
  {
    this.isModel = false;
  }
  else
  {
  this.respData?.commissionTemplate.push(data);
  this.onSubmitAdd();
  this.isModel = false;

  }
};
}

