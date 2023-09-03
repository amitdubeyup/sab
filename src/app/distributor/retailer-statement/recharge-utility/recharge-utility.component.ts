import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { ExcelService } from 'src/app/services/excel.service';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-recharge-utility',
  templateUrl: './recharge-utility.component.html',
  styleUrls: ['./recharge-utility.component.css']
})
export class RechargeUtilityComponent {

  respData: any;
  fromDt: any = new Date();
  toDt: any = new Date();
  statementList: any = [];
  activeTab: any = 0;
  retList: any;
  retid: any;
  isStatus:any=null;
  totalAmount = 0;
  totalCharge = 0;
  totalCommission=0;
  txnNo:any='';
  public searchType:any;
  constructor(
    public commonService: ApiService,
    public excelService: ExcelService,
    public sharedMethodService:SharedMethodService,
    public route: ActivatedRoute,
    public router: Router) {
  }

  ngOnInit(): void {
    this.fromDt.setDate(this.fromDt.getDate());
    this.toDt.setDate(this.toDt.getDate());
    this.getMember();
    this.getRetailerCommission('RECH');
  }
  getMember(): any {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('users/GetMemberById?memberId=' + this.commonService.userPram.memberId + '&roleType=docType=DDL')
        .subscribe(
          (res: any) => {
            if (res.isSuccess) {
              this.retList = res.respData;
            }
          },
          (err: any) => {
            console.log(err);
          });
    }
  }
  changeText(myText: any): void {
    return myText.value;
  }

  handleChange(e: any): any {
    this.activeTab = e.index;
    if (this.activeTab === 0) {
      this.getRetailerCommission('RECH');
    }
   
  }
  handleSearch(docTab: any): any {
    this.activeTab = docTab;
    if (this.activeTab === 0) {
      this.getRetailerCommission('RECH');
    }
  }
   // function to get difference between from date and to date
   getDiffDays(sDate: any, eDate: any) {
    var startDate = new Date(sDate);
    var endDate = new Date(eDate);
    var Time = endDate.getTime() - startDate.getTime();
    return Time / (1000 * 3600 * 24);
  }
  getRetailerCommission(docType: any): void {
    const fromDt = this.commonService.formatDate((this.fromDt ? this.fromDt : new Date()), 'yyyy-mm-dd');
    const toDt = this.commonService.formatDate((this.toDt ? this.toDt : new Date()), 'yyyy-mm-dd');
    const difference_date = this.getDiffDays(fromDt, toDt);
    if(difference_date>30){
      Swal.fire({ icon: 'success', text: 'Please select valid date - Report Restrict to one month', confirmButtonText: 'OK' });
    }
	  else
    {
      if (this.commonService.userPram.userId && this.commonService.userPram.memberId) {
        this.commonService.isLoader = true;
        this.commonService.getAuth('retailerreport/get-transaction-report?memberId=' + this.retid + '&fromDt=' + fromDt + '&toDt=' + toDt + '&isStatus=' + this.isStatus + '&docType=' + docType+'&st='+this.searchType+'&txnNo='+this.txnNo)
          .subscribe(
            (res: any) => {
              this.commonService.isLoader = false;
              if (res.isSuccess) {
                this.statementList = JSON.parse(this.commonService.decryptUsingAES256(res.respData));
                this.totalAmount = 0;
                this.totalCharge = 0;
                this.totalCommission = 0;
                this.statementList.forEach((element: any) => {
                  this.totalAmount = this.totalAmount + parseFloat(element.amount);
                  this.totalCharge = this.totalCharge + parseFloat(element.charge);
                  this.totalCommission = this.totalCommission + parseFloat(element.rt_commission);
                });
              }
              else
              {
                this.commonService.isLoader = false;
                this.statementList=[];
                }
            },
            (err: any) => {
              this.commonService.isLoader = false;
            });
      }
    }
 
  }

  openPageUrl(url: any, params: any): any {
    if (params) {
      this.router.navigate([url], { queryParams: params });
    } else {
      this.router.navigateByUrl(url);
    }
  }
  exportAsXLSX(): any {
    const excelData: any = [];
    this.statementList.forEach((el: any) => {
      const obj = [
        el.txn_no,
        el.trasaction_date,
        el.updatedOn,
        el.UserName,
        this.returnName(el),
        this.returnBene(el),
        el.amount,
        el.charge,
        this.returnService(el),
        el.status,
        el.mode_of_payment=='Part-Payment'?'':el.utr,
        el.api_msg,
      ];
      excelData.push(obj);
    });
     let header = ['Txn','Tran Date','Updated Date','Member Name','Name/Mobile','Beneficiary','Tran Amount','Charge','Service','Status','UTR','Response'];
     if(this.activeTab == 1 || this.activeTab == 2 || this.activeTab == 3)
     {
     header = ['Txn','Tran Date','Updated Date','Member Name','Name/Mobile','Operator','Tran Amount','Charge','Service','Status','UTR','Response'];
     }
     else if(this.activeTab == 4)
     {
     header = ['Txn','Tran Date','Updated Date','Member Name','Send By','Received By','Tran Amount','Charge','Remarks','Status','UTR','Response'];
     }
     else
     {
     header = ['Txn','Tran Date','Updated Date','Member Name','Name/Mobile','Naration','Tran Amount','Charge','Service','Status','UTR','Response'];
     }
    this.excelService.exportAsExcelWitheHeader(header,excelData, 'Transaction-Report.xlsx','K1');
  }
  returnName(cp: any): any {
    if (this.activeTab == 0) {
      return cp.remName+ ' '+cp.beneficiary_number;
    }
   else if (this.activeTab == 1 || this.activeTab == 2 || this.activeTab == 3) {
      return (cp.service=='LIC'? (cp.narration+' '+ cp.remName+' '+cp.toNarration):cp.service=='ELECTRICITY'? cp.toNarration:'')+''+cp.beneficiary_acc;
    }
    else if (this.activeTab == 4) {
      return cp.toNarration;
    }
    else if (cp.service=='Fund-Request' || cp.service=='PG-Request') {
      return cp.beneficiary_number +':'+ cp.Intent;
    }
    else if (cp.service=='AEPS' && cp.mode_of_payment=='AEPS-BT') {
      return cp.toNarration;
    }
    else if (cp.service=='AEPS' && cp.mode_of_payment=='AEPS-CW') {
      return cp.narration;
    }
  }
  returnBene(cp: any): any {
    if (this.activeTab == 0 && cp.service=='QUICK_PAY' || cp.service=='TATKAL_PAY') {
      return cp.narration + ' ' +cp.beneficiary_acc +' '+ (cp.toNarration==null?'':cp.toNarration);
    }
    else if (this.activeTab == 0 && cp.service=='Verification') {
      return  cp.narration;
    }
    else if (this.activeTab == 1 || this.activeTab == 2 || this.activeTab == 3) {
      return  cp.Operator +'-'+cp.narration;
    }
    else if (this.activeTab ==4) {
      return cp.narration;
    }
    else if (cp.service=='Fund-Request') {
      return 'Fund Request :'+cp.narration + ' Mobile# '+ cp.beneficiary_acc+', '+ cp.toNarration;
    }
    else if (cp.service=='PG-Request') {
      return 'Payment Gateway:'+cp.narration + ' Mobile# '+ cp.beneficiary_acc+', '+ cp.toNarration;
    }
    else if (cp.service=='AEPS' && cp.mode_of_payment=='AEPS-BT') {
      return 'AEPS Balance Transfer To Wallet: ' +cp.toNarration;
    }
    else if (cp.service=='AEPS' && cp.mode_of_payment=='AEPS-CW') {
      return 'AEPS Commission:'+ cp.narration;
    }
  }
  returnService(cp: any): any {
    if (this.activeTab == 0) {
      return  cp.service +' '+ cp.mode_of_payment;
    }
   else if (this.activeTab == 1 || this.activeTab == 2 || this.activeTab == 3 || this.activeTab == 5) {
      return  cp.service +''+(cp.mode_of_payment=='Part-Payment'?cp.mode_of_payment:'');
    }
    else if (this.activeTab == 6) {
      return cp.mode_of_payment +' : '+ cp.Intent;
    }
    else if (this.activeTab == 4) {
      return  cp.Intent;
    }
    else if (this.activeTab == 7) {
      return cp.mode_of_payment;
    }
  }

}
