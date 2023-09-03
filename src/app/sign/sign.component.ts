import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../services/ApiService.service';
import { DataService } from '../services/data.service';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {
  login: any = {
  };
  otplogin: any = {
  }
  isLoader = false;
  rememberMe = false;
  isLogin: boolean = false;
  constructor(public commonService: ApiService, public dataService: DataService, public route: ActivatedRoute, public router: Router) { }
  @HostListener('document:backbutton', ['$event'])
  onPopState(event: any) {
  }
  ngOnInit(): void {
    // this.getLocation();
    localStorage.removeItem('userPram');
    localStorage.removeItem('userAuth');
    localStorage.removeItem('authExpiry');
    localStorage.clear();
    if (sessionStorage.getItem('rmn') && sessionStorage.getItem('password')) {
      this.login = {
        rmn: sessionStorage.getItem('rmn'),
        password: sessionStorage.getItem('password')
      };
    }

  }
  getLocation() {
    this.commonService.getPosition().then(pos => {
      console.log(`Positon: ${pos.lng} ${pos.lat}`);
    }, err => {
      Swal.fire({ icon: 'warning', text: 'Please allow the Location access!', confirmButtonText: 'Okay!', allowOutsideClick: false }).then((result) => {
        if (result.isConfirmed) {
          this.getLocation();
        }
      });
    });
  }
  onLogin(): void {
    this.isLoader = true;
    this.commonService.post('users/signin', JSON.stringify(this.login)).subscribe((res: any) => {
      this.isLoader = false;
      if (res.isSuccess === true) {
        localStorage.clear();
        this.commonService.userPram = res.loginRes;
        if (res.loginRes.tpaDeviceEnabled == '1') {
          Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' });
          this.isLogin = true;
          if (this.rememberMe) {
            sessionStorage.setItem('rmn', this.login.rmn);
            sessionStorage.setItem('password', this.login.password);
          }
        }
        else {
          localStorage.setItem('userPram', btoa(JSON.stringify(res.loginRes)));
          this.commonService.userAuth = jwt_decode(res.xauth);
          localStorage.setItem('userAuth', res.xauth);
          localStorage.setItem('authExpiry', btoa(res.xauthexpire));
          if (this.rememberMe) {
            sessionStorage.setItem('rmn', this.login.rmn);
            sessionStorage.setItem('password', this.login.password);
          }
          if (res.loginRes.memberType === 'RT') {
            this.router.navigate(['/merchant/dashboard']);
          }
          if (res.loginRes.memberType === 'DS') {
            this.router.navigateByUrl('/ds/dashboard');
          }
          if (res.loginRes.memberType === 'MD') {
            this.router.navigateByUrl('/master-dist/dashboard');
          }
          if (res.loginRes.memberType === 'ASM') {
            this.router.navigateByUrl('/asm');
          }
          if ((res.loginRes.memberType === 'SA') || (res.loginRes.memberType === 'AD')) {
            this.router.navigateByUrl('/administrator/dashboard');
          }
        }
      }
      else {
        this.isLoader = false;
        Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
    }, (err: any) => {
      this.isLoader = false;
      Swal.fire({ icon: 'warning', text: 'something went wrong!', confirmButtonText: 'OK' });
    });
  }
  onLoginResend(): void {
    this.isLoader = true;
    this.commonService.post('users/otpresend', JSON.stringify(this.login)).subscribe((res: any) => {
      this.isLoader = false;
      if (res.isSuccess === true) {
        localStorage.clear();
        this.commonService.userPram = res.loginRes;
        if (res.loginRes.tpaDeviceEnabled == '1') {
          Swal.fire({ icon: 'success', text: 'OTP has been sent to your registered mobile number', confirmButtonText: 'OK' });
          this.isLogin = true;
          if (this.rememberMe) {
            sessionStorage.setItem('rmn', this.login.rmn);
            sessionStorage.setItem('password', this.login.password);
          }
        }
        else {
          localStorage.setItem('userPram', btoa(JSON.stringify(res.loginRes)));
          this.commonService.userAuth = jwt_decode(res.xauth);
          localStorage.setItem('userAuth', res.xauth);
          localStorage.setItem('authExpiry', btoa(res.xauthexpire));
          if (this.rememberMe) {
            sessionStorage.setItem('rmn', this.login.rmn);
            sessionStorage.setItem('password', this.login.password);
          }
          if (res.loginRes.memberType === 'RT') {
            this.router.navigate(['/merchant/dashboard']);
          }
          if (res.loginRes.memberType === 'DS') {
            this.router.navigateByUrl('/ds/dashboard');
          }
          if (res.loginRes.memberType === 'MD') {
            this.router.navigateByUrl('/master-dist/dashboard');
          }
          if (res.loginRes.memberType === 'ASM') {
            this.router.navigateByUrl('/asm');
          }
          if ((res.loginRes.memberType === 'SA') || (res.loginRes.memberType === 'AD')) {
            this.router.navigateByUrl('/administrator/dashboard');
          }
        }
      }
      else {
        this.isLoader = false;
        Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
    }, (err: any) => {
      this.isLoader = false;
      Swal.fire({ icon: 'warning', text: 'something went wrong!', confirmButtonText: 'OK' });
    });
  }

  onLoginValidate(): void {
    this.isLoader = true;
    this.otplogin.UserId = this.commonService.userPram.userId;
    this.commonService.post('users/validatelogin', JSON.stringify(this.otplogin)).subscribe((res: any) => {
      this.isLoader = false;
      if (res.isSuccess === true) {
        localStorage.clear();
        this.commonService.userPram = res.loginRes;
        localStorage.setItem('userPram', btoa(JSON.stringify(res.loginRes)));
        this.commonService.userAuth = jwt_decode(res.xauth);
        localStorage.setItem('userAuth', res.xauth);
        localStorage.setItem('authExpiry', btoa(res.xauthexpire));
        if (this.rememberMe) {
          sessionStorage.setItem('rmn', this.login.rmn);
          sessionStorage.setItem('password', this.login.password);
        }
        if ((res.loginRes.memberType === 'RT')) {
          this.router.navigateByUrl('/merchant/dashboard');
        }
        if (res.loginRes.memberType === 'DS') {
          this.router.navigateByUrl('/ds/dashboard');

        }
        if (res.loginRes.memberType === 'MD') {
          this.router.navigateByUrl('/master-dist/dashboard');
        }
        if (res.loginRes.memberType === 'ASM') {
        }
        if ((res.loginRes.memberType === 'SA') || (res.loginRes.memberType === 'AD')) {
          this.router.navigateByUrl('/administrator/dashboard');
        }
      }
      else {
        this.isLoader = false;
        Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
    }, (err: any) => {
      this.isLoader = false;
      Swal.fire({ icon: 'warning', text: 'something went wrong!', confirmButtonText: 'OK' });
    });
  }
}

