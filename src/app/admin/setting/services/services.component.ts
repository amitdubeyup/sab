import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  userModel: any = {};
   servicePrivileges: any = [
    { type: 'DMT1', key: 'Money Transfer', value: true },
    { type: 'DMT2', key: 'Merchant Payment', value: false },
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
    { type: 'FUNDREQUEST', key: 'Money Request', value:true}
  ];
  constructor(public commonService:ApiService, public sharedMethod: SharedMethodService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    this.userModel.userName = this.commonService.userPram.userName;
    this.userModel.mobileNo = this.commonService.userPram.rmn;
    this.getUserPrivileges();
  }

  getUserPrivileges(): void {
    this.commonService.getAuth(`servicemanager/get-company?roleType=AD`)
      .subscribe(
        (res: any) => {
          if (res.isSuccess) {
            const featurePrivileges: any = JSON.parse(this.commonService.decryptUsingAES256(res.respData));
            this.servicePrivileges.forEach((elementOne: any) => {
              featurePrivileges.forEach((elementTwo: any) => {
                if (elementOne.key === elementTwo.key) {
                  elementOne.value = elementTwo.value;
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
  updateFeatureAccess(event: any): void {
    this.servicePrivileges.forEach((elementOne: any) => {
      elementOne.value = event.target.checked;
    });
  }
  updateFeatureCheckbox(event: any, index: number): void {
    
    this.servicePrivileges[index].value = event.target.checked;
  }
  onMemberInfoSave(): void {

    let dataModel={
      adminUserId:this.commonService.userPram.userId,
      services:this.servicePrivileges
    }
    this.commonService.postAES256('servicemanager/SaveCompany', JSON.stringify(dataModel)).subscribe((res: any) => {
      if (res.isSuccess) {
        Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
          this.getUserPrivileges();
        });  
      }
      else {
        Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
    },
      (err: any) => {
        if (err.message) {
        }
      });
  }
}



