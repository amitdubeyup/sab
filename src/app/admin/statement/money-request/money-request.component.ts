import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import { ExcelService } from 'src/app/services/excel.service';
import { LazyLoadEvent } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'; 
import { ApiService } from 'src/app/services/ApiService.service';

@Component({
  selector: 'app-money-request',
  templateUrl: './money-request.component.html',
  styleUrls: ['./money-request.component.css']
})
export class MoneyRequestComponent  implements OnInit {
  respData: any;
  fromDt: any = new Date();
  toDt: any = new Date();
  minDate:any= new Date();
  maxDate:any= new Date();
  statementList: any = [];
  activeTab: any = 0;
  memberList: any = [];
  selectedMemberList: any;
  totalAmount = 0;
  totalAmountDr = 0;
  totalCharge = 0;
  totalCommission = 0;
  isStatus:any=null;
  serviceData:any={};
  isModel:boolean=false;
  apiBalance:any;
  datasource : any=[];
  totalRecords:number=0;
  searchType:any;
  txnNo:any='';
  adminPrivileges:any;
  userRight:any={};
  constructor(
    public commonService:ApiService,
    public sharedMethodService: SharedMethodService,
    public route: ActivatedRoute,
    public excelService: ExcelService,
    private primengConfig: PrimeNGConfig,
    public router: Router) {
  }

  ngOnInit(): void {
    this.fromDt.setDate(this.fromDt.getDate());
    this.toDt.setDate(this.toDt.getDate());
    this.getMemberList("SA");
   if(this.commonService.userPram)
   {
     if(this.commonService.userPram?.memberType=='AD')
     {
       this.adminPrivileges=JSON.parse(this.commonService?.userPram?.usermenuright);
       this.userRight.isTxnr=this.adminPrivileges.find((e: any) => e.type === 'TXNR' && e.value==true )?.type=='TXNR'?true:false;
     }
   }

  }
  getDiffDays(sDate: any, eDate: any) {
    var startDate = new Date(sDate);
    var endDate = new Date(eDate);  
    var Time = endDate.getTime() - startDate.getTime();
    return Time / (1000 * 3600 * 24);
    }
  changeText(myText: any): void {
    return myText.value;
  }
  handleChange(e: any): any {
    this.activeTab = e.index;
    if (this.activeTab === 0) {
      this.getRetailerCommission('FUND');
    }
    
  }
  handleSearch(docTab: any): any {
    this.activeTab = docTab;
    if (this.activeTab === 0) {
      this.getRetailerCommission('FUND');
    }
   
  }
  handleExport(docTab: any): any {
    this.activeTab = docTab;
    if (this.activeTab === 0) {
      this.getTrasExport('FUND');
    }
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

  getRetailerCommission(docType:any): void {
    this.commonService.isLoader = true;
    const fromDt = this.commonService.formatDate((this.fromDt ? this.fromDt : new Date()), 'yyyy-mm-dd');
    const toDt = this.commonService.formatDate((this.toDt ? this.toDt : new Date()), 'yyyy-mm-dd');
    if (this.commonService.userPram.userId && this.commonService.userPram.memberId) {
      this.commonService.getAuth('retailerreport/get-transaction-report-admin?memberId=' + this.selectedMemberList?.code + '&fromDt=' + fromDt + '&toDt=' + toDt + '&isStatus='+this.isStatus+ '&docType='+docType+'&st='+this.searchType+'&txnNo='+this.txnNo)
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.statementList =JSON.parse(this.commonService.decryptUsingAES256(res.respData));
              this.totalAmount = 0;
              this.totalAmountDr = 0;
              this.totalCharge = 0;
              this.totalCommission = 0;
              this.statementList.forEach((element: any) => {
                if(element.trasaction_type=='DR')
                {
                  this.totalAmountDr = this.totalAmountDr + parseFloat(element.amountDr);
                }
                else
                {
                  this.totalAmount = this.totalAmount + parseFloat(element.amount);
                }
                this.totalCharge = this.totalCharge + parseFloat(element.charge);
                this.totalCommission = this.totalCommission + parseFloat(element.rt_commission);
              });
            }
            else
            {
              this.statementList=[];
              this.totalAmount = 0;
              this.totalAmountDr = 0;
              this.totalCharge = 0;
              this.totalCommission = 0;
            }
          },
          (err: any) => {
            this.commonService.isLoader = false;
          });
    }
  }
  // loadCustomers(event: LazyLoadEvent) {
  //   this.loading = true;

  //   setTimeout(() => {
  //       this.datasource.getCustomers({lazyEvent: JSON.stringify(event)}).then(res => {
  //           this.customers = res.customers;
  //           this.totalRecords = res.totalRecords;
  //           this.loading = false;
  //       })
  //   }, 1000);
  // }
  getFundApproved(docType:any): void {
    const fromDt = this.commonService.formatDate((this.fromDt ? this.fromDt : new Date()), 'yyyy-mm-dd');
    const toDt = this.commonService.formatDate((this.toDt ? this.toDt : new Date()), 'yyyy-mm-dd');
    if (this.commonService.userPram.userId && this.commonService.userPram.memberId) {
      this.commonService.isLoader = true;
      this.commonService.getAuth('membersapi/get-fund-approved-report?memberId=' + this.selectedMemberList?.code + '&fromDt=' + fromDt + '&toDt=' + toDt + '&isStatus='+this.isStatus+ '&docType='+docType)
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.statementList = JSON.parse(this.commonService.decryptUsingAES256(res.respData));
              console.log(this.statementList);
              this.totalAmount = 0;
              this.totalAmountDr = 0;
              this.totalCharge = 0;
              this.totalCommission = 0;
              this.statementList.forEach((element: any) => {
                if(element.trasaction_type=='DR')
                {
                  this.totalAmountDr = this.totalAmountDr + parseFloat(element.amountDr);
                }
                else
                {
                  this.totalAmount = this.totalAmount + parseFloat(element.amount);
                }
                this.totalCharge = this.totalCharge + parseFloat(element.charge);
                this.totalCommission = this.totalCommission + parseFloat(element.rt_commission);
              });
            }
            else
            {
              this.statementList=[];
            }
          },
          (err: any) => {
            this.commonService.isLoader = false;
          });
    }
  }
  openForm(data:any): any {
    this.serviceData.txn_no=data.txn_no;
    this.serviceData.AdminUser= this.commonService.userPram.userId;
    this.serviceData.memberId= data.memberId;           
    this.serviceData.id= data.id;
    this.serviceData.txn_no= data.txn_no;
    this.serviceData.txn_id= data.txn_id;            
    this.serviceData.paymentStatus=data.paymentStatus;   
    if(this.activeTab===1)  
    {
      this.serviceData.docType='DMT';
    }
    else if(this.activeTab===15)  
    {
      this.serviceData.docType='VDR';
    }
    else if(this.activeTab===14)  
    {
      this.serviceData.docType='NEP';
    }  
    else if(this.activeTab===17)  
    {
      this.serviceData.docType='DMT';
    }  
    else
    {
      this.serviceData.docType='UTLI';
    }       
   
    this.serviceData.api_responce_status= data.api_responce_status;
    this.serviceData.api_msg= data.api_msg;        
    this.isModel=true;
  }
  toggleModal(): any {
    this.isModel = false;
  }
   payNow(): any {
    if (this.serviceData && this.serviceData.paymentStatus) {
          this.commonService.isLoader = true;
          this.commonService.postAES256('membersapi/update-payment-status', JSON.stringify(this.serviceData))
            .subscribe(
              (res: any) => {
                console.log(res);
                this.commonService.isLoader = false;
                Swal.fire({ icon: res.isSuccess ? 'success' : 'error', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
                  if (res.isSuccess) {
                    this.isModel = false;
                    this.handleSearch(this.activeTab);
                  }
                });
              },
              (err: any) => {
                console.log(err);
                this.commonService.isLoader = false;
          });
        } 
        else {
          Swal.fire({ icon: 'warning', text: 'Invalid Request', confirmButtonText: 'OK' });
        }
    }
    getApiBalance(): void {
      if (this.commonService.userPram.userId && this.commonService.userPram.memberId) {
        this.commonService.isLoader = true;
        this.commonService.getAuth('membersapi/get-api-balance')
          .subscribe(
            (res: any) => {
              this.commonService.isLoader = false;
              if (res.isSuccess) {
                this.apiBalance = JSON.parse(this.commonService.decryptUsingAES256(res.respData));
                console.log("jj",this.apiBalance);
              }
            },
            (err: any) => {
              this.commonService.isLoader = false;
            });
      }
    }
    getTrasExport(docType:any): void {
      this.commonService.isLoader = true;
      const fromDt = this.commonService.formatDate((this.fromDt ? this.fromDt : new Date()), 'yyyy-mm-dd');
      const toDt = this.commonService.formatDate((this.toDt ? this.toDt : new Date()), 'yyyy-mm-dd');
      if (this.commonService.userPram.userId && this.commonService.userPram.memberId) {
        let uri=""
        if(this.activeTab === 7)
        {
          uri='membersapi/get-fund-approved-report?memberId=' + this.selectedMemberList?.code + '&fromDt=' + fromDt + '&toDt=' + toDt + '&isStatus='+this.isStatus+ '&docType='+docType;
        }
        else if (this.activeTab === 8)
        {
          uri='membersapi/get-fund-approved-report?memberId=' + this.selectedMemberList?.code + '&fromDt=' + fromDt + '&toDt=' + toDt + '&isStatus='+this.isStatus+ '&docType='+docType;
        }
        else{
          uri='retailerreport/get-transaction-report-export?memberId=' + this.selectedMemberList?.code + '&fromDt=' + fromDt + '&toDt=' + toDt + '&isStatus='+this.isStatus+ '&docType='+docType +'&st='+this.searchType+'&txnNo='+this.txnNo;
        }
        this.commonService.getAuth(uri)
          .subscribe(
            (res: any) => {
              this.commonService.isLoader = false;
              if (res.isSuccess) {
                let statementListExport;
                if(this.activeTab === 7 || this.activeTab === 8)
                {
                statementListExport=JSON.parse(this.commonService.decryptUsingAES256(res.respData));
                }
                else
                {
                  statementListExport=res.respData;
                }
                console.log(statementListExport);
               const excelData: any = [];
               statementListExport.forEach((el: any) => {
                 if(this.activeTab === 7 || this.activeTab === 8)
                 {
                 const obj = [
                    el.txn_no,
                    el.trasaction_date,
                    el.updatedOn,
                    el.SprCode,
                    el.UserName,                  
                    this.returnNarration(el),
                    el.amount,
                    el.amountDr,
                    el.charge,
                    '0',
                    this.returnServicesALL(el),
                    el.mode_of_payment,
                    el.apiName,
                    el.status,
                    el.utr,
                    el.ReferenceNo,
                    el.RtxnNo,
                    el.api_msg
                 ];
                 excelData.push(obj);
                }
                else
                {
                  const obj = [
                    el.txn_no,
                    el.trasaction_date,
                    el.updatedOn,
                    el.sprCode,
                    this.activeTab ===5?el.toNarration:el.userName,
                    this.returnNarrationAll(el),
                    el.amount,
                    el.amountDr,
                    el.charge,   
                    el.rt_commission,            
                    this.returnServicesALL(el),
                    el.mode_of_payment.replace("-Money-Transfer",""),
                    el.apiName,
                    el.status,
                    el.utr,
                    el.referenceNo,
                    el.rtxnNo,
                    el.api_msg,
                    docType=='DMT'? el.remName+' '+ el.beneficiary_number:''
                 ];
                 excelData.push(obj);
                }
                
               });
               let header = ['Txn','Tran Date', 'Updated On','SPR Code', 'Member Name','Naration','Amount(CR)','Amount(DR)','Charge','Commission','Service','PayMode','API','Status','UTR','TnxRefNo','RtxnNo','API Resp.',(docType=='DMT'?'Sender':'')];
               if(this.activeTab ===5)
               {
                 header = ['Txn','Tran Date', 'Updated On', 'SPR Code','Send By','Recived By','Amount(CR)','Amount(DR)','Charge','Service','PayMode','API','Status','UTR','TnxRefNo','RtxnNo','API Resp.'];
               }
               this.excelService.exportAsExcelWitheHeader(header,excelData, 'Transaction-Report.xlsx','K1');
              }
            },
            (err: any) => {
              this.commonService.isLoader = false;
            });
        }
    }
   
    exportAsXLSX(): any {
      this.handleExport(this.activeTab);
    }
    returnNarrationAll(cp: any): any {
      if (cp.service==='OBAL') {
        return cp.narration;
      }
     else if (cp.service==='QUICK_PAY' && cp.docType!='COMM') {
        return  'Money Transfer :  A/C#' + cp.beneficiary_acc + ', Mob#'+cp.beneficiary_number +', Ben#' + cp.narration +',IFSC#'+cp.udf1 +''+cp.toNarration ;
      }
      else if (cp.service=='TATKAL_PAY' && cp.docType!='COMM') {
        return 'Money Transfer : A/c#' + cp.beneficiary_acc + ', Mob#'+cp.beneficiary_number +', Ben#' +cp.narration+',IFSC#'+cp.udf1 +''+cp.toNarration ;
      }
      else if (cp.service=='AEPS-BANK') {
        return 'A/C:'+ cp.beneficiary_acc +' '+ (cp.toNarration==null?'':cp.toNarration) ;
      }
      else if (cp.service=='Ind-Nep') {
        return 'Indo-Nep :' +cp.remName + ' ' +cp.beneficiary_acc +' '+ cp.mode_of_payment;
      }
      else if (cp.docType=='COMM' || cp.docType=='UTCOMM') {
        return 'Comission :' + cp.service +', Ref#' + cp.rtxnNo;
      }
      else if (cp.service=='Verification') {
        return 'Verification  A/c#' + cp.beneficiary_acc + ', Mob#'+cp.beneficiary_number +', Ben#' +cp.narration;
      }
      else if (cp.service=='Fund-Request') {
        return 'Fund Ref#' +cp.referenceNo +' ,'+ cp.narration + ' Mobile# '+ cp.beneficiary_acc +','+  cp.toNarration;
      }
      else if (cp.mode_of_payment=='RECH') {
        return (cp.service=='DTH'?'DTH Recharge : ': 'Mobile Recharge : ') + cp.beneficiary_acc + ', Ref#' + (cp.referenceNo==null?'':cp.referenceNo) ;
      }
      else if (cp.mode_of_payment=='BBPS' &&  cp.service=='ELECTRICITY') {
        return  'Electricity Bill : CA#'+ cp.beneficiary_acc + ', Ref#' + (cp.referenceNo==null?'':cp.referenceNo)+', '+cp.Operator  ;
      }
      else if (cp.mode_of_payment=='Part-Payment' &&  cp.service=='ELECTRICITY') {
        return 'Part Payment : CA#'+ cp.beneficiary_acc + ', Name : ' + cp.toNarration +', '+cp.operator  ;
      }
      else if (cp.mode_of_payment=='Part-Payment' &&  cp.service=='IGL-Commercial-Bill') {
        return 'IGL-Commercial-Bill : CA#'+ cp.beneficiary_acc + ', Name : ' + cp.toNarration +', '+cp.operator ;
      }
      else if (cp.mode_of_payment=='Part-Payment' &&  cp.service=='Tata-Power-DDL') {
        return 'Tata-Power-DDL : CA#'+ cp.beneficiary_acc + ', Name : ' + cp.toNarration +', '+cp.operator ;
      }
      else if (cp.mode_of_payment=='BBPS' &&  cp.service=='GAS') {
        return  'Gas Bill : CA#'+ cp.beneficiary_acc + ', Ref#' + (cp.referenceNo==null?'':cp.referenceNo) ;
      }
      else if (cp.mode_of_payment=='BBPS' &&  cp.service=='WATER') {
        return 'Water Bill : CA#'+ cp.beneficiary_acc + ', Ref#' + (cp.referenceNo==null?'':cp.referenceNo)  ;
      }
      else if (cp.mode_of_payment=='BBPS' &&  cp.service=='INSURANCE') {
        return 'Insurance Bill : CA#'+ cp.beneficiary_acc + ', Ref#' + (cp.referenceNo==null?'':cp.referenceNo)  ;
      }
      else if (cp.mode_of_payment=='WALLET' &&  cp.service=='Balance-Manager' && cp.trasaction_type=='CR') {
        return 'Account Credited -Ref#'+cp.referenceNo+','+ cp.narration + ' From ' + cp.toNarration +','+ cp.intent
      }
      else if (cp.mode_of_payment=='WALLET' &&  cp.service=='Balance-Manager' && cp.trasaction_type=='DR') {
        return 'Account Debited -Ref#'+cp.referenceNo+','+cp.narration + ' To ' + cp.toNarration +','+ cp.intent;
      }
      else if (cp.mode_of_payment=='WALLET' &&  cp.service=='wallet-to-wallet' && cp.trasaction_type=='CR' && this.activeTab !=5) {
        return 'Account Credited '+ cp.narration  +' From ' + cp.toNarration;
      }
      else if (cp.mode_of_payment=='WALLET' &&  cp.service=='wallet-to-wallet' && cp.trasaction_type=='DR' && this.activeTab !=5) {
        return  'Account Debited - '+cp.toNarration  + ' To ' + cp.narration;
      }
      else if (cp.service=='PG-Request') {
        return 'Payment Gateway: '+ cp.narration + ' Mobile# '+ cp.beneficiary_acc+', '+ cp.toNarration;
      }
      else if (cp.service=='AEPS' && cp.mode_of_payment=='AEPS-BT') {
        return 'AEPS Balance Transfer To Wallet : '+ cp.toNarration;
      }
      else if (cp.service=='AEPS' && cp.mode_of_payment=='AEPS-CW') {
        return 'AEPS Commision : '+ cp.narration;
      }
      else if (cp.service=='PAYTM' && cp.mode_of_payment=='CMS') {
        return 'Paytm Wallet Topup : '+ cp.beneficiary_acc;
      }
      else if (cp.service=='CC' && cp.mode_of_payment=='CMS') {
        return 'Credit Card Payment: '+ cp.beneficiary_acc;
      }
      else if (this.activeTab ===5) {
        return cp.narration;
      }
      else if (cp.service=='EMI' && cp.mode_of_payment=='CMS') {
        return 'EMI Payment: '+ cp.beneficiary_acc +' ,'+cp.toNarration +','+cp.Operator;
      }
      else if (cp.service=='FASTAG' && cp.mode_of_payment=='CMS') {
        return 'FASTAG: '+  cp.toNarration+' '+ cp.beneficiary_acc+','+cp.Operator;
      }
      else if (cp.mode_of_payment=='TBO') {
        return cp.service +' '+  cp.toNarration;
      }
    
    }
    returnNarration(cp: any): any {
      if (cp.service==='OBAL') {
        return cp.narration;
      }
      if (cp.service==='QUICK_PAY' && cp.DocType!='COMM') {
        return  'Money Transfer :  A/c#' + cp.beneficiary_acc + ', Mob#'+cp.beneficiary_number +', Ben#' + cp.narration +',IFSC#'+cp.udf1 +''+cp.toNarration;
      }
      else  if (cp.service=='TATKAL_PAY' && cp.DocType!='COMM') {
        return 'Money Transfer : A/c#' + cp.beneficiary_acc + ', Mob#'+cp.beneficiary_number +', Ben#' +cp.narration+',IFSC#'+cp.udf1 +''+cp.toNarration;
      }
      else if (cp.service=='Ind-Nep') {
        return 'Indo-Nep :' +cp.remName + ' ' +cp.beneficiary_acc +' '+ cp.mode_of_payment;
      }
      else if (cp.DocType=='COMM' || cp.DocType=='UTCOMM') {
        return 'Comission :' + cp.service +', Ref#' + cp.RtxnNo;
      }
      else if (cp.service=='Verification') {
        return 'Account Verification  A/c#' + cp.beneficiary_acc + ', Mob#'+cp.beneficiary_number +', Ben#' + cp.toNarration;
      }
      else if (cp.service=='Fund-Request') {
        return 'Fund Ref#' +cp.ReferenceNo +' ,'+ cp.narration + ' Mobile# '+ cp.beneficiary_acc +','+  cp.toNarration;
      }
      else if (cp.mode_of_payment=='RECH') {
        return (cp.service=='DTH'?'DTH Recharge : ': 'Mobile Recharge : ') + cp.beneficiary_acc + ', Ref#' + (cp.ReferenceNo==null?'':cp.ReferenceNo);
      }
      else if (cp.mode_of_payment=='BBPS' &&  cp.service=='ELECTRICITY') {
        return  'Electricity Bill : CA#'+ cp.beneficiary_acc + ', Ref#' + (cp.ReferenceNo==null?'':cp.ReferenceNo)+', '+cp.Operator;
      }
      else if (cp.mode_of_payment=='Part-Payment' &&  cp.service=='ELECTRICITY') {
        return 'Part Payment : CA#'+ cp.beneficiary_acc + ', Name : ' + cp.toNarration +', '+cp.Operator;
      }
      else if (cp.mode_of_payment=='BBPS' &&  cp.service=='GAS') {
        return  'Gas Bill : CA#'+ cp.beneficiary_acc + ', Ref#' + (cp.ReferenceNo==null?'':cp.ReferenceNo);
      }
      else if (cp.mode_of_payment=='BBPS' &&  cp.service=='WATER') {
        return 'Water Bill : CA#'+ cp.beneficiary_acc + ', Ref#' + (cp.ReferenceNo==null?'':cp.ReferenceNo);
      }
      else if (cp.mode_of_payment=='BBPS' &&  cp.service=='INSURANCE') {
        return 'Insurance Bill : CA#'+ cp.beneficiary_acc + ', Ref#' + (cp.ReferenceNo==null?'':cp.ReferenceNo);
      }
      else if (cp.mode_of_payment=='WALLET' &&  cp.service=='Balance-Manager' && cp.trasaction_type=='CR') {
        return 'Account Credited '+ cp.narration + ' From ' + cp.toNarration;
      }
      else if (cp.mode_of_payment=='WALLET' &&  cp.service=='Balance-Manager' && cp.trasaction_type=='DR') {
        return 'Account Debited -Ref#'+cp.ReferenceNo+','+cp.narration + ' To ' + cp.toNarration;
      }
      else if (cp.mode_of_payment=='WALLET' &&  cp.service=='wallet-to-wallet' && cp.trasaction_type=='CR') {
        return 'Account Credited '+ cp.narration  +' From ' + cp.toNarration;
      }
      else if (cp.mode_of_payment=='WALLET' &&  cp.service=='wallet-to-wallet' && cp.trasaction_type=='DR') {
        return  'Account Debited - '+cp.toNarration  + ' To ' + cp.narration;
      }
      else if (cp.service=='PG-Request') {
        return 'Payment Gateway: '+ cp.narration + ' Mobile# '+ cp.beneficiary_acc+', '+ cp.toNarration;
      }
      else if (cp.service=='AEPS' && cp.mode_of_payment=='AEPS-BT') {
        return 'AEPS Balance Transfer To Wallet : '+ cp.toNarration;
      }
      else if (cp.service=='AEPS' && cp.mode_of_payment=='AEPS-CW') {
        return 'AEPS Commision : '+ cp.narration;
      }
      else if (cp.service=='PAYTM' && cp.mode_of_payment=='CMS') {
        return 'Paytm Wallet Topup : '+ cp.beneficiary_acc;
      }
      else if (cp.service=='CC' && cp.mode_of_payment=='CMS') {
        return 'Credit Card Payment: '+ cp.beneficiary_acc;
      }
      else if (this.activeTab ===5) {
        return cp.narration;
      }
      else if (cp.service=='EMI' && cp.mode_of_payment=='CMS') {
        return 'EMI Payment: '+ cp.beneficiary_acc +' ,'+cp.toNarration +','+cp.Operator;
      }
      else if (cp.service=='FASTAG' && cp.mode_of_payment=='CMS') {
        return 'FASTAG: '+  cp.toNarration+' '+ cp.beneficiary_acc+','+cp.Operator;
      }
      else if (cp.mode_of_payment=='TBO') {
        return cp.service +' '+  cp.toNarration;
      }
    }
    returnServicesALL(cp: any): any {
      if (this.activeTab == 0) {
        return  cp.service ;
      }
      else if (this.activeTab == 2) {
        return  cp.Operator;
      }
      else if (this.activeTab == 1 || this.activeTab == 3 || this.activeTab == 4 || this.activeTab == 5|| this.activeTab == 6 || this.activeTab == 7 || this.activeTab == 12 || this.activeTab == 14)  {
        return  cp.service;
      }
      else if (this.activeTab == 15) {
        return  cp.mode_of_payment;
      }
    }
    onReverse(data: any): any {
      console.log(data);
      const savedPin = this.commonService.decryptUsingAES256(this.commonService.userPram.mPin);
      Swal.fire({
        title: 'Please Enter MPIN',
        input: 'password',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
          if (savedPin === login) {
            this.commonService.isLoader = true;
            const passingData = {
              userId: this.commonService.userPram.userId,
              memberId: this.commonService.userPram.memberId,
              Txnid: data.txn_id,
              TxnNo: data.txn_no,
              trnAmount:data.amountDr,
              docType: this.activeTab==1?'DMT':'RECH'
            };
            this.commonService.isLoader = true;
            this.commonService.postAES256('membersapi/reversetran', JSON.stringify(passingData))
              .subscribe(
                (res: any) => {
                  this.commonService.isLoader = false;
                  Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
                    this.handleSearch(this.activeTab);
                   this.commonService.fetchWalletDetails();
                  });
                },
                (err: any) => {
                  this.commonService.isLoader = false;
                });
          }
          else {
            Swal.showValidationMessage('Invalid M-PIN');
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      });
    }

  checkPaysprintTxnStatus(cp:any):void {
    this.commonService.isLoader = true;   
    this.commonService.getAuth('transact/getstatus?memberId=' + this.commonService.userPram.memberId + '&tid='+cp.txn_no+'&api_id='+cp.apiid)
      .subscribe(
        (res: any) => {
          this.commonService.isLoader = false;
          Swal.fire({ icon: res.isSuccess ? 'success' : 'error', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
            if (res.isSuccess) {
              this.handleSearch(this.activeTab);
            }
          });
        },
        (err: any) => {console.log(err);});
    }

}
