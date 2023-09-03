import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';
import { MemberTemplateEditComponent } from '../member-template-edit/member-template-edit.component';

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
  isloder = false;
  respAsm: any;
  constructor(public commonService: ApiService, public sharedMethod: SharedMethodService, public route: ActivatedRoute, public router: Router, public dialog: MatDialog) {
    this.route.queryParams.subscribe((params: any) => {
      this.uuid = params.uid;
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
  GetMemberReportTo(_mtid:any): void {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      let memberLevel;
      if(this.commonService.userPram.memberType=='SA' || this.commonService.userPram.memberTyp=='AD')
      {
        memberLevel=_mtid;
      }
      else
      {
       memberLevel=this.commonService.userPram.memberLevel;
      }
      this.commonService.getAuth('users/get-member-ddl?memberLevel=' + memberLevel + '&memberType=' + this.commonService.userPram.memberType + '&isstutas=L&memberId='+this.commonService.userPram.memberId)
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

  GetMemberReportASM(reportTo: any): void {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('users/get-member-asm?reportTo=' + reportTo + '&memberType=' + this.commonService.userPram.memberType + '&docType=ASM')
        .subscribe(
          (res: any) => {
            if (res.isSuccess) {
              this.respAsm = res.respData;
            }
            else {
              this.cmodel.rootMemberId = '';
              this.respAsm = {};
            }
          });
    }
  }
  onSubmit(): any {
    this.cmodel.adminUserId = this.commonService.userPram.userId;
    if(this.cmodel.gstType==1 && this.cmodel.gstin==undefined)
    {
      Swal.fire({ icon: 'warning', text: 'Please enter GSTIN', confirmButtonText: 'OK' });
      return;
    }
    else
    {
    this.isloder = true;
    this.commonService.postAuth('users/add-member', JSON.stringify(this.cmodel)).subscribe((res: any) => {
      this.isloder = false;
      if (res.isSuccess) {
        Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
          this.router.navigate(['/distributor/member-details'], { queryParams: {  txnNo: res.txnNo, } });
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

  editTemplate(docTypes: any, templateId: any): void {
    const dialogRef = this.dialog.open(MemberTemplateEditComponent, {
      width: '90vw',
      data: { mbuid: this.uuid, docType: docTypes, tmpid: templateId },
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
              if(this.cmodel.mtId!=undefined && this.cmodel.mtId!='')
              {
                this.GetMemberReportTo(this.cmodel.mtId);
              }
              if(this.cmodel.parentMemberId!=undefined && this.cmodel.parentMemberId!='')
              {
                this.GetMemberReportASM(this.cmodel.parentMemberId);
              }
            }
          },
          (err: any) => {
            if (err.status === 0) {
              this.router.navigateByUrl('signin');
            }
          });
    }
  }

  openPageUrl(url: any, params: any): any {
    if (params) {
      this.router.navigate([url], { queryParams: params });
    } else {
      this.router.navigateByUrl(url);
    }
  }

}
