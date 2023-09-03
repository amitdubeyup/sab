import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelService } from 'src/app/services/excel.service';
import Swal from 'sweetalert2';
import { WindowRefService } from 'src/app/services/window-ref.service';
import { ExternalLibraryService } from 'src/app/services/util';
import { ApiService } from 'src/app/services/ApiService.service';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css']
})
export class NewRequestComponent implements OnInit {

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
    { id: 'rejected', name: 'Rejected' }
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
    private razorpayService: ExternalLibraryService) {
      this.route.queryParams.subscribe((params: any) => {
        if (params.pram) {
          this.fundRequest = JSON.parse(this.commonService.decryptUsingAES256(params.pram));
          this.fundRequest.DepositDate = new Date(this.fundRequest.DepositDate);
          console.log( this.fundRequest);
        }
      });
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

    }
    // function to get difference between from date and to date
    getDiffDays(sDate: any, eDate: any) {
      var startDate = new Date(sDate);
      var endDate = new Date(eDate);
      var Time = endDate.getTime() - startDate.getTime();
      return Time / (1000 * 3600 * 24);
     }

  fetchBankList(): any {
    this.commonService.getAuth(`retailer/get-admin-bank?docType=BANKLIST&member_id=`+this.commonService.userPram.memberId).subscribe((res: any) => {
      if (res.isSuccess) {
        this.bankList = res.respData;
      }
    }, (err: any) => {
      console.log(err);
    });
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
    this.isModel = !this.isModel;
  }
   btnclose(): any {
    this.router.navigateByUrl('/merchant/money-request');
  }
  onFileSelect(event: any): any {
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
      this.fileData = event.target.files[0];
      this.fundRequest.TxnSlip = event.target.files[0].name;
    }
   }
  }
  onFormSubmit(): any {
    this.openModal();
    const formData = new FormData();
    formData.append('Amount', this.fundRequest.Amount);
    formData.append('TxnMode', this.commonService.encryptUsingAES256(this.fundRequest.TxnMode));
    formData.append('BankId', this.fundRequest.BankId);
    formData.append('TxnSlip', this.fundRequest.TxnSlip);
    formData.append('DepositDate', this.commonService.formatDate(this.fundRequest.DepositDate, 'yyyy/mm/dd'));
    formData.append('SenderNote', this.fundRequest.SenderNote);
    formData.append('MemberId', this.commonService.userPram.memberId);
    formData.append('IsStatus', 'initiated');
    formData.append('docType', 'Fund-Request');
    formData.append('uploadefile', this.fileData);
    formData.append('Asm',(this.commonService?.asmData?.smeName)+'-'+(this.commonService?.asmData?.smeMobileNo));
    if (this.fundRequest.Id) {
      formData.append('Id', this.fundRequest.Id);
      formData.append('TxnId', this.fundRequest.TxnId);
      formData.append('RecieverNote', this.fundRequest.RecieverNote);
    }
    else
    {
      formData.append('TxnId', this.boundDet.txnNo);
    }
    this.commonService.isLoader = true;
    this.commonService.postAuthFile('fileservices/fund-request', formData).subscribe((res: any) => {
      this.commonService.isLoader = false;
      if (res.isSuccess) {
        this.fundRequest = new FundRequest();
        this.fundRequest.Amount="";
        Swal.fire({ icon: 'success', text: 'Your request initiated successfully!', confirmButtonText: 'OK' }).then(() => {
          this.router.navigateByUrl('/merchant/money-request');
         });
      } else {
        Swal.fire({ icon: 'error', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
    }, (err: any) => {
      console.log(err);
      this.commonService.isLoader = false;
      Swal.fire({ icon: 'error', text: 'something went wrong!', confirmButtonText: 'OK' });
    });
  }

  editRequest(data: FundRequest): any {
    data.DepositDate = new Date(data.DepositDate);
    this.fundRequest = data;
    this.openModal();
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
  else if(isStatus=='rejected')
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
