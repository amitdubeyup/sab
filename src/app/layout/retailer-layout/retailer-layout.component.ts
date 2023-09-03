import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-retailer-layout',
  templateUrl: './retailer-layout.component.html',
  styleUrls: ['./retailer-layout.component.css']
})
export class RetailerLayoutComponent implements OnInit{

  activeMainMenu: boolean=false;
  activeMainMenu2: boolean=false;
  activeMainMenu3: boolean=false;
  activeMainMenu4: boolean=false;
  activeMainBody: boolean=false;
  activeMainmobile: boolean=false;
  displayModal: any = false;
  prevBalance = 0;
  newBalance = 0;
  pramwallet: any = {};
  bankdown:any=[];
  notification:any=[];
  emergencyList:any=[];
  public getScreenWidth: any;
  servicePrivileges: any;
  userRight:any={};
  usermenuright: any;
  wallet:any=[];
  constructor( @Inject(DOCUMENT) private document: Document, private renderer: Renderer2,public commonService: ApiService, public dataService: DataService, public route: ActivatedRoute, public router: Router,   public dialog: MatDialog) {
  this.commonService.fetchWalletDetails();
  }
  ngOnInit(): void {
    this.commonService.CheckIsLogin();
    this.isTokenVal();
    this.commonService.walletBehaviourData$.subscribe((res) => {
      const pramwallet = localStorage.getItem('pramwallet') ? localStorage.getItem('pramwallet') : null;
      if (pramwallet) {
        this.pramwallet = JSON.parse(pramwallet);       
      }
    });
    // get service behaviour data and user privilege data      
     this.commonService.serviceBehaviourData$.subscribe((res) => {
     const servicePrivilegesData = localStorage.getItem('serviceBehaviour') ? localStorage.getItem('serviceBehaviour') : null;
     if (servicePrivilegesData) {
     this.servicePrivileges = JSON.parse(this.commonService.decryptUsingAES256(servicePrivilegesData));
   
     if(this.servicePrivileges)
     {
       this.userRight.isAeps2=this.servicePrivileges.find((e: any) => e.type === 'AEPS2' && e.value==true)?.type=='AEPS2'?true:false;
       } 
      if(this.userRight.isAeps2){  
        this.usermenuright=JSON.parse(this.commonService?.userPram?.usermenuright);
        if(this.usermenuright)
        {
          this.userRight.isAeps2=this.usermenuright.find((e: any) => e.type === 'AEPS2' && e.value==true)?.type=='AEPS2'?true:false;
         }

       }
   }
 }); 
    this.getBankList();
    console.log(this.commonService.collapseSideMenu,this.getScreenWidth)
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
  openMenu2(): any {
    this.activeMainMenu2=!this.activeMainMenu2;
  }
  openMenu3(): any {
    this.activeMainMenu3=!this.activeMainMenu3;
  }
  openMenu4(): any {
    this.activeMainMenu4=!this.activeMainMenu4;
  }
  toggleSideMenu(): void {
    this.commonService.collapseSideMenu = !this.commonService.collapseSideMenu;
  }

  toggleModal(): void {
    this.displayModal = !this.displayModal;
  }
  openlink(url: any): void {
    this.router.navigateByUrl(url);
  }

  updateBalance(): void {
    this.toggleModal();
  }
  isTokenVal(): any {
    this.commonService.getAuth('services/iskeeplive')
    .subscribe(
      (res: any) => {
        this.commonService.isLoader = false; 
        if (res.isSuccess) {
        }
        else
        {
          if(res.statuscode==1)
          {
            Swal.fire({ icon: 'warning', text: res.mhOutcome,showConfirmButton: false,allowOutsideClick: false }).then((result) => {
              if (result.isConfirmed) {
              }
            });
          }
        }
      },        
      (err: any) => {
        console.log(err);
        this.commonService.isLoader = false;
      });
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
             this.commonService.setNotification("Notification_"+this.commonService?.userPram?.memberType,bankListData,20000);
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
  // opendownload(): void { 
  //   let dialogRef = this.dialog.open(DownloadComponent, { 
  //     width: '500px', 
  //     data: { uid:''} 
  //   }); 
  //   dialogRef.afterClosed().subscribe(result => { 
  //   }); 
  //  } 
  
}
