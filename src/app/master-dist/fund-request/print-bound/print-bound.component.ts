import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/ApiService.service';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-print-bound',
  templateUrl: './print-bound.component.html',
  styleUrls: ['./print-bound.component.css'],
  providers: [DatePipe]
})
export class PrintBoundComponent implements OnInit {
  paymentListGrid: any = [
    { id: 1, name: 'Cash/Stuck Amount' },
    { id: 2, name: 'CDM' },
    { id: 4, name: 'IMPS/UPI' },
    { id: 5, name: 'NEFT/RTGS' },
    { id: 3, name: 'Fund Transfer' },
    { id: 6, name: 'Cheque' },
    { id: 7, name: 'Online' },
  ];
  bankList: any = [];
  boundDet:any={};
  fundRequest: FundRequest = new FundRequest();
  constructor(public dialog: MatDialog,
    public excelService: ExcelService,
    public commonService: ApiService,
    public datePipe:DatePipe,
    public dialogRef: MatDialogRef<PrintBoundComponent>,
    @Inject(MAT_DIALOG_DATA) public rdata: any) { 
     this.fundRequest=rdata;
    }
  ngOnInit(): void {
  console.log(this.fundRequest);
  this.fetchBankList();
  this.GetPAN();
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
  getBoard(board: any): any {
    let name = '';
    this.bankList.forEach((element: any) => {
      if (element.code === board.toString()) {
        name = element.desc;
      }
    });
    return name;
  }
  GetPAN(): void {
    this.commonService.isLoader = true;
    this.commonService.getAuth('fileservices/getfundtxnpan?memberid='+this.commonService.userPram.memberId)
          .subscribe(
            (res: any) => {
              this.commonService.isLoader = false;
              if (res.isSuccess) {            
                  this.boundDet.pan=res.pan;
                  console.log(this.boundDet);
               
              }
            },
            (err: any) => {
              console.log(err);
              this.commonService.isLoader = false;
        });
      }
  
  printPage():void{        
        const css = `<link rel="stylesheet" href="https://xx/assets/css/bootstrap.min.css"
         crossorigin="anonymous">`;
        const printContents = document.getElementById('sectiontoprint')!.innerHTML;
        const pageContent = `<!DOCTYPE html><html><head>${css}</head><body onload="window.print()">${printContents}</html>`;
        let popupWindow: Window;
        if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
          popupWindow = window.open('','_blank','scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no')!;

          popupWindow.window.focus();
          popupWindow.document.write(pageContent);
            popupWindow.document.close();
          popupWindow.onbeforeunload = event => {
            popupWindow.close();
          };

          popupWindow.onload = function () {
            setTimeout(function(){popupWindow.print();}, 500);
            popupWindow.onfocus = function () {
               popupWindow.close();
            }  
          }

          popupWindow.onabort = event => {
            popupWindow.document.close();
            popupWindow.close();
          };
        } else {
          popupWindow = window.open('', '_blank', 'width=600,height=600')!;
          popupWindow.document.open();
          popupWindow.document.write(pageContent);
          popupWindow.document.close();
        }
      }
  
  onClose(): void {
        this.dialogRef.close();
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
