import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/services/ApiService.service';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  txnNo: any;
  transactionDetails: any;
  totalAmount: any;
  remitterId: any;
  paymentMode: any;
  isPrint:boolean=true;
  constructor(
    public commonService: ApiService,
    public excl: ExcelService,
    public route: ActivatedRoute,
    public router: Router,
    public location: Location) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params.data) {
        const paramsData = JSON.parse(this.commonService.decryptUsingAES256(params.data));
        this.txnNo = paramsData.txnNo;
        this.getTransactionDetails();
      } else {
        //this.cancel();
      }
      if(params.remitterId && params.paymentMode)
      {
        this.remitterId=params.remitterId;
        this.paymentMode= params.paymentMode;
      }
    });
  }

  getTransactionDetails(): void {
    if (this.commonService.userPram.userId && this.commonService.userPram.memberId && this.txnNo) {
      this.commonService.isLoader = true;
      const url = `retailer/paymentrecipt?memberId=${this.commonService.userPram.memberId}&txn_no=${this.txnNo}&docType=bill`;
      this.commonService.getAuth(url)
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.commonService.fetchWalletDetails();
              this.transactionDetails = JSON.parse(this.commonService.decryptUsingAES256(res.respData));
              console.log(this.transactionDetails);
              this.totalAmount = 0;
              if(this.transactionDetails?.TrasactionSummaryList){
                this.transactionDetails.TrasactionSummaryList.forEach((element: any) => {
                  this.totalAmount = this.totalAmount + element.Amount;
                });
              }
              else
              {
                this.commonService.isLoader = true;
              }
            }
            console.log('Transaction Details: ', this.transactionDetails);
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
          });
    }
  }

  cancel(): void {
    if(this.remitterId!=undefined && this.remitterId!="" && this.paymentMode !=undefined && this.paymentMode!="")
    {
      this.router.navigate(['/merchant/money-transfer/beneficiary'], { queryParams: { remitterId: this.remitterId, paymentMode: this.paymentMode}});
    }
    else
    {
    this.location.back();
    }
  }
  printPage(type:any) {
    this.isPrint=type;
    this.commonService.isLoader=true;
    setTimeout(() => {
      this.commonService.isLoader=false;
    const printContents = document.getElementById('sectiontoprint')!.innerHTML;
        const pageContent = `<!DOCTYPE html><html><head>
        <style type="text/css">
        .tdcolor {
            background-color: #f0f6ff;
            width: 177px;
        }
        h4 {
            padding: 0px !important;
            margin: 0px 0px 3px 0px !important;
            font-size: 12px;
        }
       </style>
        </head><body onload="window.print()">${printContents}</html>`;
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
    }, 500);

  }

}

