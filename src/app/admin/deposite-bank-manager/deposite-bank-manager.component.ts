import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/services/ApiService.service';

@Component({
  selector: 'app-deposite-bank-manager',
  templateUrl: './deposite-bank-manager.component.html',
  styleUrls: ['./deposite-bank-manager.component.css']
})
export class DepositeBankManagerComponent implements OnInit {
  respData: any;
  isModel = false;
  isUpdate = false;
  serviceData: any = {};
  constructor(public commonService:ApiService, public route: ActivatedRoute, public router: Router) {
  }
  ngOnInit(): void {
    this.getMembers();
  }

  getMembers(): any {
    if (this.commonService.userPram.userId !== undefined && this.commonService.userPram.userId !== '' && this.commonService.userPram.rmn !== undefined && this.commonService.userPram.rmn !== '' && this.commonService.userPram.memberLevel !== undefined && this.commonService.userPram.memberLevel !== '') {
      this.commonService.isLoader = true;
      this.commonService.getAuth('servicemanager/get-admin-bank-list?memberid=' + this.commonService.userPram.memberId +'&docType=ADBANK')
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.respData = res.respData;
            }
            console.log(res);
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
            alert('something went wrong!');
          });
    }
  }
  updateService(data: any): any {
    this.isUpdate = true;
    this.serviceData = data;
    this.toggleModal();
  }

  toggleModal(): any {
    this.isModel = !this.isModel;
  }
  openModal(): any {
    this.serviceData={};
    this.isModel = true;
  }
  formSubmit(): any {
    this.toggleModal();
    this.serviceData.payMode = parseInt(this.serviceData.payMode, 10);
    console.log(this.serviceData);
    this.commonService.isLoader = true;
    const url = 'servicemanager/savebankmanager';
    this.commonService.postAES256(url, JSON.stringify(this.serviceData)).subscribe((res: any) => {
      console.log(res);
      this.commonService.isLoader = false;
      if (res.isSuccess) {
        Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' });
        this.getMembers();
      }
      else {
        Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
    },
      (err: any) => {
        console.log(err);
        this.commonService.isLoader = false;
        if (err.message) {
          Swal.fire({ icon: 'warning', text: err.message, confirmButtonText: 'OK' });
        }
      });
  }
}
