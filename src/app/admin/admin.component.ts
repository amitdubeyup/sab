import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/ApiService.service';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  admtList: any={};
  fromDt: any = new Date();
  toDt: any = new Date();
  usermenuright:any;
  isDash:boolean=true;
  isApibal:boolean=false;
    // Pie
    public pieChartOptions: ChartOptions<'pie'> = {
      responsive: false,
    };
    public transactionSummary:any = [{data: [ 1, 0, 0,0]}];
    public OutletBalance:any = [{data: [ 1, 0, 0,0]}];
    public pieChartLegend = true;
    public pieChartPlugins = [];
    constructor(
      public commonService:ApiService,
      public route: ActivatedRoute,
      public router: Router) {
    }

  ngOnInit(): void {
    this.admtList.TotalTransaction="0";
    this.admtList.TotalTransaction ="0";
    this.admtList.TransactionAmount ="0";
    this.admtList.FundRequestApproved = "0";
    this.admtList.RetailerTransfer = "0";
    this.admtList.DistributorTransfer = "0";
    this.admtList.MDTransfer = "0";
    this.admtList.ASMTransfer = "0";
    this.admtList.TotalDMT = "0";
    this.admtList.TotalRecharge = "0";
    this.admtList.TotalBillPayment = "0";
    this.admtList.TotalAEPS ="0";
    this.admtList.TotalACVerify = "0";
    this.admtList.TotalVerifyAmount = "0";
    this.admtList.TotalTransRefund = "0";
    this.admtList.TotalRefundAmount ="0";
    this.admtList.TotalRetailer = "0";
    this.admtList.TotalMD = "0";
    this.admtList.TotalDistributor = "0";
    this.admtList.TotalASM = "0";
    this.admtList.RetailerBalance = "0";
    this.admtList.DistributorBalance = "0";
    this.admtList.MDBalance = "0";
    this.admtList.ASMBalance = "0";
    this.admtList.FundRequestPending = "0";
    this.admtList.AepsBalance = "0";
    this.admtList.VendeorAmt = "0";
    this.admtList.TotalDMTCharge = "0";
    this.admtList.TotalDMTTds = "0";
    this.admtList.TotalDMTComm = "0";
    this.admtList.TotalvdrCharge = "0";
    this.admtList.TotalvdrTds = "0";
    this.admtList.TotalvdrComm = "0";
    this.admtList.TotalUtliCharge = "0";
    this.admtList.TotalUtliTds = "0";
    this.admtList.TotalUtliComm = "0";
    this.admtList.TotalQR = "0";
    if(this.commonService.userPram)
    {
      if(this.commonService.userPram?.memberType=='AD')
      {
        this.usermenuright=JSON.parse(this.commonService?.userPram?.usermenuright);
        this.isDash=this.usermenuright.find((e: any) => e.type === 'DASH' && e.value==true )?.type=='DASH'?true:false;
        this.isApibal=this.usermenuright.find((e: any) => e.type === 'APIBL' && e.value==true )?.type=='APIBL'?true:false;
      }
    }
 
  }
 
  getRecentTransaction(docType: any): void {
    const fromDt = this.commonService.formatDate((this.fromDt ? this.fromDt : new Date()), 'yyyy-mm-dd');
    const toDt = this.commonService.formatDate((this.toDt ? this.toDt : new Date()), 'yyyy-mm-dd');
    if (this.commonService.userPram.userId && this.commonService.userPram.memberId) {
      this.commonService.isLoader = true;
      this.commonService.getAuth('admin/addhours/get-admin-dashboard?memberId=' + this.commonService.userPram.memberId + '&fromDt=' + fromDt + '&toDt=' + toDt + '&isStatus=&docType=' + docType)
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.admtList = JSON.parse(this.commonService.decryptUsingAES256(res.respData));  
             this.transactionSummary = [{
                data: [this.admtList?.TotalTransaction, (this.admtList?.TransactionAmount+this.admtList?.RetailerTransfer+this.admtList?.TotalAEPS+this.admtList?.TotalQR), this.admtList?.FundRequestApproved,this.admtList?.FundRequestPending]
              }];
              this.OutletBalance= [{
                data:[
                   parseFloat(this.admtList?.RetailerBalance+this.admtList?.DistributorBalance+this.admtList?.MDBalance+this.admtList?.ASMBalance+this.admtList?.AepsBalance).toFixed(2),
                   (this.admtList?.TransactionAmount+this.admtList?.RetailerTransfer+this.admtList?.TotalAEPS+this.admtList?.TotalQR), 
                   this.admtList?.FundRequestApproved,
                   this.admtList?.FundRequestPending
                  ]
              }];
            }
          },
          (err: any) => {
            this.commonService.isLoader = false;
          });
    }
  }
}
