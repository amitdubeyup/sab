import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/ApiService.service';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-member-template-edit',
  templateUrl: './member-template-edit.component.html',
  styleUrls: ['./member-template-edit.component.css']
})
export class MemberTemplateEditComponent implements OnInit {


  loading = false;
  respData: any;
  docType: any;
  isCoustome:any;
  CommissionTypeList: any;
  constructor(public commonService:ApiService, public sharedMethod: SharedMethodService, public dialogRef: MatDialogRef<MemberTemplateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public rdata: any) {
    this.docType = this.rdata.docType;
    this.isCoustome=this.rdata.isCoustome;
  }

  ngOnInit(): void {
    this.CommissionTypeList = this.sharedMethod.CommissionType();
    if (this.rdata != undefined && this.rdata.tmpid != "") {
      this.GetMemberType(this.rdata.tmpid);
      console.log(this.rdata);
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }
  getapiDesc(st: any) {
    return this.CommissionTypeList.find((e: any) => e.code === st)?.desc;
  }
  public GetMemberType(uid: any) {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.isLoader = true;
      this.commonService.getAuth('servicemanager/get-member-commission-template-det?mbuid=' + this.rdata.mbuid + '&uuid=' + uid + '&docType=' + this.rdata.docType + '&isstutas=ID')
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.respData = res.respData;
            }
          });
    }
  }
  closeDialog(): any {
    Swal.fire({
      icon: 'question',
      title: 'Are you sure, want to update custom template for this member?',
      confirmButtonText: 'Save',
      showDenyButton: true,
      denyButtonText: 'Cancel',
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        let postData: any = {};
        postData.UserID = this.commonService.userPram.userId;
        postData.memberId = this.rdata.mbuid;
        postData.docType = this.rdata.docType;
        postData.templateId = this.rdata.tmpid;
        postData.isCustome = this.isCoustome;
        postData.commissionCriterionList = this.respData;
        this.commonService.postAuth("users/update-commissioncriterion", JSON.stringify(postData)).subscribe((res: any) => {
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
        this.dialogRef.close({ event: 'close', data: this.respData });
      } else if (result.isDenied) {
        this.onCancel();
      }
    });

  }
  closeDialogCustome(): any {
    Swal.fire({
      icon: 'question',
      title: 'Are you sure, want to update custom template for this member?',
      confirmButtonText: 'Save',
      showDenyButton: true,
      denyButtonText: 'Cancel',
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        let postData: any = {};
        postData.UserID = this.commonService.userPram.userId;
        postData.memberId = this.rdata.mbuid;
        postData.docType = this.rdata.docType;
        postData.templateId = this.rdata.tmpid;
        postData.isCustome = 1;
        postData.commissionCriterionList = this.respData;
        this.commonService.postAuth("users/update-commissioncriterion", JSON.stringify(postData)).subscribe((res: any) => {
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
        this.dialogRef.close({ event: 'close', data: this.respData });
      } else if (result.isDenied) {
        this.onCancel();
      }
    });

  }
}
