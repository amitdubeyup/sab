import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';

@Component({
  selector: 'app-retiler-list',
  templateUrl: './retiler-list.component.html',
  styleUrls: ['./retiler-list.component.css']
})
export class RetilerListComponent {

  isloder = false;
  loading = false;
  respData: any;
  respTemplate: any;
  distList: any;
  dist_id: any;
  constructor(public commonService: ApiService, public route: ActivatedRoute, public router: Router) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  changeText(mytext: any): void {
    return mytext.value;
  }
  getUser(): any {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('users/GetMemberById?memberId=' + this.commonService.userPram.memberId + '&roleType=docType=DDL')
        .subscribe(
          (res: any) => {
            if (res.isSuccess) {
              this.distList = res.respData;
            }
          },
          (err: any) => {
            console.log(err);
          });
    }
  }

  getMembers(rtid:any): void {
    if (this.commonService.userPram.userId !== undefined && this.commonService.userPram.userId !== '' && this.commonService.userPram.rmn !== undefined && this.commonService.userPram.rmn !== '') {
      this.commonService.isLoader = true;
      this.commonService.getAuth('users/get-user-management?memberid=' + rtid + '&mLevel=' + this.commonService.userPram.memberLevel + '&userid=&isstutas=DS')
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.respData = res.respData;
            }
            else
            {
              this.respData=null;
            }
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
            alert('something went wrong!');
          });
    }
  }

  setCommission(id: any, userId: any): any {
    this.router.navigate(['/distributor/user-edit'], { queryParams: { uid: id, usrid: userId } });
  }

  setUserPrivilege(data: any): void {
    this.router.navigate(['/distributor/user-privilege'], { queryParams: { userId: data.userId, mtCode: data.mtCode } });
  }

  openPageUrl(url: any, params: any): any {
    if (params) {
      this.router.navigate([url], { queryParams: params });
    } else {
      this.router.navigateByUrl(url);
    }
  }
}

