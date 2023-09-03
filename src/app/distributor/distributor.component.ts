import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartOptions, ChartType } from 'chart.js';
import { ApiService } from '../services/ApiService.service';

@Component({
  selector: 'app-distributor',
  templateUrl: './distributor.component.html',
  styleUrls: ['./distributor.component.css']
})
export class DistributorComponent implements OnInit {
  recentList:any={};

  // public barChartLabels: Label[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun'];
  public barChartType: ChartType = 'bar';
  barChartList:any=[];
  // public barChartData: ChartDataSets[] = [
  //   { data: this.barChartList, label: 'Last 7 Days' }

  // ];
  fromDt: any = new Date();
  toDt: any = new Date();
  userRight:any={};
  // public barChartOptions: ChartOptions = { legend: { display: true, labels: { fontColor: 'black' } } };
  banners: any;
  servicePrivileges:any;
  constructor(
    public commonService: ApiService,
    public route: ActivatedRoute,
    public router: Router,
    public dialog: MatDialog) {
  }


  ngOnInit(): void {
    this.fromDt.setDate(this.fromDt.getDate());
    this.toDt.setDate(this.toDt.getDate());
    this.getPrivileges();
    this.getRecentTransaction('all');
    this.getBannersList();
    //this. getoverviewTransaction();
  }
  getPrivileges(): void {
    this.commonService.getAuth(`servicemanager/get-company?roleType=AD`)
      .subscribe(
        (res: any) => {
          if (res.isSuccess) {
            this.servicePrivileges=JSON.parse(this.commonService.decryptUsingAES256(res.respData));
            localStorage.setItem('serviceBehaviour', res.respData);
            this.commonService.serviceBehaviourData$.next(res.respData);
            if(this.servicePrivileges)
            {
              this.userRight.isqr=this.servicePrivileges.find((e: any) => e.type === 'QR' && e.value==true)?.type=='QR'?true:false;
              this.userRight.isVr=this.servicePrivileges.find((e: any) => e.type === 'VACC' && e.value==true)?.type=='VACC'?true:false;
              this.userRight.isqr2=this.servicePrivileges.find((e: any) => e.type === 'EBQR' && e.value==true)?.type=='EBQR'?true:false;
              this.userRight.isWcr=this.servicePrivileges.find((e: any) => e.type === 'WCR' && e.value==true)?.type=='WCR'?true:false;
              this.userRight.isWdr=this.servicePrivileges.find((e: any) => e.type === 'WDR' && e.value==true)?.type=='WDR'?true:false;

              let usermenuright=JSON.parse(this.commonService?.userPram?.usermenuright);
              if(usermenuright)
              {
                if(this.userRight.isqr)
                {
                  this.userRight.isqr=usermenuright.find((e: any) => e.type === 'QR' && e.value==true)?.type=='QR'?true:false;
                }
                if(this.userRight.isVr)
                {
                  this.userRight.isVr=usermenuright.find((e: any) => e.type === 'VACC' && e.value==true)?.type=='VACC'?true:false;
                }
                if(this.userRight.isqr2)
                {
                  this.userRight.isqr2=usermenuright.find((e: any) => e.type === 'EBQR' && e.value==true)?.type=='EBQR'?true:false;
                }
                if(this.userRight.isWcr)
                {
                  this.userRight.isWcr=usermenuright.find((e: any) => e.type === 'WCR' && e.value==true)?.type=='WCR'?true:false;
                }
                if(this.userRight.isWdr)
                {
                  this.userRight.isWdr=usermenuright.find((e: any) => e.type === 'WDR' && e.value==true)?.type=='WDR'?true:false;
                }
              }
           }
          }
        },
        (err: any) => {
        });
  }

  openlink(url: any): void {
    this.router.navigateByUrl(url);
  }

  getRecentTransaction(docType: any): void {
    const fromDt = this.commonService.formatDate((this.fromDt ? this.fromDt : new Date()), 'yyyy-mm-dd');
    const toDt = this.commonService.formatDate((this.toDt ? this.toDt : new Date()), 'yyyy-mm-dd');
    if (this.commonService.userPram.userId && this.commonService.userPram.memberId) {
      this.commonService.isLoader = true;
      this.commonService.getAuth('retailerreport/get-transaction-dashboard?memberId=' + this.commonService.userPram.memberId + '&fromDt=' + fromDt + '&toDt=' + toDt + '&docType=' + docType)
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
  navigatePage(url: any): any {
    this.router.navigateByUrl(url);
  }
  getBannersList(): any {
    this.commonService.getAuth('servicemanager/getnotifiy-benner?roleType='+this.commonService?.userPram?.memberType+'&messageType=3')
      .subscribe(
        (res: any) => {
          this.commonService.isLoader = false;
          if (res.isSuccess) {
              this.banners = res.respData;
             console.log( this.banners);
          }
        },
        (err: any) => {
          console.log(err);
          this.commonService.isLoader = false;
        });
  }
  getoverviewTransaction(): void {
    if (this.commonService.userPram.userId && this.commonService.userPram.memberId) {
      this.commonService.isLoader = true;
      this.commonService.getAuth('admin/addhours/get-transaction-overview?memberId=' + this.commonService.userPram.memberId+'&docType=DASH')
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              let dataList = JSON.parse(this.commonService.decryptUsingAES256(res.respData));
              // this.barChartLabels.forEach(data => {
              //   if(dataList.find((e: any) => e.days == data)?.amount>0)
              //   {
              //    this.barChartList.push(dataList.find((e: any) => e.days == data)?.amount);
              //   }
              //   else
              //   {
              //     this.barChartList.push(0);
              //   }
              // });
              console.log(this.barChartList);
            }
          },
          (err: any) => {
            this.commonService.isLoader = false;
          });
    }
  }
}
