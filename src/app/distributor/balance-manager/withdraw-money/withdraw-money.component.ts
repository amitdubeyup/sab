import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelService } from 'src/app/services/excel.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/ApiService.service';
@Component({
  selector: 'app-withdraw-money',
  templateUrl: './withdraw-money.component.html',
  styleUrls: ['./withdraw-money.component.css']
})
export class WithdrawMoneyComponent implements OnInit {
  @ViewChild('creditMoneyForm') withdrawMoneyForm: any;
  fromDt: any = new Date();
  toDt: any = new Date();
  txnNo = '';
  coutletid: any;
  outletList: any;
  selectedMemberCr:any;
  creditMoneyModal: any = {};
  creditHistoryList: any = [];
  withdrawHistoryList: any = [];
  walletDetails: any;
  tabindex = 0;
  totalAmountCr=0;
  totalAmountDr=0;
  constructor(
    public commonService: ApiService,
    public route: ActivatedRoute,
    public location: Location,
    public excelService: ExcelService,
    public router: Router) {
  }

  ngOnInit(): void {
    this.fromDt.setDate(this.fromDt.getDate());
    this.toDt.setDate(this.toDt.getDate());
    this.getMember();
    this.route.queryParams.subscribe((params: any) => {
      if (params.tab) {
        this.tabindex=params.tab;
      } else {
        this.tabindex=0;
      }
    });
  }
  changeText(myText: any): void {
    return myText.value;
  }
  handleChange(event: any): any {
    this.tabindex = event.index;
    if (event.index === 1) {
      this.fetchWithdrawHistory();
    }

  }
  handleSearch(eidx: any): any {
    if (eidx === 1) {
      this.fetchWithdrawHistory();
    }

  }


  getMember(): any {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('users/GetMemberById?memberId=' + this.commonService.userPram.memberId + '&roleType=' + this.commonService.userPram.memberType + '&docType=DDL')
        .subscribe(
          (res: any) => {
            if (res.isSuccess) {
              this.outletList = res.respData;
              console.log(this.outletList);
            }
          },
          (err: any) => {
            console.log(err);
          });
    }
  }
  fetchWalletDetails(memberId: any): any {
    console.log(memberId);
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      const url = 'users/getprantuser?memberId=' + memberId + '&userId=&parentId=&docType=BAL';
      this.commonService.getAuth(url).subscribe((res: any) => {
        if (res.isSuccess) {
          this.walletDetails = res.respData;
          console.log(this.walletDetails);
        }
      }, (err: any) => {
        console.log(err);
      });
    }
  }
  // function to get difference between from date and to date 
  getDiffDays(sDate: any, eDate: any) {
    var startDate = new Date(sDate);
    var endDate = new Date(eDate);  
    var Time = endDate.getTime() - startDate.getTime();
    return Time / (1000 * 3600 * 24);
  }
  
  fetchWithdrawHistory(): void {
    this.commonService.isLoader = true;
    const fromDt = this.commonService.formatDate((this.fromDt ? this.fromDt : new Date()), 'yyyy-mm-dd');
    const toDt = this.commonService.formatDate((this.toDt ? this.toDt : new Date()), 'yyyy-mm-dd');
    const difference_date = this.getDiffDays(fromDt, toDt);
    if(difference_date>30){
      Swal.fire({ icon: 'success', text: 'Please select valid date - Report Restrict to one month', confirmButtonText: 'OK' });
      this.commonService.isLoader = false;
    }
	else
  {
    this.commonService.getAuth('distributor/getdistributorbal?memberId=' + this.coutletid + '&dimemberid=' + this.commonService.userPram.memberId + '&txnNo=' + this.txnNo + '&fromDt=' + fromDt + '&toDt=' + toDt + '&docType=BAL_CR').subscribe((res: any) => {
      console.log(res);
      this.commonService.isLoader = false;
      if (res.isSuccess) {
        this.withdrawHistoryList = JSON.parse(this.commonService.decryptUsingAES256(res.respData));
        console.log(this.withdrawHistoryList);
        this.totalAmountDr = 0;
        this.withdrawHistoryList.forEach((element: any) => {
          this.totalAmountDr = this.totalAmountDr + parseFloat(element.Amount);            
        });
      }
      else
      {
        this.withdrawHistoryList=null;
      }

    }, (err: any) => {
      console.log(err);
      this.commonService.isLoader = false;
      Swal.fire({ icon: 'warning', text: 'something went wrong!', confirmButtonText: 'OK' });
    });
  }    
  }
  getnarration(st: any): any {
    return this.outletList?.find((e: any) => e.code === st)?.desc;
  }

  onWithdrawMoneySave(): any {
    if(this.selectedMemberCr?.code==undefined)
    {
      Swal.fire({ icon: 'error', text: 'Please select member', confirmButtonText: 'OK' });
    }
    else
    {
    const walletBalance = this.walletDetails.walleT_BALANCE;
    console.log(walletBalance);
    if (this.creditMoneyModal.amount < walletBalance) {
      this.commonService.isLoader = true;
      const passingData = {
        userId: this.commonService.userPram.userId,
        memberId: this.selectedMemberCr?.code,
        templateId: '',
        remitterId: this.commonService.userPram.memberId,
        beneficiaryId: this.commonService.userPram.memberId,
        apId: '',
        serviceType: 'Fund-Manage',
        paymentMode: 'WALLET',
        numberOfTrns: 1,
        perTrnsAmount: this.creditMoneyModal.amount,
        totalTrnsAmount: this.creditMoneyModal.amount,
        udf2: this.getnarration(this.selectedMemberCr?.code),
        BeneName: this.getnarration(this.selectedMemberCr?.code),
        Ifsc: '',
        intent: this.creditMoneyModal.remark,
        docType: 'BAL_DR',
        recipientId: '',
        accNo: '',
        agentCode: this.commonService.userPram.id,
        refNumber: this.commonService.userPram.rmn,
        narration: this.commonService.userPram.companyName+' | '+this.commonService.userPram.rmn+' | '+this.commonService.userPram.userType+''+this.commonService.userPram.id,
      };
      this.commonService.postAES256('wallets/managefund', JSON.stringify(passingData))
        .subscribe(
          (res: any) => {
            console.log(res);
            this.commonService.isLoader = false;
            Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
              this.creditMoneyModal = {};
              this.commonService.fetchWalletDetails();         
              setTimeout(() => {
                Object.keys(this.withdrawMoneyForm.controls).forEach(key => {
                  this.withdrawMoneyForm.controls[key].setErrors(null);
                 // window.location.reload();
                 this.walletDetails=null;
                 this.selectedMemberCr=null;
                });
              }, 600);
              this.fetchWithdrawHistory();
            });
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
          });
    } else {
      Swal.fire({ icon: 'error', text: 'Insufficient Fund', confirmButtonText: 'OK' });
    }
  }
  }
  exportAsXLSX(): any {
    const excelData: any = [];
    this.withdrawHistoryList.forEach((el: any) => {
      const obj = [
         el.CreatedOn,
         el.TxnNo,
         el.ToNarration,
         el.Amount,
         el.Intent
      ];
      excelData.push(obj);
      });
      const header = ['Tran Date','	Txn Ref No','Reciver Name','Amount','Remarks'];
      this.excelService.exportAsExcelWitheHeader(header,excelData, 'WithdrawalMoneyReport.xlsx','E1');
   }
}
