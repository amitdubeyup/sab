import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  isloder = false;
  loading = false;
  respData: any;

  constructor(public commonService: ApiService, public route: ActivatedRoute, public router: Router) {
  }

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers(): any {
    if (this.commonService.userPram.userId !== undefined && this.commonService.userPram.userId !== '' && this.commonService.userPram.rmn !== undefined && this.commonService.userPram.rmn !== '' && this.commonService.userPram.memberLevel !== undefined && this.commonService.userPram.memberLevel !== '') {
      this.commonService.isLoader = true;
      this.commonService.getAuth('users/get-member?memberid=' + this.commonService.userPram.memberId + '&mLevel=' + this.commonService.userPram.memberLevel + '&isstutas=L')
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.respData = res.respData;
            }
            console.log(res);
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

  openPageUrl(url: any, params: any): any {
    if (params) {
      this.router.navigate([url], { queryParams: params });
    } else {
      this.router.navigateByUrl(url);
    }
  }
}
