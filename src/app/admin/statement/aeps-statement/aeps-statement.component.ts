import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { ExcelService } from 'src/app/services/excel.service';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-aeps-statement',
  templateUrl: './aeps-statement.component.html',
  styleUrls: ['./aeps-statement.component.css']
})
export class AepsStatementComponent implements OnInit {

  
  respData: any;
  fromDt: any = new Date();
  toDt: any = new Date();
  statementList: any = [];
  activeTab: any = 0;
  isStatus: any = null;
  totalAmount = 0;
  totalCharge = 0;
  retid: any;
  totalCommission = 0;
  searchType:any;
  txnNo:any;
  creditMoneyModal:any={};
  walletDetails: any;
  retList: any;
  selectedMemberList:any;
  serviceData:any={};
  isModel:boolean=false;
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
    this.getMember();
    this.getRetailerCommission('AEPS-ADMIN');
  
  }
  getMember(): any {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('users/GetMemberById?memberId=' + this.commonService.userPram.memberId + '&roleType=RT&docType=ADMIN')
        .subscribe(
          (res: any) => {
            if (res.isSuccess) {
              this.retList = res.respData;
            }
          },
          (err: any) => {
            console.log(err);
          });
    }
  }
  changeText(myText: any): void {
    return myText.value;
  }

  handleChange(e: any): any {
    this.activeTab = e.index;
    if (this.activeTab === 0) {
      this.getRetailerCommission('AEPS-ADMIN');
    }
   else if (this.activeTab === 1) {
      this.getRetailerCommission('AEPS-ADMINL');
    }
    else if (this.activeTab === 2) {
      this.getRetailerCommission('AEPS2-ADMIN');
    }
    else if (this.activeTab === 3) {
      this.getRetailerCommission('AEPS2-ADMINL');
    }
  }

  handleSearch(docTab: any): any {
    this.activeTab = docTab;
    if (this.activeTab === 0) {
      this.getRetailerCommission('AEPS-ADMIN');
    }
    else if (this.activeTab === 1) {
      this.getRetailerCommission('AEPS-ADMINL');
    }
    else if (this.activeTab === 2) {
      this.getRetailerCommission('AEPS2-ADMIN');
    }
    else if (this.activeTab === 3) {
      this.getRetailerCommission('AEPS2-ADMINL');
    }
  }
  lastrchar(str: any): any {
    return str.substring(str.length-4, str.length);
  }
  getRetailerCommission(docType: any): void {
    const fromDt = this.commonService.formatDate((this.fromDt ? this.fromDt : new Date()), 'yyyy-mm-dd');
    const toDt = this.commonService.formatDate((this.toDt ? this.toDt : new Date()), 'yyyy-mm-dd');
    if (this.commonService.userPram.userId && this.commonService.userPram.memberId) {
      this.commonService.isLoader = true;
      this.commonService.getAuth('aeps/impst/get-aepstransaction?memberId=' + this.selectedMemberList?.code +  this.retid?.code + '&fromDt=' + fromDt + '&toDt=' + toDt + '&isStatus=' + this.isStatus + '&docType=' + docType+'&st='+this.searchType+'&txnNo='+this.txnNo)
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.statementList = JSON.parse(this.commonService.decryptUsingAES256(res.respData));
            }
            else
            {
              this.statementList = [];
            }
            console.log(this.statementList);
          },
          (err: any) => {
            this.commonService.isLoader = false;
          });
    }
  }
  exportAsXLSX(): any {
    const excelData: any = [];
    const header = ['Tran No','Trn Date', 'UpdatedOn', 'Name/Mobile', ' Customer No.','Aaddhar No.','Bank', 'Txn Mode',' Balance Amount','CW Amount','RRN','Status','Response'];
    this.statementList.forEach((el: any) => {
      const obj = [
        el.TxnNo,
        el.TrasactionDate,
        el.UpdatedOn,
        el.Narration,
        el.CustomerNumber,
        el.AdharNumber,
        el.Service,
        el.TrasactionType,
        el.Trnamount,
        el.CwAmount,
        el.Utr,
        el.ApiStatus,
        el.ApiMsg
      ];
      excelData.push(obj);
    });
    this.excelService.exportAsExcelWitheHeader(header,excelData, 'Aeps-Report.xlsx','I1');
  }  
  toggleModal(): any {
    this.isModel = false;
  }
  openForm(data:any): any {
    this.serviceData.MemberId= data.MemberId;
    this.serviceData.userid=data.MemberId;
    this.serviceData.nbiin=data.TxnNo;
    this.serviceData.MobileNumber=data.CustomerNumber;
    this.serviceData.transactionType="CW";
    this.serviceData.RtNumber=data.MobileNumber;
    this.serviceData.BankName=data.Service;
    this.serviceData.TransactionAmount=data.CwAmount;
    this.serviceData.narration= data.Narration;
    this.serviceData.remitterId=this.commonService.userPram.memberId;
    this.serviceData.beneficiaryId= this.commonService.userPram.memberId, 
    this.serviceData.paymentMode= 'AEPS-CW';    
    console.log(this.serviceData);              
    this.isModel=true;
  }
  onsaveAdmin(){
       this.commonService.isLoader=true;
      
       this.commonService.postAES256('aeps/impst/aepsPayNow', JSON.stringify(this.serviceData)).subscribe((res: any) => {
        this.commonService.isLoader=false; 
        if (res.isSuccess) {
          Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'OK' }); 
          this.getRetailerCommission('AEPS-ADMIN');       
         }
         else {
           this.commonService.isLoader=false;           
           Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'OK' });
         }
       },
         (err: any) => {
           if (err.message) {
           }
         });
   }
}