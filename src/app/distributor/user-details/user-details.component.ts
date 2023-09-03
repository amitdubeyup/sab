import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  isloder = false;
  loading = false;
  respData: any;
  respTemplate: any;

  constructor(public commonService: ApiService, public route: ActivatedRoute, public router: Router) {
  }

  ngOnInit(): void {
    this.GetTemplate();
    this.getMembers();
  }

  changeText(mytext: any): void {
    return mytext.value;
  }
  getMembers(): void {
    if (this.commonService.userPram.userId !== undefined && this.commonService.userPram.userId !== '' && this.commonService.userPram.rmn !== undefined && this.commonService.userPram.rmn !== '') {
      this.commonService.isLoader = true;
      this.commonService.getAuth('users/get-user-management?memberid=' + this.commonService.userPram.memberId + '&mLevel=' + this.commonService.userPram.memberLevel + '&userid=&isstutas=DS')
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.respData = res.respData;
            }
            console.log(this.respData);
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
            alert('something went wrong!');
          });
    }
  }
  GetTemplate(): void {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('servicemanager/get-commission-template-list?isstutas=LIST')
        .subscribe(
          (res: any) => {
            if (res.isSuccess) {
              this.respTemplate = res.respData;
            }
          },
          (err: any) => {
            this.commonService.isLoader = false;
            alert('something went wrong!');
          });
    }
  }
  getDesc(st: any): void {
    if (this.respTemplate) {
      return this.respTemplate.find((e: any) => e.templateId === st)?.templateName;
    } else {
      return;
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
