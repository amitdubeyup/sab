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
  minDate: any = new Date();
  maxDate: any = new Date();
  fromDt: any = new Date();
  toDt: any = new Date();
  statementList: any = [];
  activeTab: any = 0;
  isStatus: any = null;
  totalAmount = 0;
  totalCharge = 0;
  totalCommission = 0;
  searchType:any;
  txnNo:any='';
  creditMoneyModal:any={};
  walletDetails: any;
  isModel:boolean=false;
  modalData:any={};
  bankList: any = [];
  imageError: any;
  cardImageBase64: any;
  isImageSaved: boolean=false;
  beneDet: any;
  ishow: boolean=false;
  pipeList: any;
  chargeAmt: number=0;
  netTotal: number=0;
  isModelSlip: boolean=false;  
  filePath: any;
  beneDetails:any={}
  beneDetApprove:any;
  lat:any;
  lag:any;
  constructor(
    public excelService: ExcelService,
    public commonService: ApiService,
    public sharedMethodService: SharedMethodService,
    public route: ActivatedRoute,
    public router: Router) {
  }

  ngOnInit(): void {
    this.fromDt.setDate(this.fromDt.getDate());
    this.toDt.setDate(this.toDt.getDate());
    this.getRetailerCommission('AEPSL');
    this.getBene();
    this.getBeneApprove();
    this.getLocation();
  }
  getLocation() {
    this.commonService.getPosition().then(pos=>
      {
        this.lat = pos.lat;
        this.lag = pos.lng;
         console.log(`Positon: ${pos.lng} ${pos.lat}`);
      },err => {
        Swal.fire({ icon: 'warning', text: 'Please allow the Location access!', confirmButtonText: 'Okay!',allowOutsideClick: false }).then((result) => {
          if (result.isConfirmed) {
            this.getLocation();
          }
        });
      });
  }
  fetchWalletDetails(memberId: any): any {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      const url = 'users/getprantuser?memberId=' + memberId + '&userId=&parentId=&docType=AEPSBAL';
      this.commonService.getAuth(url).subscribe((res: any) => {
        if (res.isSuccess) {
          this.walletDetails = res.respData;
          console.log(this.walletDetails);
        }
      }, (err: any) => {
        console.log(err);
      });
    }
  }
  changeText(myText: any): void {
    return myText.value;
  }
  getBankList(): any {
    this.commonService.isLoader = true;
    this.commonService.getAuth('retailer/get-bank-details?memberId=' + this.commonService.userPram.memberId + '&docType=ddl')
      .subscribe(
        (res: any) => {
          this.commonService.isLoader = false;
          if (res.isSuccess) {
            this.bankList = res.respData;
          }
          console.log(this.bankList);
        },
        (err: any) => {
          this.commonService.isLoader = false;
        });
  }
  getBeneApprove(): any {
    this.commonService.isLoader = true;
    this.commonService.getAuth('aeps/impst/GetAepsBene?memberId=' + this.commonService.userPram.memberId + '&docType=RTAPPROVE')
      .subscribe(
        (res: any) => {
          this.commonService.isLoader = false;
          if (res.isSuccess) {
            this.beneDetApprove = res.respData;
          }
          else
          {
            this.beneDetApprove=null;
          }
        },
        (err: any) => {
          this.commonService.isLoader = false;
        });
  }
  getBene(): any {
    this.commonService.isLoader = true;
    this.commonService.getAuth('aeps/impst/GetAepsBene?memberId=' + this.commonService.userPram.memberId + '&docType=RT')
      .subscribe(
        (res: any) => {
          this.commonService.isLoader = false;
          if (res.isSuccess) {
            this.beneDet = res.respData;
            if(this.beneDet.length>4)
            {
            this.ishow=true;
            }
          }
          else
          {
            this.beneDet=null;
            this.ishow=false;
          }
        },
        (err: any) => {
          this.commonService.isLoader = false;
        });
  }
  handleChange(e: any): any {
    this.activeTab = e.index;
    if (this.activeTab === 0) {
      this.getRetailerCommission('AEPSL');
    }
   else if (this.activeTab === 1) {
      this.fetchWalletDetails(this.commonService.userPram.memberId);
    }
    else if (this.activeTab === 2) {
      this.getBankList();
      this.getBene();
      this.creditMoneyModal.transactionType="IMPS-AEPS";
      this.fetchWalletDetails(this.commonService.userPram.memberId);
    }
  }
  getPaymentPipe(Category:any, maxAmount: any): any {
    this.commonService.isLoader = true;
    if (Category && maxAmount && this.commonService.userPram.memberId) {
      this.commonService.getAuth('aeps/impst/get-template-service?memberId=' + this.commonService.userPram.memberId + '&ApiType=P1&Category='+Category+'&isMaxAmt=true&maxAmount=' + maxAmount+"&docType=DMT")
        .subscribe(
          (res: any) => {
            console.log(res);
            this.commonService.isLoader = false;
            if (res.isSuccess) {              
              if (res.respData.apiId === '768cde9b-c1e6-11eb-aa88-00ffa370980e' || res.respData.apiId==='ac1ea406-5de3-11ed-afb4-00be432ac5fc' || res.respData.apiId==='0ceadbdf-4414-11ed-8d86-00be432ac5fc') {
                this.pipeList = res.respData;
                if(this.pipeList && this.pipeList.rateType=='R')
                {
                  if (this.pipeList?.rate>0) {
                    this.chargeAmt=this.pipeList.rate;
                  }
                  else
                  {
                    this.chargeAmt = this.pipeList.capAmt; 
                  }
                  this.netTotal=parseInt(this.creditMoneyModal.amount,10)+this.chargeAmt;
                }
                else{
                  if (this.pipeList.rate>0) {
                    this.chargeAmt=(parseInt(this.creditMoneyModal.amount,10) * this.pipeList.rate)/100;     
                  }
                  else
                  {
                    this.chargeAmt = this.pipeList.capAmt; 
                  }
                  this.netTotal=parseInt(this.creditMoneyModal.amount,10)+this.chargeAmt;
                }
              } 
              else
              {
                this.pipeList=null;
                alert('you are not authorized for transfer to bank ');
              }
            } 
            else {
              this.pipeList=null;
              alert('you are not authorized for transfer to bank ');
            }
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
            alert('something went wrong!');
          });
    }
  }
  handleSearch(docTab: any): any {
    this.activeTab = docTab;
    if (this.activeTab === 0) {
      this.getRetailerCommission('AEPSL');
    }
    else if (this.activeTab === 1) {
      this.fetchWalletDetails(this.commonService.userPram.memberId);
    }
    else if (this.activeTab === 2) {
      this.getBankList();
      this.getBene();
      this.fetchWalletDetails(this.commonService.userPram.memberId);
    }
  }
  lastrchar(str: any): any {
    return str.substring(str.length-4, str.length);
  }
   
 // function to get difference between from date and to date 
 getDiffDays(sDate: any, eDate: any) {
  var startDate = new Date(sDate);
  var endDate = new Date(eDate);  
  var Time = endDate.getTime() - startDate.getTime();
  return Time / (1000 * 3600 * 24);
}

  getRetailerCommission(docType: any): void {
    const fromDt = this.commonService.formatDate((this.fromDt ? this.fromDt : new Date()), 'yyyy-mm-dd');
    const toDt = this.commonService.formatDate((this.toDt ? this.toDt : new Date()), 'yyyy-mm-dd');
    const difference_date = this.getDiffDays(fromDt, toDt);
    if(difference_date>30){
      Swal.fire({ icon: 'success', text: 'Please select valid date - Report Restrict to one month', confirmButtonText: 'OK' });
    }	
    if (this.commonService.userPram.userId && this.commonService.userPram.memberId) {
      this.commonService.isLoader = true;
      this.commonService.getAuth('aeps/impst/get-aepstransaction?memberId=' + this.commonService.userPram.memberId + '&fromDt=' + fromDt + '&toDt=' + toDt + '&isStatus=' + this.isStatus + '&docType=' + docType+'&st='+this.searchType+'&txnId='+this.txnNo)
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.statementList = JSON.parse(this.commonService.decryptUsingAES256(res.respData));
            }
            console.log(this.statementList);
          },
          (err: any) => {
            this.commonService.isLoader = false;
          });
    }
  }
 
  onCreditMoneySave(): any {
    if (this.commonService.userPram.memberId && this.commonService.userPram.rmn) {
    {
    if (this.creditMoneyModal.amount < this.walletDetails.aepsBalance) {
      this.commonService.isLoader = true;
      const passingData = {
        userId: this.commonService.userPram.userId,
        memberId: this.commonService.userPram.memberId,
        templateId: '',
        remitterId:this.commonService.userPram.memberId,
        beneficiaryId: this.commonService.userPram.memberId,
        apId: '',
        serviceType: 'AEPS',
        BankName:"Wallet",
        MobileNumber:this.commonService.userPram.rmn,
        paymentMode: 'AEPS2W',
        WalletId:this.walletDetails.wallet_id,
        numberOfTrns: 1,
        perTrnsAmount: this.creditMoneyModal.amount,
        totalTrnsAmount: this.creditMoneyModal.amount,
        BeneName: this.commonService.userPram.companyName+' | '+this.commonService.userPram.rmn+' | '+this.commonService.userPram.userType+''+this.commonService.userPram.id,
        Ifsc: '',
        udf2: this.commonService.userPram.companyName+' | '+this.commonService.userPram.rmn+' | '+this.commonService.userPram.userType+''+this.commonService.userPram.id,
        intent: this.creditMoneyModal.remark,
        docType: 'P1',
        recipientId: '',
        accNo: '',
        agentCode: this.commonService.userPram.id,
        refNumber: this.commonService.userPram.rmn,
        narration: "AEPS Balance Transfer To Wallet",
      };
      this.commonService.postAES256('aeps/impst/aeps-transfertowallet', JSON.stringify(passingData))
        .subscribe(
          (res: any) => {
            console.log(res);
            this.commonService.isLoader = false;
            Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
              this.creditMoneyModal = {};
              this.fetchWalletDetails(this.commonService.userPram.memberId);
              this.commonService.fetchWalletDetails();
            });
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
          });
    } 
    else {
      Swal.fire({ icon: 'error', text: 'Oops ! Insufficient AEPS wallet balance!', confirmButtonText: 'OK' });
    }
   }
  }
}
exportAsXLSX(): any {
  const excelData: any = [];
  const header = ['Tran No','Trn Date', 'UpdatedOn', 'Name/Mobile', ' Customer No.','Aaddhar No.','Bank', 'Txn Mode',' Balance Amount','CW Amount','Opening Balance','Closing Balance','RRN','Status','Response'];
  this.statementList.forEach((el: any) => {
    const obj = [
      el.TxnNo,
      el.TrasactionDate,
      el.UpdatedOn,
      el.Narration+ ' '+el.MobileNumber,
      el.CustomerNumber,
      el.AdharNumber,
      el.Service,
      el.TrasactionType,
      el.Trnamount,
      el.CwAmount,
      el.OpBalance,
      el.ClBalance,
      el.Utr,
      el.ApiStatus,
      el.ApiMsg
    ];
    excelData.push(obj);
  });
  this.excelService.exportAsExcelWitheHeader(header,excelData, 'Aeps-Report.xlsx','I1');
} 
openModal(): any {
  this.isModel = !this.isModel;
} 
fileChangeEvent(fileInput: any):any {
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
                  this.cardImageBase64 = imgBase64Path;
                  this.isImageSaved = true;
                  // this.previewImagePath = imgBase64Path;
          };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
  }
 }
 getIfsc(st: any): void {
  if (this.bankList) {
    this.modalData.ifsc = this.bankList.find((e: any) => e.bankId === st)?.bankCode;
  } else {
    return;
  }
}
 onAddBene(): any {
  if (this.commonService.userPram.memberId && this.commonService.userPram.rmn) {
  {
    this.modalData.MemberId=this.commonService.userPram.memberId;
    this.modalData.BeneficiaryNumber=this.commonService.userPram.rmn;
    this.modalData.Bank=this.getDesc(this.modalData.bankId);
    this.modalData.TxnSlip=this.cardImageBase64;
    this.modalData.docType='add';
    this.commonService.postAES256('aepsapi/aeps-addbene', JSON.stringify(this.modalData))
      .subscribe(
        (res: any) => {
          this.isModel=false;
          this.commonService.isLoader = false;
          Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
            this.creditMoneyModal = {};
            this.getBene();
          });
        },
        (err: any) => {
          console.log(err);
          this.commonService.isLoader = false;
        });
    }
  }
 }
 getDesc(st: any): void {
  if (this.bankList) {
    return this.bankList.find((e: any) => e.bankId === st)?.bankName;
  } else {
    return;
  }
}
confirmPayment(): void {
  const savedPin = this.commonService.decryptUsingAES256(this.commonService.userPram.mPin);
  const walletBalance =  this.walletDetails.aepsBalance;
  if(this.netTotal>0)
  {
  if (this.netTotal < walletBalance) {
    if (this.creditMoneyModal.mPin === savedPin) {
      this.commonService.isLoader = true;
      const passingData = {
        userId: this.commonService.userPram.userId,
        memberId: this.commonService.userPram.memberId,
        templateId: this.commonService.userPram.dmtTemplate,
        remitterId: this.commonService.userPram.memberId,
        beneficiaryId: this.beneDet.beneficiaryId,
        apId: '',
        serviceType: 'AEPS-BANK',
        paymentMode: this.creditMoneyModal.transactionType,
        numberOfTrns: '1',
        perTrnsAmount: this.creditMoneyModal.amount,
        totalTrnsAmount: this.creditMoneyModal.amount,
        mobileNumber: this.commonService.userPram.rmn,
        BeneName: this.beneDetails?.beneficiaryName,
        Ifsc: this.beneDetails?.ifsc,
        intent: this.creditMoneyModal.remark,
        docType: 'P1',
        operators: this.beneDetails?.bank,
        accNo: this.beneDetails?.beneficiaryAcc,
        agentCode: this.commonService.userPram.id,
        refNumber: this.commonService.userPram.companyName,
        narration:  this.commonService.userPram.companyName+'-'+this.commonService.userPram.rmn+' -'+this.commonService.userPram.userType+''+this.commonService.userPram.id,
        lat:this.lat,
        lng:this.lag
      };
      this.commonService.postAES256('vendor/aeps-bank-trans', JSON.stringify(passingData))
        .subscribe(
          (res: any) => {
            // console.log(res);
            this.commonService.isLoader = false;
            if(res.isSuccess==true)
            {
            Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
              const jsonData = this.commonService.encryptUsingAES256(JSON.stringify({
                txnNo: res.txnNo,
              }));
              this.commonService.fetchWalletDetails();
              this.router.navigate(['/retailer/vendor/beneficiary/payment-receipt'], { queryParams: {data: jsonData } });
            });
            }
            else
            {
              Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'Ok' });
            }
          },
          (err: any) => {
            // console.log(err);
            this.commonService.isLoader = false;
          });
    } else {
      alert('Invalid mPin');
    }
  } else {
    alert('Insufficient wallet balance!');
  }
 }
 else
 {
  alert('something went wrong!');
 }
}
openModel(filePath: any): void {
  this.isModelSlip = true;
  this.filePath = filePath;
 }
 openModelAP(data: any): void {
  this.isModel = true;
  this.modalData = data;
 }
 SelectVal(data: any): void {
  console.log(data);
  this.beneDetails = this.beneDet.find((e: any) => e.id === data);
  console.log(this.beneDetails);
 }

 printReceipt(data: any,docType:any): any {
  if (data && docType=='AEPS') {
    this.router.navigate(['/retailer/aeps/aeps-print'], { queryParams: { txnNo: data } });
  }
  else
  {
    this.router.navigate(['/retailer/aeps-2/aeps-print1'], { queryParams: { txnNo: data } });
  }
}

}
