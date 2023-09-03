import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/services/ApiService.service';

@Component({
  selector: 'app-bank-manager',
  templateUrl: './bank-manager.component.html',
  styleUrls: ['./bank-manager.component.css']
})
export class BankManagerComponent implements OnInit {
  respData: any;
 bnkStatus: any =[
      { code: 'A', desc: 'UP' },
      { code: 'D', desc: 'DOWN' }
    ];
  constructor(public commonService:ApiService, public route: ActivatedRoute, public router: Router) {
  }
  ngOnInit(): void {
    this.getMembers();
  }
  changeText(myText: any): void {
    return myText.value;
  }
  getMembers(): any {
    if (this.commonService.userPram.userId !== undefined && this.commonService.userPram.userId !== '' && this.commonService.userPram.rmn !== undefined && this.commonService.userPram.rmn !== '' && this.commonService.userPram.memberLevel !== undefined && this.commonService.userPram.memberLevel !== '') {
      this.commonService.isLoader = true;
      this.commonService.getAuth('servicemanager/get-bank-services-list?memberid=' + this.commonService.userPram.memberId)
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.respData = res.respData;
            }
            console.log(this.respData);
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
            alert('something went wrong!');
          });
    }
  }
  onSubmit(data:any): void {
    this.commonService.isLoader = true;
    console.log(data);
    this.commonService.postAuth("servicemanager/UpdateBankManagers", JSON.stringify(data)).subscribe((res: any) => {
      this.commonService.isLoader = false;
      if (res.isSuccess) {
        Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
      else {
        Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
    },
      (err: any) => {
        this.commonService.isLoader = false;
        if (err.message) {
        }
      });
  }
}
