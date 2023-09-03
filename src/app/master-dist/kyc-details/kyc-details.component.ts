import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-kyc-details',
  templateUrl: './kyc-details.component.html',
  styleUrls: ['./kyc-details.component.css']
})
export class KycDetailsComponent implements OnInit {
  activeTab = true;
  uuid: any;
  kycDetail: any = {};
  errors: any[] = [];
  stateList: any[] = [
    { id: '01', name: 'JAMMU AND KASHMIR' },
    { id: '02', name: 'HIMACHAL PRADESH' },
    { id: '03', name: 'PUNJAB' },
    { id: '04', name: 'CHANDIGARH' },
    { id: '05', name: 'UTTARAKHAND' },
    { id: '06', name: 'HARYANA' },
    { id: '07', name: 'DELHI' },
    { id: '08', name: 'RAJASTHAN' },
    { id: '09', name: 'UTTAR PRADESH' },
    { id: '10', name: 'BIHAR' },
    { id: '11', name: 'SIKKIM' },
    { id: '12', name: 'ARUNACHAL PRADESH' },
    { id: '13', name: 'NAGALAND' },
    { id: '14', name: 'MANIPUR' },
    { id: '15', name: 'MIZORAM' },
    { id: '16', name: 'TRIPURA' },
    { id: '17', name: 'MEGHLAYA' },
    { id: '18', name: 'ASSAM' },
    { id: '19', name: 'WEST BENGAL' },
    { id: '20', name: 'JHARKHAND' },
    { id: '21', name: 'ODISHA' },
    { id: '22', name: 'CHATTISGARH' },
    { id: '23', name: 'MADHYA PRADESH' },
    { id: '24', name: 'GUJARAT' },
    { id: '26', name: 'DADRA AND NAGAR HAVELI AND DAMAN AND DIU' },
    { id: '27', name: 'MAHARASHTRA' },
    { id: '28', name: 'ANDHRA PRADESH' },
    { id: '29', name: 'KARNATAKA' },
    { id: '30', name: 'GOA' },
    { id: '31', name: 'LAKSHWADEEP' },
    { id: '32', name: 'KERALA' },
    { id: '33', name: 'TAMIL NADU' },
    { id: '34', name: 'PUDUCHERRY' },
    { id: '35', name: 'ANDAMAN AND NICOBAR ISLANDS' },
    { id: '36', name: 'TELANGANA' },
    { id: '37', name: 'ANDHRA PRADESH (NEWLY ADDED' },
    { id: '38', name: 'LADAKH (NEWLY ADDED)' }
  ];
  muid: any;
  cmodel: any;
  isloder = false;
  respTemplate: any;
  kycStatus: any;

  constructor(
    public commonService: ApiService,
    public sharedMethod: SharedMethodService,
    public route: ActivatedRoute,
    public router: Router,
    public location: Location,
    public dialog: MatDialog) {
    this.route.queryParams.subscribe((params) => {
      this.muid = params['muid'];
      this.uuid = params['uid'];
    });
  }

  ngOnInit(): void {
    this.kycStatus = this.sharedMethod.kycStatus();
    this.kycDetail.isStatus = '1';
    this.GetTemplate();
    this.GetMembers();
  }
  close(): void {
    this.location.back();
  }

  public GetMembers(): any {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('users/get-member-details?membertid=' + this.muid + '&mlevel=&isstutas=ID')
        .subscribe(
          (res: any) => {
            if (res.isSuccess) {
              this.cmodel = res.respData;
              this.kycDetail.fullName = this.cmodel.memberName;
              this.kycDetail.email = this.cmodel.emailId;
              this.kycDetail.mobileNumber = this.cmodel.mobileNo;
              this.kycDetail.shopName = this.cmodel.companyName;
              this.kycDetail.gstNumber = this.cmodel.gstin;
              this.kycDetail.memberTid = this.cmodel.mtId;
            }
          },
          (err: any) => {
            if (err.status === 0) {
              this.router.navigateByUrl('signin');
            }
          });
    }
  }

  GetTemplate(): any {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('users/get-template-by-type?docType=ALL')
        .subscribe(
          (res: any) => {

            if (res.isSuccess) {
              this.respTemplate = res.respData;
            }
          });
    }
  }
  onFormSubmitFileSave(event: any, docType: any): any {
    if (event.target.files.length>0) {
    const file = event.target.files[0];
    console.log(file,file.type);
   // if (file.type != "image/png" || file.type != "image/jpg" || file.type!= "image/jpeg" || file.type!="application/pdf") {
    if (!['application/pdf', 'image/jpeg','image/png'].includes(file.type)){
      event.target.value = null;
      Swal.fire({ icon: 'warning', text: 'File should be a pdf or a jpeg,png', confirmButtonText: 'OK' });
    }
    else if (file.size <= 2048) {
      Swal.fire({ icon: 'warning', text: 'File size should be less then 2MB', confirmButtonText: 'OK' });
    }
    else {
      this.isloder = true;
      const formData = new FormData();
      formData.append('memberId', this.muid);
      formData.append('docType', docType);
      formData.append('uploadefile', event.target.files[0]);
      this.commonService.postAuthFile('fileservices/document-save', formData).subscribe((res: any) => {
        this.isloder = false;
        if (res.isSuccess) {
          Swal.fire({ icon: 'success', text: 'Upload Successfully', confirmButtonText: 'OK' });
        }
      });
    }
   }
  }
  onSubmit(): any {
    this.isloder = true;
    this.kycDetail.memberId = this.muid;
    this.kycDetail.createBy = this.commonService.userPram.userId;
    console.log(this.kycDetail);
    this.commonService.postAuth('users/save-kyc', JSON.stringify(this.kycDetail)).subscribe((res: any) => {
      this.isloder = false;
      if (res.isSuccess) {
        Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
          this.router.navigate(['/distributor/kyc-home'], { queryParams: {  txnNo: res.txnNo, } });
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

  openPageUrl(url: any, params: any): any {
    if (params) {
      this.router.navigate([url], { queryParams: params });
    } else {
      this.router.navigateByUrl(url);
    }
  }
}
