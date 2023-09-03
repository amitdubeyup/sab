import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ApiService } from 'src/app/services/ApiService.service';
declare const $: any;

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {
  rechargeType = false;
  rechargeStage = 1;
  operatorList = [
    { id: 1, name: 'Airtel', logo: 'assets/images/1555311132380.png'},
    { id: 2, name: 'BSNL', logo: 'assets/images/1555325713574.png' },
    { id: 3, name: 'Jio', logo: 'assets/images/1548842919961.png' },
    { id: 4, name: 'Vi', logo: 'assets/images/1599763691135.png' },
  ];

  circleList = [
    { id: 1, name: 'Andhra Pradesh' },
    { id: 2, name: 'Assam' },
    { id: 3, name: 'Bihar Jharkhand' },
    { id: 4, name: 'Chennai' },
    { id: 5, name: 'Delhi & NCR' },
    { id: 6, name: 'Gujarat' },
    { id: 7, name: 'Haryana' },
    { id: 8, name: 'Himachal Pradesh' },
    { id: 9, name: 'Jammu & Kashmir' },
    { id: 10, name: 'Karnataka' },
    { id: 11, name: 'Kerala' },
    { id: 12, name: 'Kolkata' },
    { id: 13, name: 'Maharashtra & Goa' },
    { id: 14, name: 'MP & Chattisgarh' },
    { id: 15, name: 'Mumbai' },
    { id: 16, name: 'North East' },
    { id: 17, name: 'Orissa' },
    { id: 18, name: 'Punjab' },
    { id: 19, name: 'Rajasthan' },
    { id: 20, name: 'Tamilnadu' },
    { id: 21, name: 'UP(EAST)' },
    { id: 22, name: 'UP(WEST) & Uttarakhand' },
    { id: 23, name: 'West Bengal' },
    { id: 51, name: 'All India (except Delhi/Mumbai)' }
  ];

  rechargeModal: any = {
    mobile: null,
    operator: null,
    operatorLogo: null,
    operatorName: null,
    circle: null,
    circleName: null,
    amount: null,
  };
  displayPlan = false;
  pipeList: any;
  serviceData: any = {};
  constructor(
    public commonService: ApiService,
    public route: ActivatedRoute,
    public router: Router,
    public location: Location) {
  }

  ngOnInit(): void {
  }

  goBack(): any {
    this.location.back();
  }
  getPaymentPipe(Category: any): any {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.isLoader=true;
      this.commonService.getAuth('recharge/get-api-service?isMaxAmt=fales&ApiType=RECH&Category='+Category+'&maxAmount=0')
        .subscribe(
          (res: any) => {
            this.commonService.isLoader=false;
            if (res.isSuccess) {
              this.pipeList = res.respData;
              if(this.pipeList)
              {
                this.rechargeStage = 2;
              }
              else
              {
                  Swal.fire({ icon: 'warning', text: 'This service is temporarily unavailable,please try again later', confirmButtonText: 'Okay' });
              }
            }
          },
          (err: any) => {
            this.commonService.isLoader=false;
            alert('something went wrong!');
          });
    }
  }

  updateMobile(event: any): void {
    try {
      event.target.value = parseInt(event.target.value.substr(0, 10), 10);
    } catch {
      event.target.value = 0;
    }
    this.rechargeModal.mobile = Math.abs(event.target.value);
    if (this.rechargeModal.mobile.toString().length === 10) {
      this.commonService.getAuth(`recharge/get-recharge-oprator?mobileNo=${this.rechargeModal.mobile}&docType=icore`)
        .subscribe(
          (res: any) => {
            if (res.isSuccess && res.respData) {
              const data = (res.respData).split('|');
              const operatorName = ((data[1]).split(':')[1]).toLowerCase();
              const circleName = ((data[2]).split(':')[1]).toLowerCase();
              const operatorData = this.operatorList.filter((element) => operatorName.includes((element.name).toLowerCase()));
              const circleData = this.circleList.filter((element) => circleName.includes((element.name).toLowerCase()));
              this.rechargeModal.operator = operatorData.length ? operatorData[0].id : this.operatorList[0].id;
              this.rechargeModal.operatorLogo = operatorData.length ? operatorData[0].logo : this.operatorList[0].logo;
              this.rechargeModal.operatorName = operatorData.length ? operatorData[0].name : this.operatorList[0].name;
              this.rechargeModal.circle = circleData.length ? circleData[0].id : this.circleList[0].id;
              this.rechargeModal.circleName = circleData.length ? circleData[0].name : this.circleList[0].name;
            } else {
              this.rechargeModal.operator = this.operatorList[0].id;
              this.rechargeModal.operatorLogo = this.operatorList[0].logo;
              this.rechargeModal.operatorName = this.operatorList[0].name;
              this.rechargeModal.circle = this.circleList[0].id;
              this.rechargeModal.circleName = this.circleList[0].name;
            }
            this.rechargeModal.amount = 0;
            this.displayPlan = true;
          },
          (err: any) => {
            this.rechargeModal.operator = this.operatorList[0].id;
            this.rechargeModal.operatorLogo = this.operatorList[0].logo;
            this.rechargeModal.operatorName = this.operatorList[0].name;
            this.rechargeModal.circle = this.circleList[0].id;
            this.rechargeModal.circleName = this.circleList[0].name;
            this.rechargeModal.amount = 0;
            this.displayPlan = true;
          });
    } else {
      this.displayPlan = false;
    }
  }

  updateOperator(event: any): void {
    this.operatorList.forEach((element: any) => {
      if (element.id === event) {
        this.rechargeModal.operator = element.id;
        this.rechargeModal.operatorLogo = element.logo;
        this.rechargeModal.operatorName = element.name;
      }
    });
  }

  updateCircle(event: any): void {
    this.rechargeModal.circle = event.id;
    this.rechargeModal.circleName = event.name;
  }

  updateAmount(event: any): void {
    try {
      event.target.value = parseInt(event.target.value, 10);
    } catch {
      event.target.value = 0;
    }
    this.rechargeModal.amount = Math.abs(event.target.value);
  }

  next(): void {
    if (this.rechargeModal.amount >= 10) {
      this.getPaymentPipe((this.rechargeType === true ? 'Postpaid-' + this.rechargeModal?.operatorName : 'Prepaid-' + this.rechargeModal?.operatorName));
    } else {
      Swal.fire({ icon: 'warning', text: `Invalid ${this.rechargeType ? 'bill' : 'recharge'} amount`, confirmButtonText: 'Okay' });
    }
  }

  back(): void {
    this.rechargeStage = 1;
  }

  confirm(): any {
    if (this.rechargeModal.amount >= 10)
    {
    if(this.pipeList)
    {
      const savedPin = this.commonService.decryptUsingAES256(this.commonService.userPram.mPin);
      if (this.rechargeModal.mPin === savedPin) {
        this.onConfirm(this.pipeList.apiId);
      }
    else {
      Swal.fire({ icon: 'warning', text: 'Please enter valid MPIN', confirmButtonText: 'Okay' });
    }
    }
    else
    {
        Swal.fire({ icon: 'warning', text: 'This service is temporarily unavailable,please try again later', confirmButtonText: 'Okay' });
    }
    }
    else {
      Swal.fire({ icon: 'warning', text: `Invalid ${this.rechargeType ? 'bill' : 'recharge'} amount`, confirmButtonText: 'Okay' });
    }
  }
  onConfirm(apiId: any): void {
    const walletBalance = this.commonService.pramwallet.walleT_BALANCE;
    if (this.rechargeModal.amount < walletBalance) {
        this.commonService.isLoader = true;
        const passingData = {
          userId: this.commonService.userPram.userId,
          memberId: this.commonService.userPram.memberId,
          remitterId: this.commonService.userPram.memberId,
          templateId: this.commonService.userPram.rechTemplate,
          apId: apiId,
          serviceType: this.rechargeType === true ? 'Postpaid': 'Prepaid',
          paymentMode: 'RECH',
          perTrnsAmount: this.rechargeModal.amount,
          accNo: this.rechargeModal.mobile,
          mobileNumber: this.commonService.userPram.rmn,
          docType: 'RECH',
          operators:this.rechargeType === true ? 'Postpaid-' + this.rechargeModal?.operatorName : 'Prepaid-' + this.rechargeModal?.operatorName,
          narration: this.rechargeModal?.circleName,
          operatorId:this.rechargeModal?.circle,
          udf2: this.commonService.userPram.companyName+' | '+this.commonService.userPram.rmn+' | '+this.commonService.userPram.userType+''+this.commonService.userPram.id
        };
        this.commonService.postAES256('recharge/recharge', JSON.stringify(passingData))
          .subscribe(
            (res: any) => {
              console.log(res);
              if(res.isSuccess)
              {
              this.commonService.isLoader = false;
              Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
                this.router.navigate(['/merchant/mobilerecharge/rech-status'], { queryParams: {  txnNo: res.txnNo, } });
              });
             }
             else
             {
              this.commonService.isLoader = false;
              Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'Okay' });
             }
            },
            (err: any) => {
              console.log(err);
              this.commonService.isLoader = false;
            });
    } else {
      alert('Insufficient wallet balance!');
    }
  }

  resetPage(): void {
    this.rechargeType = false;
    this.rechargeStage = 1;
    this.rechargeModal = {
      mobile: null,
      operator: null,
      operatorLogo: null,
      operatorName: null,
      circle: null,
      circleName: null,
      amount: null,
    };
    this.displayPlan = false;
  }

}
