import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { Router} from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //  appURL = 'http://localhost:35532/api/v2.0';
  //  appFileURL = 'http://localhost:35532/document/';
  //  appFundRequestURL = 'http://localhost:35532/fundrequest/';

   appURL = 'https://supper-faster.fleetpay.in/api/v2.0';
   appFileURL = 'https://supper-faster.fleetpay.in/document/';
   appFundRequestURL = 'https://supper-faster.fleetpay.in/fundrequest/';

  //SandBOX
  //  appURL = 'https://supper-faster.fleetpay.in/sandbox/api/v2.0';
  //  appFileURL = 'https://supper-faster.fleetpay.in/sandbox/document/';
  //  appFundRequestURL = 'https://supper-faster.fleetpay.in/sandbox/fundrequest/';

  appSecret = '6f9478c9134c11ee6f9478c9134c11eeb20700be432ac5fcb20700be432ac5fc';
  headers: any = null;
  secretKey: any = '49D693AN8A2506G1';
  authKey: any = null;
  userAuth: any = null;
  userPram: any = null;
  asmData: any = null;
  pramwallet: any = null;
  walletBehaviourData$: BehaviorSubject<{}> = new BehaviorSubject({});
  serviceBehaviourData$: BehaviorSubject<{}> = new BehaviorSubject({});
  collapseSideMenu = false;
  isLoader = false;
  activeSideMenu: any = [];
  activeBill = 0;

  constructor(
    public http: HttpClient,
    public router: Router,
  ) {
    this.updateApplicationData();
  }
  updateApplicationData(): void {
    const authExpiry: any = localStorage.getItem('authExpiry') ? localStorage.getItem('authExpiry') : null;
    const userAuth = localStorage.getItem('userAuth') ? localStorage.getItem('userAuth') : null;
    const userPram = localStorage.getItem('userPram') ? localStorage.getItem('userPram') : null;
    const asmData = localStorage.getItem('asmData') ? localStorage.getItem('asmData') : null;
    const pramwallet = localStorage.getItem('pramwallet') ? localStorage.getItem('pramwallet') : null;
    if (userAuth && userPram && authExpiry) {
      try {
        this.userAuth = jwt_decode(userAuth);
        this.userPram = jwt_decode(userPram, { header: true });
        this.authKey = userAuth;
        const privileges: any = [];
        if(this.userPram.userPriviledges)
        {
        this.userPram.userPriviledges.forEach((element: any) => {
          delete element.user;
          element.subMenu = [];
          if (element.isview || element.iswrite) {
            if (!element.parentName) {
              privileges.push(element);
            }
          }
        });
        privileges.forEach((elementOne: any) => {
          this.userPram.userPriviledges.forEach((elementTwo: any) => {
            if (elementTwo.isview || elementTwo.iswrite) {
              if (elementOne.name === elementTwo.parentName) {
                elementOne.subMenu.push(elementTwo);
              }
            }
          });
        });
        }
        this.activeSideMenu = privileges;
        try {
          const currentTime = new Date();
          const expiryTime = new Date(atob(authExpiry));
          if (expiryTime < currentTime) {
            Swal.fire({ icon: 'warning', text:'Session time Out,Please check your system Date Time.', confirmButtonText: 'Okay' }).then(()=>{
              this.logout();
            });  
          }
        } catch {
         this.logout();
        }
      } catch {
        this.logout();
      }
    }
    if (asmData) {
      this.asmData = JSON.parse(asmData);
    } else {
      this.fetchAsmDetails();
    }
    if (pramwallet) {
      this.pramwallet = JSON.parse(pramwallet);
      this.walletBehaviourData$.next(JSON.parse(pramwallet));
    } else {
      this.fetchWalletDetails();
    }
  }
  CheckIsLogin(): any {
      const authExpiry: any = localStorage.getItem('authExpiry') ? localStorage.getItem('authExpiry') : null;
      const userAuth = localStorage.getItem('userAuth') ? localStorage.getItem('userAuth') : null;
      const userPram = localStorage.getItem('userPram') ? localStorage.getItem('userPram') : null;
      if (userAuth && userPram && authExpiry) {

      }
      else
      {
        this.logout();
      }
  }
  logout(): any {
    this.authKey = null;
    this.userAuth = null;
    this.userPram = null;
    this.asmData = null;
    this.pramwallet = null;
    localStorage.removeItem('userPram');
    localStorage.removeItem('userAuth');
    localStorage.removeItem('authExpiry');
    localStorage.clear();
    //this.router.navigate(['/signin']);
    window.location.href="/signin"
  }

  get(endpoint: any):Observable<any> {
    this.headers = {
      headers: new HttpHeaders({
        'timeout': `${6000000}`,
        'Content-Type': 'application/json',
        'app-token': btoa(this.appSecret),
      })
    };
    return this.http.get(this.appURL + '/' + endpoint, this.headers).pipe(
      catchError(this.handleError)
    );
  }

  post(endpoint: any, body: any):Observable<any> {
    this.headers = {
      headers: new HttpHeaders({
        'timeout': `${6000000}`,
        'Content-Type': 'application/json',
        'app-token': btoa(this.appSecret),
      })
    };
    return this.http.post(this.appURL + '/' + endpoint, body, this.headers).pipe(
      catchError(this.handleError)
    );
  }

  getAuth(endpoint: any): Observable<any> {
    this.headers = {
      headers: new HttpHeaders({
        'timeout': `${6000000}`,
        'Content-Type': 'application/json',
        'app-token': btoa(this.appSecret),
        Authorization: `Bearer ${this.authKey}`
      })
    };
    return this.http.get(this.appURL + '/' + endpoint, this.headers).pipe(
      catchError(this.handleError)
  );
  }

  postAuth(endpoint: any, body: any): Observable<any> {
    this.headers = {
      headers: new HttpHeaders({
        'timeout': `${6000000}`,
        'Content-Type': 'application/json',
        'app-token': btoa(this.appSecret),
        Authorization: `Bearer ${this.authKey}`
      })
    };
    return this.http.post(this.appURL + '/' + endpoint, body, this.headers).pipe(
      catchError(this.handleError)
  );
  }
  postAES256(endpoint: any, body: any): Observable<any> {
    this.headers = {
      headers: new HttpHeaders({
        'timeout': `${6000000}`,
        'Content-Type': 'application/json',
        'app-token': btoa(this.appSecret),
        Authorization: `Bearer ${this.authKey}`
      })
    };
    const reqData: any = { data: this.encryptUsingAES256(body) };
    return this.http.post(this.appURL + '/' + endpoint, reqData, this.headers).pipe(
      catchError(this.handleError)
  );
  }

  postAuthFile(endpoint: any, body: any): Observable<any> {
    this.headers = {
      headers: new HttpHeaders({
        'timeout': `${6000000}`,
        'app-token': btoa(this.appSecret),
        Authorization: `Bearer ${this.authKey}`
      })
    };
    return this.http.post(this.appURL + '/' + endpoint, body, this.headers).pipe(
      catchError(this.handleError)
  );
  }
  encryptUsingAES256(value: any): any {
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value), CryptoJS.enc.Utf8.parse(this.secretKey), {
      keySize: 128 / 8,
      iv: CryptoJS.enc.Utf8.parse(this.secretKey),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }
  postAuthKeyVal(endpoint: any, body: any): any {
    this.headers = {
      headers: new HttpHeaders({
        'timeout': `${6000000}`,
        'Content-Type': 'application/json',
        'app-token': btoa(this.appSecret),
        Authorization: `Bearer ${this.authKey}`
      })
    };
    return this.http.post(this.appURL + '/' + endpoint, body, this.headers)
  }
  decryptUsingAES256(decString: any): any {
    const decrypted = CryptoJS.AES.decrypt(decString, CryptoJS.enc.Utf8.parse(this.secretKey), {
      keySize: 128 / 8,
      iv: CryptoJS.enc.Utf8.parse(this.secretKey),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  formatDate(value: any, format: any): any {
    if (value) {
      const fullDate = new Date(value);
      const year = fullDate.getFullYear();
      const month = fullDate.getMonth() + 1 < 10 ? '0' + (fullDate.getMonth() + 1) : fullDate.getMonth() + 1;
      const date = fullDate.getDate() < 10 ? '0' + fullDate.getDate() : fullDate.getDate();
      if (format === 'dd-mm-yyyy') {
        return date + '-' + month + '-' + year;
      }
      if (format === 'mm-dd-yyyy') {
        return month + '-' + date + '-' + year;
      }
      if (format === 'dd/mm/yyyy') {
        return date + '/' + month + '/' + year;
      }
      if (format === 'mm/dd/yyyy') {
        return month + '/' + date + '/' + year;
      }
      if (format === 'yyyy-mm-dd') {
        return year + '-' + month + '-' + date;
      }
      if (format === 'yyyy-dd-mm') {
        return year + '-' + date + '-' + month;
      }
      if (format === 'yyyy/mm/dd') {
        return year + '/' + month + '/' + date;
      }
      if (format === 'yyyy/dd/mm') {
        return year + '/' + date + '/' + month;
      }
      return fullDate;
    } else {
      return null;
    }
  }

  fetchAsmDetails(): any {
    if (this.userPram && this.userPram.parentMemberId) {
      const url = `users/getprantuser?memberId=${this.userPram.memberId}&userId=${this.userPram.userId}&parentId=${this.userPram.parentMemberId}&docType=ASMR`;
      this.getAuth(url).subscribe((res: any) => {
        if (res.isSuccess) {
          this.asmData = res.respData;
          localStorage.setItem('asmData', JSON.stringify(this.asmData));
        }
      }, (err: any) => {
        console.log(err);
      });
    }
  }

  fetchWalletDetails(): any {
    if (this.userPram) {
      this.isLoader = true;
      const url = `users/getprantuser?memberId=${this.userPram.memberId}&userId=${this.userPram.userId}&parentId=${this.userPram.parentMemberId}&docType=wallet`;
      this.getAuth(url).subscribe((res: any) => {
        this.isLoader = false;
        if (res.isSuccess) {
          this.pramwallet = res.respData;
          localStorage.setItem('pramwallet', JSON.stringify(res.respData));
          this.walletBehaviourData$.next(res.respData);
          // console.log("Wallet Data: ", this.pramwallet);
        }
      }, (err: any) => {
        this.isLoader = false;
        console.log(err);
      });
    }
  }

  displayToaster(message: any, type: any = 'success', time: number = 3000): any {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: time,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
    Toast.fire({
      icon: type,
      title: message
    });
  }
  handleError(error:any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });
  }
  setNotification(key:any, value:any, ttl:any): any {
  
    const now = new Date()
    const item ={
      value: value,
      expiry: now.getTime() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(item))
  }
  getNotification(key:any): any {
    const itemStr = localStorage.getItem(key)
    if (!itemStr) {
      return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key)
      return null
    }
    return item.value
  }
}
