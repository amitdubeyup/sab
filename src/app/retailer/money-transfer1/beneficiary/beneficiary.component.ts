import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { v4 as uuid } from 'uuid';
@Component({
  selector: 'app-beneficiary',
  templateUrl: './beneficiary.component.html',
  styleUrls: ['./beneficiary.component.css']
})
export class BeneficiaryComponent implements OnInit {
  remitterDetails: any = {};
  remitterId: any;
  paymentMode: any;
  pipeList: any = [];
  beneficiaryDetails: any = [];
  selectedBeneficiary: any = null;
  selectedBeneficiaryProcessed = false;
  paymentConfirmation = false;
  accNo:any='';
  displayModal = false;
  selectedData: any;
  selectedWallet: any;
  isRemitterModal:boolean=false;
  constructor(
    public commonService: ApiService,
    public route: ActivatedRoute,
    public router: Router,
    public location: Location) { }

  ngOnInit(): any {
    this.route.queryParams.subscribe((params: any) => {
      this.remitterId = params.remitterId;
      this.paymentMode = params.paymentMode;
      if(params?.acc)
      {
      this.accNo=params.acc;
      }
      else
      {
        this.accNo='';
      }
      this.remitterDetails.BankitLimit = 0;
      this.remitterDetails.PaySprintLimit = 0;
      this.remitterDetails.FinoLimit = 0;
    });
    if (this.paymentMode == 'true' || this.paymentMode == 'false') {
      this.getRemitterDetails();
      if(this.pipeList)
      {
      this.getBeneficiaryDetails();
      }
      this.commonService.fetchWalletDetails();
    }
    else {
      this.router.navigate(['/merchant/money-transfer']);
    }

  }

  back(): void {
    this.location.back();
  }
  handleChange(event: any): any {
    this.selectedWallet = this.pipeList[event.index];
    if (this.selectedWallet.apiId === '4d95ef67-d29a-11eb-9ccf-00ffa370980e') {
      this.remitterDetails.BankitLimit = this.selectedWallet.transferLimit;
      this.remitterDetails.PaySprintLimit = 0;
      this.remitterDetails.FinoLimit = 0;
      this.remitterDetails.RazorLimit=0;
    }
    else if (this.selectedWallet.apiId === '08d94c23-18bf-4ce5-8a9f-a31aac9a19f7' || this.selectedWallet.apiId === 'a1e442b5-0cab-43f9-a3d8-37725956bc5b' || this.selectedWallet.apiId === '22fe61a0-83bf-401c-bfc0-788a717838f1') {
      this.remitterDetails.BankitLimit = 0;
      this.remitterDetails.PaySprintLimit = this.selectedWallet.transferLimit;
      this.remitterDetails.FinoLimit = 0;
      this.remitterDetails.RazorLimit=0;
      this.getCustomeBal(this.selectedWallet.apiId);
    }
    else if (this.selectedWallet.apiId === 'ac1ea406-5de3-11ed-afb4-00be432ac5fc') {
      this.remitterDetails.BankitLimit = 0;
      this.remitterDetails.PaySprintLimit = 0;
      this.remitterDetails.FinoLimit = 0;
      this.remitterDetails.RazorLimit = this.selectedWallet.transferLimit;
      this.getCustomeBal(this.selectedWallet.apiId);
    }
    else if (this.selectedWallet.apiId === '333d1590-c1e6-11eb-aa88-00ffa370980e') {
      this.remitterDetails.BankitLimit = 0;
      this.remitterDetails.PaySprintLimit = 0;
      this.remitterDetails.RazorLimit=0;
      this.remitterDetails.FinoLimit = this.selectedWallet.transferLimit;
    }
    else if (this.selectedWallet.apiId === '768cde9b-c1e6-11eb-aa88-00ffa370980e' || this.selectedWallet.apiId==='0ceadbdf-4414-11ed-8d86-00be432ac5fc' || this.selectedWallet.apiId==='425779e2-9b52-11ed-8dc7-00be432ac5fc') {
      this.remitterDetails.BankitLimit = 0;
      this.remitterDetails.PaySprintLimit = 0;
      this.remitterDetails.FinoLimit = 0;
      this.remitterDetails.RazorLimit = this.selectedWallet.transferLimit;
    }

  }

  getRemitterDetails(): any {
    if (this.commonService.userPram.userId && this.commonService.userPram.memberId) {
      this.commonService.isLoader = true;
      this.commonService.getAuth('remitter/get-remitter-details?remitterId=' + this.remitterId + '&docType=id')
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.remitterDetails = JSON.parse(this.commonService.decryptUsingAES256(res.respData));
              this.remitterDetails.BankitLimit = 0;
              this.remitterDetails.PaySprintLimit = 0;
              this.remitterDetails.FinoLimit = 0;
              this.getPaymentPipe('IMPS');
            }
          },
          (err: any) => {
            this.commonService.isLoader = false;
            alert('something went wrong!');
          });
    }
  }

  getBeneficiaryDetails(): any {
    if (this.commonService.userPram.userId && this.commonService.userPram.memberId) {
      this.commonService.isLoader = true;
      this.commonService.getAuth('remitter/get-beneficiary-details?accNo=' + this.accNo + '&remitterId=' + this.remitterId + '&docType=list')
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.beneficiaryDetails = JSON.parse(this.commonService.decryptUsingAES256(res.respData));
            }
          },
          (err: any) => {
            this.commonService.isLoader = false;
            alert('something went wrong!');
          });
    }
  }
  getCustomeBal(pipeid:any): any {
    if (this.commonService.userPram.userId && this.commonService.userPram.memberId) {
      this.commonService.isLoader = true;
      this.commonService.getAuth('remitter/getcustBal?memberId=' + this.commonService.userPram.memberId + '&remtId=' + this.remitterId + '&apiid='+pipeid+'&mobileNo='+this.remitterDetails.MobileNo)
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if(res.isSuccess) {
               if (pipeid==='08d94c23-18bf-4ce5-8a9f-a31aac9a19f7' || pipeid === '22fe61a0-83bf-401c-bfc0-788a717838f1' || pipeid==='a1e442b5-0cab-43f9-a3d8-37725956bc5b' || pipeid==='ac1ea406-5de3-11ed-afb4-00be432ac5fc') {
                this.remitterDetails.BankitLimit = 0;
                this.remitterDetails.PaySprintLimit = res.limit;
                this.remitterDetails.FinoLimit = 0;
                this.remitterDetails.RazorLimit = 0;
                this.selectedWallet.transferLimit=res.limit;
              }
            }
          },
          (err: any) => {
            this.commonService.isLoader = false;
          });
    }
  }
  getPaymentPipe(pMode: any): any {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.isLoader = true;
      this.commonService.getAuth('remitter/get-api-service?remtId=' + this.remitterId + '&docType=' + this.paymentMode + '&pMode=' + pMode)
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.pipeList = res.respData;
              if (res.respData.length > 0) {
                this.selectedWallet = this.pipeList[0];
                if (this.selectedWallet.apiId === '4d95ef67-d29a-11eb-9ccf-00ffa370980e') {
                  this.remitterDetails.BankitLimit = this.selectedWallet.transferLimit;
                  this.remitterDetails.PaySprintLimit = 0;
                  this.remitterDetails.FinoLimit = 0;
                  this.remitterDetails.RazorLimit=0;
                }
                else if (this.selectedWallet.apiId === '08d94c23-18bf-4ce5-8a9f-a31aac9a19f7' || this.selectedWallet.apiId === 'a1e442b5-0cab-43f9-a3d8-37725956bc5b' || this.selectedWallet.apiId === '22fe61a0-83bf-401c-bfc0-788a717838f1') {
                  this.remitterDetails.BankitLimit = 0;
                  this.remitterDetails.PaySprintLimit = this.selectedWallet.transferLimit;
                  this.remitterDetails.FinoLimit = 0;
                  this.remitterDetails.RazorLimit=0;
                  if(this.selectedWallet.transferLimit==0)
                  {
                    this.getCustomeBal(this.selectedWallet.apiId);
                  }
                }
                else if (this.selectedWallet.apiId === 'ac1ea406-5de3-11ed-afb4-00be432ac5fc') {
                  this.remitterDetails.BankitLimit = 0;
                  this.remitterDetails.PaySprintLimit = 0;
                  this.remitterDetails.FinoLimit = 0;
                  this.remitterDetails.RazorLimit = this.selectedWallet.transferLimit;
                  this.getCustomeBal(this.selectedWallet.apiId);
                }
                else if (this.selectedWallet.apiId === '768cde9b-c1e6-11eb-aa88-00ffa370980e' || this.selectedWallet.apiId==='0ceadbdf-4414-11ed-8d86-00be432ac5fc' || this.selectedWallet.apiId==='425779e2-9b52-11ed-8dc7-00be432ac5fc') {
                  this.remitterDetails.BankitLimit = 0;
                  this.remitterDetails.PaySprintLimit = 0;
                  this.remitterDetails.FinoLimit = 0;
                  this.remitterDetails.RazorLimit = this.selectedWallet.transferLimit;

                }
              }
              else
              {
                Swal.fire({ icon: 'warning', text: 'Wallet disabled , Please Contact to System Admin', confirmButtonText: 'Ok' });
              }

            }
          },
          (err: any) => {
            alert('something went wrong!');
          });
    }
  }

  addRemitter(addType: any): any {
    const jsonData = this.commonService.encryptUsingAES256(JSON.stringify({
      remitterDetails: this.remitterDetails,
      paymentMode: this.paymentMode,
    }));
    if (addType === 'add') {
      this.router.navigate(['/merchant/money-transfer/beneficiary/addbene'], { queryParams: { data: jsonData } });
    }
    else {
      this.router.navigate(['/merchant/money-transfer/beneficiary/importbene'], { queryParams: { data: jsonData } });
    }
  }

  changeText(myText: any): any {
    return myText.value;
  }

  selectRow(index: any): any {
    this.beneficiaryDetails.forEach((el: any) => {
      el.selected = null;
      el.transferAmount = '';
      el.paymentMode = 'IMPS';
    });
    this.beneficiaryDetails[index].selected = index;
    this.selectedBeneficiary = null;
    this.selectedBeneficiaryProcessed = false;
  }

  updateAmount(event: any, index: any): any {
    if (event.target.value && event.target.value.length > 5) {
      event.target.value = event.target.value.substr(0, 5);
    }
    if (event.target.value !== undefined && event.target.value !== '') {
      this.beneficiaryDetails[index].transferAmount = Math.abs(event.target.value);
    }
    else {
      this.beneficiaryDetails[index].transferAmount = '';
    }
  }

  changePaymentMode(value: any, index: any): any {
    this.beneficiaryDetails[index].paymentMode = value;
    this.getPaymentPipe(value);
  }

  validatePayment(data: any): any {
    let amount = data.transferAmount ? parseInt(data.transferAmount, 10) : 0;
    if (this.paymentMode === 'false') {
      if (amount < 100) {
        return { status: false, message: 'Minimum transfer limit is 100.' };
      } else if (amount > parseInt(this.selectedWallet.transferLimit, 10)) {
        return { status: false, message: `Maximum transfer limit is ${this.selectedWallet.transferLimit}.` };
      } else if (amount > parseInt(this.commonService.pramwallet.walleT_BALANCE, 10)) {
        return { status: false, message: `Insufficient wallet balance.` };
      } else if ((amount > 5000)) {
        const remainder = amount % 5000;
        if ((remainder > 0) && (remainder < 100)) {
          return { status: false, message: 'Transfer amount must be in multiple of 100.' };
        } else {
          return { status: true, message: 'Amount Validated Successfully!' };
        }
      } else {
        return { status: true, message: 'Amount Validated Successfully!' };
      }
    } else {
      if (amount < 100) {
        return { status: false, message: 'Minimum transfer limit is 100.' };
      } else if (amount > parseInt(this.selectedWallet.transferLimit, 10)) {
        return { status: false, message: `Maximum transfer limit is ${this.selectedWallet.transferLimit}.` };
      } else {
        return { status: true, message: 'Amount Validated Successfully!' };
      }
    }
  }
  processPayment(data:any,mode:any): any {
    data.paymentMode=mode;
    if(data.paymentMode=='IMPS')
    {
      this.commonService.getAuth('remitter/get-bank-details?memberId=' + data.BankId + '&docType=bankdown')
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.isSuccess) {
           this.processPaymentData(data)
          }
          else
          {
            Swal.fire({ icon: 'warning',text: 'Oops ! Bank Down , Please Use NEFT', confirmButtonText: 'Okay' });
          }
        },
        (err: any) => {
        });
     }
    else
    {
      this.processPaymentData(data)
    }
   }

  processPaymentData(data: any): any {
    this.displayModal = false;
    this.selectedData = data;
    const validatedPayment = this.validatePayment(data);
    if (validatedPayment.status) {
      if (this.remitterDetails) {
        if (this.selectedWallet.apiId === '4d95ef67-d29a-11eb-9ccf-00ffa370980e') {
          this.navigateToNextPage();
        }
        else if (this.selectedWallet.apiId === '08d94c23-18bf-4ce5-8a9f-a31aac9a19f7') {
          this.navigateToNextPage();
        }
        else {
          this.navigateToNextPage();
        }
      }
      else {
        Swal.fire({ icon: 'warning', text: 'Remitter not registered in Wallet.', showCancelButton: true, cancelButtonText: 'Cancel', confirmButtonText: 'Register' }).then((modalRes: any) => {
          if (modalRes.isConfirmed) {

          }
        });
      }
    }
    else {
      Swal.fire({ icon: 'warning', title: this.selectedWallet.apiServiceName, text: validatedPayment.message, confirmButtonText: 'Okay' });
    }
  }
  navigateToNextPage(): any {
    const jsonData = this.commonService.encryptUsingAES256(JSON.stringify({
      remitterDetails: this.remitterDetails,
      paymentMode: this.paymentMode,
      walletId: this.selectedWallet.apiId,
      beneficiaryDetails: this.selectedData,
      orderid:uuid()
    }));
    this.router.navigate(['/merchant/money-transfer/beneficiary/confirmation'], { queryParams: { data: jsonData } });
  }

  cancel(): any {
    this.location.back();
  }
  onDeleteMpin(data: any): any {
    Swal.fire({
      title: 'Please Enter MPIN',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        console.log(login);
        if (login !=undefined && login!='') {
          const savedPin = this.commonService.decryptUsingAES256(this.commonService.userPram.mPin);
          if (login === savedPin) {
          const passingData = {
            userId: this.commonService.userPram.id,
            UsersId:this.commonService.userPram.userId,
            memberId: this.commonService.userPram.memberId,
            remitterId: this.remitterId,
            BeneficiaryId: data.BeneficiaryId,
            docType: this.selectedWallet.apiId,
            recipientId: data.recipientId,
            beneId: data.Beneid,
            otp:login
          };
          this.commonService.isLoader = true;
          this.commonService.postAES256('remitter/delete-beneficiary', JSON.stringify(passingData))
            .subscribe(
              (res: any) => {
                if(res.isSuccess==true)
                {
                this.commonService.isLoader = false;
                Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
                  this.getBeneficiaryDetails();
                });
               }
               else
               {
                this.commonService.isLoader = false;
                Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
                  this.onDeleteMpin(data);
                });
               }
              },
              (err: any) => {
                // console.log(err);
                this.commonService.isLoader = false;
              });
        }
        else {
          Swal.showValidationMessage('INVALID MPIN !');
        }
       }
       else {
        Swal.showValidationMessage('INVALID MPIN !');
      }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Please Wait......`
        });
      }
    });
  }

  verifyBeneficiary(cp:any): any {
    const passingData = {
      userId: this.commonService.userPram.userId,
      memberId: this.commonService.userPram.memberId,
      remitterId: cp.RemitterId,
      beneficiaryId: cp.BeneficiaryId,
      mobileNumber : this.remitterDetails.MobileNo,
      WalletId: this.commonService.pramwallet.wallet_id,
      agentCode: this.commonService.userPram.id,
      customerId: this.remitterDetails.MobileNo,
      address: this.remitterDetails.Address,
      zipCode: this.remitterDetails.ZipCode,
      bankid: cp.BankId,
      benename: cp.BeneficiaryName === undefined ? 'Sumit Kumar' : cp.BeneficiaryName,
      dob: this.remitterDetails.Dob,
      amount: '1.0',
      clientRefId: '',
      udf1: cp.BeneficiaryAcc,
      udf2: cp.Ifsc,
      refNumber: this.remitterDetails.RemitterName,
      bankName: cp.Bank,
      narration: this.commonService.userPram.companyName+' | '+this.commonService.userPram.rmn+' - '+this.commonService.userPram.userType+''+this.commonService.userPram.id,
    };
    this.commonService.isLoader = true;
    this.commonService.postAES256('transact/bankreverification', JSON.stringify(passingData)).subscribe((res: any) => {
      if (res.isSuccess) {
        this.getBeneficiaryDetails();
        Swal.fire({ icon: res.isSuccess ? 'success' : 'warning', text: res.mhOutcome +' Name :'+res.accName, confirmButtonText: 'OK' });
      }
      else {
        Swal.fire({ icon: res.isSuccess ? 'success' : 'warning', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
      this.commonService.isLoader = false;
    },
      (err: any) => {
        console.log(err);
        this.commonService.isLoader = false;
        Swal.fire({ icon: 'warning', text: 'Oops something went wrong!', confirmButtonText: 'OK' });
      });
}
}

