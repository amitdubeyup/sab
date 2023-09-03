import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { SharedMethodService } from 'src/app/services/shared-method.service';

@Component({
  selector: 'app-kyc-home',
  templateUrl: './kyc-home.component.html',
  styleUrls: ['./kyc-home.component.css']
})
export class KycHomeComponent implements OnInit {


  isloder = false;
  loading = false;


  respData: any;
  kycStatus: any;

  constructor(
    public commonService: ApiService,
    public sharedMethod: SharedMethodService,
    public route: ActivatedRoute,
    public router: Router) {
  }

  ngOnInit(): void {
    this.kycStatus = this.sharedMethod.kycStatus();
    this.getMembers();
  }

  getMembers(): any {
    if (this.commonService.userPram.userId !== undefined && this.commonService.userPram.userId !== '' && this.commonService.userPram.rmn !== undefined && this.commonService.userPram.rmn !== '') {
      this.commonService.isLoader = true;
      this.commonService.getAuth('users/get-kyc-details?memberid=' + this.commonService.userPram.memberId + '&mLevel=' + this.commonService.userPram.memberLevel + '&kycid=&isstutas=L')
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
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

  onSetCommission(id: any): any {
    this.router.navigate(['/distributor/add-member'], { queryParams: { uid: id } });
  }
  getStatusDesc(st: any): any {
    return this.kycStatus.find((e: any) => e.id === st)?.name;
  }

  openPageUrl(url: any, params: any): any {
    console.log(url, params);
    if (params) {
      this.router.navigate([url], { queryParams: params });
    } else {
      this.router.navigateByUrl(url);
    }
  }
}
