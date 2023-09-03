import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService.service';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-oprators',
  templateUrl: './oprators.component.html',
  styleUrls: ['./oprators.component.css']
})
export class OpratorsComponent implements OnInit {
  respData: any;
  bnkStatus: any =[
       { code: 'A', desc: 'Acitve' },
       { code: 'D', desc: 'In-Active' }
     ];
  activeTab=0;
  isModel: boolean=false;
  serviceData: any = {};
  mobikwikElectricityList:any;
  indicoreElectricityList:any;
  finTechElectricityList:any;
  billMitraElectricityList:any;
  sarthiList:any;
  categoryList = [
    { code: 'ELECTRICITY', desc: 'ELECTRICITY' },
    { code: 'ELECTRICITY-ONLINE', desc: 'ELECTRICITY ONLINE' },
    { code: 'WATER', desc: 'WATER' },
    { code: 'GAS', desc: 'GAS' },
    { code: 'INSURANCE', desc: 'INSURANCE' } ,
    { code: 'LIC', desc: 'LIC' } ,
    { code: 'GASCL', desc: 'GAS CYLINDER' } ,
    { code: 'EMI', desc: 'EMI PAYMENT' } ,
    { code: 'FASTAG', desc: 'FASTAG' } 
  ]
   constructor(public commonService:ApiService,public dataService:DataService, public route: ActivatedRoute, public router: Router) {
   }
   ngOnInit(): void {
     this.ddlChange("ELECTRICITY");
   }
   handleChange(e: any): any {
    this.activeTab = e.index;
    if (this.activeTab == 0) {
      this.ddlChange('ELECTRICITY');
    }
   else if (this.activeTab == 1) {
      this.ddlChange('WATER');
    }
    else if (this.activeTab == 2) {
      this.ddlChange('GAS');
    }
    else if (this.activeTab == 3) {
      this.ddlChange('INSURANCE');
    }   
    else if (this.activeTab == 4) {
      this.ddlChange('LIC');
    } 
    else if (this.activeTab == 5) {
      this.ddlChange('GASCL');
    }   
    else if (this.activeTab == 6) {
      this.ddlChange('EMI');
    }  
    else if (this.activeTab == 7) {
      this.ddlChange('FASTAG');
    }  
    else if (this.activeTab == 8) {
      this.ddlChange('ELECTRICITY-ONLINE');
    } 
  }
  ddlChange(val: any): any {
    if (val == 'ELECTRICITY') {
      this.activeTab = 0;
      this.mobikwikElectricityList=this.dataService.mobikwikElectricityList;
      this.indicoreElectricityList=this.dataService.indicoreElectricityList;
      this.finTechElectricityList=this.dataService.finTechElectricityList;
      this.billMitraElectricityList=this.dataService.bilMitraElectricityList;
      this.sarthiList=this.dataService.providers.filter(x=>x.category=='ELECTRICITY');
      this.getoprators('ELECTRICITY');
    }
    else if (val == 'WATER') {
      this.activeTab = 1;
      this.mobikwikElectricityList=this.dataService.mobikwikhwaterList;
      this.indicoreElectricityList=this.dataService.waterList;
      this.finTechElectricityList=this.dataService.fintechwaterList;
      this.billMitraElectricityList=this.dataService.billMitraWaterList;
      this.sarthiList=this.dataService.providers.filter(x=>x.category=='WATER');
      this.getoprators('WATER');
    }
   else if (val == 'GAS') {
      this.activeTab = 2;
      this.mobikwikElectricityList=this.dataService.mobikwikhgasList;
      this.indicoreElectricityList=this.dataService.gasList;
      this.finTechElectricityList=this.dataService.fintechgasList;
      this.billMitraElectricityList=this.dataService.billMitraGasList;
      this.sarthiList=this.dataService.providers.filter(x=>x.category=='GAS');
      this.getoprators('GAS');
    }
    else if (val == 'INSURANCE') {
      this.activeTab = 3;
      this.mobikwikElectricityList=this.dataService.mobikwikhinsuranceList;
      this.indicoreElectricityList=this.dataService.insuranceList;
      this.finTechElectricityList=null;
      this.sarthiList=null;
      this.billMitraElectricityList=null;
      this.getoprators('INSURANCE');
    }  
    else if (val == 'LIC') {
      this.activeTab = 4;
      this.mobikwikElectricityList=this.dataService.mobiwiklicList;
      this.indicoreElectricityList=this.dataService.idicorelicList;
      this.finTechElectricityList=this.dataService.fintechlicList;
      this.billMitraElectricityList=null;
      this.getoprators('LIC');
    }   
   else if (val == 'GASCL') {
      this.activeTab = 5;
      this.mobikwikElectricityList=this.dataService.lpgGassMobikwikList;
      this.indicoreElectricityList=this.dataService.lpggasList;
      this.finTechElectricityList=this.dataService.LivenlpggasList;
      this.sarthiList=null;
      this.billMitraElectricityList=null;
      this.getoprators('GASCL');
    }  
    else if (val == 'EMI') 
    {
      this.activeTab = 6;
      this.mobikwikElectricityList=this.dataService.emiMobikwikList;
      this.indicoreElectricityList=null;
      this.finTechElectricityList=null;
      this.billMitraElectricityList=null;
      this.sarthiList=this.dataService.providers.filter(x=>x.category=='Emi');
      this.getoprators('EMI');
    }    
    else if (val == 'FASTAG') 
    {
      this.activeTab = 7;
      this.mobikwikElectricityList=this.dataService.fastagMobikwikList;
      this.indicoreElectricityList=null;
      this.finTechElectricityList=null;
      this.billMitraElectricityList=null;
      this.sarthiList=this.dataService.providers.filter(x=>x.category=='Fast Tag');
      this.getoprators('FASTAG');
    }  
    else if (val == 'ELECTRICITY-ONLINE') {
      this.activeTab = 8;
      this.mobikwikElectricityList=this.dataService.mobikwikElectricityList;
      this.indicoreElectricityList=null;
      this.finTechElectricityList=null;
      this.billMitraElectricityList=null;
      this.sarthiList=null;
      this.getoprators('ELECTRICITY-ONLINE');
    }
  }
  changeText(mytext: any): void {
    return mytext.value;
  }
   getoprators(docType:any): any {
     if (this.commonService.userPram.userId !== undefined && this.commonService.userPram.userId !== '' && this.commonService.userPram.rmn !== undefined && this.commonService.userPram.rmn !== '' && this.commonService.userPram.memberLevel !== undefined && this.commonService.userPram.memberLevel !== '') {
       this.commonService.isLoader = true;
       this.commonService.getAuth('commonapi/get-oprators?docType='+docType +'&apiType=all')
         .subscribe(
           (res: any) => {
             this.commonService.isLoader = false;
             if (res.isSuccess) {
               this.respData = res.respData;
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
   onSubmit(data:any): void {
     this.commonService.isLoader = true;
     console.log(data);
     this.commonService.postAuth("commonapi/add-oprator", JSON.stringify(data)).subscribe((res: any) => {
       this.commonService.isLoader = false;
       if (res.isSuccess) {
         Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' });
       }
       else {
         Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'OK' });
       }
     },
       (err: any) => {
         this.commonService.isLoader = false;
         if (err.message) {
         }
       });
   }
   openForm(): any {
    this.isModel = true;
  }
  toggleModal(): any {
    this.isModel = false;
  }
  addService(): any {
    this.commonService.isLoader = true;
    let datapost={
      docType: this.serviceData.category,
      name: this.serviceData.apiName,
      isActive: 'A',
    }
    this.commonService.postAuth('commonapi/add-oprator', JSON.stringify(datapost)).subscribe((res: any) => {
      this.commonService.isLoader = false;
      if (res.isSuccess) {
        this.toggleModal();
        Swal.fire({ icon: 'success', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
      else {
        Swal.fire({ icon: 'warning', text: res.mhOutcome, confirmButtonText: 'OK' });
      }
    },
      (err: any) => {
        this.commonService.isLoader = false;
        if (err.message) {
          Swal.fire({ icon: 'warning', text: err.message, confirmButtonText: 'OK' });
        }
      });
  }
 }
 