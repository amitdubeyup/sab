import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  fromDt: any = new Date();
  toDt: any = new Date();
  dmtChargesList: any = [];
  utilityChargesList: any = [];
  utilityOptionList: any = [];
  bbpsList: any = [];
  aepsList: any = [];
  profileData: any;
  uuid: any;
  constructor(
    public commonService: ApiService,
    public route: ActivatedRoute,
    public router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.uuid = params['uuid'];
    });
    this.fetchWithdrawHistory();
  }

  changeText(myText: any): void {
    return myText.value;
  }

  fetchDmtCharges(): void {

  }

  fetchUtilityCharges(): void {
  }

  getFilePath(filePath: any): string {
    if (filePath) {
      return this.commonService.appFileURL + '' + filePath;
    }
    else {
      return '../../../assets/icons/person.jpeg';
    }
  }

  fetchWithdrawHistory(): void {
    this.commonService.isLoader = true;
    this.commonService.getAuth('usermanagement/get-profile?userid=' + this.uuid + '&docType=ID').subscribe((res: any) => {
      console.log(res);
      this.commonService.isLoader = false;
      if (res.isSuccess) {
        this.profileData = JSON.parse(this.commonService.decryptUsingAES256(res.respData));
        console.log( this.profileData);
        if (this.profileData.memberCommissionCriteria) {
          this.profileData.memberCommissionCriteria.forEach((element: any) => {
            if (element.ApiType === 'RECH') {
              this.utilityChargesList.push(element);
            }
            if (element.ApiType === 'DMT') {
              this.dmtChargesList.push(element);
            }
            if (element.ApiType === 'BBPS') {
              this.bbpsList.push(element);
            }
            if (element.ApiType === 'AEPS') {
              this.aepsList.push(element);
            }
          });
        }
        this.utilityOptionList = this.profileData.usermenuright ? JSON.parse(this.profileData.usermenuright) : [];
        console.log(this.profileData);
      }

    }, (err: any) => {
      console.log(err);
      this.commonService.isLoader = false;
      Swal.fire({ icon: 'warning', text: 'something went wrong!', confirmButtonText: 'OK' });
    });
  }
}
