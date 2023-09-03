import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-member-type',
  templateUrl: './create-member-type.component.html',
  styleUrls: ['./create-member-type.component.css']
})
export class CreateMemberTypeComponent {

  mbType: any = {};
  userList: any;
  respData: any;
  roleList: any;
  constructor(public commonService: ApiService, public sharedService: SharedMethodService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    this.roleList = this.sharedService.RoleType();
    this.GetMemberType();
  }

  GetMemberType(): void {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('users/get-member-type-list?userkey=&mlevel=&isstutas=DDL')
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
            alert('something went wrong!');
          });
    }
  }

  onSubmit(): void {
    this.commonService.postAuth('users/add-member-type', JSON.stringify(this.mbType)).subscribe((res: any) => {
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

  updateMember(data: any): void {
    if (data !== undefined) {
      this.mbType.mtId = data.mtId;
      this.mbType.reportLevel = data.reportLevel;
      this.mbType.mtCode = data.mtCode;
      this.mbType.membType = data.membType;
      this.mbType.roleType = data.roleType;
    }
    else {
      this.mbType.mtId = '';
      this.mbType.reportLevel = '';
      this.mbType.mtCode = '';
      this.mbType.membType = '';
      this.mbType.roleType = '';
    }
  }

  removeMember(data: any): void {
    Swal.fire({
      icon: 'question',
      title: 'Are you sure to remove?',
      confirmButtonText: `Save`,
      showDenyButton: true,
      denyButtonText: `Save & Leave Page`,
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {

      } else if (result.isDenied) {

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
