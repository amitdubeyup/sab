import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from 'src/app/layout/layout.module';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { ExcelService } from 'src/app/services/excel.service';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dist-comm',
  templateUrl: './dist-comm.component.html',
  styleUrls: ['./dist-comm.component.css']
})
export class DistCommComponent {

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
    this.getRetailerCommission('COMM');
  }

  changeText(myText: any): void {
    return myText.value;
  }


  handleChange(e: any): any {
    this.activeTab = e.index;
    if (this.activeTab === 0) {
      if(this.isStatus==null || this.isStatus==undefined)
      {
      this.getRetailerCommission('COMM');
      }
    }
    else if (this.activeTab === 0) {
      this.getRetailerCommission('COMM');
    }   
  }
  handleSearch(e: any): any {
    this.activeTab = e;
    if (this.activeTab === 0) {
      if(this.isStatus==null || this.isStatus==undefined)
      {
      this.getRetailerCommission('COMM');
      }
    }
    else if (this.activeTab === 0) {
      this.getRetailerCommission('COMM');
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
      this.commonService.getAuth('retailerreport/get-transaction-commission-ds?memberId=' + this.commonService.userPram.memberId + '&fromDt=' + fromDt + '&toDt=' + toDt + '&docType=' + docType)
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
    else if (cp.DocType=='COMM' && (cp.ModeOfPayment=='IMPS' || cp.ModeOfPayment=='NEFT')) {
      return  'Money Transfer Comm#' + cp.TxnNo +' ,'+cp.ToNarration;
    }
    else if (cp.DocType=='COMM' && cp.ModeOfPayment=='CTOW') {
      return  cp.Narration+"#" +cp.TxnNo;
    }    
  }
}
