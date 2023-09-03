import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import Swal from 'sweetalert2';
import { v4 as uuid } from 'uuid';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  name: any;
  servicePrivileges: any;
  userRight: any = {};
  usermenuright: any;
  isMore: boolean = false;
  fromDt: any = new Date();
  toDt: any = new Date();
  recentList: any={};
  banners: any;
  constructor(
    public commonService: ApiService,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public router: Router) {
  }

  ngOnInit(): void {
    this.name = ((window.location.pathname).split('/').reverse())[0];
    this.recentList.FundsTransfers="0";
    this.getPrivileges();
    this.getBannersList();
    this.getRecentTransaction();
  }
  getRecentTransaction(): void {
    const fromDt = this.commonService.formatDate((this.fromDt ? this.fromDt : new Date()), 'yyyy-mm-dd');
    const toDt = this.commonService.formatDate((this.toDt ? this.toDt : new Date()), 'yyyy-mm-dd');
    if (this.commonService.userPram.userId && this.commonService.userPram.memberId) {
      this.commonService.isLoader = true;
      this.commonService.getAuth('retailerreport/get-recent-transaction-dashboard?memberId=' + this.commonService.userPram.memberId + '&fromDt=' + fromDt + '&toDt=' + toDt + '&docType=all')
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.recentList = JSON.parse(this.commonService.decryptUsingAES256(res.respData));
            }
          },
          (err: any) => {
            this.commonService.isLoader = false;
          });
    }
  }
  getBannersList(): any {
    let bannersRes = this.commonService.getNotification("banners_" + this.commonService?.userPram?.memberType);
    if (bannersRes != null && bannersRes != undefined) {
      this.banners = bannersRes;
    }
    else {
      this.commonService.getAuth('servicemanager/getnotifiy?roleType=' + this.commonService?.userPram?.memberType + '&messageType=3')
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.banners = res.respData;
              this.commonService.setNotification("banners_" + this.commonService?.userPram?.memberType, this.banners, 800000);
            }
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
          });
    }
  }
  getPrivileges(): void {
    this.commonService.getAuth(`servicemanager/get-company?roleType=AD`)
      .subscribe(
        (res: any) => {
          if (res.isSuccess) {
            this.servicePrivileges = JSON.parse(this.commonService.decryptUsingAES256(res.respData));
            localStorage.setItem('serviceBehaviour', res.respData);
            this.commonService.serviceBehaviourData$.next(res.respData);
            if (this.servicePrivileges) {
              this.userRight.isDmt1 = this.servicePrivileges.find((e: any) => e.type === 'DMT1' && e.value == true)?.type == 'DMT1' ? true : false;
              this.userRight.isDmt2 = this.servicePrivileges.find((e: any) => e.type === 'DMT2' && e.value == true)?.type == 'DMT2' ? true : false;
              this.userRight.isIndo = this.servicePrivileges.find((e: any) => e.type === 'INDP' && e.value == true)?.type == 'INDP' ? true : false;
              this.userRight.iswTopup = this.servicePrivileges.find((e: any) => e.type === 'W2W' && e.value == true)?.type == 'W2W' ? true : false;
              this.commonService.postAES256('users/getuserpriviledges?user_id=' + this.commonService?.userPram?.userId, "")
                .subscribe((res: any) => {
                  if (res.isSuccess) {
                    if (res.loginRes?.usermenuright) {
                      this.usermenuright = JSON.parse(res.loginRes.usermenuright);
                      this.commonService.userPram.usermenuright = res.loginRes.usermenuright;
                      localStorage.setItem('userPram', btoa(JSON.stringify(this.commonService.userPram)));
                      if (this.userRight.isIndo) {
                        this.userRight.isIndo = this.usermenuright.find((e: any) => e.type === 'INDP' && e.value == true)?.type == 'INDP' ? true : false;
                      }
                      if (this.userRight.isDmt1) {
                        this.userRight.isDmt1 = this.usermenuright.find((e: any) => e.type === 'DMT1' && e.value == true)?.type == 'DMT1' ? true : false;
                      }
                      if (this.userRight.isDmt2) {
                        this.userRight.isDmt2 = this.usermenuright.find((e: any) => e.type === 'DMT2' && e.value == true)?.type == 'DMT2' ? true : false;
                      }
                    }
                    else
                    {
                      this.userRight.isIndo=false;
                      this.userRight.isDmt2=false;
                    }
                  }
                }, (err: any) => { });
            }
          }
        },
        (err: any) => {
        });
  }

  navigatePage(url: any): any {
    this.router.navigateByUrl(url);
  }
  openMenu(): void {
    // let dialogRef = this.dialog.open(MenuComponent, { 
    //   width: '650px', 
    //   data: { uid:''} 
    // }); 
    // dialogRef.afterClosed().subscribe(result => { 
    // });
    if (this.isMore) {
      this.isMore = false;
    }
    else {
      this.isMore = true;
    }
  }
  // onQrview(type:any):any{
  //   let dialogRef = this.dialog.open(QrCodeComponent, { 
  //     width: '500px', 
  //     data: { qr:type} 
  //   }); 
  //   dialogRef.afterClosed().subscribe(result => { 
  //   }); 
  //  }

  LoginOrRegistration(): void {
    if (this.commonService.userPram.userId && this.commonService.userPram.memberId) {
      this.commonService.isLoader = true;
      const url = `travel/LoginOrRegistration?memberId=${this.commonService.userPram.memberId}&docType=TRAVEL`;
      this.commonService.getAuth(url)
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
                // window.location.href=res.redirecturl;               
                window.open(res.redirecturl, "_blank");
              });
            }
            else {
              Swal.fire({ icon: 'warning', title: 'Status', text: res.mhOutcome, confirmButtonText: 'Okay' });
            }
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
          });
    }
  }
}

