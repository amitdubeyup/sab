import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css']
})
export class StatementComponent implements OnInit {
  respData: any;
  fromDt: any = new Date();
  toDt: any = new Date();
  statementList: any = [];
  constructor(
    public commonService:ApiService,
    public route: ActivatedRoute,
    public router: Router) {
  }

  ngOnInit(): void {

    this.getTransactionDetails();
  }

  changeText(myText: any): void {
    return myText.value;
  }

  getTransactionDetails(): void {
    const fromDt = this.commonService.formatDate((this.fromDt ? this.fromDt : new Date()), 'yyyy-mm-dd');
    const toDt = this.commonService.formatDate((this.toDt ? this.toDt : new Date()), 'yyyy-mm-dd');
    if (this.commonService.userPram.userId && this.commonService.userPram.memberId) {
      this.commonService.isLoader = true;
      this.commonService.getAuth('retailerreport/get-transaction-report?memberId=' + this.commonService.userPram.memberId + '&fromDt=' + fromDt + '&toDt=' + toDt + '&docType=list')
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.statementList = JSON.parse(this.commonService.decryptUsingAES256(res.respData));
           console.log(this.statementList);
            }
          },
          (err: any) => {
            this.commonService.isLoader = false;
          });
    }
  }
}
