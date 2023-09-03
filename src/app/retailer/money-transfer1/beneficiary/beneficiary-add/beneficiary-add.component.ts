import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/services/ApiService.service';
@Component({
  selector: 'app-beneficiary-add',
  templateUrl: './beneficiary-add.component.html',
  styleUrls: ['./beneficiary-add.component.css']
})
export class BeneficiaryAddComponent implements OnInit {
  modalData: any = {};
  ifscData: any = {};
  respData: any;
  remitterDetails: any;
  remitterId: any;
  paymentMode: any;
  isModel = false;
  bankList: any = [];
  stateList: any = [];
  cityList: any = [];
  districtList: any = [];
  branchList: any = [];
  branchDetails: any = null;
  beniId: any;
  paramsData: any;
  accountMatched = true;
  showbank: boolean = false;  
  stNo: any;
  showError: boolean = false;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public location: Location,
    public commonService: ApiService,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params.data) {
        this.paramsData = JSON.parse(this.commonService.decryptUsingAES256(params.data));
        this.remitterDetails = this.paramsData.remitterDetails;
        this.paymentMode = this.paramsData.paymentMode;
        this.beniId = params.beniId;
        this.modalData.beneficiaryNumber = this.remitterDetails.MobileNo;

      }
    });
    this.modalData.isVerified = 0;
    this.getBankList();
    if (this.beniId) {
      this.getBeneficiaryDetails();
    }
  }
  receivedifscCode(ifsc: any) {
      this.modalData.ifsc = ifsc;
      this.modalData.bankId = this.bankList.find((e: any) => e.bankCode === ifsc)?.bankId;  
      this.showError = false;
  }

  getIfsc(st: any): void {
    if (this.bankList) {
      this.modalData.ifsc = this.bankList.find((e: any) => e.bankId === st)?.bankCode;
    } else {
      return;
    }
  }
  back(): any {
    this.location.back();
  }
  accConfirm(acc: any) {

  }
  getBankList(): any {
    this.commonService.isLoader = true;
    this.commonService.getAuth('retailer/get-bank-details?memberId=' + this.commonService.userPram.memberId + '&docType=ddl')
      .subscribe(
        (res: any) => {
          this.commonService.isLoader = false;
          if (res.isSuccess) {
            this.bankList = res.respData;    
            // console.log('banklist-->', this.bankList)       
          }
          // console.log(this.bankList);
        },
        (err: any) => {
          this.commonService.isLoader = false;
        });
  }

  validateAccount(): any {
    this.accountMatched = false;
    if(this.modalData.beneficiaryAcc && this.modalData.rebeneficiaryAcc) {
      if(this.modalData.beneficiaryAcc === this.modalData.rebeneficiaryAcc) {
        this.accountMatched = true;
      }
    }
  }

  onSubmit(): any {
    // console.log('retailer benificiary add component')
    this.modalData.memberId = this.commonService.userPram.memberId;
    this.modalData.remitterId = this.remitterDetails.RemitterId;
    this.modalData.remitterNumber = this.remitterDetails.MobileNo;
    this.modalData.mobileNumber = this.remitterDetails.MobileNo;    
    this.modalData.dob = this.remitterDetails.Dob;
    this.modalData.address = this.remitterDetails.Address;
    this.modalData.zipCode = this.remitterDetails.ZipCode;
    this.modalData.agentCode = this.commonService.userPram.id;
    this.modalData.bank = this.getDesc(this.modalData.bankId);
    this.modalData.rebeneficiaryAcc=this.modalData.beneficiaryAcc;
    if (!this.modalData.bank) {
      this.showError = true;
    }
  
    else {
      this.commonService.isLoader = true;
      this.modalData.memberId = this.commonService.userPram.memberId;
      this.modalData.remitterId = this.remitterDetails.RemitterId;
      this.modalData.remitterNumber = this.remitterDetails.MobileNo;
      this.modalData.dob = this.remitterDetails.Dob;
      this.modalData.address = this.remitterDetails.Address;
      this.modalData.zipCode = this.remitterDetails.ZipCode;
      this.modalData.agentCode = this.commonService.userPram.id;
      this.modalData.bank = this.getDesc(this.modalData.bankId);

      this.commonService.isLoader = false;
      // Swal.fire({ icon: 'warning', text:  JSON.stringify(this.modalData), confirmButtonText: 'OK' });
      // return;
      this.commonService.postAES256('remitter/add-beneficiary', JSON.stringify(this.modalData)).subscribe((res: any) => {
        this.commonService.isLoader = false;
        if (res.isSuccess) {
          Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'Okay!' }).then((result) => {
            if (result.isConfirmed) {
              this.back();
            }
          });
        }
        else {
          Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'OK' });
        }
      },
        (err: any) => {
          this.commonService.isLoader = false;
          if (err.message) {
          }
        });
    }
  }

  getDesc(st: any): void {
    // console.log('st-->', st)
    if (this.bankList) {
      return this.bankList.find((e: any) => e.bankId === st)?.bankName;
    } else {
      return;
    }
  }
  // No need to call this function

  // getIfsc(st: any): void {
  //   console.log('st:->', st)
  //   if (this.bankList) {
  //     this.modalData.ifsc = this.bankList.find((e: any) => e.bankId === st)?.bankCode;
  //   } else {
  //     return;
  //   }
  // }

  openModal(isModel: any): void {
    this.isModel = isModel;
    this.stateList = [];
    this.cityList = [];
    this.districtList = [];
    this.branchList = [];
    this.branchDetails = null;
    this.ifscData = {};
  }

  bankSelected(event: any): any {
    this.commonService.getAuth(`retailer/get-bank-filter?memberId=${this.commonService.userPram.memberId}&bankId=${this.ifscData.bankCode}&state=&city=&district=&docType=state`)
      .subscribe(
        (res: any) => {
          // console.log(res);
          if (res.isSuccess) {
            this.stateList = res.respData;
            this.cityList = [];
            this.districtList = [];
            this.branchList = [];
            this.ifscData.stateCode = null;
            this.ifscData.cityCode = null;
            this.ifscData.districtCode = null;
            this.ifscData.branchCode = null;
            this.branchDetails = null;
          }
        },
        (err: any) => {
          console.log(err);
        });
  }

  show_banklist(): any{
   this.showbank = !this.showbank; 
  }
  stateSelected(event: any): any {
    this.commonService.getAuth(`retailer/get-bank-filter?memberId=${this.commonService.userPram.memberId}&bankId=${this.ifscData.bankCode}&state=${this.ifscData.stateCode}&city=&district=&docType=city`)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.isSuccess) {
            this.cityList = res.respData;
            this.districtList = [];
            this.branchList = [];
            this.ifscData.cityCode = null;
            this.ifscData.districtCode = null;
            this.ifscData.branchCode = null;
            this.branchDetails = null;
          }
        },
        (err: any) => {
          console.log(err);
        });
  }

  citySelected(event: any): any {
    this.commonService.getAuth(`retailer/get-bank-filter?memberId=${this.commonService.userPram.memberId}&bankId=${this.ifscData.bankCode}&state=${this.ifscData.stateCode}&city=${this.ifscData.cityCode}&district=&docType=district`)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.isSuccess) {
            this.districtList = res.respData;
            this.branchList = [];
            this.ifscData.districtCode = null;
            this.ifscData.branchCode = null;
            this.branchDetails = null;
          }
        },
        (err: any) => {
          console.log(err);
        });
  }

  districtSelected(event: any): any {
    this.commonService.getAuth(`retailer/get-bank-filter?memberId=${this.commonService.userPram.memberId}&bankId=${this.ifscData.bankCode}&state=${this.ifscData.stateCode}&city=${this.ifscData.cityCode}&district=${this.ifscData.districtCode}&docType=branch`)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.isSuccess) {
            this.branchList = res.respData;
            this.ifscData.branchCode = null;
            this.branchDetails = null;
          }
        },
        (err: any) => {
          console.log(err);
        });
  }

  branchSelected(event: any): any {
    this.commonService.getAuth(`retailer/get-bank-information?memberId=${this.commonService.userPram.memberId}&bankId=${this.ifscData.bankCode}&state=${this.ifscData.stateCode}&city=${this.ifscData.cityCode}&district=${this.ifscData.districtCode}&branch=${this.ifscData.branchCode}&docType=details`)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.isSuccess) {
            this.branchDetails = res.respData;
          }
        },
        (err: any) => {
          console.log(err);
        });
  }

  onIfscSearch(): any {
    this.modalData.ifsc = this.branchDetails.ifsc;
    this.modalData.bankId = this.ifscData.bankCode;
    this.openModal(false);
  }
  processPayment(): any {
    this.modalData.rebeneficiaryAcc=this.modalData.beneficiaryAcc;
    if (!this.modalData.beneficiaryAcc) {
      Swal.fire({ icon: 'warning', text: 'Beneficiary account is required!', confirmButtonText: 'OK' });
      return false;
    }
    if (!this.modalData.rebeneficiaryAcc) {
      Swal.fire({ icon: 'warning', text: 'Confirm beneficiary account is required!', confirmButtonText: 'OK' });
      return false;
    }
    if (this.modalData.beneficiaryAcc !== this.modalData.rebeneficiaryAcc) {
      Swal.fire({ icon: 'warning', text: `Account number doesn't match!`, confirmButtonText: 'OK' });
      return false;
    }
    if (!this.modalData.ifsc) {
      Swal.fire({ icon: 'warning', text: `IFSC is required!`, confirmButtonText: 'OK' });
      return false;
    }
    
    else {
      this.commonService.getAuth('retailer/get-bank-details?memberId=' +this.modalData.bankId + '&docType=ifsc')
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.isSuccess) {
           this.verifyBeneficiary();
          }
          else
          {
            //this.verifyBeneficiary();
            Swal.fire({ icon: 'warning',text: 'Oops ! We are facing technical issues. or Bank Down', confirmButtonText: 'Okay' });
          }
        },
        (err: any) => {
        }); 
      }      
   }
  verifyBeneficiary(): any {
      const passingData = {
        userId: this.commonService.userPram.userId,
        memberId: this.commonService.userPram.memberId,
        remitterId: this.remitterDetails.RemitterId,
        mobileNumber : this.remitterDetails.MobileNo, 
        WalletId: this.commonService.pramwallet.wallet_id,
        agentCode: this.commonService.userPram.id,
        customerId: this.remitterDetails.MobileNo,
        address: this.remitterDetails.Address,
        zipCode: this.remitterDetails.ZipCode,
        bankid: this.modalData.bankId,
        benename: this.modalData.beneficiaryName === undefined ? 'Sonu Kumar' : this.modalData.beneficiaryName,
        dob: this.remitterDetails.Dob,
        amount: '1.0',
        clientRefId: '',
        udf1: this.modalData.beneficiaryAcc,
        udf2: this.modalData.ifsc,
        refNumber: this.remitterDetails.RemitterName,
        bankName: this.getDesc(this.modalData.bankId),
        narration: this.commonService.userPram.companyName+' | '+this.commonService.userPram.rmn+' - '+this.commonService.userPram.userType+''+this.commonService.userPram.id,
      };
      console.log(passingData);
      this.commonService.isLoader = true;
      this.commonService.postAES256('transact/bankverification', JSON.stringify(passingData)).subscribe((res: any) => {
        console.log(res);
        if (res.isSuccess) {
          this.modalData.isVerified = 1;
          this.modalData.beneficiaryName = res.accName;
          Swal.fire({ icon: res.isSuccess ? 'success' : 'warning', text: res.mhOutcome, confirmButtonText: 'OK' });
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

  getBeneficiaryDetails(): any {
    if (this.commonService.userPram.userId && this.commonService.userPram.memberId) {
      this.commonService.isLoader = true;
      this.commonService.getAuth('remitter/get-beneficiary-details?accNo=' + this.beniId + '&remitterId=' + this.remitterDetails.RemitterId + '&docType=id')
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              const result = JSON.parse(this.commonService.decryptUsingAES256(res.respData));
              if (result) {
                this.modalData.beneficiaryAcc = result[0].BeneficiaryAcc;
                this.modalData.rebeneficiaryAcc = result[0].BeneficiaryAcc;
                this.modalData.beneficiaryName = result[0].BeneficiaryName;
                this.modalData.beneficiaryNumber = result[0].BeneficiaryNumber;
                this.modalData.bankId = result[0].BankId;
                this.modalData.ifsc = result[0].Ifsc;
              }
              // console.log(this.modalData);
            }
          },
          (err: any) => {
            this.commonService.isLoader = false;
            alert('something went wrong!');
          });
    }
  }
}

