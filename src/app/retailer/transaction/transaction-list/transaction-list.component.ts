import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { DataService } from 'src/app/services/data.service';
import { ExcelService } from 'src/app/services/excel.service';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';
import { RtClaimComponent } from '../rt-claim/rt-claim.component';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  respData: any;
  fromDt: any = new Date();
  toDt: any = new Date();
  minDate:any= new Date();
  maxDate:any= new Date();
  statementList: any = [];
  activeTab: any = 0;
  isStatus: any = null;
  totalAmount = 0;
  totalCharge = 0;
  totalCommission = 0;
  public searchType:any;
  txnNo:any='';
  showblogo: boolean = false;
  complaintModelPopup:any = false;
  complaintModel:any={};
  constructor(
    public excelService: ExcelService,
    public commonService: ApiService,
    public sharedMethodService: SharedMethodService,
    public route: ActivatedRoute,
    public dataService: DataService,
    public dialog: MatDialog,
    public router: Router) {
  }

  ngOnInit(): void {
    this.fromDt.setDate(this.fromDt.getDate());
    this.toDt.setDate(this.toDt.getDate());
    this.getRetailerCommission('DMT');
  }
   // function to get difference between from date and to date
   getDiffDays(sDate: any, eDate: any) {
    var startDate = new Date(sDate);
    var endDate = new Date(eDate);
    var Time = endDate.getTime() - startDate.getTime();
    return Time / (1000 * 3600 * 24);
    }
  changeText(myText: any): void {
    return myText.value;
  }
  handleChange(e: any): any {
    this.activeTab = e.index;
    if (this.activeTab === 0) {
      this.getRetailerCommission('DMT');
      this.showblogo = false;
    }

  }

  handleSearch(docTab: any): any {
    this.activeTab = docTab;
    if (this.activeTab === 0) {
      this.getRetailerCommission('DMT');
    }
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
            },
            (err: any) => {
              this.commonService.isLoader = false;
            });
      }
    }

  }
  // to open complaint popup
  openComplaintPopup(cp: any){
    this.complaintModelPopup = !this.complaintModelPopup;
    this.complaintModel = cp;
    this.complaintModel.mobileNo = cp.beneficiary_number;
  }
  raiseComplaint(){
    if (this.commonService.userPram.userId && this.commonService.userPram.memberId) {

    if(this.complaintModel.description.trim().length == 0)
        {
          Swal.fire({icon: 'error',text: 'Please enter description.',confirmButtonText: 'OK'});
          return;
        }

    this.commonService.isLoader = true;
    let postData: any = {};
    postData.CustomerName = this.complaintModel.customerName;
    postData.MobileNo = this.complaintModel.mobileNo;
    postData.TxnNo = this.complaintModel.txn_no;
    postData.ParticipationType = this.complaintModel.participationType;
    postData.ServiceReason = this.complaintModel.serviceReason;
    postData.Description = this.complaintModel.description.trim();
    postData.ComplaintBy = this.commonService.userPram.memberId;
    postData.UpdatedBy =  this.commonService.userPram.memberId;
    console.log(postData);

    this.commonService.postAES256('complaint/raise-complaint', JSON.stringify(postData)).subscribe((res: any) => {
      if (res.isSuccess) {
        this.commonService.isLoader = false;
        Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' });
        this.complaintModel={};
        this.complaintModelPopup = !this.complaintModelPopup;
      }
      else {
        this.commonService.isLoader = false;
        Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
    },
      (err: any) => {
        this.commonService.isLoader = false;
      });
    }
  }
  getTransactionStatus(tid:any,api:any): void {
    if (this.commonService.userPram.userId && this.commonService.userPram.memberId) {
      this.commonService.isLoader = true;
      let  url="";
      if(api=='333d1590-c1e6-11eb-aa88-00ffa370980e')
      {
       url = `commonapi/get-dmt-status?memberId=${this.commonService.userPram.memberId}&tid=${tid}&docType=fino`;
      }
      else
      {
       url = `commonapi/get-dmt-status?memberId=${this.commonService.userPram.memberId}&tid=${tid}&docType=cashfree`;
      }
      this.commonService.getAuth(url)
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              Swal.fire({ icon: 'success', title:'Status', text:res.mhOutcome, confirmButtonText: 'Okay' });
              this.handleSearch(0);
            }
            else
            {
              Swal.fire({ icon: 'warning', title:'Status', text:res.mhOutcome, confirmButtonText: 'Okay' });
            }
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
          });
    }
  }
  getPaysprintStatus(tid:any): void {
    if (this.commonService.userPram.userId && this.commonService.userPram.memberId) {
      this.commonService.isLoader = true;
      const url = `commonapi/get-dmt-paysprint-status?memberId=${this.commonService.userPram.memberId}&tid=${tid}&docType=paysprint`;
      this.commonService.getAuth(url)
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              Swal.fire({ icon: 'success', title:'Status', text:res.mhOutcome, confirmButtonText: 'Okay' });
              this.handleSearch(0);
            }
            else
            {
              Swal.fire({ icon: 'warning', title:'Status', text:res.mhOutcome, confirmButtonText: 'Okay' });
            }
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
          });
    }
  }
  printReceipt(cp: any): any {
  const jsonData = this.commonService.encryptUsingAES256(JSON.stringify({
        txnNo: cp.txn_id,
    }));
    this.router.navigate(['/merchant/money-transfer/beneficiary/receipt'], { queryParams: { data: jsonData } });
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
    if (this.activeTab == 0 || this.activeTab == 11  || this.activeTab == 12 || this.activeTab == 13 || this.activeTab == 14) {
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
      return  cp.beneficiary_number;
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
    else if (cp.service=='QR-PAYMENT') {
      return cp.narration + ' ,' +cp.beneficiary_acc +' '+ (cp.toNarration==null?'':cp.toNarration);
    }
    else if (cp.service=='UPI-1') {
      return cp.narration + ' ,' +cp.beneficiary_acc;
    }
    else if (cp.service=='Verification' && cp.mode_of_payment=='UPI') {
      return cp.narration ;
    }
    else if (cp.service=='PAYTM' || cp.service=='AMAZON') {
      return  'Topup '+ cp.remName+ ' '+ cp.beneficiary_acc;
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
  openClaim(cp:any): void {
    let dialogRef = this.dialog.open(RtClaimComponent, {
      width: '350px',
      data: {cp:cp},
    });
    dialogRef.afterClosed().subscribe((result) => {this.handleSearch(this.activeTab) });
  }

  hideComplaintPopup(){
    this.complaintModelPopup = !this.complaintModelPopup;
    this.complaintModel = {};
  }
}

