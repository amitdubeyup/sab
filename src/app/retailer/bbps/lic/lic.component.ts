import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/services/ApiService.service';

@Component({
  selector: 'app-lic',
  templateUrl: './lic.component.html',
  styleUrls: ['./lic.component.css']
})
export class LicComponent implements OnInit {
  boardList: any = [];
  utilityModal: any = {
  };
  billerDetails: any = null;
  paymentSection = true;
  openModal = false;
  pipeList: any = null;
  activeTab = 0;
  fromDt: any = new Date();
  toDt: any = new Date();
  billList: any;

  operatorType = false;
  fetchpipeList: any;

  constructor(
    public commonService: ApiService,
    public dataService: DataService,
    public route: ActivatedRoute,
    public router: Router,
    public location: Location) {

  }

  ngOnInit(): void {
    this.fromDt.setDate(this.fromDt.getDate() - 29);
    this.toDt.setDate(this.toDt.getDate() + 1);
    this.getRecentTransaction();
    this.getOperatorPipe();
  }

  getoprators(docType:any,apiType:any): any {
    if (this.commonService.userPram.userId !== undefined && this.commonService.userPram.userId !== '' && this.commonService.userPram.rmn !== undefined && this.commonService.userPram.rmn !== '') {
      this.commonService.isLoader = true;
      this.commonService.getAuth('commonapi/get-oprators?docType='+docType +'&apiType='+apiType)
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.boardList = res.respData;
            }
            else
            {
              this.boardList= [];
            }
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
            alert('Oops, something went wrong!');
          });
    }
  }
  getOperatorPipe(): any {
    this.commonService.isLoader = true;
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('recharge/get-api-service?isMaxAmt=false&ApiType=BBPS&Category=LIC&maxAmount=0')
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess && res.respData) {
              this.fetchpipeList=res.respData;
              if (res.respData.apiId === '08d93b98-21fc-49c9-8130-9ad5f53a3c9a') {
                this.getoprators('LIC','icore');
              } else if (res.respData.apiId === '8b53435a-faae-11eb-9029-f80dac58cdd1') {
                this.getoprators('LIC','levin');
              }
              else
              {
                this.getoprators('LIC','mobik');
              }
            }
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
          });
    }
  }


  getPaymentPipe(maxAmount: any): any {
    this.commonService.isLoader = true;
    if (this.commonService.userPram.userId && this.commonService.userPram.rmn) {
      this.commonService.getAuth('recharge/get-api-service?isMaxAmt=true&ApiType=BBPS&Category=LIC&maxAmount=' + maxAmount)
        .subscribe(
          (res: any) => {
            console.log(res);
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.pipeList = res.respData;
              console.log(this.pipeList);
            } else {
              alert('Invalid payment amount.');
            }
          },
          (err: any) => {
            console.log(err);
            this.commonService.isLoader = false;
            alert('Oops, something went wrong!');
        });
    }
  }

  updatePaymentAmount(event: any): any {
    this.getPaymentPipe(event.target.value);
  }

  goBack(): any {
    this.location.back();
  }

  handleChange(e: any): any {
    this.activeTab = e.index;
    this.billerDetails = null;
    this.paymentSection = true;
  }

  updateState(event: any): void {
    if (event && event.state) {
      this.dataService.insuranceList.forEach((element: any) => {
        if (element.state === event.state) {
          this.boardList = element.board;
          this.utilityModal.board = null;
        }
      });
    }
  }

  getBoard(board: any): any {
    let name = '';
    console.log( this.boardList,board);
    this.boardList.forEach((element: any) => {
      if (element.id === board) {
        name = element.name;
      }
    });
    return name;
  }
  fetchBiller(): any {
    if (this.activeTab) {
      this.payNow();
    } else {
      const passingData = {
        memberId: this.commonService.userPram.memberId,
        billNumber: this.utilityModal.policyNumber,
        billperator: this.utilityModal.board,
        mobileNumber:this.utilityModal.mobileNumber,
        type: 'LIC',
        docType: 'BBPS',
      };
      this.commonService.isLoader = true;
      this.commonService.postAES256(`recharge/get-fetch-bill-lic`, JSON.stringify(passingData)).subscribe((res: any) => {
        console.log(res);
        this.commonService.isLoader = false;
        if (res.isSuccess && res.respData && res.respData.isSuccess) {
          Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' });

          this.paymentSection = false;
          this.billerDetails = res.respData;
          this.utilityModal.paymentAmount = res.respData.billamount;
          this.getPaymentPipe(res.respData.billamount);
        }
        else {
          Swal.fire({ icon: 'error', text: res.mhOutcome, confirmButtonText: 'OK' });
        }
      }, (err: any) => {
        console.log(err);
        this.commonService.isLoader = false;
        Swal.fire({ icon: 'error', text: 'something went wrong', confirmButtonText: 'OK' });
      });
    }
  }
  changeText(myText: any): void {
    return myText.value;
  }
  payNow(): any {
    if (this.pipeList && this.pipeList.apiId) {
      const savedPin = this.commonService.decryptUsingAES256(this.commonService.userPram.mPin);
      const walletBalance = this.commonService.pramwallet.walleT_BALANCE;
      const paymentAmount = this.activeTab ? this.utilityModal.paymentAmount : this.billerDetails?.billamount;;
      if (paymentAmount < walletBalance) {
        if (this.utilityModal.mPin === savedPin) {
          const passingData = {
            userId: this.commonService.userPram.userId,
            memberId: this.commonService.userPram.memberId,
            templateId: this.commonService.userPram.bbpsTemplate,
            apId: this.pipeList.apiId,
            serviceType: 'LIC',
            paymentMode: 'BBPS',
            perTrnsAmount: paymentAmount,
            accNo: this.utilityModal.policyNumber,
            mobileNumber:this.commonService.userPram.rmn,
            udf2:this.commonService.userPram.companyName+' | '+this.commonService.userPram.rmn+' | '+this.commonService.userPram.userType+''+this.commonService.userPram.id,
            intent: 'BILL PAYMENT',
            docType: 'BBPS',
            operators: this.getBoard(this.utilityModal.board),
            operatorId: this.utilityModal.board,
            opId: this.utilityModal.board,
            recipientId: this.billerDetails?.customerName,
            remitterId: this.commonService.userPram.memberId,
            BeneName: this.utilityModal.customerEmail,
            refNumber: this.utilityModal.mobileNumber
          };
          console.log(passingData);
          this.commonService.isLoader = true;
          this.commonService.postAES256('recharge/billpayment', JSON.stringify(passingData))
            .subscribe(
              (res: any) => {
                console.log(res);
                this.commonService.isLoader = false;
                Swal.fire({ icon: res.isSuccess ? 'success' : 'error', text: res.mhOutcome, confirmButtonText: 'OK' }).then(() => {
                  if (res.isSuccess) {
                    this.router.navigate(['/merchant/bbps/receipt'], { queryParams: { txnNo: res.txnNo } });
                  }
                });
              },
              (err: any) => {
                console.log(err);
                this.commonService.isLoader = false;
              });
        } else {
          Swal.fire({ icon: 'warning', text: 'Invalid mPin', confirmButtonText: 'OK' });
        }
      } else {
        Swal.fire({ icon: 'warning', text: 'Insufficient wallet balance', confirmButtonText: 'OK' });
      }
    } else {
      Swal.fire({ icon: 'warning', text: 'Invalid payment amount', confirmButtonText: 'OK' });
    }
  }


  toggleModal(): any {
    this.openModal = !this.openModal;
  }

  back(): any {
    this.paymentSection = true;
  }
  getRecentTransaction(): void {
    const fromDt = this.commonService.formatDate((this.fromDt ? this.fromDt : new Date()), 'yyyy-mm-dd');
    const toDt = this.commonService.formatDate((this.toDt ? this.toDt : new Date()), 'yyyy-mm-dd');
    if (this.commonService.userPram.userId && this.commonService.userPram.memberId) {
      this.commonService.isLoader = true;
      this.commonService.getAuth('retailerreport/get-recent-transaction?memberId=' + this.commonService.userPram.memberId + '&fromDt=' + fromDt + '&toDt=' + toDt + '&docType=LIC')
        .subscribe(
          (res: any) => {
            this.commonService.isLoader = false;
            if (res.isSuccess) {
              this.billList = JSON.parse(this.commonService.decryptUsingAES256(res.respData));
              console.log(this.billList);
            }
          },
          (err: any) => {
            this.commonService.isLoader = false;
          });
    }

  }
  printReceipt(data: any): any {
    if (data) {
      this.router.navigate(['/merchant/bbps/receipt'], { queryParams: { txnNo: data } });
    }
  }
}
