import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { ExcelService } from 'src/app/services/excel.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  paymentList: any = [
    { id: 1, name: 'Cash/Stuck Amount' },
    { id: 2, name: 'CDM' },
    { id: 4, name: 'IMPS/UPI' },
    { id: 5, name: 'NEFT/RTGS' },
    { id: 3, name: 'Fund Transfer' },
    { id: 6, name: 'Cheque' },
  ];
  importContacts: any;
  importList:any;
  bankList: any;
  constructor(
    public excelService: ExcelService,
    public commonService: ApiService,
    public route: ActivatedRoute,
    public router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ImportComponent>,
    @Inject(MAT_DIALOG_DATA) public rdata: any
  ) { }

  ngOnInit(): void {
    this.fetchBankList();
  }
  onCancel(): void {
    this.dialogRef.close();
  }
  fetchBankList(): any {
    this.commonService.getAuth(`retailer/get-admin-bank?docType=list`).subscribe((res: any) => {
      if (res.isSuccess) {
        this.bankList = res.respData;;
      }
    }, (err: any) => {
      console.log(err);
    });
  }
  getPaymentMode(st: any) {
    return this.paymentList.find((e: any) => e.name === st)?.id;
  }
  getBankId(st: any) {
    console.log(this.bankList.find((e: any) => e.desc === st)?.code);
    return this.bankList.find((e: any) => e.desc === st)?.code;
  }
  onFileChangeImp(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const data = <any[]>this.excelService.importFromFile(bstr);;
      const header: string[] = Object.getOwnPropertyNames(new Contact());
      const importedData = data.slice(1, -1);
      console.log(importedData);
      this.importContacts = importedData.map(arr => {
        const obj:any = {};
        for (let i = 0; i < header.length; i++) {
          const k = header[i];         
          obj[k] = arr[i];
        }      
        return <Contact>obj;
      })
      this.importList = this.importContacts.filter(function (b:any) {    
        b.DepositDate=new Date((b.DepositDate-25569)*86400000);
        return b.Amount !== undefined && b.BankName !==undefined && b.PaymentMode !==undefined && b.DepositDate !==undefined ;
     });
    };
    reader.readAsBinaryString(target.files[0]);
  }
  submitImport(): any {    
    this.commonService.isLoader = true;
    const freshContact = this.importList.filter((el: any) => (el.PaymentMode !== undefined));
    console.log(freshContact);
    if (freshContact.length > 0) {  
      let postData:any=[];    
        freshContact.forEach((el: any) => {
          let postDesc={
            memberId:this.commonService.userPram.memberId,
            Amount: el.Amount,
            PaymentMode: el.PaymentMode,
            BankName: el.BankName,
            BankAccountNumber: el.BankAccountNumber,
            DepositDate: this.commonService.formatDate(el.DepositDate, 'yyyy/mm/dd'),
            Remarks: el.Remarks
          }
          postData.push(postDesc);
        });
        this.commonService.postAES256('fileservices/fund-request-bulk', JSON.stringify(postData))
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
              this.dialogRef.close();
            });
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
          });
    }else {
      this.commonService.isLoader = false;
      Swal.fire({ icon: 'error', text: 'No record found.', confirmButtonText: 'OK' });
    }
  }
}
export class Contact {
  Amount = '';
  PaymentMode = '';
  BankName = '';
  BankAccountNumber = '';
  DepositDate='';
  Remarks = '';
}
