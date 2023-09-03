import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';
import { MemberTemplateEditComponent } from '../member-template-edit/member-template-edit.component';
import { ApiService } from 'src/app/services/ApiService.service';

@Component({
  selector: 'app-create-member',
  templateUrl: './create-member.component.html',
  styleUrls: ['./create-member.component.css']
})
export class CreateMemberComponent implements OnInit {

  cmodel: any = {};
  uuid: any;
  respData: any;
  respReportTo: any;
  gstTypeList: any;
  respTemplate: any;
  isloder: boolean = false;
  respAsm: any;
  constructor(public commonService:ApiService, public sharedMethod: SharedMethodService, public route: ActivatedRoute, public router: Router, public dialog: MatDialog) {
    this.route.queryParams.subscribe((params: any) => {
      this.uuid = params.uid;
    });
  }

  ngOnInit(): void {
    this.gstTypeList = this.sharedMethod.GstType();
    this.GetMemberType();
    if (this.uuid !== undefined && this.uuid !== "") {
      this.GetMembers();
    }
    else {
      this.uuid = '';
    }
  }

  GetMemberType(): void {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('users/get-member-type-list?memberType=' + this.commonService.userPram.memberType + '&mlevel=' + this.commonService.userPram.reportLevel + '&isstutas=L')
        .subscribe(
          (res: any) => {

            if (res.isSuccess) {
              this.respData = res.respData;
              console.log( this.respData );
            }
          },
          (err: any) => {
            if (err.status === 0) {
              this.router.navigateByUrl('signin');
            }
          });
    }
  }
  GetMemberReportTo(_mtid:any): void {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('users/get-member-ddl?memberLevel=' + _mtid + '&memberType=SA&isstutas=AD')
        .subscribe(
          (res: any) => {
            if (res.isSuccess) {
              this.cmodel.parentMemberId = null;
              this.respReportTo = res.respData;
            }
            else {
              this.respReportTo = {};
              this.cmodel.parentMemberId = null;
            }
          });
    }
  }

  onSubmit(): void {
    this.cmodel.adminUserId = this.commonService.userPram.userId;
    this.isloder = true;
    this.commonService.postAuth("users/add-member", JSON.stringify(this.cmodel)).subscribe((res: any) => {
      this.isloder = false;
      if (res.isSuccess) {
        Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' });
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


  GetMembers(): void {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('users/get-member-details?membertid=' + this.uuid + '&mlevel=&isstutas=ID')
        .subscribe(
          (res: any) => {
            if (res.isSuccess) {
              this.GetMemberReportTo(res.respData.mtId);
              this.cmodel = res.respData;

            }
          },
          (err: any) => {
            if (err.status === 0) {
              this.router.navigateByUrl('signin');
            }
          });
    }
  }
  getMemberName(st: any): any {
    if(st!=undefined && st!='')
    {
    return this.respReportTo.find((e: any) => e.code === st)?.desc;
    }
    else
    {
      return '';
    }
  }
  getMemberNameASM(st: any): any {
    if(st!=undefined && st!='')
    {
    return this.respAsm.find((e: any) => e.code === st)?.desc;
    }
    else
    {
      return '';
    }
  }
  
}

