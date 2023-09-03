import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { ExcelService } from 'src/app/services/excel.service';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import * as XLSX from 'xlsx'; 
@Component({
  selector: 'app-all-member-ledger',
  templateUrl: './all-member-ledger.component.html',
  styleUrls: ['./all-member-ledger.component.css']
})
export class AllMemberLedgerComponent implements OnInit {
 
  respData: any;
  fromDt: any = new Date();
  toDt: any = new Date();
  minDate:any= new Date();
  maxDate:any= new Date();
  statementList: any = [];
  activeTab: any = 0;
  totalCharge = 0;
  totalCommission = 0;
  totalTax = 0;
  totalEarning = 0;
  totalAmount = 0;
  isStatus:any=null;
  totalClosingBalance = 0;
  retList: any;
  memberList: any = [];
  searchType:any;
  selectedMemberList: any;
  totalAmountCr = 0;
  totalAmountDr =0;
  txnNo:any='';
  totalGst=0;
  constructor(
    public commonService:ApiService,
    public sharedMethodService: SharedMethodService,
    public route: ActivatedRoute,
    public excelservice: ExcelService,
    public router: Router) {
  }

  ngOnInit(): void {
    this.fromDt.setDate(this.fromDt.getDate() );
    this.toDt.setDate(this.toDt.getDate());
    this. getMember();
   // this.getRetailerCommission('all');
  }

  changeText(myText: any): void {
    return myText.value;
  }
  getMember(): any {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('users/GetMemberById?memberId=' + this.commonService.userPram.memberId + '&roleType=&docType=SA')
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
  handleChange(e: any): any {
    this.activeTab = e.index;
    if (this.activeTab === 0) {
      this.getRetailerCommission('all');
    }
    else if (this.activeTab === 1) {
      this.getRetailerCommission('comm');
    }
  }
  handleSearch(e: any): any {
    this.activeTab = e;
    if (this.activeTab === 0) {
      this.getRetailerCommission('all');
    }
    else if (this.activeTab === 1) {
      this.getRetailerCommission('comm');
    }
  }
  getRetailerCommission(docType: any): void {
    const fromDt = this.commonService.formatDate((this.fromDt ? this.fromDt : new Date()), 'yyyy-mm-dd');
    const toDt = this.commonService.formatDate((this.toDt ? this.toDt : new Date()), 'yyyy-mm-dd');
    if (this.commonService.userPram.userId && this.commonService.userPram.memberId) {
      this.commonService.isLoader = true;
      this.commonService.getAuth('admin/addhours/get-transaction-report-admin?memberId=' + this.selectedMemberList + '&fromDt=' + fromDt + '&toDt=' + toDt + '&isstatus='+this.isStatus+  '&docType=' + docType+'&st='+this.searchType+'&txnNo='+this.txnNo)
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
              if (res.isSuccess) {
              this.statementList = res.respData;
              this.totalCharge = 0;
              this.totalCommission = 0;
              this.totalTax = 0;
              this.totalEarning = 0;
              this.totalClosingBalance = 0;
              this.totalAmount = 0;
              this.totalAmountCr = 0;
              this.totalAmountDr =0;
              this.totalGst=0;
              this.statementList.forEach((element: any) => {
                this.totalAmountCr = this.totalAmountCr + parseFloat(element.amount);
                this.totalAmountDr = this.totalAmountDr + parseFloat(element.amountDr);
                this.totalCharge = this.totalCharge + parseFloat(element.charge);
                this.totalCommission = this.totalCommission + parseFloat(element.rtCommission);
                this.totalTax = this.totalTax + parseFloat(element.tdsRt);
                this.totalEarning = this.totalEarning + parseFloat(element.netEarning);
                this.totalGst = this.totalGst + parseFloat(element.gst);
              });
            }
            else
            {
              this.statementList = [];
              this.totalCharge = 0;
              this.totalCommission = 0;
              this.totalTax = 0;
              this.totalEarning = 0;
              this.totalClosingBalance = 0;
              this.totalAmount = 0;
              this.totalAmountCr = 0;
              this.totalAmountDr =0;
              this.totalGst=0;
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
    const fromDt = this.commonService.formatDate((this.fromDt ? this.fromDt : new Date()), 'yyyy-mm-dd');
    const toDt = this.commonService.formatDate((this.toDt ? this.toDt : new Date()), 'yyyy-mm-dd');
    if (this.commonService.userPram.userId && this.commonService.userPram.memberId) {
      this.commonService.isLoader = true;
      this.commonService.getAuth('admin/addhours/get-transaction-report-admin?memberId=' + this.selectedMemberList + '&fromDt=' + fromDt + '&toDt=' + toDt + '&docType=all')
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
            let exportList = res.respData;
                exportList.forEach((el: any) => {
                 const obj = [
                 el.createdOn,
                 el?.txnNo,  
                 el.memberName,
                 el.accountNumber,
                 el.udf1,
                 el.mobileNumber,
                 el.operator,
                 this.returnNarration(el), 
                 el.serviceName, 
                 el.amount,
                 el.amountDr,
                 el.charge,
                 el.rtCommission,
                 el.tdsRt,
                 el.gst,
                 el.openingBalanceAmount,
                 el.closingBalanceAmount,
                 el.status
              ];
              excelData.push(obj);
            });
            const header = ['Tran Date','Txn#','User Name','udf1','udf2','udf3','udf4','Naration','Type','Amount(CR)','Amount(DR)','Charge','Commission','TDS','GST','Opening','Closing','status'];
            this.excelservice.exportAsExcelWitheNoFormate(header,excelData, 'Outlet_Ledger.xlsx','N1');
            }
          },
          (err: any) => {
            this.commonService.isLoader = false;
          });
    }
  }
  returnNarration(cp: any): any {
    if (cp.docType==='OBAL') {
      return 'Opening Balance';
    }
    else if (cp.docType=='DMT' && cp.service!='Verification') {
      return  'Money Transfer#' + cp.txnNo + ', Ac#'+cp.accountNumber + ', IFSC#'+cp.udf1 +', Mobile#'+cp.mobileNumber;
    }  
    else if (cp.docType=='DMT' && cp.service=='Verification') {
      return 'Account Verification#'  + cp.txnNo + ', Ac#'+cp.accountNumber + ', IFSC#'+cp.udf1 +', Mobile#'+cp.mobileNumber;
    }
    else if (cp.docType=='BBPS' &&  cp.service=='ELECTRICITY') {
      return  'Electricity Bill#'+ cp.txnNo + ', CA#' + cp.accountNumber+', operator#'+cp.operator;
    }
    else if (cp.docType=='RECH' && cp.service!='DTH') {
      return  'Mobile Recharge#'+ cp.txnNo + ', Mobile#' + cp.accountNumber+', operator#'+cp.operator;
    }
    else if (cp.docType=='RECH' && cp.service=='DTH') {
      return  'DTH Recharge#'+ cp.txnNo + ', Mobile#' + cp.accountNumber+', operator#'+cp.operator;
    }
    else if (cp.docType=='BAL_CR') {
      return 'Account Credited To#'+ cp.txnNo + ' ,'+ cp.narration;
    }
    else if (cp.docType=='BAL_DR') {
      return 'Account Debited From#'+cp.txnNo+' ,'+ cp.toNarration;
    }
    else if (cp.docType=='WBAL' && cp.trasactionType=='DR') {
      return  'Account Debited#'+ cp.txnNo +' to '+ cp.narration;
    }   
    else if (cp.docType=='WBAL' && cp.trasactionType=='CR') {
      return 'Account Credited To '+ cp.narration  +' From ' + cp.toNarration;
    }
    else if (cp.docType=='FUND') {
      return 'Money Request#' +cp.txnNo  +', '+ cp.toNarration + ', Remarks:'+ cp.narration +', '+cp.Intent;
    }   
    else if (cp.docType=='COMM' && cp.modeOfPayment=='CTOW') {
      return 'Commission Transafer To Main Wallet:#'+ cp.txnNo + ' Ref# '+ cp.udf2;
    }   
    else if (cp.docType=='AEPS' && cp.modeOfPayment=='AEPS2W') {
      return 'Account Credited To AePs Wallet To Main Wallet#'+ cp.txnNo + ' ,'+ cp.toNarration;
    }
    else if (cp.service=='PG-Request') {
      return 'Payment Gateway: '+ cp.narration + ' Mobile# '+ cp.accountNumber+', '+ cp.toNarration;
    }   
    else if (cp.docType=='UTCOMM') {
      return 'Commission: '+ cp.service + ' Ref# '+ cp.rtxnNo;
    }  
    else if (cp.modeOfPayment=='Part-Payment' &&  cp.service=='ELECTRICITY') {
      return 'Part Payment : CA#'+ cp.accountNumber + ', Name : ' + cp.toNarration +', '+cp.operator;
    }
    else if (cp.modeOfPayment=='Part-Payment' &&  cp.service=='IGL-Commercial-Bill') {
      return 'IGL-Commercial-Bill : CA#'+ cp.accountNumber + ', Name : ' + cp.toNarration +', '+cp.operator;
    }
    else if (cp.modeOfPayment=='BBPS' &&  cp.service=='GAS') {
      return  'Gas Bill : CA#'+ cp.accountNumber + ', Ref#' + (cp.referenceNo==null?'':cp.referenceNo);
    }
    else if (cp.modeOfPayment=='BBPS' &&  cp.service=='WATER') {
      return 'Water Bill : CA#'+ cp.accountNumber + ', Ref#' + (cp.referenceNo==null?'':cp.referenceNo);
    }
    else if (cp.modeOfPayment=='BBPS' &&  cp.service=='INSURANCE') {
      return 'Insurance Bill : CA#'+ cp.accountNumber + ', Ref#' + (cp.referenceNo==null?'':cp.referenceNo);
    }
    else if (cp.modeOfPayment=='BBPS' &&  cp.service=='LIC') {
      return 'LIC Bill : CA#'+ cp.accountNumber +', '+cp.narration+  ', Ref#' + (cp.referenceNo==null?'':cp.referenceNo);
    }
   
    else if (cp.service=='AEPS' && cp.modeOfPayment=='AEPS-CW') {
      return 'AEPS Commission: '+ cp.narration;
    }
    else if (cp.service=='AEPS' && cp.modeOfPayment=='AEPS-BT') {
      return 'AEPS Balance Transfer To Wallet : '+ cp.toNarration +','+cp.Intent;
    }
    else if (cp.service=='CC' && cp.modeOfPayment=='CMS') {
      return 'Credit Card Bill : CC Number#'+ cp.accountNumber + ', Name#'+cp.toNarration+ ', Ref#' + (cp.referenceNo==null?'':cp.referenceNo);
    }
    else if (cp.service=='PAYTM' && cp.modeOfPayment=='CMS') {
      return 'Paytm Wallet topup : Number#'+ cp.accountNumber + ', Ref#' + (cp.referenceNo==null?'':cp.referenceNo);
    }
    else if (cp.modeOfPayment=='BBPS' &&  cp.service=='Landline') {
      return 'Landline Bill : CA#'+ cp.accountNumber + ', Ref#' + (cp.referenceNo==null?'':cp.referenceNo);
    }
    else if (cp.modeOfPayment=='BBPS' &&  cp.service=='Broadband') {
      return 'Broadband Bill : CA#'+ cp.accountNumber + ', Ref#' + (cp.referenceNo==null?'':cp.referenceNo);
    }
    else if (cp.service=='EMI' && cp.modeOfPayment=='CMS') {
      return 'EMI Payment : AC#'+ cp.accountNumber + ' ,'+cp.toNarration +', Ref#' + (cp.referenceNo==null?'':cp.referenceNo);
    }
    else if (cp.docType=='NEP') {
      return cp.modeOfPayment+ ' A/c#' + cp.accountNumber + ', Mob#'+cp.mobileNumber +', Ben#' + cp.narration +' '+ (cp.status=='Refunded'?'Refunded':'');
    }
    else if (cp.docType=='QR') {
      return cp.modeOfPayment+' A/c#' + cp.accountNumber +'-'+cp.toNarration + ', Mob#'+cp.mobileNumber +', Ben#' + cp.narration +' '+ (cp.status=='Refunded'?'Refunded':'')
    }
    else if (cp.docType=='UPI') {
      return 'Mobile Pay:' + cp.narration +' UPI#'+cp.accountNumber  +' '+ (cp.status=='Refunded'?'Refunded':'')
    }
    else if (cp.modeOfPayment=='Part-Payment' &&  cp.service=='Tata-Power-DDL') {
      return 'Tata Power  : CA#'+ cp.accountNumber + ', Name : ' + cp.toNarration +', '+cp.operator;
    }
  }
}

