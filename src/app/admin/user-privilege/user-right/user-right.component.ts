import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/ApiService.service';


@Component({
  selector: 'app-user-right',
  templateUrl: './user-right.component.html',
  styleUrls: ['./user-right.component.css']
})
export class UserRightComponent {

  userId: any;
  memberId:any;
  mtCode: any;
  isModel = false;
  activeTab: any = 0;
  serviceData: any = {};
  accData: any = {};
  menuPrivileges: any = [];
  respPg:any;
  CommissionType= [
      { code: 'P', desc: '%' },
      { code: 'R', desc: 'Rs.' }
    ];

  featurePrivileges: any = [
    { type: 'DMT1', key: 'Money Transfer', value: true },
    { type: 'DMT2', key: 'Merchant Payment', value: false },
    { type: 'DMT3', key: 'Wallet 3', value: false },
    { type: 'ELEC', key: 'Electricity', value: true },
    { type: 'PARTP', key: 'Part Payment', value: false },
    { type: 'WATER', key: 'Water Bill', value: true },
    { type: 'GAS', key: 'Gas Bill', value: true },
    { type: 'INS', key: 'Insurance', value: true },
    { type: 'DTH', key: 'DTH', value: true },
    { type: 'LAND', key: 'Landline', value: true },
    { type: 'BROD', key: 'Broadband', value: true },
    { type: 'CABL', key: 'Cable', value: true },
    { type: 'FAST', key: 'Fastag', value: true },
    { type: 'RECH', key: 'Prepaid & Postpaid', value: true },
    { type: 'PG', key: 'Payment Gateway', value: false },
    { type: 'QR', key: 'QR Code', value: false },
    { type: 'VACC', key: 'Virtual Account', value: false },
    { type: 'INDP', key: 'Indo Nepal', value: true },
    { type: 'BADT', key: 'IGL Commercial Bill', value: false },
    { type: 'PAYT', key: 'Paytm TopUp', value: false },
    { type: 'W2W', key: 'Wallet To Wallet', value: false },
    { type: 'UPI1', key: 'UPI', value: false},
    { type: 'TRVL', key: 'Travel', value: true},
    { type: 'FUNDREQUEST', key: 'Money Request', value:true},
  ];
  featurePrivilegesDs: any = [
    { type: 'PG', key: 'Payment Gateway', value: false },
    { type: 'FUND', key: 'Import Fund Request', value: false },
    { type: 'QR', key: 'QR Code', value: false },
    { type: 'VACC', key: 'Virtual Account', value: false },
    { type: 'W2W', key: 'Wallet To Wallet', value: false },
    { type: 'EBQR', key: 'EazeBuzz QR & Virtual', value: false},
    { type: 'WCR', key: 'Credit Money', value: false},
    { type: 'WDR', key: 'Withdraw Money', value: false},
    { type: 'FUNDREQUEST', key: 'Money  Request', value:false},
  ];
  respData: any;
  constructor(
    public commonService:ApiService,
    public dataService: DataService,
    public sharedMethod: SharedMethodService,
    public route: ActivatedRoute,
    public router: Router,
    public location: Location,
    ) {
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if(params!=null)
      {
      this.userId = params.userId;
      this.mtCode = params.mtCode;
      this.memberId = params.memberId;
      let roleType: any = null;
      if ((this.mtCode === 'RT') || (this.mtCode === 'CS')) {
        roleType = 'merchant';
      }
      if (this.mtCode === 'ASM') {
        roleType = 'asm';
      }
      if (this.mtCode === 'MD') {
        roleType = 'md';
      }
      if (this.mtCode === 'DS') {
        roleType = 'ds';
      }
    }
    });
    this.accData.accVerifiyType="R";
    this.getUserPrivileges();
  }
  onCancel(): void {
   // this.dialogRef.close();
  }
  close(): void {
   // this.dialogRef.close();
   // this.location.back();
  }
  handleChange(e: any): any {
    this.activeTab = e.index;
    this.getbank();
    this.getpg();
    this.getUserPrivileges();
  }
  getbank(): any {
    if (this.commonService.userPram.userId !== undefined && this.commonService.userPram.userId !== '' && this.commonService.userPram.rmn !== undefined && this.commonService.userPram.rmn !== '') {
      this.commonService.isLoader = true;
      this.commonService.getAuth('membersapi/get-admin-bank-list?memberid=' + this.memberId +'&docType=BANK')
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.respData = res.respData;
            }
            console.log(res);
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
            alert('something went wrong!');
          });
       }
  }
  getpg(): any {
    if (this.commonService.userPram.userId !== undefined && this.commonService.userPram.userId !== '' && this.commonService.userPram.rmn !== undefined && this.commonService.userPram.rmn !== '') {
      this.commonService.isLoader = true;
      this.commonService.getAuth('membersapi/get-admin-bank-list?memberid=' + this.memberId +'&docType=PG')
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.respPg = res.respData;
            }
            console.log(res);
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
            alert('something went wrong!');
          });
       }
  }
  updateCheckbox(event: any, parentIndex: number, childIndex: number): void {
    if (childIndex === -1) {
      this.menuPrivileges[parentIndex].iswrite = event.target.checked ? 1 : 0;
    } else {
      this.menuPrivileges[parentIndex].subMenu[childIndex].iswrite = event.target.checked ? 1 : 0;
    }
  }

  onSubmit(): void {
    const passingData: any = [];
    this.commonService.isLoader = true;
    const postData = {
      memberId: this.memberId,
      userId: this.userId,
      updateBy:this.commonService.userPram.memberId,
      userPriviledge: JSON.stringify(this.featurePrivileges),
      priviledges: passingData
    };
    console.log(postData);
    this.commonService.postAES256('users/add-user-priviledge', JSON.stringify(postData)).subscribe((res: any) => {
      this.commonService.isLoader = false;
      if (res.isSuccess) {
        Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
      else {
        Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
    },
      (err: any) => {
        this.commonService.isLoader = false;
        Swal.fire({ icon: 'warning', text: 'something went wrong!', confirmButtonText: 'OK' });
      });
  }
  updateService(data: any): any {
    this.serviceData = data;
    this.serviceData.bankType= this.activeTab==4?'PG':'BANK';
    this.toggleModal();
  }
  updateFeatureAccess(event: any): void {
    this.featurePrivileges.forEach((elementOne: any) => {
      elementOne.value = event.target.checked;
    });
  }

  updateFeatureCheckbox(event: any, index: number): void {
    this.featurePrivileges[index].value = event.target.checked;
  }

  toggleModal(): any {
    this.isModel = !this.isModel;
  }
  getUserPrivileges(): void {
    this.commonService.getAuth(`users/get-user-priviledge?userid=${this.userId}`)
      .subscribe(
        (res: any) => {
          if (res.isSuccess) {
            this.accData.walletCrType=res.respData?.walletCrType;
            this.accData.wallateCrCharge=res.respData?.wallateCrCharge;
            this.accData.walletDrType=res.respData?.walletDrType;
            this.accData.wallateDrCharge=res.respData?.wallateDrCharge;
            this.accData.MemberName=res.respData?.memberName;
            this.accData.MobileNo=res.respData?.mobileNo;
            if (res.respData.userPriviledge) {
              const featurePrivileges: any = JSON.parse(res.respData.userPriviledge);
              if (this.mtCode === 'AD' || this.mtCode === 'SA')
              {
                this.featurePrivileges=this.featurePrivileges;
                this.featurePrivileges.forEach((elementOne: any) => {
                  featurePrivileges.forEach((elementTwo: any) => {
                    if (elementOne.key === elementTwo.key) {
                      elementOne.value = elementTwo.value;
                    }
                  });
                });
              }
              else
              {
                this.featurePrivileges=this.featurePrivileges;
                this.featurePrivileges.forEach((elementOne: any) => {
                  featurePrivileges.forEach((elementTwo: any) => {
                    if (elementOne.key === elementTwo.key) {
                      elementOne.value = elementTwo.value;
                    }
                  });
                });
              }
            }
          }
        },
        (err: any) => {
          console.log(err);
          Swal.fire({ icon: 'warning', text: 'something went wrong!', confirmButtonText: 'OK' });
        });
  }
  formSubmit(): any {
    this.toggleModal();
    this.serviceData.memberId=this.memberId;
    this.commonService.isLoader = true;
    const url = 'membersapi/saveUserbankcharge';
    this.commonService.postAES256(url, JSON.stringify(this.serviceData)).subscribe((res: any) => {
      console.log(res);
      this.commonService.isLoader = false;
      if (res.isSuccess) {
        Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
      else {
        Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
    },
      (err: any) => {
        console.log(err);
        this.commonService.isLoader = false;
        if (err.message) {
          Swal.fire({ icon: 'warning', text: err.message, confirmButtonText: 'OK' });
        }
      });
  }
  formSubmitCharge(): any {
    this.accData.memberId=this.memberId;
    this.accData.userId=this.userId;
    this.commonService.isLoader = true;
    const url = 'membersapi/updateuser';
    this.commonService.postAES256(url, JSON.stringify(this.accData)).subscribe((res: any) => {
      this.commonService.isLoader = false;
      if (res.isSuccess) {
        Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
      else {
        Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
    },
      (err: any) => {
        console.log(err);
        this.commonService.isLoader = false;
        if (err.message) {
          Swal.fire({ icon: 'warning', text: err.message, confirmButtonText: 'OK' });
        }
      });
  }
}
