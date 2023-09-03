import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelService } from 'src/app/services/excel.service';
import Swal from 'sweetalert2';
import { WindowRefService } from 'src/app/services/window-ref.service';
import { ExternalLibraryService } from 'src/app/services/util';
import { MatDialog } from '@angular/material/dialog';
import { ImportComponent } from './import/import.component';
import { DatePipe } from '@angular/common';
import { PrintBoundComponent } from './print-bound/print-bound.component';
import { ApiService } from 'src/app/services/ApiService.service';
declare const PayNow: any;
@Component({
  selector: 'app-fund-request',
  templateUrl: './fund-request.component.html',
  styleUrls: ['./fund-request.component.css'],
  providers: [WindowRefService,DatePipe]
})
export class FundRequestComponent implements OnInit {

  fundRequest: FundRequest = new FundRequest();
  isModel = false;
  fileData: any;
  isModelOnline=false;
  isNext=false;
  paymentList: any = [
    { id: 1, name: 'Cash/Stuck Amount' },
    { id: 2, name: 'CDM' },
    { id: 4, name: 'IMPS/UPI' },
    { id: 5, name: 'NEFT/RTGS' },
    { id: 3, name: 'Fund Transfer' },
    { id: 6, name: 'Cheque' },
  ];
  paymentListGrid: any = [
    { id: 1, name: 'Cash/Stuck Amount' },
    { id: 2, name: 'CDM' },
    { id: 4, name: 'IMPS/UPI' },
    { id: 5, name: 'NEFT/RTGS' },
    { id: 3, name: 'Fund Transfer' },
    { id: 6, name: 'Cheque' },
    { id: 7, name: 'Online' },
  ];
  StatusList: any = [
    { id: null, name: 'ALL' },
    { id: 'initiated', name: 'Initiated' },
    { id: 'pginitiated', name: 'PG Initiated' },
    { id: 'pending', name: 'Pending' },
    { id: 'approved', name: 'Approved' },
    { id: 'Declined', name: 'Declined' }
  ];
  bankList: any = [];
  requestList: any = [];
  fromDt: any = new Date();
  toDt: any = new Date();
  minDate:any= new Date();
  maxDate:any= new Date();
  activeDt: any = new Date();
  docType = 'pending';
  isStatus: any=null;
  resBank: any;
  fundRequestOnline:any={};
  importContacts: any;
  activeTab=0;
  totalAmount=0;
  filePath:any;
  isModelSlip=false;
  isRazor:boolean=true;
  servicePrivileges:any;
  isfundRequest:boolean=false;
  isfundRequest1: boolean=false;
  isimoprt:boolean=false;
  usermenuright:any;
  maxDt:any = new Date();
  selectedDepositBankList: any = [];
  boundDet:any={};
  constructor(
    public excelService: ExcelService,
    public commonService: ApiService,
    public route: ActivatedRoute,
    public router: Router,
    private winRef: WindowRefService,
    public dialog: MatDialog, 
    public datePipe:DatePipe,
    private razorpayService: ExternalLibraryService) {
    //  this.maxDt.setDate(new Date());
  }

  ngOnInit(): void {
    this.fromDt.setDate(this.fromDt.getDate());
    this.toDt.setDate(this.toDt.getDate());
    this.activeDt.setDate(this.activeDt.getDate());
    
    this.fetchBankList();
    this.getBank();

      this.usermenuright=JSON.parse(this.commonService?.userPram?.usermenuright);      
      this.isimoprt=this.usermenuright.find((e: any) => e.type === 'FUND' && e.value==true)?.type=='FUND'?true:false;
      this.commonService.serviceBehaviourData$.subscribe((res) => {
        const servicePrivilegesData = localStorage.getItem('serviceBehaviour') ? localStorage.getItem('serviceBehaviour') : null;
        if (servicePrivilegesData) {
          this.servicePrivileges = JSON.parse(this.commonService.decryptUsingAES256(servicePrivilegesData));
          if(this.servicePrivileges)
          {
            this.isfundRequest=this.servicePrivileges.find((e: any) => e.type === 'PG' && e.value==true )?.type=='PG'?true:false;
           
            this.isfundRequest1=this.servicePrivileges.find((e: any) => e.type === 'FUNDREQUEST' && e.value==true )?.type=='FUNDREQUEST'?true:false;

            let isRazor=this.servicePrivileges.find((e: any) => e.type === 'RAZR' && e.value==true )?.type=='RAZR'?true:false;
            let isWire=this.servicePrivileges.find((e: any) => e.type === 'WIRE' && e.value==true )?.type=='WIRE'?true:false;
            if(this.isfundRequest)
            {
              this.isfundRequest=this.usermenuright.find((e: any) => e.type === 'PG' && e.value==true )?.type=='PG'?true:false;
            }
            if(this.isfundRequest1)
            {
              this.isfundRequest1=this.usermenuright.find((e: any) => e.type === 'FUNDREQUEST' && e.value==true )?.type=='FUNDREQUEST'?true:false;
            }
         
            if(isRazor && isWire)
            {
              this.isRazor=false;
            }
            else if(isRazor)
            {
              this.isRazor=true;
            }
            else if(isWire)
            {
              this.isRazor=false;
            }
            
          } 
        }
      }); 
      if(this.isRazor)
      {
        this.razorpayService
        .lazyLoadLibrary('https://checkout.razorpay.com/v1/checkout.js')
        .subscribe();
      }
      else
      {
        this.razorpayService
        .lazyLoadLibrary('https://ebz-static.s3.ap-south-1.amazonaws.com/easecheckout/easebuzz-checkout.js')
        .subscribe();
        this.razorpayService
      .lazyLoadLibrary('assets/js/pg.js')
      .subscribe();
      }
    }
    // function to get difference between from date and to date 
    getDiffDays(sDate: any, eDate: any) {
      var startDate = new Date(sDate);
      var endDate = new Date(eDate);  
      var Time = endDate.getTime() - startDate.getTime();
      return Time / (1000 * 3600 * 24);
     }
  
  handleChange(event: any): any {
    this.isModelOnline=false;
    this.activeTab=event.index;
    if (event.index) {
      this.docType = 'all';
      this.fetchFundRequestList();
    } else {
      this.docType = 'pending';
      this.fetchFundRequestList();
    }
  }

  fetchBankList(): any {
    this.commonService.getAuth(`retailer/get-admin-bank?docType=BANKLIST&member_id=`+this.commonService.userPram.memberId).subscribe((res: any) => {
      if (res.isSuccess) {
        this.bankList = res.respData;
        this.fetchFundRequestList();
      }
    }, (err: any) => {
      console.log(err);
    });
  }

  fetchFundRequestList(): any {
    this.commonService.isLoader = true;
    const fromDt = this.commonService.formatDate((this.fromDt ? this.fromDt : new Date()), 'yyyy-mm-dd');
    const toDt = this.commonService.formatDate((this.toDt ? this.toDt : new Date()), 'yyyy-mm-dd');
    const difference_date = this.getDiffDays(fromDt, toDt);
    let url = '';
    const bankList = this.selectedDepositBankList.join(',');
    if (this.docType === 'pending') {
      url = 'retailer/get-fund-request?memberId=' + this.commonService.userPram.memberId + '&fromDt=' + fromDt + '&toDt=' + toDt + '&docType=' + this.docType + '&bank=' + bankList ;
    } else {
      url = 'retailer/get-fund-request?memberId=' + this.commonService.userPram.memberId + '&fromDt=' + fromDt + '&toDt=' + toDt + '&isStatus=' + this.isStatus + '&docType=all' + '&bank=' + bankList;
    }
    if(difference_date>30){
      Swal.fire({ icon: 'success', text: 'Please select valid date - Report Restrict to one month', confirmButtonText: 'OK' });
      this.commonService.isLoader = false;
    }
    else
    {
      this.commonService.getAuth(url).subscribe((res: any) => {
        this.commonService.isLoader = false;
        if (res.isSuccess) {
          this.requestList = JSON.parse(this.commonService.decryptUsingAES256(res.respData));
          this.totalAmount=0;
          this.requestList.forEach((element: any) => {
            this.totalAmount = this.totalAmount + parseFloat(element.Amount);
          });
        }
        else
        {
          this.requestList=[];
        }
      }, (err: any) => {
        console.log(err);
        this.commonService.isLoader = false;
      });
    }
  }

  getBank(): any {
    if (this.commonService.userPram.userId !== undefined && this.commonService.userPram.userId !== '' && this.commonService.userPram.rmn !== undefined && this.commonService.userPram.rmn !== '') {
      this.commonService.isLoader = true;
      this.commonService.getAuth('servicemanager/get-admin-bank-list?memberid=' + this.commonService.userPram.memberId + '&docType=RT')
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.resBank = res.respData;
            }
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
            alert('something went wrong!');
          });
    }
  }

  changeText(myText: any): void {
    return myText.value;
  }

  getPaymentMode(value: any): any {
    let matched = null;
    if (value) {
      this.paymentListGrid.forEach((element: any) => {
        if (parseInt(element.id, 10) === parseInt(value, 10)) {
          matched = element.name;
        }
      });
    }
    return matched;
  }

  updateAmount(event: any, index: any): any {
    try {
      event.target.value = parseInt(event.target.value, 10);
    } catch {
      event.target.value = 100;
    }
    this.fundRequest.Amount = event.target.value;
  }

  // Fund Request Start
  openModal(): any {
    this.router.navigate(['/rt/money-request/newrequest']);
  }

  editRequest(data: FundRequest): any {
    data.DepositDate = new Date(data.DepositDate);
    this.fundRequest = data;
    const jsonData = this.commonService.encryptUsingAES256(JSON.stringify(this.fundRequest));
    this.router.navigate(['/rt/money-request/newrequest'], { queryParams: { pram: jsonData } });
  }

  openModalOnline(): any {
    this.isModelOnline = !this.isModelOnline;
  }
  payWithRazorOnline(){ 
    if(this.fundRequestOnline && this.fundRequestOnline?.Amount)
    {
      if(this.isRazor)
      {
      this.isModelOnline=false;
      let order_id=this.datePipe.transform(new Date(), 'ddMMyyhhmmssSS');
      let options:any = {
        "key":"rzp_live_k8SlRpS2ugoDkD",//"rzp_test_NGKw04IquSVto6" 
        "amount":parseFloat(this.fundRequestOnline?.Amount)*100,
        "name": "SOUL PAY",
        "currency": "INR",
        "description": "FP PRIVATE LIMITED",
        "image": "../assets/images/logo.png",
        "modal": {
          "escape": false
        }, 
        "prefill": {
          "name": this.commonService?.userPram?.userName,
          "contact": '',
          "email": ''
        },
        "notes": {
          "order_id": order_id,
          'memberId':this.commonService.userPram.memberId
        },
        "theme": {
          "color": "#0167DF"
        }
      };
      options.handler = ((response:any) => {
        this.commonService.isLoader = true;
         console.log("log",response);
          options['payment_response_id'] = response.razorpay_payment_id;
          if(response &&  response.razorpay_payment_id)
          {
            this.fundRequestOnline.TxnMode=this.commonService.encryptUsingAES256("7");
            this.fundRequestOnline.BankId=10013;
            this.fundRequestOnline.TxnId=order_id;
            this.fundRequestOnline.MobileNo= this.commonService?.userPram?.rmn;  
            this.fundRequestOnline.MemberId=this.commonService.userPram.memberId;
            this.fundRequestOnline.IsStatus="approved";
            this.fundRequestOnline.docType="PG";
            this.fundRequestOnline.UpdatedBy = this.commonService.userPram.memberId;
            this.fundRequestOnline.updDesc ='Approved through PG';            
            this.fundRequestOnline.utr =response.razorpay_payment_id;            
            this.commonService.postAuth('membersapi/fund-request-online', this.fundRequestOnline).subscribe((res: any) => {
              this.commonService.isLoader = false;
              if (res.isSuccess) {
                this.fundRequestOnline={};
                this.fetchFundRequestList();
                this.activeTab=1;
                Swal.fire({ icon: 'success', text: 'Payment successfully!', confirmButtonText: 'OK' });
                this.isModelOnline=false; 
                       
              } else {
                this.commonService.isLoader = false;    
                this.fundRequestOnline={};
                Swal.fire({ icon: 'error', text: res.mhOutcome, confirmButtonText: 'OK' });
              }
            }, (err: any) => {
              console.log(err);
              this.commonService.isLoader = false;
              this.fundRequestOnline={};
              Swal.fire({ icon: 'error', text: 'something went wrong!', confirmButtonText: 'OK' });
            });
          }
      });
      options.modal.ondismiss = (() => { 
        this.fundRequestOnline={};
        Swal.fire({ icon: 'error', text: 'Transaction cancelled.', confirmButtonText: 'OK' });
        this.commonService.isLoader = false;   
      });
      let rzp = new this.winRef.nativeWindow.Razorpay(options);
      rzp.on(function (response:any){        
        console.log("le",response);
              alert(response.error.code);
              alert(response.error.description);
              alert(response.error.source);
              alert(response.error.step);
              alert(response.error.reason);
              alert(response.error.metadata.order_id);
              alert(response.error.metadata.payment_id);
      });
      rzp.open();
    }
    else
    {
      this.commonService.isLoader = true;
      const postData = {
        MemberId: this.commonService.userPram.memberId,
        UserId:this.commonService.userPram.userId,
        Firstname: this.commonService.userPram.companyName,
        Email:this.fundRequestOnline?.email,
        Phone: this.commonService?.userPram?.rmn,
        Productinfo: "Payment Online",
        Amount: this.fundRequestOnline?.Amount,
        payment_mode: "",
        Txnid: ""
      };
      this.commonService.isLoader = true;
      this.commonService.postAES256(`retailer/generateorderid`, JSON.stringify(postData)).subscribe((res: any) => {
        if (res.isSuccess) {
          PayNow(res.orderId,'RT')
          this.commonService.isLoader = false;
        } else {
          this.commonService.isLoader = false;
          Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'OK' });
        }
      }, (err: any) => {
        this.commonService.isLoader = false;
        this.commonService.displayToaster('something went wrong', 'error');
      });
    }
  }  
 }
 openImport(): void { 
  let dialogRef = this.dialog.open(ImportComponent, { 
    width: '1000px', 
    data: { uid:''} 
  }); 
  dialogRef.afterClosed().subscribe(result => { 
    this.fetchFundRequestList();
    this.commonService.isLoader = false;
  }); 
 } 
 printbound(data:any): void { 
  let dialogRef = this.dialog.open(PrintBoundComponent, { 
    width: '850px', 
    maxHeight: '90vh',
    data: data
  }); 
  dialogRef.afterClosed().subscribe(result => { 
    this.commonService.isLoader = false;
  }); 
 } 
 exportAsXLSX(): any {
  const excelData: any = [];
  this.requestList.forEach((el: any) => {
    const obj = [
      el.TxnId,   
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
  const header = ['ReqId','Mode', 'Bank', 'Deposit Date','Amount','Remarks','Admin Remarks','Request Date','Approved Date','Status'];
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
 getBoard(board: any): any {
  let name = '';
  this.bankList.forEach((element: any) => {
    if (element.code === board?.toString()) {
      name = element.desc;
    }
  });
  return name;
}
 btnNext(): void {
  this.commonService.isLoader = true;
  this.commonService.getAuth('fileservices/getfundtxn?memberid='+this.commonService.userPram.memberId)
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.isNext=true;
                if(this.fundRequest.Id) 
                {
                    this.boundDet.txnNo=this.fundRequest.TxnId;
                }
                else
                {
                  this.boundDet.txnNo=res.txn;
                }
                this.boundDet.pan=res.pan;
             
            }
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
      });
    }
    btnback():void{
      this.isNext=false;
    }
}


export class Contact {
  Amount = '';
  TxnMode = '';
  BankId = '';
  DepositDate = '';
  SenderNote = '';
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
}
