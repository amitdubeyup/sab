import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-banking-point',
  templateUrl: './banking-point.component.html',
  styleUrls: ['./banking-point.component.css']
})
export class BankingPointComponent implements OnInit {
  uuid:any;
  profileData:any;
  validityDt: any = new Date();
  constructor(public commonService: ApiService, public sharedMethod: SharedMethodService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    if (this.commonService.userPram.userId && this.commonService.userPram.memberId) {
      this.uuid = this.commonService.userPram.memberId;
    }
    this.validityDt.setDate(this.validityDt.getDate()+2);
    this.fetchWithdrawHistory();
  }
  printPage() {
    window.print();

  }
  fetchWithdrawHistory(): void {
    this.commonService.isLoader = true;
    this.commonService.getAuth('usermanagement/get-profile?userid=' + this.uuid + '&docType=ID').subscribe((res: any) => {
      console.log(res);
      this.commonService.isLoader = false;
      if (res.isSuccess) {
        this.profileData = JSON.parse(this.commonService.decryptUsingAES256(res.respData));
        console.log( this.profileData);
      }

    }, (err: any) => {
      console.log(err);
      this.commonService.isLoader = false;
      Swal.fire({ icon: 'warning', text: 'something went wrong!', confirmButtonText: 'OK' });
    });
  }
}
