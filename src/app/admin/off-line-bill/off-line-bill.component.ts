import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { ExcelService } from 'src/app/services/excel.service';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-off-line-bill',
  templateUrl: './off-line-bill.component.html',
  styleUrls: ['./off-line-bill.component.css']
})
export class OffLineBillComponent implements OnInit {

  respData: any;
  fromDt: any = new Date();
  toDt: any = new Date();
  statementList: any = [];
  activeTab: any = 0;
  isStatus: any = null;
  totalAmount = 0;
  totalCharge = 0;
  totalCommission = 0;
  retList: any;
  retid: any;
  serviceData:any={};
  selectedBeneficiary: any = [];
  pipeList: any;
  isModel = false;
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
    this.GetpipeList();
    this. getMember();
    this.getRetailerCommission('BBPS');
    this.selectedBeneficiary = []; 
  }
  GetpipeList(): any {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('servicemanager/get-api-service?mid=&docType=RE')
        .subscribe(
          (res: any) => {
            console.log(res);
            if (res.isSuccess) {
              this.pipeList = res.respData;
            }
          },
          (err: any) => {
            console.log(err);
            if (err.status === 0) {
              this.router.navigateByUrl('signin');
            }
          });
    }
  }
  changeText(myText: any): void {
    return myText.value;
  }

  handleChange(e: any): any {
    this.activeTab = e.index;
    if (this.activeTab === 0) {
      this.getRetailerCommission('BBPS');
    }
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
  handleSearch(docTab: any): any {
    this.activeTab = docTab;
    if (this.activeTab === 0) {
      this.getRetailerCommission('BBPS');
    }
  }
  getRetailerCommission(docType: any): void {
    const fromDt = this.commonService.formatDate((this.fromDt ? this.fromDt : new Date()), 'yyyy-mm-dd');
    const toDt = this.commonService.formatDate((this.toDt ? this.toDt : new Date()), 'yyyy-mm-dd');
    if (this.commonService.userPram.userId && this.commonService.userPram.memberId) {
      this.commonService.isLoader = true;
      this.commonService.getAuth('admin/addhours/get-offline-bill?memberId=' +this.retid?.code + '&fromDt=' + fromDt + '&toDt=' + toDt + '&isStatus=' + this.isStatus + '&docType=' + docType)
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.statementList = JSON.parse(this.commonService.decryptUsingAES256(res.respData));
              this.totalAmount = 0;
              this.totalCharge = 0;
              this.totalCommission = 0;
              this.statementList.forEach((element: any) => {
                this.totalAmount = this.totalAmount + parseFloat(element.amount);
                this.totalCharge = this.totalCharge + parseFloat(element.charge);
                this.totalCommission = this.totalCommission + parseFloat(element.rt_commission);
              });
            }
            console.log(this.statementList);
          },
          (err: any) => {
            this.commonService.isLoader = false;
          });
    }
  }

  printReceipt(val: any): any {
    if (this.activeTab === 0) {
      const jsonData = this.commonService.encryptUsingAES256(JSON.stringify({
        txnNo: val,
      }));
      this.router.navigate(['/retailer/beneficiary/payment-receipt'], { queryParams: { data: jsonData } });
    } else {
      this.router.navigate(['/retailer/bill-payment/receipt'], { queryParams: { txnNo: val } });
    }
  }

  exportAsXLSX(): any {
    const excelData: any = [];
    this.statementList.forEach((el: any) => {
      const obj = {
        'Txn Id': el.txn_no,
        'Ref Id': el.ReferenceNo,
        'Created On': el.trasaction_date,
        'Updated On': el.updatedOn,
        'Name': el.remName,
        'Mobile': el.beneficiary_number,
        'Beneficiary': el.beneficiary_acc,
        'Operator': el.Operator,
        'Narration': el.narration,
        'To Narration': el.toNarration,
        'Amount': el.amount,
        'Charge': el.charge,
        'Service': el.service,
        'Status': el.status,
        'UTR': el.utr,
        'Response': el.api_msg,
      };
      excelData.push(obj);
    });
    this.excelService.exportAsExcelFile(excelData, 'Transaction');
  }
  
  openForm(): any {
    this.serviceData = {};
    console.log(this.selectedBeneficiary);    
    this.toggleModal();
  }

  toggleModal(): any {
    this.isModel = !this.isModel;
  }
  openFormModel(cp:any): any {
    this.selectedBeneficiary= cp;
    console.log(this.selectedBeneficiary);
    this.toggleModal();
  }

  payNow(): any {
    if (this.selectedBeneficiary.length > 0) {
    if (this.serviceData && this.serviceData.apiId) {
      const savedPin = this.commonService.decryptUsingAES256(this.commonService.userPram.mPin);
        if (this.serviceData.mPin === savedPin) {
          let dataPost:any=[];
          for (let item of this.selectedBeneficiary) {
            let operator=item.Operator.split(":-");
            const passingData = {
              userId: item.memberId,
              memberId: item.memberId,            
              apId: this.serviceData.apiId,
              serviceType: 'ELECTRICITY',
              paymentMode: 'BBPS',
              perTrnsAmount: item.amount,
              accNo: item.beneficiary_acc,
              TxnNo: item.txn_no,
              mobileNumber: item.beneficiary_number,             
              docType: 'P1',
              operators: operator.length>0? operator[1]:operator[0],
              operatorId: operator.length>0? operator[0]:operator[0],
              narration: "ELECTRICITY BILL PAYMENT",
              refNumber: item.remName,
            };
            dataPost.push(passingData);
          }
          this.commonService.isLoader = true;
          this.commonService.postAES256('recharge/bill-pay-admin', JSON.stringify(dataPost))
            .subscribe(
              (res: any) => {
                console.log(res);
                this.commonService.isLoader = false;
                Swal.fire({ icon: res.isSuccess ? 'success' : 'error', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
                  if (res.isSuccess) {
                    this.getRetailerCommission('BBPS');
                    this.isModel=false;
                  }
                });
              },
              (err: any) => {
                console.log(err);
                this.commonService.isLoader = false;
          });
        } else {
          Swal.fire({ icon: 'warning', text: 'Invalid mPin', confirmButtonText: 'OK' });
        }
     } 
    else {
      Swal.fire({ icon: 'warning', text: 'Invalid payment amount,Contact to system admin', confirmButtonText: 'OK' });
    }
  }
 } 
 payNowSingle(cp:any): any {
  this.selectedBeneficiary=[];
  this.selectedBeneficiary.push(cp);
  if (this.selectedBeneficiary.length > 0) {
  if (this.serviceData && this.serviceData.apiId) {
        let dataPost:any=[];
        for (let item of this.selectedBeneficiary) {
          let operator=item.Operator.split(":-");
          const passingData = {
            userId: item.memberId,
            memberId: item.memberId,            
            apId: this.serviceData.apiId,
            serviceType: 'ELECTRICITY',
            paymentMode: 'BBPS',
            perTrnsAmount: item.amount,
            accNo: item.beneficiary_acc,
            TxnNo: item.txn_no,
            mobileNumber: item.beneficiary_number,             
            docType: 'P1',
            operators: operator.length>0? operator[1]:operator[0],
            operatorId: operator.length>0? operator[0]:operator[0],
            narration: "ELECTRICITY BILL PAYMENT",
            refNumber: item.remName,
          };
          dataPost.push(passingData);
        }
        this.commonService.isLoader = true;
        this.commonService.postAES256('recharge/bill-pay-admin', JSON.stringify(dataPost))
          .subscribe(
            (res: any) => {
              console.log(res);
              this.commonService.isLoader = false;
              Swal.fire({ icon: res.isSuccess ? 'success' : 'error', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
                if (res.isSuccess) {
                  this.getRetailerCommission('BBPS');
                  this.isModel=false;
                }
              });
            },
            (err: any) => {
              console.log(err);
              this.commonService.isLoader = false;
        });
   } 
  else {
    Swal.fire({ icon: 'warning', text: 'Please select API Provider', confirmButtonText: 'OK' });
  }
}
} 
}
