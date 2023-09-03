import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  statementList: any = [];
  activeTab: any = 0;
  isStatus: any = null;
  totalAmount = 0;
  totalCharge = 0;
  totalCommission = 0;
  searchType:any;
  txnNo:any='';

  constructor(
    public excelService: ExcelService,
    public commonService: ApiService,
    public sharedMethodService: SharedMethodService,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public router: Router) {
  }

  ngOnInit(): void {
    this.fromDt.setDate(this.fromDt.getDate());
    this.toDt.setDate(this.toDt.getDate());
    this.getRetailerCommission('DMT');
  }

  changeText(myText: any): void {
    return myText.value;
  }

  handleChange(e: any): any {
    this.activeTab = e.index;

   if (this.activeTab === 0) {
      this.getRetailerCommission('WBAL');
    }
    else if (this.activeTab === 1) {
      this.getRetailerCommission('FUND');
    }
    else if (this.activeTab === 2) {
      this.getRetailerCommission('PG');
    }

  }

  handleSearch(docTab: any): any {
    this.activeTab = docTab;
    if (this.activeTab === 0) {
      this.getRetailerCommission('WBAL');
    }
    else if (this.activeTab === 1) {
      this.getRetailerCommission('FUND');
    }
    else if (this.activeTab === 2) {
      this.getRetailerCommission('PG');
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
      this.commonService.getAuth('retailerreport/get-transaction-report?memberId=' + this.commonService.userPram.memberId + '&fromDt=' + fromDt + '&toDt=' + toDt + '&isStatus=' + this.isStatus + '&docType=' + docType+'&st='+this.searchType+'&txnNo='+this.txnNo)
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
            console.log(this.statementList);
          },
          (err: any) => {
            this.commonService.isLoader = false;
          });
    }
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
    let header = ['Txn','Tran Date','Updated Date','Name/Mobile','Naration','Tran Amount','Charge','Service','Status','UTR','Response'];     if(this.activeTab == 0)
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
   if (this.activeTab == 0) {
      return cp.toNarration;
    }
    else if (cp.service=='Fund-Request' || cp.service=='PG-Request') {
      return cp.beneficiary_number +':'+ cp.Intent;
    }
    else
    {
      return cp.remName+ ' '+cp.beneficiary_number;
    }
  }
  returnBene(cp: any): any {
   if (this.activeTab ==0) {
      return cp.narration;
    }
    else if (cp.service=='Fund-Request') {
      return 'Fund Request :'+cp.narration + ' Mobile# '+ cp.beneficiary_acc+', '+ cp.toNarration;
    }
    else if (cp.service=='PG-Request') {
      return 'Payment Gateway:'+cp.narration + ' Mobile# '+ cp.beneficiary_acc+', '+ cp.toNarration;
    }

  }
  returnService(cp: any): any {
    if (this.activeTab == 1 || this.activeTab == 2 || this.activeTab == 3 || this.activeTab == 5) {
      return  cp.service +''+(cp.mode_of_payment=='Part-Payment'?cp.mode_of_payment:'');
    }
    else if (this.activeTab == 6) {
      return cp.mode_of_payment +' : '+ cp.Intent;
    }
    else if (this.activeTab == 0) {
      return  cp.Intent;
    }
    else if (this.activeTab == 7) {
      return cp.mode_of_payment;
    }
  }

}
