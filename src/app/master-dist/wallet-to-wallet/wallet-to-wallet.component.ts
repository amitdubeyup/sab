import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wallet-to-wallet',
  templateUrl: './wallet-to-wallet.component.html',
  styleUrls: ['./wallet-to-wallet.component.css']
})
export class WalletToWalletComponent {

  wallet:any={};
  mobile:any;
  isShow:boolean=true;
  favouritelist:any;
  constructor(
    public commonService: ApiService,
    public route: ActivatedRoute,
    public router: Router) {
  }

  ngOnInit(): void {
    this.Getaddtofavouritelist();
  }
  getFilePath(filePath: any): string {
    if (filePath) {
      return this.commonService.appFileURL + '' + filePath;
    }
    else {
      return '../assets/images/xs/avatar2.jpg';
    }
  }
  Getaddtofavouritelist(): void {
    if (this.commonService.userPram.userId && this.commonService.userPram.memberId) {
      this.commonService.isLoader = true;
      this.commonService.getAuth('users/get-addtofavouritelist?memberId=' + this.commonService.userPram.memberId + '&docTye=ID')
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.favouritelist =JSON.parse(this.commonService.decryptUsingAES256(res.respData));
              console.log(this.favouritelist);
            }

          },
          (err: any) => {
            this.isShow=false;
            this.commonService.isLoader = false;
          });
    }
  }
  onClickfavouritelist(dta:any): void {
    this.wallet=dta;
    if(this.wallet)
    {
     this.isShow=false;
    }
    else
   {
     this.isShow=false;
   }
  }

  SearchMember(): void {
    if (this.commonService.userPram.userId && this.commonService.userPram.memberId) {
      this.commonService.isLoader = true;
      this.commonService.getAuth('users/member-search?memberId=' + this.commonService.userPram.memberId + '&mobile=' + this.mobile)
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.isShow = false;
              this.wallet = JSON.parse(this.commonService.decryptUsingAES256(res.respData));
            }
            else
            {
              this.isShow = true;
              Swal.fire({ icon: 'warning', text:res.mhOutcome, confirmButtonText: 'OK' });
            }
          },
          (err: any) => {
            this.isShow=false;
            this.commonService.isLoader = false;
          });
    }
  }
  cancel(): void {
    this.wallet=null;
    this.isShow=true;
  }
  SubmitMember(): void {
    const savedPin = this.commonService.decryptUsingAES256(this.commonService.userPram.mPin);
    const walletBalance = this.commonService.pramwallet.walleT_BALANCE;
    if (this.wallet.amount < walletBalance) {
      if (this.wallet.mPin === savedPin) {
        this.commonService.isLoader = true;
        const passingData = {
          userId: this.commonService.userPram.userId,
          memberId: this.commonService.userPram.memberId,
          templateId: '',
          remitterId: this.commonService.userPram.memberId,
          beneficiaryId: this.wallet.ToMemberid,
          pipe: this.wallet.isFavorite==true?'Y':'N',
          serviceType: 'wallet-to-wallet',
          paymentMode: 'WALLET',
          numberOfTrns: 1,
          perTrnsAmount: this.wallet.amount,
          totalTrnsAmount: this.wallet.amount,         
          Ifsc: '',
          intent: this.wallet.remark,
          docType: 'P1',
          recipientId: '',
          accNo: '',
          agentCode: this.commonService.userPram.id,
          refNumber: this.commonService.userPram.rmn,
          BeneName: this.commonService.userPram.companyName+' | '+this.commonService.userPram.rmn+' | '+this.commonService.userPram.userType+''+this.commonService.userPram.id,
          narration: this.wallet.CompanyName+' | '+this.wallet.MobileNo+' | '+ this.wallet.UserSprid
        };
        this.commonService.postAES256('wallets/networktransaction', JSON.stringify(passingData))
          .subscribe(
            (res: any) => {
              console.log(res);
              this.commonService.isLoader = false;
              Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
                 this.commonService.fetchWalletDetails();
                 this.router.navigate(['/rt/dashboard']);
              });
            },
            (err: any) => {
              console.log(err);
              this.commonService.isLoader = false;
            });
      } else {
        alert('Invalid mPin');
      }
    } else {
      alert('Insufficient wallet balance!');
    }
  }
  DeleteMember(cp:any): void {
    Swal.fire({ icon:'warning',text:'Are you sure , want to delete?', showCancelButton: true, cancelButtonText: 'No', confirmButtonText: 'Yes' }).then((modalRes: any) => {
      if (modalRes.isConfirmed) {
        this.commonService.isLoader = true;
        const passingData = {
          Id: cp.Id,
          MemberId: cp.MemberId,
          ToMemberid: cp.ToMemberid
        };
        this.commonService.postAES256('users/delete-wallet', JSON.stringify(passingData))
          .subscribe(
            (res: any) => {
              this.commonService.isLoader = false;
              Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
                this.isShow= true;
                this.Getaddtofavouritelist();
              });
            },
            (err: any) => {
              console.log(err);
              this.commonService.isLoader = false;
            });
      }
    });
  }
}
