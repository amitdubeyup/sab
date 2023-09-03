import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import { ApiService } from 'src/app/services/ApiService.service';

@Component({
  selector: 'app-kyc-home',
  templateUrl: './kyc-home.component.html',
  styleUrls: ['./kyc-home.component.css']
})
export class KycHomeComponent implements OnInit {

  isloder = false;
  loading = false;
  respData: any;
  kycStatus: any;
  activeTab=0;
  constructor(
    public commonService:ApiService,
    public sharedMethod: SharedMethodService,
    public route: ActivatedRoute,
    public router: Router) {
  }

  ngOnInit(): void {
    this.kycStatus = this.sharedMethod.kycStatus();
    this.getMembers(); 
   
  }
  handleChange(e: any): any {
    this.activeTab = e.index;  
    this.getMembers();  
  }
  changeText(myText: any): void {
    return myText.value;
  }
  getMembers(): any {
    if (this.commonService.userPram.userId !== undefined && this.commonService.userPram.userId !== '' && this.commonService.userPram.rmn !== undefined && this.commonService.userPram.rmn !== '') {
      this.commonService.isLoader = true;
      let url="";
      if(this.activeTab==0)
      {
        url='users/get-member?memberid=' + this.commonService.userPram.memberId + '&mLevel=' + this.commonService.userPram.memberLevel + '&isstutas=AD';
      }
      else
      {
        url='users/get-kyc-details?memberid='+this.commonService.userPram.memberId+'&mLevel='+this.commonService.userPram.memberLevel+'&kycid=&isstutas=AD';
      }
      this.commonService.getAuth(url)
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.respData = res.respData;
            }
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
            alert('something went wrong!');
          });
    }
  }
  onSetCommission(id: any): any {
    this.router.navigate(['/administrator/add-user'], { queryParams: { uid: id } });
  }
  getStatusDesc(st: any) {
    return this.kycStatus.find((e: any) => e.id === st)?.name;
  }
}

