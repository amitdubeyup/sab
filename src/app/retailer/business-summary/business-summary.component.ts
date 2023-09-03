import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { ExcelService } from 'src/app/services/excel.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-business-summary',
  templateUrl: './business-summary.component.html',
  styleUrls: ['./business-summary.component.css']
})
export class BusinessSummaryComponent {
  isModel = false;
  activeTab:any=0;
  resBank: any;
  fromDt: any = new Date();
  toDt: any = new Date();
  minDate: any = new Date();
  maxDate: any = new Date();
  docType = 'pending';
  constructor(
    public excelService: ExcelService,
    public commonService: ApiService,
    public route: ActivatedRoute,
    public router: Router) {
  }
  ngOnInit(): void {
    this.fromDt.setDate(this.fromDt.getDate());
    this.toDt.setDate(this.toDt.getDate());
    this.getBank();
}
minimumDate(): any
{
  return this.toDt.setDate(this.toDt.getDate()-7);
}

  handleChange(event: any): any {
    this.activeTab=event.index;
    if (event.index) {
      this.docType = 'all';
    } else {
      this.docType = 'pending';
    }
  }
 // function to get difference between from date and to date
 getDiffDays(sDate: any, eDate: any) {
  var startDate = new Date(sDate);
  var endDate = new Date(eDate);
  var Time = endDate.getTime() - startDate.getTime();
  return Time / (1000 * 3600 * 24);
}
  getBank(): any {
    if (this.commonService.userPram.userId !== undefined && this.commonService.userPram.userId !== '' && this.commonService.userPram.rmn !== undefined && this.commonService.userPram.rmn !== '') {
      this.commonService.isLoader = true;
      const fromDt = this.commonService.formatDate((this.fromDt ? this.fromDt : new Date()), 'yyyy-mm-dd');
      const toDt = this.commonService.formatDate((this.toDt ? this.toDt : new Date()), 'yyyy-mm-dd');

      const difference_date = this.getDiffDays(fromDt, toDt);
      if(difference_date>30){
        Swal.fire({ icon: 'success', text: 'Please select valid date - Report Restrict to one month', confirmButtonText: 'OK' });
        this.commonService.isLoader = false;
      }

      else
      {
        this.commonService.getAuth('admin/addhours/get-bu-summary?memberId=' + this.commonService.userPram.memberId + '&fromDt=' + fromDt + '&toDt=' + toDt + '&docType=all&mType=RT')
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.resBank = res.respData;
            }
            console.log(this.resBank);
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
            alert('something went wrong!');
          });
      }
     }
  }
}
