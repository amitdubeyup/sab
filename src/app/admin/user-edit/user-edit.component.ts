import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { MemberTemplateEditComponent } from '../member-template-edit/member-template-edit.component';
import { ApiService } from 'src/app/services/ApiService.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  cmodel: any = {};
  uuid: any;
  respData: any;
  respReportTo: any;
  gstTypeList: any;
  respTemplate: any;
  activeTabIndex: any = 1;
  usrid: any;
  respAsm: any = [];
  disableValue =false;
  constructor(public commonService:ApiService,   public location: Location, public sharedMethod: SharedMethodService, public route: ActivatedRoute, public router: Router, public dialog: MatDialog) {
    this.route.queryParams.subscribe((params: any) => {
      this.uuid = params.uid;
      this.usrid = params.usrid;
    });
  }

  ngOnInit(): void {
    this.gstTypeList = this.sharedMethod.GstType();
    this.GetMemberType();
    this.GetTemplate();
    if (this.uuid !== undefined && this.uuid !== '') {
      this.GetMembers();
    }
    else {
      this.uuid = '';
    }
    if(this.commonService.userPram.memberType==='SA')
    {
      this.disableValue =false;
    }
    else
    {
      this.disableValue =true;
    }

  }

  GetMemberType(): void {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
    
      this.commonService.getAuth('users/get-member-type-list?memberType=' + this.commonService.userPram.memberType + '&mlevel=' + this.commonService.userPram.reportLevel + '&isstutas=L')
        .subscribe(
          (res: any) => {

            if (res.isSuccess) {
              this.respData = res.respData;
            }
          },
          (err: any) => {
            if (err.status === 0) {
              this.router.navigateByUrl('signin');
            }
          });
    }
  }

  GetTemplate(): void {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('users/get-template-by-type?docType=ALL')
        .subscribe(
          (res: any) => {

            if (res.isSuccess) {
              this.respTemplate = res.respData;
            }
          });
    }
  }

 GetMemberReportTo(_mtId:any): void {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      let memberLevel;
      if(this.commonService.userPram.memberType=='SA' || this.commonService.userPram.memberTyp=='AD')
      {
        memberLevel=_mtId;
      }
      else
      {
       memberLevel=this.commonService.userPram.memberLevel;
      }
      this.commonService.getAuth('users/get-member-ddl?memberLevel=' + memberLevel + '&memberType=' + this.commonService.userPram.memberType + '&isstutas=L')
        .subscribe(
          (res: any) => {
            if (res.isSuccess) {
              this.respReportTo = res.respData;
            }
            else {
              this.respReportTo = {};
              this.cmodel.parentMemberId = '';
            }
          });
    }
 }

  onMemberInfoSave(): void {
    this.cmodel.adminUserId =this.commonService.userPram.memberId;
    this.commonService.postAuth('users/add-member', JSON.stringify(this.cmodel)).subscribe((res: any) => {
      if (res.isSuccess) {
        Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
          this.location.back();
        });  
      }
      else {
        Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
    },
      (err: any) => {
        if (err.message) {
        }
      });
  }

  editTemplate(docTypes: any, templateId: any,isCoustome:any): void {
    const dialogRef = this.dialog.open(MemberTemplateEditComponent, {
      maxWidth:'100vw',
      data: { mbuid: this.uuid, docType: docTypes, tmpid: templateId,isCoustome:isCoustome },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  GetMembers(): void {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('users/get-member-details?membertid=' + this.uuid + '&mlevel=&isstutas=ID')
        .subscribe(
          (res: any) => {        
            if (res.isSuccess) {
              this.cmodel = res.respData;
              this.GetMemberReportTo(res.respData.mtId);
              this.GetMemberReportASM(res.respData.parentMemberId);
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

  updateTabs(index: any): void {
    this.activeTabIndex = index;
  }

  onPasswordChangeSave(): void {
    const postData: any = {
      updatedBy: this.commonService.userPram.userId,
      userId: this.usrid,
      memberId: this.uuid,
      MobileNo:this.cmodel.mobileNo,
      newpassword: this.cmodel.confirmNewPassword
    };
    this.commonService.postAuth('users/admin-change-password', postData).subscribe((res: any) => {
      if (res.isSuccess) {
        Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
      else {
        Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
    },
      (err: any) => {
        if (err.message) {
        }
      });
  }

  GetMemberReportASM(reportTo: any): void {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('users/getuserasm?reportTo=' + reportTo + '&memberType=' + this.cmodel.mtId + '&docType=ASM')
        .subscribe(
          (res: any) => {
            if (res.isSuccess) {
              this.respAsm = res.respData;
            }
            else {
              this.respAsm = [];
            }
            console.log(this.respAsm);
          });
    }
  }

  onmPinChange(): void {
    const postData: any = {
      updatedBy: this.commonService.userPram.userId,
      userId: this.usrid,
      memberId: this.uuid,
      mPin: this.cmodel.confirmNewmPin,
      MobileNo:this.cmodel.mobileNo,
      newpassword: this.cmodel.confirmNewmPin
    }
    this.commonService.postAuth('users/admin-change-mpin', postData).subscribe((res: any) => {
      if (res.isSuccess) {
        Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
      else {
        Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
    },
      (err: any) => {
        if (err.message) {
        }
      });
  }
}


