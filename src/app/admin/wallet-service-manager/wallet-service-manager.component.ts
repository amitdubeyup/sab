import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { ApiService } from 'src/app/services/ApiService.service';

@Component({
  selector: 'app-wallet-service-manager',
  templateUrl: './wallet-service-manager.component.html',
  styleUrls: ['./wallet-service-manager.component.css']
})
export class WalletServiceManagerComponent implements OnInit {
  isloder = false;
  loading = false;
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
      this.commonService.getAuth('servicemanager/get-api-services-list?memberid=' + this.commonService.userPram.memberId)
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

  onSetCommission(id: any): any {
    this.router.navigate(['/admin/add-member'], { queryParams: { uid: id } });
  }


  addService(): any {
    this.isUpdate = false;
    this.serviceData = {};
    this.toggleModal();
  }

  updateService(data: any): any {
    this.isUpdate = true;
    this.serviceData = data;
    this.toggleModal();
  }

  toggleModal(): any {
    this.isModel = !this.isModel;
  }

  formSubmit(): any {
    this.toggleModal();
    this.serviceData.payMode = parseInt(this.serviceData.payMode, 10);
    console.log(this.serviceData);
    this.commonService.isLoader = true;
    const url = this.isUpdate ? 'servicemanager/SaveApiServices' : 'servicemanager/SaveApiServices';
    this.commonService.postAuth(url, this.serviceData).subscribe((res: any) => {
      console.log(res);
      this.commonService.isLoader = false;
      this.getMembers();
      if (res.isSuccess) {
        Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' });
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
