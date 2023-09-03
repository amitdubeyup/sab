import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comm-to-wallet',
  templateUrl: './comm-to-wallet.component.html',
  styleUrls: ['./comm-to-wallet.component.css']
})
export class CommToWalletComponent {
  walletDetails:any;
  creditMoneyModal:any={};
  constructor(
    public commonService: ApiService,
    public route: ActivatedRoute,
    public router: Router) {
  }

  ngOnInit(): void {
    if (this.commonService.userPram.memberId) {
    this.fetchWalletDetails(this.commonService.userPram.memberId);
    }
  }
  fetchWalletDetails(memberId: any): any {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      const url = 'users/getprantuser?memberId=' + memberId + '&userId=&parentId=&docType=COMMBAL';
      this.commonService.getAuth(url).subscribe((res: any) => {
        if (res.isSuccess) {
          this.walletDetails = res.respData;
        }
      }, (err: any) => {
        console.log(err);
      });
    }
  }
  onCreditMoneySave(): any {
    if (this.commonService.userPram.memberId && this.commonService.userPram.rmn) {
    {
    if (this.creditMoneyModal.amount < this.walletDetails.aepsBalance) {
      this.commonService.isLoader = true;
      const passingData = {
        userId: this.commonService.userPram.userId,
        memberId: this.commonService.userPram.memberId,
        templateId: '',
        remitterId:this.commonService.userPram.memberId,
        beneficiaryId: this.commonService.userPram.memberId,
        apId: '',
        serviceType: 'Commission',
        MobileNumber:this.commonService.userPram.rmn,
        paymentMode: 'CTOW',
        WalletId:this.walletDetails.wallet_id,
        numberOfTrns: 1,
        perTrnsAmount: this.creditMoneyModal.amount,
        totalTrnsAmount: this.creditMoneyModal.amount,
        BeneName: '',
        Ifsc: '',
        intent: this.creditMoneyModal.remark,
        docType: 'P1',
        recipientId: '',
        accNo: this.commonService.userPram.rmn,
        agentCode: this.commonService.userPram.id,
        refNumber: this.commonService.userPram.rmn,
        narration: "Commission Transfer To Wallet",
        udf2:this.commonService.userPram.companyName+' | '+this.commonService.userPram.rmn+' | '+this.commonService.userPram.userType+''+this.commonService.userPram.id
      };
      this.commonService.postAES256('membersapi/commtransfertowallet', JSON.stringify(passingData))
        .subscribe(
          (res: any) => {
            console.log(res);
            this.commonService.isLoader = false;
            Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
              this.creditMoneyModal = {};
              this.fetchWalletDetails(this.commonService.userPram.memberId);
              this.commonService.fetchWalletDetails();
            });
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
          });
    } 
    else {
      Swal.fire({ icon: 'error', text: 'Oops ! Insufficient Commission Balance!', confirmButtonText: 'OK' });
    }
   }
  }
 }
}


