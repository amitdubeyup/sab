import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css']
})
export class SenderComponent implements OnInit {

  remitterList: any = [];
  respData: any;
  moduleM: any = {};
  paymentMode = true;
  displayAddForm = false;
  displaySearchList = false;
  proper : boolean = false;
  isliven=true;
  transferType: any = 'mobile';
  fetchpipeList:any;
  constructor(
    public commonService: ApiService,
    public route: ActivatedRoute,
    public router: Router) {
  }

  ngOnInit(): void {
    this.moduleM.memberId = this.commonService.userPram.memberId;
    this.moduleM.reportTo = this.commonService.userPram.parentMemberId;
    this.moduleM.mobileNo = '';
    this.moduleM.remitterName = '';
    this.moduleM.remitterFName = '';
    this.moduleM.remitterLName = '';
    this.moduleM.address = 'Gurgaon';
    this.moduleM.zipCode = '122001';
    this.moduleM.dob = '1993-01-03'; 
    this.getOperatorPipe();  
  }
 
  changeText(myText: any): void {
    return myText.value;
  }
  getOperatorPipe(): any {
    this.commonService.isLoader = true;
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('recharge/get-api-service?isMaxAmt=false&ApiType=DMT&Category=FETCH-BENE&maxAmount=0')
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess && res.respData) 
            {
              this.fetchpipeList=res.respData;              
            }
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
          });
    }
  }
  updateTransferType(type: any): any {
    this.transferType = type;
  }

  addRemitter(): void {
     if((this.moduleM.remitterFName)==(this.moduleM.remitterLName))
    {
      Swal.fire({ icon: 'error', text: "First Name and Last Name must not be Same", confirmButtonText: 'OK' });      
     } 
    else
    {
      this.commonService.isLoader = true;
      this.moduleM.remitterName =  this.moduleM.remitterFName +' '+ this.moduleM.remitterLName;
        this.commonService.postAuth('remitter/add-remitter', JSON.stringify(this.moduleM)).subscribe((res: any) => {
        this.commonService.isLoader = false;
        if (res.isSuccess) {
          if (res.isliven)
          {
            Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' });
            this.isliven=false;
          }
          else
          {
          Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'Okay!' }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/rt/merchant-transfer/beneficiary'], { queryParams: { remitterId: res.remitterId, paymentMode: this.paymentMode} });
            }
          });
         }
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

  OtpRsend(): void {
    if(this.fetchpipeList.apiId === 'a1e442b5-0cab-43f9-a3d8-37725956bc5b' || this.fetchpipeList.apiId === '22fe61a0-83bf-401c-bfc0-788a717838f1')
    {
      if((this.moduleM.remitterFName)==(this.moduleM.remitterLName))
      {
        Swal.fire({ icon: 'error', text: "First Name and Last Name must not be Same", confirmButtonText: 'OK' });      
      } 
      else
      {
        this.commonService.isLoader = true;
        this.moduleM.remitterName =  this.moduleM.remitterFName +' '+ this.moduleM.remitterLName;
          this.commonService.postAuth('remitter/add-remitter', JSON.stringify(this.moduleM)).subscribe((res: any) => {
          this.commonService.isLoader = false;
          if (res.isSuccess) {
            if (res.isliven)
            {
              Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' });
              this.isliven=false;
            }
            else
            {
            Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'Okay!' }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/rt/merchant-transfer/beneficiary'], { queryParams: { remitterId: res.remitterId, paymentMode: this.paymentMode} });
              }
            });
           }
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
    else
    {
      this.onSubmit();
    }
   
 }
  updateMobile(event: any): any {
    console.log('event value-->', event)
    const mobile = event.target.value.replace(/\D/gm, '');
    this.moduleM.mobileNo = mobile;
    this.displayAddForm = false;
    this.displaySearchList = false;
  }

  // validate mobile 
  validateMobile(event: any): any{
    const mobile = event.target.value.replace(/^[a-zA-Z]*$/, '');
    this.moduleM.mobileNo = mobile;
    if(((mobile.length != 10) && (this.transferType == 'mobile')))
    {
      this.proper = true;
     } 
    else
    {
      this.proper = false;    
    }
  }
  // validate account 
  validateAccount(event: any): any{
    const mobile = event.target.value.replace(/\D/gm, '');
    this.moduleM.mobileNo = mobile;
    if(((mobile.length <= 7)))
    {
      this.proper = true;
      console.log('false')
     } 
    else
    {
      this.proper = false;    
      console.log('true')      
    }
  }

  // validate first name and last name  
  validate(): any{
    if((this.moduleM.remitterFName.value)==(this.moduleM.remitterLName.value))
    {
      console.log('first name and last name is equal')
      this.proper = true;
     } 
    else
    {
      console.log('first name and last name is not equal')
      this.proper = false;    
    }
  }
  onSubmit(): void {
    this.commonService.isLoader = true;
    this.displayAddForm = false;
    this.displaySearchList = false;
    this.commonService.getAuth('remitter/remitter-search?memberId=' + this.commonService.userPram.memberId + '&mobileNo=' + this.moduleM.mobileNo + '&docType='+this.transferType)
      .subscribe(
        (res: any) => {
          this.commonService.isLoader = false;
          if (res.isSuccess) {
            const remitterList = JSON.parse(this.commonService.decryptUsingAES256(res.respData));
            if ((this.transferType === 'mobile') && remitterList.length) {
              this.onBeneficiary(remitterList[0]);
            } else {
              this.remitterList = remitterList;
              this.displayAddForm = false;
              this.displaySearchList = true;
            }
          }
          else {
            if (this.transferType === 'account') {
              Swal.fire({ icon: 'warning', text: 'No records found', confirmButtonText: 'OK' });
            }
            else {
              Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'OK' });
              this.displayAddForm = true;
              this.isliven=res.isliven;
              this.moduleM.remitterName = '';
              this.displaySearchList = false;
            }
          }
        },
        (err: any) => {
          this.commonService.isLoader = false;
          this.displayAddForm = false;
          this.displaySearchList = false;
        });
  }
  onBeneficiary(data: any): any {
    this.router.navigate(['/rt/merchant-transfer/beneficiary'], { queryParams: { remitterId: data.RemitterId, paymentMode: this.paymentMode,acc:'' } });
  }
  onBeneficiaryView(data: any): any {
    this.router.navigate(['/rt/merchant-transfer/beneficiary'], { queryParams: { remitterId: data.RemitterId, paymentMode: this.paymentMode,acc:data.BeneficiaryAcc } });
  }

}