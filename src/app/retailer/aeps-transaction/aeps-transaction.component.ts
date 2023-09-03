import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { ExcelService } from 'src/app/services/excel.service';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aeps-transaction',
  templateUrl: './aeps-transaction.component.html',
  styleUrls: ['./aeps-transaction.component.css']
})
export class AepsTransactionComponent implements OnInit {

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
    this.getRetailerCommission('AEPS');
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
      const url = 'users/get-asm?memberId=' + memberId + '&userId=&parentId=&docType=AEPSBAL';
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
      this.getRetailerCommission('AEPS');
    }
    if (this.activeTab === 1) {
      this.getRetailerCommission('AEPSL');
    }
   else if (this.activeTab === 2) {
      this.fetchWalletDetails(this.commonService.userPram.memberId);
    }
    else if (this.activeTab === 3) {
      this.getBankList();
      this.getBene();
      this.creditMoneyModal.transactionType="IMPS-AEPS";
      this.fetchWalletDetails(this.commonService.userPram.memberId);
    }
    else if (this.activeTab ===4) {
      this.getRetailerCommission('AEPS2');
    }
    else if (this.activeTab === 5) {
      this.getRetailerCommission('AEPS2L');
    }  
  }
  getPaymentPipe(Category:any, maxAmount: any): any {
    this.commonService.isLoader = true;
    if (Category && maxAmount && this.commonService.userPram.memberId) {
      this.commonService.getAuth('aepsapi/get-template-service?memberId=' + this.commonService.userPram.memberId + '&ApiType=P1&Category='+Category+'&isMaxAmt=true&maxAmount=' + maxAmount+"&docType=DMT")
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
      this.getRetailerCommission('AEPS');
    }
    if (this.activeTab === 1) {
      this.getRetailerCommission('AEPSL');
    }
    else if (this.activeTab === 2) {
      this.fetchWalletDetails(this.commonService.userPram.memberId);
    }
    else if (this.activeTab === 3) {
      this.getBankList();
      this.getBene();
      this.fetchWalletDetails(this.commonService.userPram.memberId);
    }
     else if (this.activeTab ===4) {
      this.getRetailerCommission('AEPS2');
    }
    else if (this.activeTab === 5) {
      this.getRetailerCommission('AEPS2L');
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

 printReceipt(data: any): any {
  this.router.navigate(['/rt/aeps/aeps-print'], { queryParams: { txnNo: data } });
}

}
