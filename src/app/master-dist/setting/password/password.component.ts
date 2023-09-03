import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  userModel: any = {};
  activeTabIndex: any = 0;
  isOpt:boolean=false;
  constructor(public commonService: ApiService, public sharedMethod: SharedMethodService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    this.userModel.userName = this.commonService.userPram.userName;
    this.userModel.mobileNo = this.commonService.userPram.rmn;
  }


  onPasswordChangeSave(): any {
    if (this.userModel.newPassword !== this.userModel.confirmNewPassword) {
      Swal.fire({ icon:'warning', text: `Password doesn't match!`, confirmButtonText: 'OK' });
      return false;
    }
    else
    {
    const postData: any = {
      updatedBy: this.commonService.userPram.userId,
      userId: this.commonService.userPram.userId,
      memberId: this.commonService.userPram.memberId,
      newpassword: this.userModel.confirmNewPassword,
      mPin: this.userModel.otp
    };
    this.commonService.isLoader = true;
    this.commonService.postAuth('users/change-password', postData).subscribe((res: any) => {
      console.log(res);
      this.commonService.isLoader = false;
      if (res.isSuccess) {
        Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
          localStorage.clear();
          this.router.navigateByUrl('/login');
          window.location.reload();
        });
      }
      else {
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
    this.commonService.postAuth('users/send-otp?docType=PWD', postData).subscribe((res: any) => {
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



