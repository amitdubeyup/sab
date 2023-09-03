import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mpin',
  templateUrl: './mpin.component.html',
  styleUrls: ['./mpin.component.css']
})
export class MpinComponent implements OnInit {

  userModel: any = {};
  activeTabIndex: any = 0;
  isOpt:boolean=false;
  constructor(public commonService: ApiService, public sharedMethod: SharedMethodService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    this.userModel.userName = this.commonService.userPram.userName;
    this.userModel.mobileNo = this.commonService.userPram.rmn;
  }

  onmPinChange(): any {
    if (this.userModel.newmPin !== this.userModel.confirmNewmPin) {
      Swal.fire({ icon:'warning', text: `MPIN doesn't match!`, confirmButtonText: 'OK' });
      return false;
    }
    else
    {
    const postData: any = {
      updatedBy: this.commonService.userPram.userId,
      userId: this.commonService.userPram.userId,
      memberId: this.commonService.userPram.memberId,
      mPin: this.userModel.otp,
      newpassword: this.userModel.confirmNewmPin,
    };
    this.commonService.isLoader = true;
    this.commonService.postAuth('users/change-mpin', postData).subscribe((res: any) => {
      console.log(res);
      this.commonService.isLoader = false;
      if (res.isSuccess) {
        Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
          localStorage.clear();
          this.router.navigateByUrl('/signin');
          window.location.reload();
        });
      }
      else {
        this.commonService.isLoader = false;
        Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
    },
      (err: any) => {
        console.log(err);
        this.commonService.isLoader = false;
      });
  }
 } 
 onOtpSend(): void {
  const postData: any = {
    updatedBy: this.commonService.userPram.userId,
    userId: this.commonService.userPram.userId,
    memberId: this.commonService.userPram.memberId,
    MobileNo: this.userModel.mobileNo
  };
  this.commonService.isLoader = true;
  this.commonService.postAuth('users/send-otp?docType=MPIN', postData).subscribe((res: any) => {
    console.log(res);
    this.commonService.isLoader = false;
    if (res.isSuccess) {
      this.isOpt=true;
      Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' });
    }
    else {
      this.isOpt=false;
      this.commonService.isLoader = false;
      Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'OK' });
    }
  },
    (err: any) => {
      console.log(err);
      this.commonService.isLoader = false;
    });
}
}



