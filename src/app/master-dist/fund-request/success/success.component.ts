import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/services/ApiService.service';
@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
 
  pgStatus:any;
  orderId:any;
  constructor( public commonService: ApiService,
    public route: ActivatedRoute,
    public location: Location,
    public router: Router) { 

    }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params?.token) {
        const paramsData = JSON.parse(window.atob(params.token));
        this.pgStatus=paramsData.status;
        this.orderId=paramsData.txnid;
        this.onlineFundRequestUpdateStatus(this.orderId,this.pgStatus);
      }
    });
  }
  goBack(): any {
    this.location.back();
  }

onlineFundRequestUpdateStatus(txnId:any,status:any)
{
  this.commonService.isLoader = true;
  this.commonService.postAuthFile('fileservices/update-fund-request-online?memberId='+this.commonService.userPram.memberId+'&txnId='+txnId+'&status='+status,{}).subscribe((res: any) => {
    console.log(res);
    this.commonService.isLoader = false;
    Swal.fire({ icon:res.isSuccess?'success':'error', text:res.mhOutcome, confirmButtonText: 'OK' });    

  }, (err: any) => {
    console.log(err);
    this.commonService.isLoader = false;
    Swal.fire({ icon: 'error', text: 'Oops,something went wrong with fund request update status!', confirmButtonText: 'OK' });
  });
}

}
