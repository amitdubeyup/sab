import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedMethodService {

  constructor() { }

  CommissionType(): any {
    return [
      { code: 'P', desc: '%' },
      { code: 'R', desc: 'Rs.' }
    ];
  }
  RoleType(): any {
    return [
      { code: 'SA', desc: 'Admin' },
      { code: 'AD', desc: '	Sub Admin' },
      { code: 'ASM', desc: 'ASM' },
      { code: 'MD', desc: 'Master Distributor' },
      { code: 'DS', desc: 'Distributor' },
      { code: 'RT', desc: 'Retailer' }
    ];
  }

  GstType(): any {
    return [
      { code: '0', desc: 'UnRegistered' },
      { code: '1', desc: 'Registered' }
    ];
  }

  commonService_CATEGORY(): any {
    return [
      { code: 'Prepaid', desc: 'Prepaid' },
      { code: 'Postpaid', desc: 'Postpaid' }
    ];
  }

  kycStatus(): any {
    return [
      { id: '1', name: 'Pending' },
      { id: '2', name: 'Hold' },
      { id: '3', name: 'Declined' },
      { id: '4', name: 'Approved' },
    ];
  }
  PaymentMode(): any {
    return [
      { id: '1', name: 'Pending' },
      { id: '2', name: 'Hold' },
      { id: '3', name: 'Declined' },
      { id: '4', name: 'Approved' },
    ];
  }
  PaymentStatus=[
      { id: null, name: 'All' },
      { id: 'Initiated', name: 'Initiated' },
      { id: 'Success', name: 'Success' },
      { id: 'Successfull', name: 'Successfull' },
      { id: 'Failed', name: 'Failed' },
      { id: 'Pending', name: 'Pending' },    
      { id: 'InProcess', name: 'In Process' },
      { id: 'RefundPending', name: 'Refund Pending' }, 
      { id: 'Refunded', name: 'Refunded' },
    ];
    PaymentStatusEdit=[
      { id: 'Success', name: 'Success' },
      { id: 'Successfull', name: 'Successfull' },
      { id: 'Failed', name: 'Failed' },
      { id: 'Pending', name: 'Pending' },    
      { id: 'InProcess', name: 'In Process' },
      { id: 'RefundPending', name: 'Refund Pending' }, 
      { id: 'Refunded', name: 'Refunded' }
    ];
    PaymentStatusAeps=[
      { id: 'Success', name: 'Success' },
      { id: 'Failed', name: 'Failed' },     
      { id: 'InProcess', name: 'In Process' },
      { id: 'Hold', name: 'Hold' }
    ];
    MemberStatus=[
      { id: 'A', name: 'Active' },
      { id: 'D', name: 'In-Active' }      
    ];
    MemberOtp=[
      { id: 1, name: 'On' },
      { id: 0, name: 'Off' }
    ];
    SearchType=[
      { id: null, name: 'All' },
      { id: 'txn', name: 'Transaction Number' },
      { id: 'acc', name: 'Account Number' } , 
      { id: 'send', name: 'Mobile Number' } , 
    ];
    VpaStatus=[
      { id: -1, name: 'All' },
      { id: 0, name: 'Pending'},
      { id: 1, name: 'Accepted' }
    ];
    DmtType=[
      { id: '', name: 'All' },
      { id: 'IMPS', name: 'IMPS'},
      { id: 'NEFT', name: 'NEFT' }
    ];
    DsReportType=[
      { id: null, name: 'All' },
      { id: 'WBAL', name: 'Wallet To Wallet' },
      { id: 'BAN', name: 'Advance Payment' },
      { id: 'FUND', name: 'Money Request' },
      { id: 'PG', name: 'PG Transaction' },
      { id: 'COMM', name: 'Commission' }
    ];
}
