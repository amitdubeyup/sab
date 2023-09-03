import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DownloadComponent } from 'src/app/distributor/setting/download/download.component';
import { ApiService } from 'src/app/services/ApiService.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-distributor-layout',
  templateUrl: './distributor-layout.component.html',
  styleUrls: ['./distributor-layout.component.css']
})
export class DistributorLayoutComponent implements OnInit {

  activeMainMenu: boolean=false;
  activeMainMenu2: boolean=false;
  activeMainBody: boolean=false;
  activeMainmobile: boolean=false;
  pramwallet: any = {};
  bankdown:any=[];
  notification:any=[];
  emergencyList:any=[];
  public getScreenWidth: any;
  isqr: boolean=false;
  isVr: boolean=false;
  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2,public commonService: ApiService, public dataService: DataService, public route: ActivatedRoute, public router: Router, public dialog: MatDialog) {
    this.commonService.fetchWalletDetails();
  }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    if(this.getScreenWidth>960)
    {
      if(this.getScreenWidth>960  && this.getScreenWidth<1025)
      {
        this.commonService.collapseSideMenu=true;
      }
    }
    else
    {
      this.commonService.collapseSideMenu=true;
    }
    this.commonService.walletBehaviourData$.subscribe((res) => {
      const pramwallet = localStorage.getItem('pramwallet') ? localStorage.getItem('pramwallet') : null;
      if (pramwallet) {
        this.pramwallet = JSON.parse(pramwallet);
      }
    });
    this.isTokenVal();
    this.getBankList();
    let usermenuright=JSON.parse(this.commonService?.userPram?.usermenuright);
    if(usermenuright)
    {
    this.isqr=usermenuright.find((e: any) => e.type === 'QR' && e.value==true)?.type=='QR'?true:false;
    this.isVr=usermenuright.find((e: any) => e.type === 'VACC' && e.value==true)?.type=='VACC'?true:false;
    }
  }
  onmenu(): any {
    this.activeMainBody=!this.activeMainBody;
    if(this.activeMainBody) {
      this.renderer.addClass(this.document.body, 'layout-fullwidth');
		} 
    else{
      this.renderer.removeClass(this.document.body, 'layout-fullwidth');
		}   
  }
  onmenumobile(): any {
    this.activeMainmobile=true;
   }
  onmenuclose(): any {
    this.activeMainmobile=false;
   }
  openMenu(): any {
    this.activeMainMenu=!this.activeMainMenu;
  }
  openMenu1(): any {
    this.activeMainMenu=!this.activeMainMenu;
  }
  openMenu2(): any {
    this.activeMainMenu2=!this.activeMainMenu2;
  }
  openlink(url: any): void {
    this.router.navigateByUrl(url);
  }
  toggleSideMenu(): void {
    this.commonService.collapseSideMenu = !this.commonService.collapseSideMenu;
  }
  backToLoginlink(url: any): void {
    debugger;
    // Clear local storage
    localStorage.clear();

    // Clear session storage
    sessionStorage.clear();

    this.router.navigateByUrl(url);
  }
  isTokenVal(): any {
    this.commonService.getAuth('services/iskeeplive')
    .subscribe(
      (res: any) => {
        this.commonService.isLoader = false;
      },
      (err: any) => {
        console.log(err);
        this.commonService.isLoader = false;
      });
  }
  pwd(val: any): void {
    if (val == 'pwd') {
      this.router.navigateByUrl('/distributor/setting/password');
    }
    else if (val == 'prof') {
      this.router.navigateByUrl('/distributor/user-profile');
    }
    else {
      this.router.navigateByUrl('/distributor/setting/mpin');
    }
  }
  getBankList(): any {
    let bankRes=this.commonService.getNotification("Notification_"+this.commonService?.userPram?.memberType);
    if(bankRes!=null && bankRes!=undefined)
    {
      let bankListData = bankRes;
      let i=1;
      bankListData.bankList.forEach((data: { bankName: string; }) => {
       this.bankdown.push(i++ +' - '+data.bankName);
     });
     bankListData.messageList.forEach((data: { description: string;messageType:any }) => {
       if(data.messageType=='2')
       {
       this.notification.push(data.description);
       }
       else
       {
         this.emergencyList.push(data.description);
       }
     });
    }
    else
    {
    this.commonService.getAuth('servicemanager/getnotifiy?roleType='+this.commonService?.userPram?.memberType)
      .subscribe(
        (res: any) => {
          this.commonService.isLoader = false;
          if (res.isSuccess) {
             let bankListData = res.respData;
             this.commonService.setNotification("Notification_"+this.commonService?.userPram?.memberType,bankListData,60000);
             let i=1;
             bankListData.bankList.forEach((data: { bankName: string; }) => {
              this.bankdown.push(i++ +' - '+data.bankName);
            });
            bankListData.messageList.forEach((data: { description: string;messageType:any }) => {
              if(data.messageType=='2')
              {
              this.notification.push(data.description);
              }
              else
              {
                this.emergencyList.push(data.description);
              }
            });
          }
        },
        (err: any) => {
          console.log(err);
          this.commonService.isLoader = false;
        });
      }
  }
  opendownload(): void {
    let dialogRef = this.dialog.open(DownloadComponent, {
      width: '500px',
      data: { uid:''}
    });
    dialogRef.afterClosed().subscribe(result => {
    });
   }


}
