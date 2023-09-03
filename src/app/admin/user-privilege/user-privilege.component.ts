import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/ApiService.service';


@Component({
  selector: 'app-user-privilege',
  templateUrl: './user-privilege.component.html',
  styleUrls: ['./user-privilege.component.css']
})
export class UserPrivilegeComponent implements OnInit {

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
    { type: 'CRMON', key: 'Credit Money', value: false },
    { type: 'DRMON', key: 'Withdraw Money', value: false },
    { type: 'APIBL', key: 'API Balance', value: false },
    { type: 'DASH', key: 'Dashboard', value: false },
    { type: 'SOUL', key: 'Wallet To Wallet', value: false },
    { type: 'TXNR', key: 'Refund Trancation', value: false }
  ];
  respData: any;

  constructor(
    public commonService:ApiService,
    public dataService: DataService,
    public sharedMethod: SharedMethodService,
    public route: ActivatedRoute,
    public router: Router,
    public location: Location,
    // public dialog: MatDialog, 
    // public dialogRef: MatDialogRef<UserPrivilegeComponent>,
    // @Inject(MAT_DIALOG_DATA) public params: any
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
      
      if ((this.mtCode === 'SA') || (this.mtCode === 'AD')) {
        roleType = 'administrator';
        this.menuPrivileges = JSON.parse(JSON.stringify(this.dataService.saSideMenu));
      }
      this.menuPrivileges.forEach((elementOne: any) => {
        elementOne.userId = this.userId;
        elementOne.path = elementOne.path ? `/${roleType}/${elementOne.path}` : '';
        elementOne.subMenu.forEach((elementTwo: any) => {
          elementTwo.userId = this.userId;
          elementTwo.path = elementTwo.path ? `/${roleType}/${elementTwo.path}` : '';
        });
      });
      setTimeout(() => {
        this.getUserPrivileges();
      });
    };
    setTimeout(() => {
      this.getUserPrivileges();
    });
    });
    this.accData.accVerifiyType="R";
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
    this.getUserPrivileges();
    this.getpg();
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
            if (res.respData.usermenurightiledge) {
              const featurePrivileges: any = JSON.parse(res.respData.usermenurightiledge);       
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
            const privileges: any = [];
            res.respData.priviledges.forEach((element: any) => {
              delete element.user;
              privileges.push(element);
            });
            privileges.forEach((elementOne: any) => {        
              this.menuPrivileges.forEach((elementTwo: any) => {
                if ((elementOne.name === elementTwo.name) && (elementOne.path === elementTwo.path)) {
                  elementTwo.id = elementOne.id;
                  elementTwo.iswrite = elementOne.iswrite;
                  elementTwo.subMenu.forEach((elementThree: any) => {
                    if ((elementOne.name === elementThree.name) && (elementOne.path === elementThree.path)) {
                      elementThree.id = elementOne.id;
                      elementThree.iswrite = elementOne.iswrite;
                    }
                  });
                }
                if (elementOne.parentName === elementTwo.name) {
                  elementTwo.subMenu.forEach((elementThree: any) => {
                    if ((elementOne.name === elementThree.name) && (elementOne.path === elementThree.path)) {
                      elementThree.id = elementOne.id;
                      elementThree.iswrite = elementOne.iswrite;
                    }
                  });
                }
              });
            });
          }
        },
        (err: any) => {
          console.log(err);
          Swal.fire({ icon: 'warning', text: 'something went wrong!', confirmButtonText: 'OK' });
        });
  }

  updateAccess(event: any): void {
    this.menuPrivileges.forEach((elementOne: any) => {
      elementOne.iswrite = event.target.checked ? 1 : 0;
      elementOne.subMenu.forEach((elementTwo: any) => {
        elementTwo.iswrite = event.target.checked ? 1 : 0;
      });
    });
  }

  updateCheckbox(event: any, parentIndex: number, childIndex: number): void {
    if (childIndex === -1) {
      this.menuPrivileges[parentIndex].iswrite = event.target.checked ? 1 : 0;
    } else {
      this.menuPrivileges[parentIndex].subMenu[childIndex].iswrite = event.target.checked ? 1 : 0;
    }
  }

  updateFeatureAccess(event: any): void {
    this.featurePrivileges.forEach((elementOne: any) => {
      elementOne.value = event.target.checked;
    });
  }

  updateFeatureCheckbox(event: any, index: number): void {
    this.featurePrivileges[index].value = event.target.checked;
  }

  onSubmit(): void {
    const passingData: any = [];
    const privileges = JSON.parse(JSON.stringify(this.menuPrivileges));
    privileges.forEach((elementOne: any) => {
      passingData.push(elementOne);
      if (elementOne.subMenu.length) {
        elementOne.subMenu.forEach((elementTwo: any) => {
          elementTwo.parentName = elementOne.name;
          passingData.push(elementTwo);
        });
      }
    });
    passingData.forEach((element: any) => {
      if (!element.id) {
        delete element.id;
      }
      delete element.subMenu;
    });
    this.commonService.isLoader = true;
    const postData = {
      memberId: this.memberId,
      userId: this.userId,
      updateBy:this.commonService.userPram.memberId,
      usermenurightiledge: JSON.stringify(this.featurePrivileges),
      priviledges: passingData
    };
    console.log(postData);
    this.commonService.postAES256('users/add-user-priviledge', JSON.stringify(postData)).subscribe((res: any) => {
      this.commonService.isLoader = false;
      if (res.isSuccess) {
        Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' });
        this.getUserPrivileges();
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

  toggleModal(): any {
    this.isModel = !this.isModel;
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
