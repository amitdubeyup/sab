import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { ExcelService } from 'src/app/services/excel.service';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-aeps-beneficiary',
  templateUrl: './aeps-beneficiary.component.html',
  styleUrls: ['./aeps-beneficiary.component.css']
})
export class AepsBeneficiaryComponent implements OnInit {

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
  memberList: any = [];
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
    this.getBene();
  }

  changeText(myText: any): void {
    return myText.value;
  }

  handleChange(e: any): any {
    this.activeTab = e.index;
    if (this.activeTab === 0) {
      this.getBene();
    }

    
  }

  handleSearch(docTab: any): any {
    this.activeTab = docTab;
    if (this.activeTab === 0) {
      this.getBene();
    }
   
   
  }
  lastrchar(str: any): any {
    return str.substring(str.length-4, str.length);
  }
  getMemberList(docType:any): void {
    this.commonService.isLoader = true;
    this.commonService.getAuth('users/GetMemberById?memberId=' + this.commonService.userPram.memberId + '&roleType=&docType='+docType)
      .subscribe(
        (res: any) => {
          this.commonService.isLoader = false;
          if (res.isSuccess) {
            this.memberList = res.respData;
          }
        },
        (err: any) => {
          console.log(err);
          this.commonService.isLoader = false;
        });
  }
  getBene(): any {
    this.commonService.isLoader = true;
    const fromDt = this.commonService.formatDate((this.fromDt ? this.fromDt : new Date()), 'yyyy-mm-dd');
    const toDt = this.commonService.formatDate((this.toDt ? this.toDt : new Date()), 'yyyy-mm-dd');
    this.commonService.getAuth('aepsapi/GetAepsBene?memberId=' + this.commonService.userPram.memberId + '&docType=AD&isStatus='+this.isStatus+ '&fromDt=' + fromDt + '&toDt=' + toDt)
      .subscribe(
        (res: any) => {
          this.commonService.isLoader = false;
          if (res.isSuccess) {
            this.beneDet = res.respData;
       
          }
          else
          {
            this.beneDet=null;
  
          }
        },
        (err: any) => {
          this.commonService.isLoader = false;
        });
  }
  openModel(filePath: any): void {
    this.isModelSlip = true;
    this.filePath = filePath;
   }
   openModelAP(data: any): void {
    this.isModel = true;
    this.modalData = data;
   }
   onAddBene(): any {
    if (this.commonService.userPram.memberId && this.commonService.userPram.rmn) {
    {
      this.modalData.MemberId=this.commonService.userPram.memberId;
      this.modalData.docType='upd';
      this.modalData.remarks =this.modalData.remarks+ ' updated by : ' +this.commonService.userPram.companyName+'-'+this.commonService.userPram.userType+""+this.commonService.userPram.id;
      this.commonService.postAES256('aepsapi/aeps-addbene', JSON.stringify(this.modalData))
        .subscribe(
          (res: any) => {
            console.log(res);
            this.commonService.isLoader = false;
            Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
              this.creditMoneyModal = {};
              this.isModel = false;
              this.handleSearch(this.activeTab);
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
    if (this.commonService.userPram.memberId && this.commonService.userPram.rmn) {
    {
      this.modalData=cp;
      this.modalData.MemberId=this.commonService.userPram.memberId;
      this.modalData.docType='del';
      this.modalData.remarks =this.modalData.remarks+ ' updated by : ' +this.commonService.userPram.companyName+'-'+this.commonService.userPram.userType+""+this.commonService.userPram.id;
      this.commonService.postAES256('aepsapi/aeps-addbene', JSON.stringify(this.modalData))
        .subscribe(
          (res: any) => {
            console.log(res);
            this.commonService.isLoader = false;
            Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
              this.creditMoneyModal = {};
              this.isModel = false;
              this.handleSearch(this.activeTab);
            });
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
          });
      }
    }
   }
  exportAsXLSX(): any {
    const excelData: any = [];
    const header = ['Member Name','Beneficiary Name', 'CreatedOn', 'Beneficiary Acc', 'Bank-Ifsc','Remarks','Status'];
    this.beneDet.forEach((el: any) => {
      const obj = [
        el.memberName,
        el.beneficiaryName +'-'+el.beneficiaryNumber,
        el.createdOn,
        el.beneficiaryAcc,
        el.bank + '-'+el.ifsc,
        el.remarks,
        el?.isStatus==1?'Approved':el?.isStatus==2?'Declined':'Pending'
       
      ];
      excelData.push(obj);
    });
    this.excelService.exportAsExcelWitheHeader(header,excelData, 'Aeps-Beneficiary.xlsx','G1');
  }  
}