import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';

@Component({
  selector: 'app-template-master',
  templateUrl: './template-master.component.html',
  styleUrls: ['./template-master.component.css']
})
export class TemplateMasterComponent implements OnInit {
  mbType: any = {};
  userList: any;


  respData: any;
  constructor(public commonService: ApiService, public route: ActivatedRoute, public router: Router) {


  }

  ngOnInit(): void {
    this.GetMemberType();
  }
  public GetMemberType(): any {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('servicemanager/get-commission-template-list?isstutas=LIST')
        .subscribe(
          (res: any) => {
            console.log(res);
            if (res.isSuccess) {
              this.respData = res.respData;
            }
          },
          (err: any) => {
            console.log(err);
            console.log(err);
            console.log(err);
            this.commonService.isLoader = false;
            alert('something went wrong!');
          });
    }
  }
  redrictTo(docType: any, uuid: any): any {
    this.router.navigate(['/administrator/commission-recharge'], { queryParams: { uuid: uuid } });
  }
}

