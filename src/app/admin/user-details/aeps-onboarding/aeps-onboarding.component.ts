import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-aeps-onboarding',
  templateUrl: './aeps-onboarding.component.html',
  styleUrls: ['./aeps-onboarding.component.css']
})
export class AepsOnboardingComponent implements OnInit {

  fromDt: any = new Date();
  toDt: any = new Date();
  dmtChargesList: any = [];
  utilityChargesList: any = [];
  utilityOptionList: any = [];
  bbpsList: any = [];
  aepsList: any = [];
  profileData: any;
  memberid:any;
  cmodel:any={};
  utilityModal:any={};
  imageError: any;
  constructor(
    public commonService: ApiService,
    public dataService: DataService,
    public route: ActivatedRoute,
    public router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.memberid = params.memberid;
      this.GetMembers();
    });
  }

  changeText(myText: any): void {
    return myText.value;
  }

  fetchDmtCharges(): void {

  }
  filemerchantPanImage(fileInput: any):any {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520000;
        const allowed_types = ['image/png', 'image/jpeg'];
  
        if (fileInput.target.files[0].size > max_size) {
            this.imageError ='Maximum size allowed is ' + max_size / 1000 + 'Mb';
            return false;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {             
                    const imgBase64Path = e.target.result;
                    this.utilityModal.merchantPanImage = imgBase64Path;
            };
        };
        reader.readAsDataURL(fileInput.target.files[0]);
    }
   }
   filmaskedAadharImage(fileInput: any):any {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520000;
        const allowed_types = ['image/png', 'image/jpeg'];
  
        if (fileInput.target.files[0].size > max_size) {
            this.imageError ='Maximum size allowed is ' + max_size / 1000 + 'Mb';
            return false;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {             
                    const imgBase64Path = e.target.result;
                    this.utilityModal.maskedAadharImage = imgBase64Path;
            };
        };
        reader.readAsDataURL(fileInput.target.files[0]);
    }
   }
   filbackgroundImageOfShop(fileInput: any):any {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520000;
        const allowed_types = ['image/png', 'image/jpeg'];
  
        if (fileInput.target.files[0].size > max_size) {
            this.imageError ='Maximum size allowed is ' + max_size / 1000 + 'Mb';
            return false;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {             
                    const imgBase64Path = e.target.result;
                    this.utilityModal.backgroundImageOfShop = imgBase64Path;
            };
        };
        reader.readAsDataURL(fileInput.target.files[0]);
    }
   }
  fetchUtilityCharges(): void {
  }
  GetMembers(): void {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('users/profile?userid=' + this.memberid + '&docType=kyc')
        .subscribe(
          (res: any) => {        
            if (res.isSuccess) {
              this.cmodel = JSON.parse(this.commonService.decryptUsingAES256(res.respData)); 
               this.utilityModal.firstName=this.cmodel.Name;
               this.utilityModal.userPan=this.cmodel.retailerInformation.Pan;
               this.utilityModal.aadhaarNumber=this.cmodel.retailerInformation.AaddharNo;
               this.utilityModal.merchantAddress1=this.cmodel.retailerInformation.Address;
               this.utilityModal.merchantAddress2=this.cmodel.retailerInformation.Address;
               this.utilityModal.merchantPinCode=this.cmodel.retailerInformation.PinCode;
               this.utilityModal.companyOrShopPan=this.cmodel.retailerInformation.Pan;
               this.utilityModal.shopAddress=this.cmodel.retailerInformation.Address2;
               this.utilityModal.shopPincode=this.cmodel.retailerInformation.PinCode;
               
            }
          },
          (err: any) => {
            if (err.status === 0) {
              this.router.navigateByUrl('signin');
            }
          });
    }
  }
  getFilePath(filePath: any): string {
    if (filePath) {
      return this.commonService.appFileURL + '' + filePath;
    }
    else {
      return '../../../assets/icons/person.jpeg';
    }
  }


  onBodring():any{
    this.utilityModal.MemberId= this.memberid;
    this.utilityModal.userid=this.cmodel.userId;
    this.utilityModal.RtNumber=this.cmodel.mobileNo,
    this.utilityModal.MobileNumber=this.cmodel.mobileNo,
    this.utilityModal.udf2= this.cmodel.companyName+' | '+this.cmodel.mobileNo+' | '+this.cmodel.userType+''+this.cmodel.xuserId;
    this.commonService.postAES256('aeps/impst/marchantonboarding?onboardingType=aeps1', JSON.stringify(this.utilityModal)).subscribe((res: any) => {
      if (res.isSuccess) {
        this.commonService.isLoader=false;
        Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
      else {
        this.commonService.isLoader=false;
        Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
    },
      (err: any) => {
        this.commonService.isLoader=false;
        if (err.message) {
        }
      });
  }
}
