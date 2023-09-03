import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { ExcelService } from 'src/app/services/excel.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fund-request',
  templateUrl: './fund-request.component.html',
  styleUrls: ['./fund-request.component.css']
})
export class FundRequestComponent implements OnInit {
  fundRequest: FundRequest = new FundRequest();
  StatusList: any = [
    { id: null, name: 'All' },
    { id: 'initiated', name: 'Initiated' },
    { id: 'pending', name: 'Pending' },
    { id: 'approved', name: 'Approved' },
    { id: 'Declined', name: 'Declined' }
  ];
  paymentList: any = [
    { id: 1, name: 'Cash/Stuck Amount' },
    { id: 2, name: 'CDM' },
    { id: 4, name: 'IMPS/UPI' },
    { id: 5, name: 'NEFT/RTGS' },
    { id: 3, name: 'Fund Transfer' },
    { id: 6, name: 'Cheque' },
  ];
  bankList: any = [];
  respAsm: any = [];
  fundRequestList: any = [];
  isModel = false;
  totalAmountCr=0;
  fromDt: any = new Date();
  toDt: any = new Date();
  isStatus: any;
  selectedDepositBankList: any = [];
  filePath:any;
  isModelSlip=false;
  memberList: any = [];
  selectedMemberList: any;
  selectedAsmList: any;
  isFundRequestOnline:any;
  constructor(
    public commonService:ApiService,
    public route: ActivatedRoute,
    public excelService: ExcelService,
    public router: Router) {
  }

  ngOnInit(): void {
    this.isStatus = 'initiated';
    this.fromDt.setDate(this.fromDt.getDate());
    this.toDt.setDate(this.toDt.getDate());
    this.getMemberList("SA");
    this.fetchBankList();
    this.fetchFundRequestList();
    this.GetASMList();
    this.isFundRequestOnline=false;
    this.route.queryParams.subscribe((params: any) => {
      if(params && params?.fundRequestType=='PGONLINE')
      {
        this.isFundRequestOnline=true;
      }
    });    
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

  fetchBankList(): any {
    this.commonService.getAuth(`retailer/get-admin-bank?docType=lis`).subscribe((res: any) => {
      if (res.isSuccess) {
        this.bankList = res.respData;
        console.log(this.bankList);
      }
    }, (err: any) => {
      console.log(err);
    });
  }

  fetchFundRequestList(): any {
    this.commonService.isLoader = true;
    const fromDt = this.commonService.formatDate((this.fromDt ? this.fromDt : new Date()), 'yyyy-mm-dd');
    const toDt = this.commonService.formatDate((this.toDt ? this.toDt : new Date()), 'yyyy-mm-dd');
    const bankList = this.selectedDepositBankList.join(',');
    this.commonService.getAuth('retailerreport/get-admin-fund-request?memberId=' + this.selectedMemberList?.code  + '&bank=' + bankList + '&fromDt=' + fromDt + '&toDt=' + toDt + '&isStatus=' + this.isStatus + '&docType=admin&asm='+this.selectedAsmList?.desc).subscribe((res: any) => {
      this.commonService.isLoader = false;
      if (res.isSuccess) {
        this.fundRequestList = JSON.parse(this.commonService.decryptUsingAES256(res.respData));
        console.log(this.fundRequestList);
        this.totalAmountCr = 0;
        this.fundRequestList.forEach((element: any) => {
          this.totalAmountCr = this.totalAmountCr + parseFloat(element.Amount);            
        });
      }
      else{
        this.fundRequestList =[];
      }
    }, (err: any) => {
      console.log(err);
    });
  }
  changeText(myText: any): void {
    return myText.value;
  }

  getPaymentMode(value: any): any {
    let matched = null;
    if (value) {
      this.paymentList.forEach((element: any) => {
        if (parseInt(element.id, 10) === parseInt(value, 10)) {
          matched = element.name;
        }
      });
    }
    return matched;
  }

  onFormSubmit(): any {
    this.closeModal();
    console.log(this.fundRequest);
    this.commonService.isLoader = true;
    this.fundRequest.UpdatedBy = this.commonService.userPram.memberId;
    this.fundRequest.IsStatus=this.fundRequest.IsStatus=='pd'?'pending':this.fundRequest.IsStatus;
    this.fundRequest.updDesc = 'Updated By : Opration Team';
    this.commonService.postAuth('membersapi/upd-fund-request', this.fundRequest).subscribe((res: any) => {
      console.log(res);
      this.commonService.isLoader = false;
      if (res.isSuccess) {
        this.fetchFundRequestList();
        if(this.fundRequest.IsStatus!='approved')
        {
        Swal.fire({ icon: 'success', text: 'Saved successfully!', confirmButtonText: 'OK' });
        }
      } else {
        Swal.fire({ icon: 'error', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
    }, (err: any) => {
      console.log(err);
      this.commonService.isLoader = false;
      Swal.fire({ icon: 'error', text: 'something went wrong!', confirmButtonText: 'OK' });
    });
  }

  openModal(data: FundRequest): any {
    this.isModel = !this.isModel;
    this.fundRequest = data;
  }

  closeModal(): any {
    this.isModel = !this.isModel;
  }
  exportAsXLSX(): any {
    const excelData: any = [];
 
    this.fundRequestList.forEach((el: any) => {
      const obj = [
        el.TxnId,
        el.CompanyName,
        this.getPaymentMode(el.TxnMode),
        el.BankName,
        this.commonService.formatDate(el.DepositDate, 'dd/mm/yyyy'),
        el.Amount,
        el.SenderNote,
        el.RecieverNote,
        el.CreateOn,
        el.ApprovedDt,
        el.IsStatus      
      ];
      excelData.push(obj);
    });
    const header = ['ReqId', 'Company/Shop', 'Mode', 'Bank', 'Deposit Date','Amount','Remarks','Admin Remarks','Request Date','Approved Date','Status'];
    this.excelService.exportAsExcelWitheHeader(header,excelData, 'Fund-Request.xlsx','K1');
  }
   openModel(filePath: any): void {
    this.isModelSlip = true;
    this.filePath = this.commonService.appFundRequestURL + '' + filePath;
   }
   getStatus(isStatus:any): any {
    if(isStatus=='initiated')
    {
      return 'customer-badge status-new'
    }
    else if(isStatus=='pending')
    {
      return 'customer-badge status-proposal'
    }
    else if(isStatus=='approved')
    {
      return 'customer-badge status-qualified'
    }
    else if(isStatus=='Declined')
    {
      return 'customer-badge status-unqualified'
    }
    else
    {
      return 'customer-badge status-new'
    }
   }

   approvePGFundRequest(data:any):void
   {
    //Swal.fire({ icon: 'success', html:data.TxnId+'<br/>'+data.Amount+'<br/>'+data.EmailId+'<br/>'+data.MobileNo, confirmButtonText: 'OK' });

    this.commonService.isLoader = true;
    this.commonService.postAuthFile('retailer/get-status?memberId='+this.commonService.userPram.memberId+'&txnno='+data.TxnId+'&amount='+data.Amount+'&emailId='+data.EmailId+'&mobileNo='+data.MobileNo,{}).subscribe((res: any) => {
      console.log(res);
       this.commonService.isLoader = false;
      Swal.fire({ icon:res.isSuccess?'success':'error', text:res.mhOutcome, confirmButtonText: 'OK' });    
      if (res.isSuccess) {
        this.fetchFundRequestList();
      }  
    }, (err: any) => {
      console.log(err);
      this.commonService.isLoader = false;
      Swal.fire({ icon: 'error', text: 'Oops,something went wrong with fund request update status!', confirmButtonText: 'OK' });
    });
    
   }

    GetASMList(): void {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('users/get-member-asm?docType=ALL')
        .subscribe(
          (res: any) => {
            if (res.isSuccess) {
              this.respAsm = res.respData;
              console.log('this.respAsm', this.respAsm)
            }
            else {
              this.respAsm = [];
            }
          });
    }
  }
}

export class FundRequest {
  Amount: any = null;
  Bank: any = null;
  BankAcc: any = null;
  BankId: any = null;
  BankName: any = null;
  CompanyName: any = null;
  CreateOn: any = null;
  DepositDate: any = null;
  Id: any = null;
  IsStatus: any = null;
  MemberId: any = null;
  MobileNo: any = null;
  RecieverNote: any = null;
  SenderNote: any = null;
  TrnId: any = null;
  TxnId: any = null;
  TxnMode: any = null;
  TxnSlip: any = null;
  UpdatedBy: any = null;
  UpdatedOn: any = null;
  updDesc: any = null;
  PaymentMode: any = null;
}
