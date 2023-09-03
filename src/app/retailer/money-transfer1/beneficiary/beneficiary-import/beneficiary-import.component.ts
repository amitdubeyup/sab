import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/ApiService.service';
@Component({
  selector: 'app-beneficiary-import',
  templateUrl: './beneficiary-import.component.html',
  styleUrls: ['./beneficiary-import.component.css']
})
export class BeneficiaryImportComponent implements OnInit {
  respData: any;
  optionSearch: any = {
    apiId: null,
    mobileNo: ''
  };
  remitterDetails: any;
  paymentMode: any;
  isModel = false;
  activeTab: any = 0;
  beneficiaryDetails: any = [];
  pipeList: any;
  selectedBeneficiary: any = [];
  paramsData: any;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public location: Location,
    public commonService: ApiService,
  ) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params.data) {
        this.activeTab=0;
        this.paramsData = JSON.parse(this.commonService.decryptUsingAES256(params.data));
        this.remitterDetails = this.paramsData.remitterDetails;
        this.paymentMode = this.paramsData.paymentMode;
      }
    });
    this.getPaymentPipe('FETCH-BENE');
    this.selectedBeneficiary = [];    
    
  }

  handleChange(e: any): any {
    this.activeTab = e.index;
  }

  back(): any {
    this.location.back();
  }

  changeText(myText: any): void {
    return myText.value;
  }

  getPaymentPipe(pMode: any): any {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('servicemanager/get-api-service?mid=&docType=false&pMode=' + pMode)
        .subscribe(
          (res: any) => {
            if (res.isSuccess) {
              this.pipeList = res.respData;
              this.optionSearch.apiId="08d94c23-18bf-4ce5-8a9f-a31aac9a19f7";
              if(this.optionSearch.apiId=="08d94c23-18bf-4ce5-8a9f-a31aac9a19f7")
              {
                this.commonService.isLoader=true;
                this.optionSearch.mobileNo=this.remitterDetails.MobileNo;
                this.getBeneficiaryDetails();
              }
            }
            console.log(this.pipeList);
          },
          (err: any) => {
            console.log(err);
          });
    }
  }

  getBeneficiaryDetails(): any {
    if (this.commonService.userPram.id && this.commonService.userPram.memberId) {
      this.optionSearch.apiId=this.optionSearch.apiId;//"08d94c23-18bf-4ce5-8a9f-a31aac9a19f7"; // remove feauture
      this.commonService.isLoader = true;
      this.optionSearch.memberId = this.commonService.userPram.memberId;
      this.optionSearch.agentCode = this.commonService.userPram.id;
      this.optionSearch.docType = this.activeTab === 0 ? 'internal' : 'extrnal';
      this.commonService.postAES256('remitter/get-beneficiary', JSON.stringify(this.optionSearch))
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            this.commonService.isLoader=false;
            if (res.isSuccess) {
              this.beneficiaryDetails = JSON.parse(this.commonService.decryptUsingAES256(res.respData));
            }
            else
            {
              this.commonService.isLoader=false;
              this.beneficiaryDetails=null;
            }
            console.log(this.beneficiaryDetails);
          },
          (err: any) => {
            this.commonService.isLoader=false;
            this.commonService.isLoader = false;
            console.log(err);
          });
    }
  }
 

  importBeneficiary(): any {
    if (this.selectedBeneficiary.length > 0) {
      if (this.selectedBeneficiary.length <= this.remitterDetails.BeniLimit) {
        const passingData = {
          MemberId: this.commonService.userPram.memberId,
          RemitterId: this.remitterDetails.RemitterId,
          apiId: this.optionSearch.apiId,
          RemitterNumber: this.remitterDetails.MobileNo,
          docType: 'beni1',
          recipientList: this.selectedBeneficiary
        };
        this.commonService.isLoader = true;
        this.commonService.postAES256('remitter/oldbeneficiary', JSON.stringify(passingData))
          .subscribe(
            (res: any) => {
              console.log(res);
              this.commonService.isLoader = false;
              Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'Okay!' ,showCancelButton: true, cancelButtonText: 'Close', }).then((result) => {
                if (result.isConfirmed) {
                  this.back();
                }
              });
            },
            (err: any) => {
              console.log(err);
              this.commonService.isLoader = false;
              Swal.fire({ icon: 'error', text: 'Oops something went wrong!', confirmButtonText: 'Ok' });
            });
      } else {
        Swal.fire({ icon: 'error', text: `Beneficiary selection can not exceed more than ${this.remitterDetails.BeniLimit}.`, confirmButtonText: 'Ok' });
      }
    }
  }

}
