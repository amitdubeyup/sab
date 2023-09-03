import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { ExcelService } from 'src/app/services/excel.service';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pending-refund',
  templateUrl: './pending-refund.component.html',
  styleUrls: ['./pending-refund.component.css']
})
export class PendingRefundComponent implements OnInit {

  respData: any;
  fromDt: any = new Date();
  maxDate: any = new Date();
  minDate: any = new Date();
  toDt: any = new Date();
  statementList: any = [];
  activeTab: any = 0;
  isStatus: any = 'RefundPending';
  totalAmount = 0;
  totalCharge = 0;
  totalCommission = 0;
  title: string='DMT Statement';

  constructor(
    public excelService: ExcelService,
    public commonService: ApiService,
    public route: ActivatedRoute,
    public router: Router) {
  }

  ngOnInit(): void {
    // this.fromDt.setDate(this.fromDt.getDate()-90);
    this.toDt.setDate(this.toDt.getDate());
    this.getRetailerCommission('DMT');
  }

  changeText(myText: any): void {
    return myText.value;
  }

  handleChange(e: any): any {
    this.activeTab = e.index;
    if (this.activeTab === 0) {
      this.title = 'DMT Statement';
      this.getRetailerCommission('DMT');
    }
    else if (this.activeTab === 1) {
      this.title = 'Recharge Statement';
      this.getRetailerCommission('RECH');
    }
    else if (this.activeTab === 2) {
      this.title = 'BBPS Statement';
      this.getRetailerCommission('BBPS');
    }
    else if (this.activeTab === 3) {
      this.title ='Part Payment Statement';
      this.getRetailerCommission('BBPSP');
    }
    else if (this.activeTab === 4) {
      this.title = 'CMS Statement';
      this.getRetailerCommission('CMS');
    }
    else if (this.activeTab === 5) {
      this.title = 'AEPS Statement';
      this.getRetailerCommission('AEPSD');
    }
    else if (this.activeTab === 6) {
      this.title='INDO-NEP Statement'
      this.getRetailerCommission('NEP');
    }
    else if (this.activeTab === 7) {
      this.title = 'Vendor Pay Statement';
      this.getRetailerCommission('VDR');
    }
    else if (this.activeTab === 8) {
      this.title = 'UPI Statement';
      this.getRetailerCommission('UPI');
    }
    else if (this.activeTab === 9) {
      this.title = 'Travel Statement'
      this.getRetailerCommission('TRVL');
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
      this.getRetailerCommission('CMS');
    }
    else if (this.activeTab === 5) {
      this.getRetailerCommission('AEPSD');
    }
    else if (this.activeTab === 6) {
      this.getRetailerCommission('NEP');
    }
    else if (this.activeTab === 7) {
      this.getRetailerCommission('VDR');
    }
    else if (this.activeTab === 8) {
      this.getRetailerCommission('UPI');
    }
    else if (this.activeTab === 9) {
      this.getRetailerCommission('TRVL');
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
        this.commonService.getAuth('retailerreport/get-transaction-report?memberId=' + this.commonService.userPram.memberId + '&fromDt=' + fromDt + '&toDt=' + toDt + '&isStatus=' + this.isStatus + '&docType=' + docType)
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
  onRefund(data: any): any {
    console.log(data);
    const savedPin = this.commonService.decryptUsingAES256(this.commonService.userPram.mPin);
    Swal.fire({
      title: 'Please Enter MPIN',
      input: 'password',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        if (savedPin === login) {
          this.commonService.isLoader = true;
          const passingData = {
            userId: this.commonService.userPram.userId,
            memberId: this.commonService.userPram.memberId,
            Txnid: data.txn_id,
            TxnNo: data.txn_no,
            docType: this.activeTab==0?'DMT':this.activeTab==5?'AEPSD':this.activeTab==6?'NEP':this.activeTab==7?'VDR':this.activeTab==8?'UPI':this.activeTab==9?'TRVL':'RECH'
          };
          this.commonService.isLoader = true;
          this.commonService.postAES256('membersapi/refundtran', JSON.stringify(passingData))
            .subscribe(
              (res: any) => {
                this.commonService.isLoader = false;
                Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
                  this.handleSearch(this.activeTab);
                 this.commonService.fetchWalletDetails();
                });
              },
              (err: any) => {
                this.commonService.isLoader = false;
              });
        }
        else {
          Swal.showValidationMessage('Invalid M-PIN');
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    });
  }
}
