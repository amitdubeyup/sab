import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-commission-cms',
  templateUrl: './commission-cms.component.html',
  styleUrls: ['./commission-cms.component.css']
})
export class CommissionCmsComponent implements OnInit {

  mbType: any = {};
  userList: any;
  respData: any;
  respApi: any;
  loading: boolean = false;
  CommissionTypeList: any;
  uuid: any;
  isstutas: string = "";
  isloder: boolean = false;
  isModel = false;
  TempltData: any;
  constructor(public commonService:ApiService, public sharedMethod: SharedMethodService, public route: ActivatedRoute, public router: Router) {


  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.uuid = params['uuid'];
    });
    this.CommissionTypeList = this.sharedMethod.CommissionType();
    if (this.uuid != undefined && this.uuid != "") {
      this.isstutas = "ID";
      this.GetMemberType(this.uuid);
    }
    else {
      this.isstutas = "";
      this.GetMemberType("");
    }
  }
  openForm(): any {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.isLoader = true;
      this.commonService.getAuth('servicemanager/get-commission-template-det?uuid=' + this.uuid + '&docType=CMS&isstutas=NEW')
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
  getapiDesc(st: any) {
    return this.CommissionTypeList.find((e: any) => e.code === st)?.desc;
  }
  SelectData(data:any): any {
    if(this.respData?.commissionTemplate.find((e: any) => e.apiMid ===data.apiMid ))
    {
      this.isModel = false;
    }
    else
    {
    this.respData?.commissionTemplate.push(data);
    this.isModel = false;
    }
  };
  public GetMemberType(uid: any) {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.isLoader = true;
      this.commonService.getAuth('servicemanager/get-commission-template-det?uuid=' + uid + '&docType=CMS&isstutas=' + this.isstutas)
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
  onSubmit(): any {
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
            this.router.navigateByUrl('admin/templates');
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
}

