import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  activeMainMenu: any;
  activeSubMenu: any;
  bankdown:any=[];
  notification:any=[];
  emergencyList:any=[];
  getScreenWidth:any;
  activeSideMenu:any;
  constructor(public commonService: ApiService, public dataService: DataService, public route: ActivatedRoute, public router: Router) {
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
    this.activeMainMenu = localStorage.getItem('activeMainMenu');
    this.activeSubMenu = localStorage.getItem('activeSubMenu');
    this.isTokenVal();
    this.getBankList();
  }
  onmenu(): any {
    this.getScreenWidth = window.innerWidth;
    if(this.getScreenWidth>960)
    {
      if(this.getScreenWidth>960  && this.getScreenWidth<1025)
      {
        this.activeSideMenu=true;
      }
    }
    else
    {
      this.activeSideMenu=true;
    }
   }
   onmenuclose(): any {
    this.activeSideMenu=false;
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
  openMenu(path: any, activeMainMenu: any, activeSubMenu: any): any {
    localStorage.setItem('activeMainMenu', activeMainMenu);
    localStorage.setItem('activeSubMenu', activeSubMenu ? activeSubMenu : activeMainMenu);
    this.activeMainMenu = activeMainMenu;
    this.activeSubMenu = activeSubMenu ? activeSubMenu : activeMainMenu;
    if (path) {
      console.log(path);
      this.router.navigateByUrl(path);
    }
  }

  toggleSideMenu(): void {
    this.commonService.collapseSideMenu = !this.commonService.collapseSideMenu;
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
             this.commonService.setNotification("Notification_"+this.commonService?.userPram?.memberType,bankListData,600000);
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
  pwd(val: any): void {
    if (val == 'pwd') {
      this.router.navigateByUrl('/admin/setting/password');
    }
    else if (val == 'prof') {
      this.router.navigateByUrl('/admin/user-profile');
    }
    else {
      this.router.navigateByUrl('/admin/setting/mpin');
    }
  }
}
