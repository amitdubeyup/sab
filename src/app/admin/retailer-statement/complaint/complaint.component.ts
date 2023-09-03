import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css'],
})
export class ComplaintComponent implements OnInit {
  
  fromDt: any = new Date();
  toDt: any = new Date();
  searchComplaintId: any;
  isModel = false;
  searchTypeOfComplaintId: any;  
  status: any = null;
  complaintData: complaintData = new complaintData();
  comments: any = [];
  StatusList: any = [
    { id: 'all', name: 'All' },
    { id: 'initiated', name: 'Initiated' },
    { id: 'inprogress', name: 'In Progress' },
    { id: 'query', name: 'Query' },
    { id: 'closed', name: 'Closed' },
  ];
  complaintStatus: any = [];
  validateDescription = true;

  constructor(
    public commonService:ApiService,
    public route: ActivatedRoute,
    public dataService: DataService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.fromDt.setDate(this.fromDt.getDate());
    this.toDt.setDate(this.toDt.getDate());
    this.status = 'initiated';
    this.getComplaints();
  }

  getComplaints(): any {
    this.commonService.isLoader = true;
    const fromDt = this.commonService.formatDate(
      this.fromDt ? this.fromDt : new Date(),
      'yyyy-mm-dd'
    );
    const toDt = this.commonService.formatDate(
      this.toDt ? this.toDt : new Date(),
      'yyyy-mm-dd'
    );
    console.log(this.status);
    this.commonService
      .getAuth(
        'complaint/get-complaints?status=' +
          this.status +
          '&fromDate=' +
          fromDt +
          '&toDate=' +
          toDt +
          '&docType=Admin'
      )
      .subscribe(
        (res: any) => {
          this.commonService.isLoader = false;

          if (res.isSuccess) {
            this.complaintStatus = res.respData;
            console.log('complaint status called', this.complaintStatus);
          } else {
            this.complaintStatus = [];
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  getComments(cp: any) {
    if (
      this.commonService.userPram.userId &&
      this.commonService.userPram.memberId
    ) {
      this.commonService.isLoader = true;
      this.commonService
        .getAuth('complaint/get-complaint-logs?complaintId=' + cp.complaintID)
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.comments = res.respData;
            }
            console.log(this.comments);
          },
          (err: any) => {
            this.commonService.isLoader = false;
          }
        );
    }
  }

  getServiceReason(code: any) {
    if (this.dataService.service_Reason) {
      return this.dataService.service_Reason.find((e: any) => e.code === code)
        ?.name;
    } else {
      return '';
    }
  }

  getParticipationType(code: any) {
    if (this.dataService.participate_type) {
      return this.dataService.participate_type.find((e: any) => e.code === code)
        ?.name;
    } else {
      return '';
    }
  }

  changeText(myText: any): void {
    return myText.value;
  }

  onFormSubmit(): any {
    this.closeModal();
  }

  openModal(data: complaintData): any {
    this.getComments(data);
    this.isModel = !this.isModel;
    console.log('data', data);
    this.complaintData = data;
    this.complaintData.remark = '';
    this.complaintData.complaintID = data.complaintID;
    this.complaintData.service_Reason = this.getServiceReason(
      data.serviceReason
    );
    this.complaintData.participation_type = this.getParticipationType(
      data.participationType
    );
  }

  closeModal(): any {
    this.isModel = !this.isModel;
  }

  getStatus(isStatus: any): any {
    if (isStatus == 'initiated') {
      return 'customer-badge status-new';
    } else if (isStatus == 'inprogress') {
      return 'customer-badge status-proposal';
    } else if (isStatus == 'query') {
      return 'customer-badge status-query';
    } else if (isStatus == 'closed') {
      return 'customer-badge status-closed';
    } else {
      return 'customer-badge status-new';
    }
  }

  postComment() {
    if (
      this.commonService.userPram.userId &&
      this.commonService.userPram.memberId
    ) {
      if(this.complaintData.remark.trim().length == 0)
      {
        Swal.fire({icon: 'error',text: 'Please enter remark.',confirmButtonText: 'OK'});
        return;
      }

      this.commonService.isLoader = true;
      let commentData: any = {};
      commentData.MemberId = this.commonService.userPram.memberId;
      commentData.ComplaintId = this.complaintData.complaintID;
      commentData.AdminRemark = this.complaintData.remark.trim();
      console.log('commentData,', commentData);
      this.commonService
        .postAES256('complaint/add-complaint-comment?memberId=' +this.commonService.userPram.memberId,JSON.stringify(commentData))
        .subscribe(
          (res: any) => {
            if (res.isSuccess) {
              this.commonService.isLoader = false;
              Swal.fire({
                icon: 'success',
                text: res.mhOutcome,
                confirmButtonText: 'OK',
              });

              this.comments.push({
                retailerNote: '',
                complaintID: this.complaintData.complaintID,
                adminNote: this.complaintData.remark,
                createdOn: new Date(),
              });
              this.complaintData.remark = '';
              this.validateDescription = false;
              console.log('Comments ->: ', this.comments);
            } else {
              this.commonService.isLoader = false;
              Swal.fire({
                icon: 'warning',
                text: res.mhOutcome,
                confirmButtonText: 'OK',
              });
            }
          },
          (err: any) => {
            this.commonService.isLoader = false;
          }
        );
    }
  }

  changeStatus(status: any): void {
    if (
      this.commonService.userPram.userId &&
      this.commonService.userPram.memberId
    ) {
      this.commonService.isLoader = true;
      this.commonService
        .postAES256(
          'complaint/update-complaint-status?memberId=' +
            this.commonService.userPram.memberId +
            '&complaintId=' +
            this.complaintData.complaintID +
            '&status=' +
            status +
            '&userName=' +
            this.complaintData.userName +
            '&userMobile=' +
            this.complaintData.userMobile,
          {}
        )
        .subscribe(
          (res: any) => {
            if (res.isSuccess) {
              this.commonService.isLoader = false;
              Swal.fire({
                icon: 'success',
                text: res.mhOutcome,
                confirmButtonText: 'OK',
              });
            } else {
              this.commonService.isLoader = false;
              Swal.fire({
                icon: 'warning',
                text: res.mhOutcome,
                confirmButtonText: 'OK',
              });
            }
          },
          (err: any) => {
            this.commonService.isLoader = false;
          }
        );
    }
  }

  validateInput(event: any,name : any): any{
    
   if(name == 'commentText')
   {
   const comment = (event.target.value || '').trim();
   if(comment.length == 0)
   {
     this.validateDescription = true;
    } 
   else
   {
     this.validateDescription = false;
   }
   console.log(this.validateDescription,'comment');
  } 
  
  


  }
}

export class complaintData {
  id: any = null;
  customerName: any = null;
  mobileNo: any = null;
  txnNo: any = null;
  typeOfComplaint: any = null;
  participationType: any = null;
  participation_type: any = null;
  serviceReason: any = null;
  service_Reason: any = null;
  description: any = null;
  status: any = null;
  complaintID: any = null;
  complaintBy: any = null;
  userName: any = null;
  userMobile: any = null;
  createdOn: any = null;
  TxnSlip: any = null;
  UpdatedBy: any = null;
  UpdatedOn: any = null;
  canPostRemark :any = null;
  remark : any = null;
}
