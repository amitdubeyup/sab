import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/ApiService.service';

@Component({
  selector: 'bank-button',
  templateUrl: './bank-button.component.html',
  styleUrls: ['./bank-button.component.css']
})

export class BankButtonComponent implements OnInit {
  showbank: boolean = false;
  modalData: any = {};
  rechargeModal: any = {};
  @Output() ifscCode = new EventEmitter();
  @Output() bankName = new EventEmitter();
  @Input() page_name: any;
  @Input() banklistData: any = [];
  disableSbi: boolean = false;
  disableBom: boolean = false;
  disableIcici: boolean = false;
  disbleCanara: boolean = false;
  disbleIndian: boolean = false;
  disableUnion: boolean = false;
  disableCentral:boolean = false;
  disablePnb: boolean = false;
  disableBob: boolean = false;
  disableBoi:boolean = false;
 

  constructor(public commonService: ApiService) { }

  ngOnInit(): void {
  }
  


  getIfsc(st: any): void {
      if (this.banklistData) {
      this.modalData.ifsc = this.banklistData.find((e: any) => e.bankId === st)?.bankCode;
      this.ifscCode.emit(this.modalData.ifsc);
      this.modalData.bankId = st;

      this.disableSbi = false;
      this.disableBom = false;
      this.disableIcici = false;
      this.disbleCanara = false;
      this.disbleIndian = false;
      this.disableUnion = false;
      this.disableCentral = false;
      this.disablePnb = false;
      this.disableBob = false;
      this.disableBoi = false;
    } else {
      return;
    }
  }
  getBankName(iinno: any): any {
    if (this.banklistData) {
    this.bankName.emit(iinno);
    this.modalData.bankName = iinno;
    this.disableSbi = false;
    this.disableBom = false;
    this.disableIcici = false;
    this.disbleCanara = false;
    this.disbleIndian = false;
    this.disableUnion = false;
    this.disableCentral = false;
    this.disablePnb = false;
    this.disableBob = false;
    this.disableBoi = false;
     } else {
     return;
    }
   }
  show_banklist(): any{
    this.showbank = !this.showbank;
   }
   
  //  active sbi button and deactive all buttons 
 activeSbi(): any{
  this.disableSbi = true;
  this.disableBom = false;
  this.disableIcici = false;
  this.disbleCanara = false;
  this.disbleIndian = false;
  this.disableUnion = false;
  this.disableCentral = false;
  this.disablePnb = false;
  this.disableBob = false;
  this.disableBoi = false;
 }
//  active bom button and deactive all buttons 
activeBom(): any{
  this.disableBom = true;
  this.disableSbi = false;  
  this.disableIcici = false;
  this.disbleCanara = false;
  this.disbleIndian = false;
  this.disableUnion = false;
  this.disableCentral = false;
  this.disablePnb = false;
  this.disableBob = false;
  this.disableBoi = false;

}
// active icici button and deactive all buttons 
activeIcici():any {
  this.disableIcici = true;
  this.disableBom = false;
  this.disableSbi = false;   
  this.disbleCanara = false;
  this.disbleIndian = false;
  this.disableUnion = false;
  this.disableCentral = false;
  this.disablePnb = false;
  this.disableBob = false;
  this.disableBoi = false;

}
// active canara Button and deactive all buttons 
activeCanara(): any{
  this.disbleCanara = true;
  this.disableIcici = false;
  this.disableBom = false;
  this.disableSbi = false;     
  this.disbleIndian = false;
  this.disableUnion = false;
  this.disableCentral = false;
  this.disablePnb = false;
  this.disableBob = false;
  this.disableBoi = false;
}
// active indian button and deactive all buttons 
activeIndian(): any{
  this.disbleIndian = true;
  this.disbleCanara = false;
  this.disableIcici = false;
  this.disableBom = false;
  this.disableSbi = false;      
  this.disableUnion = false;
  this.disableCentral = false;
  this.disablePnb = false;
  this.disableBob = false;
  this.disableBoi = false;
}
// active union button and deactive all buttons 
activeUnion(): any{
  this.disableUnion = true;
  this.disbleIndian = false;
  this.disbleCanara = false;
  this.disableIcici = false;
  this.disableBom = false;
  this.disableSbi = false;
  this.disableCentral = false;
  this.disablePnb = false;
  this.disableBob = false;
  this.disableBoi = false;
}
// active central button and deactive all buttons 
activeCentral(): any{
  this.disableCentral = true;
  this.disableUnion = false;
  this.disbleIndian = false;
  this.disbleCanara = false;
  this.disableIcici = false;
  this.disableBom = false;
  this.disableSbi = false; 
  this.disablePnb = false;
  this.disableBob = false;
  this.disableBoi = false;

}
// active pnb button and deactive all buttons 
activePnb(): any{
  this.disablePnb = true;
  this.disableCentral = false;
  this.disableUnion = false;
  this.disbleIndian = false;
  this.disbleCanara = false;
  this.disableIcici = false;
  this.disableBom = false;
  this.disableSbi = false; 
  this.disableBob = false;
  this.disableBoi = false;
}
// active bob button and deactive all buttons 
activeBob(): any{
  this.disableBob = true;
  this.disablePnb = false;
  this.disableCentral = false;
  this.disableUnion = false;
  this.disbleIndian = false;
  this.disbleCanara = false;
  this.disableIcici = false;
  this.disableBom = false;
  this.disableSbi = false;   
  this.disableBoi = false;
}
// active boi button and deactive all buttons 
activeBoI(): any{
  this.disableBoi = true;
  this.disableBob = false;
  this.disablePnb = false;
  this.disableCentral = false;
  this.disableUnion = false;
  this.disbleIndian = false;
  this.disbleCanara = false;
  this.disableIcici = false;
  this.disableBom = false;
  this.disableSbi = false;   
}
}