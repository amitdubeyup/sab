import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { ExcelService } from 'src/app/services/excel.service';
import Swal from 'sweetalert2';
import { UserPrivilegeComponent } from '../user-privilege/user-privilege.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  isloder = false;
  loading = false;
  respData: any;
  respTemplate: any;
  respMemberTypes: any;
  mtId:any;
  customTemplates:any
  customTemplateId:any;
  isAgreementModel = false;
  agreementDetails:any={};
  activeTab=0;
  stateList: any[] = [
    { id: '01', name: 'JAMMU AND KASHMIR' },
    { id: '02', name: 'HIMACHAL PRADESH' },
    { id: '03', name: 'PUNJAB' },
    { id: '04', name: 'CHANDIGARH' },
    { id: '05', name: 'UTTARAKHAND' },
    { id: '06', name: 'HARYANA' },
    { id: '07', name: 'DELHI' },
    { id: '08', name: 'RAJASTHAN' },
    { id: '09', name: 'UTTAR PRADESH' },
    { id: '10', name: 'BIHAR' },
    { id: '11', name: 'SIKKIM' },
    { id: '12', name: 'ARUNACHAL PRADESH' },
    { id: '13', name: 'NAGALAND' },
    { id: '14', name: 'MANIPUR' },
    { id: '15', name: 'MIZORAM' },
    { id: '16', name: 'TRIPURA' },
    { id: '17', name: 'MEGHLAYA' },
    { id: '18', name: 'ASSAM' },
    { id: '19', name: 'WEST BENGAL' },
    { id: '20', name: 'JHARKHAND' },
    { id: '21', name: 'ODISHA' },
    { id: '22', name: 'CHATTISGARH' },
    { id: '23', name: 'MADHYA PRADESH' },
    { id: '24', name: 'GUJARAT' },
    { id: '26', name: 'DADRA AND NAGAR HAVELI AND DAMAN AND DIU' },
    { id: '27', name: 'MAHARASHTRA' },
    { id: '28', name: 'ANDHRA PRADESH' },
    { id: '29', name: 'KARNATAKA' },
    { id: '30', name: 'GOA' },
    { id: '31', name: 'LAKSHWADEEP' },
    { id: '32', name: 'KERALA' },
    { id: '33', name: 'TAMIL NADU' },
    { id: '34', name: 'PUDUCHERRY' },
    { id: '35', name: 'ANDAMAN AND NICOBAR ISLANDS' },
    { id: '36', name: 'TELANGANA' },
    { id: '37', name: 'ANDHRA PRADESH (NEWLY ADDED' },
    { id: '38', name: 'LADAKH (NEWLY ADDED)' }
  ];
  constructor(public commonService:ApiService, public route: ActivatedRoute, public excelService: ExcelService, public router: Router, public dialog: MatDialog, ) {
  }

  ngOnInit(): void {
    this.GetTemplate();
    this.getMembers();
    this.GetMemberType();
    this.customTemplates=[
      {
        label: 'Exist',
        id: 1
      },
      {
        label: 'Not Exist',
        id: 0
      }
    ];
  }
  getStateName(st: any): void {
    if (this.stateList) {
      return this.stateList.find((e: any) => e.id === st)?.name;
    } else {
      return;
    }
  }
  handleChange(e: any): any {
    this.activeTab = e.index;  
    this.getMembers();  
  }
  changeText(mytext: any): void {
    return mytext.value;
  }
  isActiveUser(userType: any): any {
    if(this.commonService?.userPram?.memberType=="SA")
    {
      if(userType=="SA" || userType=="AD")
      {
        return false;
      }
      else
      {
        return true;
      }
    }
    else
    {
      if(this.commonService?.userPram?.memberType=="SA" || this.commonService?.userPram?.memberType=="AD")
    {
      return true;
    }
    else
    {
      return false;
    }
    }
   
  }
 
  getMembers(): void {
    if (this.commonService.userPram.userId !== undefined && this.commonService.userPram.userId !== '' && this.commonService.userPram.rmn !== undefined && this.commonService.userPram.rmn !== '') {
      this.commonService.isLoader = true;
      let url='';
      if(this.activeTab==0)
      {
        url='users/get-user-management?memberid=' + this.commonService.userPram.memberId + '&mLevel=' + this.commonService.userPram.memberLevel + '&userid=&isstutas=AD&mtId='+this.mtId+'&customTemplateExist='+this.customTemplateId;
      }
      else if(this.activeTab==1)
      {      
        url='users/get-user-management?memberid=' + this.commonService.userPram.memberId + '&mLevel=' + this.commonService.userPram.memberLevel + '&userid=&isstutas=OTP';
      }
      else if(this.activeTab==2)
      {      
        url='users/get-user-management?memberid=' + this.commonService.userPram.memberId + '&mLevel=' + this.commonService.userPram.memberLevel + '&userid=&isstutas=WC';
      }
      this.commonService.getAuth(url)
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.respData = res.respData;
            }
            else
            {
              this.respData = []; 
            }
            console.log(this.respData);
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
            alert('something went wrong!');
          });
    }
  }
  GetTemplate(): void {
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('servicemanager/get-commission-template-list?isstutas=LIST')
        .subscribe(
          (res: any) => {
            if (res.isSuccess) {
              this.respTemplate = res.respData;
            }
          },
          (err: any) => {
            this.commonService.isLoader = false;
            alert('something went wrong!');
          });
    }
  }
  getDesc(st: any): any {
    if(st!=null)
    {
    if (this.respTemplate) {
      return this.respTemplate.find((e: any) => e.templateId === st)?.templateName;
    } else {
      return '';
    }
   }
   else {
    return '';
   }
  }

  setCommission(id: any, userId: any): any {
    this.router.navigate(['/administrator/user-edit'], { queryParams: { uid: id, usrid: userId } });
  }
  showOtp(otpval: any,type: any): void {
    Swal.fire({ icon: 'success',title: type == 'LOGIN'?'LOGIN OTP':'AGREEMENT OTP', text:otpval, confirmButtonText: 'OK' });
  }
  setUserPrivilege(data: any): void {
    if(data.memberType=='Operation' || data.memberType=='Administrator')
    {
    this.router.navigate(['/administrator/user-right'], { queryParams: { userId: data.userId, mtCode: data.mtCode,memberId:data.memberId } });
    }
    else
    {
      this.router.navigate(['/administrator/user-right/user-right'], { queryParams: { userId: data.userId, mtCode: data.mtCode,memberId:data.memberId } }); 
    }
  }
  // setUserPrivilege(data: any): void { 
  //   let dialogRef = this.dialog.open(UserPrivilegeComponent, { 
  //     width: '1100px', 
  //     data: {  userId: data.userId, mtCode: data.mtCode,memberId:data.memberId } 
  //   }); 
  //   dialogRef.afterClosed().subscribe(result => { 
  //     this.commonService.isLoader = false;
  //   }); 
  //  } 
  exportAsXLSX(): any {
    if (this.commonService.userPram.userId !== undefined && this.commonService.userPram.userId !== '' && this.commonService.userPram.rmn !== undefined && this.commonService.userPram.rmn !== '') {
      this.commonService.isLoader = true;
      this.commonService.getAuth('users/get-user-management?memberid=' + this.commonService.userPram.memberId + '&mLevel=' + this.commonService.userPram.memberLevel + '&userid=&isstutas=EXP')
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              let userPram = res.respData;
              const excelData: any = [];
                userPram.forEach((el: any) => {
                const obj = [
                   el.roleType+''+ el.id,
                   el.memberType,
                   el.userName,
                   el.companyName,
                   el.rmn,
                   el.address,
                   el.panCard,
                   el.gstin,
                   el.reporttoName,
                   el.asmName,
                   el.isActive=='A'?'Active':el.aepsType=='D'?'In-Active':'In-Active',
                   el.updatedDate,
                  el.walletBlance,
                  this.getDesc(el.rechTemplate),
                  this.getDesc(el.dmtTemplate),
                  this.getDesc(el?.bbpsTemplate),
                  this.getDesc(el?.aepsTemplate),
                  this.getDesc(el?.cmsTemplate)
                ];
                excelData.push(obj);
              });
              const header = ['User Id','User Type', 'Name', 'Firm Name','Login Id','Address','PAN','GSTIN','Report To','ASM','Status','Created On','Balance','Recharge Scheme','DMT Scheme','BBPS Scheme','AePS Scheme','CMS Scheme'];
              this.excelService.exportAsExcelWitheHeader(header,excelData, 'Users.xlsx','Q1');
            }
            console.log(this.respData);
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
            alert('something went wrong!');
          });
    }
  }
  onQrview(cp:any):any{
    let jsn=JSON.parse(cp);
    window.open(jsn.short_url);
  }
  onResetPassword(cp:any): any {
    const postData: any = {
      UpdatedBy: this.commonService.userPram.memberId,
      UserId: cp.userId,
      MemberId:cp.memberId,
      mobileNo: cp.rmn,
      mPin: ''
    };
    this.commonService.isLoader = true;
    this.commonService.postAuth('users/admin-reset-pwd', postData).subscribe((res: any) => {
      this.commonService.isLoader = false;
      if (res.isSuccess) {
        Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
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
    onResetMpin(cp:any): any {
      const postData: any = {
        UpdatedBy: this.commonService.userPram.memberId,
        UserId: cp.userId,
        MemberId:cp.memberId,
        mobileNo: cp.rmn,
        mPin: ''
      };
      this.commonService.isLoader = true;
      this.commonService.postAuth('users/admin-reset-mpin', postData).subscribe((res: any) => {
        this.commonService.isLoader = false;
        if (res.isSuccess) {
          Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
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

  GetMemberType(): any {
        if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
          this.commonService.getAuth('users/get-member-type-list?memberType=' + this.commonService.userPram.memberType + '&mlevel=' + this.commonService.userPram.reportLevel + '&isstutas=L')
            .subscribe(
              (res: any) => {
    
                if (res.isSuccess) {
                  this.respMemberTypes = res.respData;
                }
                console.log(this.respMemberTypes);
              },
              (err: any) => {
                if (err.status === 0) {
                  this.router.navigateByUrl('signin');
                }
              });
        }
      }

  handleSearch(): any {
        // if (this.activeTab === 0) {
        //   this.getRetailerCommission('ALL');
        // }
        this.getMembers();
      }

  openAgreementModal(cp:any): any {        
        this.isAgreementModel = !this.isAgreementModel;  
      
        this.agreementDetails.mobile = cp.rmn;
        this.agreementDetails.companyName = cp.companyName;
        this.agreementDetails.userType = cp.roleType;
        this.agreementDetails.id = cp.id;
        this.agreementDetails.userName = cp.userName;
        this.agreementDetails.agreementText ='RETAILER';
        if(cp.mtCode === 'DS')
        {
          this.agreementDetails.agreementText ='DISTRIBUTOR';
        }
        else if(cp.mtCode === 'MD')
        {
          this.agreementDetails.agreementText = 'MASTER DISTRIBUTOR';
        }       
      }

      closeAgreementDialog():void{
        this.isAgreementModel = !this.isAgreementModel;
        
        const css = `<link rel="stylesheet" href="https://xx/assets/css/bootstrap.min.css"
         crossorigin="anonymous">`;
        const printContents = document.getElementById('sectiontoprint')!.innerHTML;
        const pageContent = `<!DOCTYPE html><html><head>${css}</head><body onload="window.print()">${printContents}</html>`;
        let popupWindow: Window;
        if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
          popupWindow = window.open('','_blank','scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no')!;

          popupWindow.window.focus();
          popupWindow.document.write(pageContent);
            popupWindow.document.close();
          popupWindow.onbeforeunload = event => {
            popupWindow.close();
          };

          popupWindow.onload = function () {
            setTimeout(function(){popupWindow.print();}, 500);
            popupWindow.onfocus = function () {
               popupWindow.close();
            }  
          }

          popupWindow.onabort = event => {
            popupWindow.document.close();
            popupWindow.close();
          };
        } else {
          popupWindow = window.open('', '_blank', 'width=600,height=600')!;
          popupWindow.document.open();
          popupWindow.document.write(pageContent);
          popupWindow.document.close();
        }
      }
  }

