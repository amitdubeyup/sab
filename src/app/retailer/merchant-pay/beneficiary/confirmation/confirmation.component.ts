import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/services/ApiService.service';
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  paramsData: any;
  remitterId: any;
  walletId: any;
  paymentMode: any;
  remitterDetails: any;
  beneficiaryDetails: any;
  commissionDetails: any;
  matchedCommission: any;
  fareList: any = [];
  totalAmount: any;
  totalCharge: any;
  totalFareFinal: any;
  mPin: any;
  remark: any;
  lat:any;
  lag:any;
  disable_btn: boolean= false;

  constructor(
    public commonService: ApiService,
    public route: ActivatedRoute,
    public router: Router,
    public location: Location) { }

  ngOnInit(): void {
    this.commonService.fetchWalletDetails();
    this.route.queryParams.subscribe((params: any) => {
      if (params.data) {
        this.paramsData = JSON.parse(this.commonService.decryptUsingAES256(params.data));
        this.remitterDetails = this.paramsData.remitterDetails;
        this.paymentMode = this.paramsData.paymentMode;
        this.walletId = this.paramsData.walletId;
        this.beneficiaryDetails = this.paramsData.beneficiaryDetails;
      }
    });
     console.log(this.paramsData);
    this.getRemitterCommission();
    // this.getLocation();
    this.commonService.getPosition().then(pos=>
      {
         console.log(`Positon: ${pos.lng} ${pos.lat}`);
         this.lat = pos.lat;
         this.lag = pos.lng;
        //  console.log('lat, long', this.lat, this.lag)
        });
  }

  getRemitterCommission(): void {
    if (this.commonService.userPram.userId && this.commonService.userPram.memberId && this.commonService.userPram.dmtTemplate) {
      this.commonService.isLoader = true;
      this.commonService.getAuth('transact/getcommission?remitterId=' + this.remitterDetails.RemitterId + '&memberId=' + this.commonService.userPram.memberId + '&templateId=' + this.commonService.userPram.dmtTemplate + '&apId=' + this.walletId + '&docType=DMT&pmode=' + (this.beneficiaryDetails.paymentMode+"-VDR"))
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.commissionDetails = JSON.parse(this.commonService.decryptUsingAES256(res.respData));
               console.log("comm",this.commissionDetails);
              this.updateFareDetails();
            }
          },
          (err: any) => {
            this.commonService.isLoader = false;
            alert('something went wrong!');
          });
    }
  }

  updateFareDetails(): any {
    const transferLimit = this.commissionDetails.TransferLimit;
    let transferAmount = this.beneficiaryDetails.transferAmount;
    console.log(transferAmount,transferLimit);
    this.fareList = [];
    let amountV = 0;
    let rateV = 0;
    while (transferAmount > transferLimit) {
      amountV = transferLimit;
      rateV = transferLimit * this.commissionDetails.Rate/100;
      console.log(rateV);
      this.fareList.push({
        trnsAmount: amountV,
        rate: rateV,
        trnsCharge: rateV
      });
      transferAmount = transferAmount - transferLimit;
    }
    if (transferAmount > 1000) {
      amountV = transferAmount;
      rateV = transferAmount * this.commissionDetails.Rate/100;
      this.fareList.push({
        trnsAmount: amountV,
        rate: rateV,
        trnsCharge: rateV
      });
    }
    if (transferAmount <= 1000) {
      this.fareList.push({
        trnsAmount: transferAmount,
        rate: 0,
        trnsCharge: 10
      });
    }
    this.totalAmount = 0;
    this.totalCharge = 0;
    this.fareList.forEach((element: any) => {
      this.totalAmount = this.totalAmount + element.trnsAmount;
      this.totalCharge = this.totalCharge + element.trnsCharge;
    });
    this.totalAmount = parseInt(this.totalAmount, 10);
    this.totalCharge = parseInt(this.totalCharge, 10);
    this.totalFareFinal = this.totalAmount + this.totalCharge;
  }

  cancel(): void {
    this.location.back();
  }

  confirmPayment(): void {
    this.disable_btn = true;
    const savedPin = this.commonService.decryptUsingAES256(this.commonService.userPram.mPin);
    const walletBalance = this.commonService.pramwallet.walleT_BALANCE;
    if(this.totalAmount>0 &&  this.totalCharge>0)
    {
    if (this.totalFareFinal < walletBalance) {
      if (this.mPin === savedPin) {
        this.commonService.isLoader = true;
        const passingData = {
          userId: this.commonService.userPram.userId,
          memberId: this.commonService.userPram.memberId,
          templateId: this.commonService.userPram.dmtTemplate,
          remitterId: this.remitterDetails.RemitterId,
          beneficiaryId: this.beneficiaryDetails.BeneficiaryId,
          apId: this.walletId,
          serviceType: (this.paymentMode === 'true') ? 'SPEEDY_PAY' : 'RAPID_PAY',
          paymentMode: this.beneficiaryDetails.paymentMode,
          numberOfTrns: this.fareList.length,
          perTrnsAmount: this.beneficiaryDetails.transferAmount,
          totalTrnsAmount: this.beneficiaryDetails.transferAmount,
          mobileNumber: this.remitterDetails.MobileNo,
          BeneName: this.beneficiaryDetails.BeneficiaryName,
          Ifsc: this.beneficiaryDetails.Ifsc,
          intent: this.remark==undefined?"Ok": this.remark,
          docType: this.beneficiaryDetails.paymentMode+"-VDR",
          recipientId: this.beneficiaryDetails.recipientId,
          accNo: this.beneficiaryDetails.BeneficiaryAcc,
          agentCode: this.commonService.userPram.id,
          operators: this.remitterDetails.RemitterName,
          trnsList: this.fareList,
          BankName:this.beneficiaryDetails?.Bank,
          order_id:this.paramsData?.orderid,
          lat:this.lat==undefined?"":this.lat,
          lng:this.lag==undefined?"":this.lat,
          udf2:this.commonService.userPram.companyName+' | '+this.commonService.userPram.rmn+' | '+this.commonService.userPram.userType+''+this.commonService.userPram.id
        };
        if(passingData.apId){
          this.commonService.postAES256('transact/paymentprocessing', JSON.stringify(passingData))
          .subscribe(
            (res: any) => {
              // console.log(res);
              this.commonService.isLoader = false;
              this.disable_btn = false;
              if(res.isSuccess==true)
              {
              Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
                const jsonData = this.commonService.encryptUsingAES256(JSON.stringify({
                  txnNo: res.txnNo,
                }));
                this.commonService.fetchWalletDetails();
                this.router.navigate(['/merchant/merchant-transfer/beneficiary/receipt'], { queryParams: {remitterId:this.remitterDetails.RemitterId,paymentMode:this.paymentMode,data: jsonData } });
              });
              }
              else
              {
                Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'Ok' });
              }

            },
            (err: any) => {
              // console.log(err);
              this.commonService.isLoader = false;
            });
        }
        else
        {
          this.commonService.isLoader = false;
          Swal.fire({ icon: 'warning', text: 'Please Select Wallet', confirmButtonText: 'Ok' });

        }

      } else {
        Swal.fire({ icon: 'error', text: 'Invalid PIN', confirmButtonText: 'Ok' });
      }
    } else {
      Swal.fire({ icon: 'error', text: 'Insufficient wallet', confirmButtonText: 'Ok' });
    }
   }
   else
   {
    Swal.fire({ icon: 'error', text: 'Something went wrong', confirmButtonText: 'Ok' });
   }
  }
}
