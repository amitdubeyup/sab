import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { ExcelService } from 'src/app/services/excel.service';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-refund-pending',
  templateUrl: './refund-pending.component.html',
  styleUrls: ['./refund-pending.component.css']
})
export class RefundPendingComponent implements OnInit {
  respData: any;
  fromDt: any = new Date();
  toDt: any = new Date();
  statementList: any = [];
  activeTab: any = 0;
  isStatus: any = 'RefundPending';
  totalAmount = 0;
  totalCharge = 0;
  totalCommission = 0;
  retList: any;
  retid: any;
  selectedMemberList:any;
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
  }

  getRetailerCommission(docType: any): void {
    const fromDt = this.commonService.formatDate((this.fromDt ? this.fromDt : new Date()), 'yyyy-mm-dd');
    const toDt = this.commonService.formatDate((this.toDt ? this.toDt : new Date()), 'yyyy-mm-dd');
    if (this.commonService.userPram.userId && this.commonService.userPram.memberId) {
      this.commonService.isLoader = true;
      this.commonService.getAuth('admin/addhours/get-transaction-report-pending?memberId=' + this.selectedMemberList?.code + this.retid?.code + '&fromDt=' + fromDt + '&toDt=' + toDt + '&isStatus=' + this.isStatus + '&docType=' + docType)
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
      this.router.navigate(['/retailer/beneficiary/payment-receipt'], { queryParams: { txnNo: val } });
    } else {
      this.router.navigate(['/retailer/bill-payment/receipt'], { queryParams: { txnNo: val } });
    }

  }

  exportAsXLSX(): any {
    const excelData: any = [];
    this.statementList.forEach((el: any) => {
      const obj = {
        'Txn Id': el.txn_no,
        'Ref Id': el.ReferenceNo,
        'Created On': el.trasaction_date,
        'Updated On': el.updatedOn,
        'Name': el.remName,
        'Mobile': el.beneficiary_number,
        'Beneficiary': el.beneficiary_acc,
        'Operator': el.Operator,
        'Narration': el.narration,
        'To Narration': el.toNarration,
        'Amount': el.amount,
        'Charge': el.charge,
        'Service': el.service,
        'Status': el.status,
        'UTR': el.utr,
        'Response': el.api_msg,
      };
      excelData.push(obj);
    });
    this.excelService.exportAsExcelFile(excelData, 'Transaction');
  }
 
}
