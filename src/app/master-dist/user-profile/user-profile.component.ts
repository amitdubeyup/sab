import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  cmodel: any = {};
  uuid: any;
  respData: any;
  respReportTo: any;
  gstTypeList: any;
  respTemplate: any;
  activeTabIndex: any = 1;
  usrid: any;
  constructor(public commonService: ApiService, public sharedMethod: SharedMethodService, public route: ActivatedRoute, public router: Router) {
    if (this.commonService.userPram.userId && this.commonService.userPram.memberId) {
      this.uuid = this.commonService.userPram.memberId;
      this.usrid = this.commonService.userPram.userId;
    }
  }

  ngOnInit(): void {
    this.gstTypeList = this.sharedMethod.GstType();
    this.GetMemberType();
    this.GetTemplate();
    this.GetMemberReportTo();
    if (this.uuid != undefined && this.uuid != '') {
      this.GetMembers();
    }
    else {
      this.uuid = '';
    }

  }
  public GetMemberType(): any {
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
              this.router.navigateByUrl('/signin');
            }
          });
    }
  }
  public GetTemplate(): any {
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
  public GetMemberReportTo(): any {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('users/get-member-ddl?memberLevel=' + this.commonService.userPram.memberLevel + '&memberType=' + this.commonService.userPram.memberType + '&isstutas=L')
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
  onMemberInfoSave(): any {
    this.cmodel.adminUserId = this.commonService.userPram.userId;
    this.commonService.postAuth('users/add-member', JSON.stringify(this.cmodel)).subscribe((res: any) => {
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

  public GetMembers(): any {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('users/get-user-management-det?memberid=' + this.uuid + '&userid=' + this.usrid + '&mLevel=&isstutas=ID')
        .subscribe(
          (res: any) => {
            if (res.isSuccess) {
              this.cmodel = res.respData;
              console.log(this.cmodel);
            }
          },
          (err: any) => {
            if (err.status === 0) {
              this.router.navigateByUrl('/signin');
            }
          });
    }
  }

  updateTabs(index: any): void {
    this.activeTabIndex = index;
  }
  onPasswordChangeSave(): void {
    let postData: any = {
      'updatedBy': this.commonService.userPram.userId,
      'userId': this.usrid,
      'memberId': this.uuid,
      'newpassword': this.cmodel.confirmNewPassword
    }
    this.commonService.postAuth('users/change-password', postData).subscribe((res: any) => {
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

  onmPinChange(): void {
    let postData: any = {
      'updatedBy': this.commonService.userPram.userId,
      'userId': this.usrid,
      'memberId': this.uuid,
      'mPin': this.cmodel.confirmNewmPin
    };
    this.commonService.postAuth('users/change-mpin', postData).subscribe((res: any) => {
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

  openPageUrl(url: any, params: any): any {
    if (params) {
      this.router.navigate([url], { queryParams: params });
    } else {
      this.router.navigateByUrl(url);
    }
  }
}
