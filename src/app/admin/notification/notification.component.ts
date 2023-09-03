import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { SharedMethodService } from 'src/app/services/shared-method.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  isloder = false;
  loading = false;
  respData: any;
  isModel = false;
  isUpdate = false;
  serviceData: any = {};
  roleList: any;
  imageError: any;
  isImageSaved: any=Boolean;
  cardImageBase64: any;
  isModelSlip:boolean=false;
  filePath:any;
  constructor(public commonService: ApiService, public sharedService:SharedMethodService, public route: ActivatedRoute, public router: Router) {
  }
  ngOnInit(): void {
    this.roleList = this.sharedService.RoleType();
    this.getMembers();
  }

  getapiDesc(st: any): any {
    if (st) {
      return this.roleList.find((e: any) => e.code === st)?.desc;
    }
    return;
  }
  getMembers(): any {
    if (this.commonService.userPram.userId !== undefined && this.commonService.userPram.userId !== '' && this.commonService.userPram.rmn !== undefined) {
      this.commonService.isLoader = true;
      this.commonService.getAuth('servicemanager/get-notification?roleType=AD')
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.respData = res.respData;
            }
            console.log(res);
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
            alert('something went wrong!');
          });
    }
  }

  onSetCommission(id: any): any {
    this.router.navigate(['/administrator/add-member'], { queryParams: { uid: id } });
  }


  addService(): any {
    this.isUpdate = false;
    this.serviceData = {};
    this.toggleModal();
  }

  updateService(data: any): any {
    this.isUpdate = true;
    this.serviceData = data;
    this.toggleModal();
  }

  toggleModal(): any {
    this.isModel = !this.isModel;
  }

  formSubmit(): any {
    this.toggleModal();
    this.commonService.isLoader = true;
    if(this.cardImageBase64!=undefined){
    this.serviceData.banners=this.cardImageBase64;
    }
    const url = 'servicemanager/SaveNotification';
    this.commonService.postAuth(url, this.serviceData).subscribe((res: any) => {
      console.log(res);
      this.commonService.isLoader = false;
      this.getMembers();
      if (res.isSuccess) {
        Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
      else {
        Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
    },
      (err: any) => {
        console.log(err);
        this.commonService.isLoader = false;
        if (err.message) {
          Swal.fire({ icon: 'warning', text: err.message, confirmButtonText: 'OK' });
        }
      });
  }
  
  DeleteSubmit(cp:any): any {
    this.commonService.isLoader = true;
    const url = 'servicemanager/DeleteNotification';
    this.commonService.postAuth(url, cp).subscribe((res: any) => {
      console.log(res);
      this.commonService.isLoader = false;
      this.getMembers();
      if (res.isSuccess) {
        Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
      else {
        Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
    },
      (err: any) => {
        console.log(err);
        this.commonService.isLoader = false;
        if (err.message) {
          Swal.fire({ icon: 'warning', text: err.message, confirmButtonText: 'OK' });
        }
      });
  }
  fileChangeEvent(fileInput: any):any {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520000;
        const allowed_types = ['image/png', 'image/jpeg'];

        if (fileInput.target.files[0].size > max_size) {
            this.imageError ='Maximum size allowed is ' + max_size / 1000 + 'Mb';
            return false;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
             
                    const imgBase64Path = e.target.result;
                    this.cardImageBase64 = imgBase64Path;
                    this.isImageSaved = true;
                    // this.previewImagePath = imgBase64Path;
            };
        };
        reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
  openModel(filePath: any): void {
    this.isModelSlip = true;
    this.filePath =filePath;
   }
}
