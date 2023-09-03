import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { ExcelService } from 'src/app/services/excel.service';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-virtual-account',
  templateUrl: './virtual-account.component.html',
  styleUrls: ['./virtual-account.component.css']
})
export class VirtualAccountComponent implements OnInit {
  respData: any;
  fromDt: any = new Date();
  toDt: any = new Date();
  statementList: any = [];
  activeTab: any = 0;
  isStatus: any = 0;
  totalAmount = 0;
  searchType:any;
  txnNo:any='';
  constructor(
    public excelService: ExcelService,
    public commonService:ApiService,
    public sharedMethodService: SharedMethodService,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public router: Router) {
  }

  ngOnInit(): void {
    this.fromDt.setDate(this.fromDt.getDate());
    this.toDt.setDate(this.toDt.getDate());
    this.getRetailerCommission('AD');
  }

  changeText(myText: any): void {
    return myText.value;
  }

  handleChange(e: any): any {
    this.activeTab = e.index;
    if (this.activeTab === 0) {
      this.getRetailerCommission('AD');
    }
  }

  handleSearch(docTab: any): any {
    this.activeTab = docTab;
    if (this.activeTab === 0) {
      this.getRetailerCommission('AD');
    }
  }

  getRetailerCommission(docType: any): void {
    const fromDt = this.commonService.formatDate((this.fromDt ? this.fromDt : new Date()), 'yyyy-mm-dd');
    const toDt = this.commonService.formatDate((this.toDt ? this.toDt : new Date()), 'yyyy-mm-dd');
    if (this.commonService.userPram.userId && this.commonService.userPram.memberId) {
      this.commonService.isLoader = true;
      this.commonService.getAuth('retailerreport/get-va-report?memberId=' + this.commonService.userPram.memberId + '&fromDt=' + fromDt + '&toDt=' + toDt + '&isStatus=' + this.isStatus + '&docType=' + docType+'&status='+this.isStatus+'&txnNo='+this.txnNo)
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.statementList = JSON.parse(this.commonService.decryptUsingAES256(res.respData));
              this.totalAmount = 0;
              this.statementList.forEach((element: any) => {
                this.totalAmount = this.totalAmount + parseFloat(element.Amount);
              });
            }
            else
            {
              this.commonService.isLoader = false;
              this.statementList=[];
            }
          },
          (err: any) => {
            this.commonService.isLoader = false;
          });
    }
  }

  onAccepted(data: any): any {
    console.log(data);
    Swal.fire({
      title: 'Please Enter Remark',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        if (login!='') {
          this.commonService.isLoader = true;
          data.Remark=login;
          data.UpdBy= this.commonService.userPram.memberId;
          this.commonService.postAES256('vendor/qr-accepted', JSON.stringify(data))
            .subscribe(
              (res: any) => {
                this.commonService.isLoader = false;
                Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
                  this.getRetailerCommission('AD');
                });
              },
              (err: any) => {
                this.commonService.isLoader = false;
              });
            }
            else {
              Swal.showValidationMessage('Please Enter Remark');
            }
         },
      allowOutsideClick: () => !Swal.isLoading()
    });
  }
  getStatus(val:any):any
  {
    if(val=="0")
    {
      return "Pending";
    }
    else if(val=="1")
    {
      return "Accepted";
    }
    else if(val=="2")
    {
      return "refunded";
    }
    else if(val=="3")
    {
      return "failure";
    }
    else if(val=="4")
    {
      return "pending inproccess";
    }
    else if(val=="5")
    {
      return "pending timed out";
    }
    else 
    {
      return "timed out inproccess";
    }


  }
  exportAsXLSX(): any {
    const excelData: any = [];
    this.statementList.forEach((el: any) => {
      const obj = [
        el.TxnNo,
        el.CreatedOn,
        el.member_name,
        el.Type,       
        el.Va,
        el.Ifsc,
        el.SenderNo,
        el.SenderName,
        el.SenderAcc,
        el.Amount,
        el.Utr,
        el.Remark,
        el.UpdatedOn,
        this.getStatus(el.IsStatus)
      ];
      excelData.push(obj);
    });
     let header = ['Transaction No','Tran Date','Member','Type',' Virtual Account','IFSC','Sender Number','Sender Name','Sender Account','Amount','UTR','Remark',' Updated Date','Status'];

    this.excelService.exportAsExcelWitheHeader(header,excelData, 'Transaction-Report.xlsx','K1');
  
  }
}
