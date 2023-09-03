import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { ExcelService } from 'src/app/services/excel.service';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-acc-whitelisted',
  templateUrl: './acc-whitelisted.component.html',
  styleUrls: ['./acc-whitelisted.component.css']
})
export class AccWhitelistedComponent implements OnInit {

 
  StatusList: any = [
    { id: null, name: 'All' },
    { id: '0', name: 'Pending' },
    { id: '1', name: 'Approved' },
    { id: '2', name: 'Declined' },
  ];
  respData: any;
  fromDt: any = new Date();
  toDt: any = new Date();
  statementList: any = [];
  activeTab: any = 0;
  isStatus: any = null;
  totalAmount = 0;
  totalCharge = 0;
  totalCommission = 0;
  searchType:any;
  txnNo:any;
  creditMoneyModal:any={};
  walletDetails: any;
  retList: any;
  selectedMemberList:any;
  beneDet: any;
  isModelSlip: boolean=false;
  isModel: boolean=false;  
  filePath: any;
  modalData:any={};
  constructor(
    public excelService: ExcelService,
    public commonService:ApiService,
    public sharedMethodService: SharedMethodService,
    public route: ActivatedRoute,
    public router: Router) {
  }

  ngOnInit(): void {
    this.fromDt.setDate(this.fromDt.getDate());
    this.toDt.setDate(this.toDt.getDate());
   this.getBeneficiaryDetails();
  }

  changeText(myText: any): void {
    return myText.value;
  }
  getBeneficiaryDetails(): any {
    if (this.commonService.userPram.userId && this.commonService.userPram.memberId) {
      this.commonService.isLoader = true;
      this.commonService.getAuth('retailer/get-beneficiary-details?accNo=&remitterId=&docType=whitelisted')
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.beneDet = JSON.parse(this.commonService.decryptUsingAES256(res.respData));
            }
          },
          (err: any) => {
            this.commonService.isLoader = false;
            alert('something went wrong!');
          });
    }
  }





  openModel(filePath: any): void {
    this.isModelSlip = true;
    this.filePath = filePath;
   }
   openModelAP(): void {
    this.isModel = true;
   }
   onAddBene(): any {
    if (this.commonService.userPram.memberId) {
    {
      this.modalData.MemberId=this.commonService.userPram.memberId;
      this.modalData.docType='whitelist';
      this.commonService.postAES256('users/add-whitelisted', JSON.stringify(this.modalData))
        .subscribe(
          (res: any) => {
            console.log(res);
            this.commonService.isLoader = false;
            Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
              this.isModel = false;
              this.getBeneficiaryDetails();
            });
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
          });
      }
    }
   }
   onDeleteBene(cp:any): any {
    if (this.commonService.userPram.memberId) {
      {
        Swal.fire({ icon: 'warning', text: 'Are you sure want to deleted from whitelist?', confirmButtonText: 'OK' }).then(() => {
        cp.docType='rwhitelist';
        this.commonService.postAES256('users/add-whitelisted', JSON.stringify(cp))
          .subscribe(
            (res: any) => {
              console.log(res);
              this.commonService.isLoader = false;
              Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
                this.isModel = false;
                this.getBeneficiaryDetails();
              });
            },
            (err: any) => {
              console.log(err);
              this.commonService.isLoader = false;
            });
          });
        }
      
      }
   }
}