import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.css']
})
export class AccountStatementComponent implements OnInit {

  respData: any;
  fromDt: any = new Date();
  toDt: any = new Date();
  minDate:any= new Date();
  maxDate:any= new Date();
  statementList: any = [];
  activeTab: any = 0;
  retList: any;
  retid: any;
  searchType:any;
  totalAmount = 0;
  totalCharge = 0;
  totalCommission = 0;
  memberList: any = [];
  totalTax = 0;
  totalEarning = 0;
  totalClosingBalance = 0;
  totalDsCommission = 0;
  totalAmountCr =0;
  totalAmountDr = 0;
  txnNo:any='';
  isStatus: any = null;
  constructor(
    public commonService:ApiService,
    public route: ActivatedRoute,
    public sharedMethodService: SharedMethodService,
    public excelService: ExcelService,
    public router: Router) {
  }

  ngOnInit(): void {
    this.fromDt.setDate(this.fromDt.getDate());
    this.toDt.setDate(this.toDt.getDate());
    this.getMember();
  }

  changeText(myText: any): void {
    return myText.value;
  }
  getMember(): any {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('users/GetMemberById?memberId=' + this.commonService.userPram.memberId + '&roleType=RT&docType=ADMIN')
        .subscribe(
          (res: any) => {
            if (res.isSuccess) {
              this.retList = res.respData;
            }
            else{
              this.retList=null;
            }
          },
          (err: any) => {
            console.log(err);
          });
    }
  }

  handleChange(e: any): any {
    this.activeTab = e.index;
    if (this.activeTab == 0) {
      this.getRetailerCommission('all');
    }
   else if (this.activeTab == 1) {
      this.getRetailerCommission('DMT');
    }
    else if (this.activeTab == 2) {
      this.getRetailerCommission('RECH');
    }
    else if (this.activeTab == 3) {
      this.getRetailerCommission('BBPS');
    }
    else if (this.activeTab == 4) {
      this.getRetailerCommission('WBAL');
    }
    else if (this.activeTab == 5) {
      this.getRetailerCommission('FUND');
    }
    else if (this.activeTab == 6) {
      this.getRetailerCommission('PG');
    }
    else if (this.activeTab == 7) {
      this.getRetailerCommission('AEPS');
    }
    else if (this.activeTab == 8) {
      this.getRetailerCommission('AEPSD');
    }
    else if (this.activeTab == 9) {
      this.getRetailerCommission('AEPS2');
    }
  }
  handleSearch(e: any): any {
    this.activeTab = e;
    if (this.activeTab == 0) {
      this.getRetailerCommission('all');
    }
    else if (this.activeTab == 1) {
      this.getRetailerCommission('DMT');
    }
    else if (this.activeTab == 2) {
      this.getRetailerCommission('RECH');
    }
    else if (this.activeTab == 3) {
      this.getRetailerCommission('BBPS');
    }
    else if (this.activeTab == 4) {
      this.getRetailerCommission('WBAL');
    }
    else if (this.activeTab == 5) {
      this.getRetailerCommission('FUND');
    }
    else if (this.activeTab == 6) {
      this.getRetailerCommission('PG');
    }
    else if (this.activeTab == 7) {
      this.getRetailerCommission('AEPS');
    }
    else if (this.activeTab == 8) {
      this.getRetailerCommission('AEPSD');
    }
    else if (this.activeTab == 9) {
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
      this.commonService.getAuth('retailerreport/get-transaction-commission-ds?memberId=' + this.retid?.code + '&fromDt=' + fromDt + '&toDt=' + toDt + '&isStatus=' + this.isStatus + '&docType=' + docType+'&st='+this.searchType+'&txnNo='+this.txnNo)
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.statementList = JSON.parse(this.commonService.decryptUsingAES256(res.respData));
              console.log(this.statementList);
              this.totalAmount = 0;
              this.totalCharge = 0;
              this.totalCommission = 0;
              this.totalTax = 0;
              this.totalEarning = 0;
              this.totalClosingBalance = 0;
              this.totalAmountCr =0;
              this.totalAmountDr = 0;
              this.statementList.forEach((element: any) => {                
                this.totalAmountCr = this.totalAmountCr + parseFloat(element.Amount);
                this.totalAmountDr = this.totalAmountDr + parseFloat(element.AmountDr);
                this.totalCharge = this.totalCharge + parseFloat(element.Charge);
                this.totalCommission = this.totalCommission + parseFloat(element.RtCommission);               
                this.totalTax = this.totalTax + parseFloat(element.TdsRt);
                if(element.Status=='Refunded')
                {
                  this.totalEarning = this.totalEarning - parseFloat(element.NetEarning);
                }
                else
                {
                this.totalEarning = this.totalEarning + parseFloat(element.NetEarning);
                }
                this.totalClosingBalance = parseFloat(element.ClosingBalanceAmount);
              });
            }
            else
            {
              this.statementList=null;
            }
          },
          (err: any) => {
            this.commonService.isLoader = false;
          });
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
    const header = ['Trn Date', 'Txn Id', 'Narration', 'Amount(CR)','Amount(DR)','Charge', 'Commission','TDS','Net Earning','Balance'];
    this.statementList.forEach((el: any) => {
      const obj = [
        el.CreatedOn,
        el.TxnNo,
        this.returnNarration(el),
        el.Amount,
        el.AmountDr,
        el.Charge,
        el.RtCommission,
        el.TdsRt,
        el.NetEarning,
        el.ClosingBalanceAmount
      ];
      excelData.push(obj);
    });
    this.excelService.exportAsExcelWitheHeader(header,excelData, 'Ledger-Report.xlsx','I1');
  }
  returnNarration(cp: any): any {
    if (cp.Service==='OBAL') {
      return cp.Narration;
    }
   else if (cp.Service==='QUICK_PAY' && cp.DocType!='COMM') {
      return  'Money Transfer :  A/c#' + cp.AccountNumber + ', Mob#'+cp.MobileNumber +', Ben#' + cp.Narration;
    }
    else if (cp.Service=='TATKAL_PAY' && cp.DocType!='COMM') {
      return 'Money Transfer : A/c#' + cp.AccountNumber + ', Mob#'+cp.MobileNumber +', Ben#' +cp.Narration;
    }
    else if (cp.DocType=='COMM') {
      return 'AEPS Commission: '+ cp.Service + ' Ref# '+ cp.RtxnNo;
    }
    else if (cp.Service=='Verification') {
      return 'Account Verification  A/c#' + cp.AccountNumber + ', Mob#'+cp.MobileNumber +', Ben#' + cp.ToNarration;
    }
    else if (cp.Service=='Fund-Request') {
      return 'Fund Ref#' +cp.ReferenceNo + ','+cp.Intent + ' Mobile# '+ cp.AccountNumber +' ,'+ cp.Narration +', '+ cp.ToNarration;
    }
    else if (cp.Service=='PG-Request') {
      return 'Payment Gateway: '+ cp.Narration + ' Mobile# '+ cp.AccountNumber+', '+ cp.ToNarration;
    }
    else if (cp.ModeOfPayment=='RECH' && cp.DocType!='UTCOMM') {
      return (cp.Service=='DTH'?'DTH Recharge : ': 'Mobile Recharge : ') + cp.AccountNumber + ', Ref#' + (cp.ReferenceNo==null?'':cp.ReferenceNo);
    }
    else if (cp.DocType=='UTCOMM') {
      return 'Commission: '+ cp.Service + ' Ref# '+ cp.RtxnNo;
    }
    else if (cp.ModeOfPayment=='BBPS' &&  cp.Service=='ELECTRICITY') {
      return  'Electricity Bill : CA#'+ cp.AccountNumber + ', Ref#' + (cp.ReferenceNo==null?'':cp.ReferenceNo)+', '+cp.Operator;
    }
    else if (cp.ModeOfPayment=='Part-Payment' &&  cp.Service=='ELECTRICITY') {
      return 'Part Payment : CA#'+ cp.AccountNumber + ', Name : ' + cp.ToNarration +', '+cp.Operator;
    }
    else if (cp.ModeOfPayment=='BBPS' &&  cp.Service=='GAS') {
      return  'Gas Bill : CA#'+ cp.AccountNumber + ', Ref#' + (cp.ReferenceNo==null?'':cp.ReferenceNo);
    }
    else if (cp.ModeOfPayment=='BBPS' &&  cp.Service=='WATER') {
      return 'Water Bill : CA#'+ cp.AccountNumber + ', Ref#' + (cp.ReferenceNo==null?'':cp.ReferenceNo);
    }
    else if (cp.ModeOfPayment=='BBPS' &&  cp.Service=='INSURANCE') {
      return 'Insurance Bill : CA#'+ cp.AccountNumber + ', Ref#' + (cp.ReferenceNo==null?'':cp.ReferenceNo);
    }
    else if (cp.ModeOfPayment=='BBPS' &&  cp.Service=='LIC') {
      return 'LIC Bill : CA#'+ cp.AccountNumber +', '+cp.Narration+  ', Ref#' + (cp.ReferenceNo==null?'':cp.ReferenceNo);
    }
    else if (cp.ModeOfPayment=='WALLET' &&  cp.Service=='Balance-Manager' && cp.TrasactionType=='CR') {
      return 'Account Credited To '+ cp.Narration + ' From ' + cp.ToNarration;
    }
    else if (cp.ModeOfPayment=='WALLET' &&  cp.Service=='Balance-Manager' && cp.TrasactionType=='DR') {
      return 'Account Debited From-Ref#'+cp.ReferenceNo+','+cp.Narration + ' To ' + cp.ToNarration;
    }
    if (cp.ModeOfPayment=='WALLET' &&  cp.Service=='wallet-to-wallet' && cp.TrasactionType=='CR') {
      return 'Account Credited To '+ cp.Narration  +' From ' + cp.ToNarration;
    }
    else if (cp.ModeOfPayment=='WALLET' &&  cp.Service=='wallet-to-wallet' && cp.TrasactionType=='DR') {
      return  'Account Debited From- '+cp.ToNarration  + ' To ' + cp.Narration;
    }   
    else if (cp.Service=='AEPS' && cp.ModeOfPayment=='AEPS-CW') {
      return 'AEPS Commission: '+ cp.Narration;
    }
    else if (cp.Service=='AEPS' && cp.ModeOfPayment=='AEPS-BT') {
      return 'AEPS Balance Transfer To Wallet : '+ cp.ToNarration +','+cp.Intent;
    }
    else if (cp.Service=='CC' && cp.ModeOfPayment=='CMS') {
      return 'Credit Card Bill : CC Number#'+ cp.AccountNumber + ', Name#'+cp.ToNarration+ ', Ref#' + (cp.ReferenceNo==null?'':cp.ReferenceNo);
    }
    else if (cp.Service=='PAYTM' && cp.ModeOfPayment=='CMS') {
      return 'Paytm Wallet topup : Number#'+ cp.AccountNumber + ', Ref#' + (cp.ReferenceNo==null?'':cp.ReferenceNo);
    }
  }
}
