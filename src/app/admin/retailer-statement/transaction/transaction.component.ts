import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { ExcelService } from 'src/app/services/excel.service';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  respData: any;
  fromDt: any = new Date();
  toDt: any = new Date();
  minDate:any= new Date();
  maxDate:any= new Date();
  statementList: any = [];
  activeTab: any = 0;
  isStatus: any = null;
  memberList: any = [];
  totalAmount = 0;
  totalCharge = 0;
  totalCommission = 0;
  retList: any;
  selectedMemberList:any;
  searchType:any;
  txnNo:any='';
  constructor(
    public excelService: ExcelService,
    public commonService:ApiService,
    public sharedMethodService: SharedMethodService,
    public route: ActivatedRoute,
    public router: Router) {
  }

  ngOnInit(): void {
    this.fromDt.setDate(this.fromDt.getDate());
    this.toDt.setDate(this.toDt.getDate());
    this.getMember();
    this.getRetailerCommission('DMT');
  }
  getMember(): any {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('users/GetMemberById?memberId=' + this.commonService.userPram.memberId + '&roleType=RT&docType=ADMIN')
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
      this.getRetailerCommission('DMT');
    }
    else if (this.activeTab === 1) {
      this.getRetailerCommission('RECH');
    }
    else if (this.activeTab === 2) {
      this.getRetailerCommission('BBPS');
    }
    else if (this.activeTab === 3) {
      this.getRetailerCommission('BBPSP');
    }
    else if (this.activeTab === 4) {
      this.getRetailerCommission('WBAL');
    }
    else if (this.activeTab === 5) {
      this.getRetailerCommission('FUND');
    }
    else if (this.activeTab === 6) {
      this.getRetailerCommission('PG');
    }
    else if (this.activeTab === 7) {
      this.getRetailerCommission('AEPS');
    }
    else if (this.activeTab === 8) {
      this.getRetailerCommission('CMS');
    }
    else if (this.activeTab === 9) {
      this.getRetailerCommission('AEPSD');
    }
    else if (this.activeTab === 10) {
      this.getRetailerCommission('NEP');
    }
    else if (this.activeTab === 11) {
      this.getRetailerCommission('VDR');
    }
    else if (this.activeTab === 12) {
      this.getRetailerCommission('AEPS2');
    }
  }

  handleSearch(docTab: any): any {
    this.activeTab = docTab;
    if (this.activeTab === 0) {
      this.getRetailerCommission('DMT');
    }
    else if (this.activeTab === 1) {
      this.getRetailerCommission('RECH');
    }
    else if (this.activeTab === 2) {
      this.getRetailerCommission('BBPS');
    }
    else if (this.activeTab === 3) {
      this.getRetailerCommission('BBPSP');
    }
    else if (this.activeTab === 4) {
      this.getRetailerCommission('WBAL');
    }
    else if (this.activeTab === 5) {
      this.getRetailerCommission('FUND');
    }
    else if (this.activeTab === 6) {
      this.getRetailerCommission('PG');
    }
    else if (this.activeTab === 7) {
      this.getRetailerCommission('AEPS');
    }
    else if (this.activeTab === 8) {
      this.getRetailerCommission('CMS');
    }
    else if (this.activeTab === 9) {
      this.getRetailerCommission('AEPSD');
    }
    else if (this.activeTab === 10) {
      this.getRetailerCommission('NEP');
    }
    else if (this.activeTab === 11) {
      this.getRetailerCommission('VDR');
    }
    else if (this.activeTab === 12) {
      this.getRetailerCommission('AEPS2');
    }
  }
  getMemberList(docType:any): void {
    this.commonService.isLoader = true;
    this.commonService.getAuth('users/GetMemberById?memberId=' + this.commonService.userPram.memberId + '&roleType=&docType='+docType)
      .subscribe(
        (res: any) => {
          this.commonService.isLoader = false;
          if (res.isSuccess) {
            this.memberList = res.respData;
          }
        },
        (err: any) => {
          console.log(err);
          this.commonService.isLoader = false;
        });
  }
  getRetailerCommission(docType: any): void {
    const fromDt = this.commonService.formatDate((this.fromDt ? this.fromDt : new Date()), 'yyyy-mm-dd');
    const toDt = this.commonService.formatDate((this.toDt ? this.toDt : new Date()), 'yyyy-mm-dd');
    if (this.commonService.userPram.userId && this.commonService.userPram.memberId) {
      this.commonService.isLoader = true;
      this.commonService.getAuth('retailerreport/get-transaction-report?memberId=' + this.selectedMemberList?.code + '&fromDt=' + fromDt + '&toDt=' + toDt + '&isStatus=' + this.isStatus + '&docType=' + docType+'&st='+this.searchType+'&txnNo='+this.txnNo)
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
              this.statementList = [];
            }
            console.log(this.statementList);
          },
          (err: any) => {
            this.commonService.isLoader = false;
          });
    }
  }

  printReceipt(val: any): any {
    if (this.activeTab === 0) {
      const jsonData = this.commonService.encryptUsingAES256(JSON.stringify({
        txnNo: val,
      }));
      this.router.navigate(['/retailer/beneficiary/payment-receipt'], { queryParams: { data: jsonData } });
    } else {
      this.router.navigate(['/retailer/bill-payment/receipt'], { queryParams: { txnNo: val } });
    }
  }

  exportAsXLSX(): any {
    const excelData: any = [];
    this.statementList.forEach((el: any) => {
      const obj = [
        el.txn_no,
        el.trasaction_date,
        el.updatedOn,
        this.returnName(el), 
        this.returnBene(el),
        el.amount,
        el.charge,
        this.returnService(el),
        el.status,
        el.mode_of_payment=='Part-Payment'?'SoulPay':el.utr,
        el.api_msg,
      ];
      excelData.push(obj);
    });
     let header = ['Txn','Tran Date','Updated Date','Name/Mobile','Beneficiary','Tran Amount','Charge','Service','Status','UTR','Response'];
     if(this.activeTab == 1 || this.activeTab == 2 || this.activeTab == 3)
     {
     header = ['Txn','Tran Date','Updated Date','Name/Mobile','Operator','Tran Amount','Charge','Service','Status','UTR','Response'];
     }
     else if(this.activeTab == 4)
     {
     header = ['Txn','Tran Date','Updated Date','Send By','Received By','Tran Amount','Charge','Remarks','Status','UTR','Response'];
     }
     else 
     {
     header = ['Txn','Tran Date','Updated Date','Name/Mobile','Naration','Tran Amount','Charge','Service','Status','UTR','Response'];
     }
    this.excelService.exportAsExcelWitheHeader(header,excelData, 'Transaction-Report.xlsx','K1');
  }
  returnName(cp: any): any {
    if (this.activeTab == 0 || this.activeTab == 11) {
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
    else if (cp.service=='AEPS' && cp.mode_of_payment=='AEPS-CW') {
      return cp.narration;
    }
    else if (cp.mode_of_payment=='CMS') {
      return cp.beneficiary_number;
    }
  }
  returnBene(cp: any): any {
    if ((this.activeTab == 0 || this.activeTab == 11) && (cp.service=='QUICK_PAY' || cp.service=='TATKAL_PAY')) {
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
    else if (cp.service=='EMI' && cp.mode_of_payment=='CMS') {
      return  'EMI Payment '+ cp.toNarration+' '+ cp.beneficiary_acc+','+cp.Operator;
    }
  }
  returnService(cp: any): any {
    if (this.activeTab == 0 || this.activeTab == 11) {
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
    else if (this.activeTab == 7 ||this.activeTab == 8) {
      return cp.mode_of_payment;
    }
  }

  checkPaysprintTxnStatus(cp:any):void {
    this.commonService.isLoader = true;
    this.commonService.getAuth('commonapi/get-dmt-paysprint-status?memberId=' + this.commonService.userPram.memberId 
  + '&tid='+cp.txn_id+'&docType=DMT')
    .subscribe(
      (res: any) => {
        this.commonService.isLoader = false;
        Swal.fire({ icon: res.isSuccess ? 'success' : 'error', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
          if (res.isSuccess) {
            this.handleSearch(0);
          }
        });
      },
      (err: any) => {console.log(err);});
  }

}
