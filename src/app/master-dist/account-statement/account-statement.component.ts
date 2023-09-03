import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { ExcelService } from 'src/app/services/excel.service';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.css']
})
export class AccountStatementComponent {

  respData: any;
  fromDt: any = new Date();
  toDt: any = new Date();
  statementList: any = [];
  activeTab: any = 0;
  totalCharge = 0;
  totalCommission = 0;
  totalTax = 0;
  totalEarning = 0;
  totalClosingBalance = 0;
  totalAmountCr = 0;
  totalAmountDr = 0;
  isStatus: any = null;
  constructor(
    public commonService: ApiService,
    public excelService: ExcelService,
    public route: ActivatedRoute,
    public sharedMethodService: SharedMethodService,
    public router: Router) {
  }

  ngOnInit(): void {
    this.fromDt.setDate(this.fromDt.getDate() );
    this.toDt.setDate(this.toDt.getDate());
    this.getRetailerCommission('all');
  }

  changeText(myText: any): void {
    return myText.value;
  }


  handleChange(e: any): any {
    this.activeTab = e.index;
    if (this.activeTab === 0) {
      if(this.isStatus==null || this.isStatus==undefined)
      {
      this.getRetailerCommission('all');
      }
      else
      {
        this.getRetailerCommission(this.isStatus);
      }
    } 
  }
  handleSearch(e: any): any {
    this.activeTab = e;
    if (this.activeTab === 0) {
      if(this.isStatus==null || this.isStatus==undefined)
      {
      this.getRetailerCommission('all');
      }
      else
      {
        this.getRetailerCommission(this.isStatus);
      }
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
      this.commonService.getAuth('retailerreport/get-transaction-commission?memberId=' + this.commonService.userPram.memberId + '&fromDt=' + fromDt + '&toDt=' + toDt + '&docType=' + docType)
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.statementList = JSON.parse(this.commonService.decryptUsingAES256(res.respData));
              console.log(this.statementList);
              this.totalCharge = 0;
              this.totalCommission = 0;
              this.totalTax = 0;
              this.totalEarning = 0;
              this.totalClosingBalance = 0;
              this.totalAmountCr = 0;
              this.totalAmountDr = 0;
              this.statementList.forEach((element: any) => {
                this.totalAmountCr = this.totalAmountCr + parseFloat(element.Amount);
                this.totalAmountDr = this.totalAmountDr + parseFloat(element.AmountDr);
                this.totalCharge = this.totalCharge + parseFloat(element.Charge);
                this.totalCommission = this.totalCommission + parseFloat(element.RtCommission);
                this.totalTax = this.totalTax + parseFloat(element.TdsRt);
                this.totalEarning = this.totalEarning + parseFloat(element.NetEarning);
                this.totalClosingBalance =parseFloat(element.ClosingBalanceAmount);
              });
            }
            else
            {
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
    const header = ['Trn Date', 'Txn Id','Member Name', 'Narration', 'Amount(CR)','Amount(DR)','Charge', 'Commission','TDS','Net Earning','Balance'];
    this.statementList.forEach((el: any) => {
      const obj = [
        el.CreatedOn,
        el.TxnNo,
        el.MemberName,
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
    if (cp.DocType==='OBAL') {
      return 'Opening Balance';
    }
    else if (cp.DocType=='DMT' && cp.Service!='Verification') {
      return  'Money Transfer#' + cp.TxnNo + ', Ac#'+cp.AccountNumber + ', IFSC#'+cp.udf1 +', Mobile#'+cp.MobileNumber;
    }
    else if (cp.DocType=='DMT' && cp.Service=='Verification') {
      return 'Account Verification#'  + cp.TxnNo + ', Ac#'+cp.AccountNumber + ', IFSC#'+cp.udf1 +', Mobile#'+cp.MobileNumber;
    }
    else if (cp.DocType=='BBPS' &&  cp.Service=='ELECTRICITY') {
      return  'Electricity Bill#'+ cp.TxnNo + ', CA#' + cp.AccountNumber+', Operator#'+cp.Operator;
    }
    else if (cp.DocType=='RECH' && cp.Service!='DTH') {
      return  'Mobile Recharge#'+ cp.TxnNo + ', Mobile#' + cp.AccountNumber+', Operator#'+cp.Operator;
    }
    else if (cp.DocType=='BAL_CR') {
      return 'Account Credited To#'+ cp.TxnNo + ' ,'+ cp.Narration;
    }
    else if (cp.DocType=='BAL_DR') {
      return 'Account Debited From#'+cp.TxnNo+' ,'+ cp.ToNarration;
    }
    else if (cp.DocType=='WBAL' && cp.TrasactionType=='DR') {
      return  'Account Debited#'+ cp.TxnNo +' to '+ cp.Narration;
    }  
    else if (cp.DocType=='COMM' && cp.ModeOfPayment=='CTOW') {
      return  cp.Narration+"#" +cp.TxnNo;
    }   
    else if (cp.DocType=='WBAL' && cp.TrasactionType=='CR') {
      return 'Account Credited To '+ cp.Narration  +' From ' + cp.ToNarration;
    }
    else if (cp.DocType=='FUND') {
      return 'Money Request#' +cp.TxnNo  +', '+ cp.ToNarration + ', Remarks:'+ cp.Narration +', '+cp.Intent;
    }
    else if (cp.Service=='TATKAL_PAY' && cp.DocType!='COMM') {
      return 'Money Transfer : A/c#' + cp.AccountNumber + ', Mob#'+cp.MobileNumber +', Ben#' +cp.Narration;
    }
    else if (cp.Service=='AEPS-BANK') {
      return 'Money Transfer : A/c#' + cp.AccountNumber + ', Mob#'+cp.MobileNumber +', Ben#' +cp.ToNarration;
    }
    else if (cp.DocType=='COMM') {
      return 'AEPS Commission: '+ cp.Service + ' Ref# '+ cp.RtxnNo;
    }   
    else if (cp.Service=='PG-Request') {
      return 'Payment Gateway: '+ cp.Narration + ' Mobile# '+ cp.AccountNumber+', '+ cp.ToNarration;
    }
   
    else if (cp.DocType=='UTCOMM') {
      return 'Commission: '+ cp.Service + ' Ref# '+ cp.RtxnNo;
    }  
    else if (cp.ModeOfPayment=='Part-Payment' &&  cp.Service=='ELECTRICITY') {
      return 'Part Payment : CA#'+ cp.AccountNumber + ', Name : ' + cp.ToNarration +', '+cp.Operator;
    }
    else if (cp.ModeOfPayment=='Part-Payment' &&  cp.Service=='IGL-Commercial-Bill') {
      return 'IGL-Commercial-Bill : CA#'+ cp.AccountNumber + ', Name : ' + cp.ToNarration +', '+cp.Operator;
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
    else if (cp.ModeOfPayment=='BBPS' &&  cp.Service=='Landline') {
      return 'Landline Bill : CA#'+ cp.AccountNumber + ', Ref#' + (cp.ReferenceNo==null?'':cp.ReferenceNo);
    }
    else if (cp.ModeOfPayment=='BBPS' &&  cp.Service=='Broadband') {
      return 'Broadband Bill : CA#'+ cp.AccountNumber + ', Ref#' + (cp.ReferenceNo==null?'':cp.ReferenceNo);
    }
    else if (cp.Service=='EMI' && cp.ModeOfPayment=='CMS') {
      return 'EMI Payment : AC#'+ cp.AccountNumber + ' ,'+cp.ToNarration +', Ref#' + (cp.ReferenceNo==null?'':cp.ReferenceNo);
    }
    else if (cp.DocType=='NEP') {
      return cp.ModeOfPayment+ ' A/c#' + cp.AccountNumber + ', Mob#'+cp.MobileNumber +', Ben#' + cp.Narration +' '+ (cp.Status=='Refunded'?'Refunded':'');
    }
    else if (cp.DocType=='QR') {
      return cp.ModeOfPayment+' A/c#' + cp.AccountNumber +'-'+cp.ToNarration + ', Mob#'+cp.MobileNumber +', Ben#' + cp.Narration +' '+ (cp.Status=='Refunded'?'Refunded':'')
    }
    else if (cp.DocType=='UPI') {
      return 'Mobile Pay:' + cp.Narration +' UPI#'+cp.AccountNumber  +' '+ (cp.Status=='Refunded'?'Refunded':'')
    }
    else if (cp.ModeOfPayment=='Part-Payment' &&  cp.Service=='Tata-Power-DDL') {
      return 'Tata Power  : CA#'+ cp.AccountNumber + ', Name : ' + cp.ToNarration +', '+cp.Operator;
    }
  }
}
