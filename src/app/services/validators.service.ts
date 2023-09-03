import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$/;
  mobilePattern = /^((\\+91-?)|0)?[0-9]{10}$/;
  zipPattern = /^[1-9]{1}[0-9]{5}$/;
  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/;
  routingPattern = /^[0-9]{7,14}$/;
  characterPattern = /^[a-zA-Z\s]+$/;
  businessPattern = /^[0-9]{9}$/;

  otpPattern = /^[0-9]{6}$/;
  aadharPattern = /^[1-9]{1}[0-9]{11}$/;
  panPattern = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
  tanPattern = /^([a-zA-Z]){4}([0-9]){5}([a-zA-Z]){1}?$/;
  gstPattern =
    /^[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[a-zA-Z0-9]{1}[zZ]{1}[a-zA-Z0-9]{1}$/ ||
    /^[0-9]{4}[a-zA-Z]{3}[0-9]{5}[uoUO]{1}[nN][a-zA-Z0-9]{1}$/ ||
    /^[0-9]{2}[a-zA-Z]{4}[0-9]{5}[a-zA-Z]{1}[0-9]{1}[zZ]{1}[0-9]{1}$/ ||
    /^[0-9]{4}[a-zA-Z]{3}[0-9]{5}[nN][rR][0-9a-zA-Z]{1}$/ ||
    /^[0-9]{2}[a-zA-Z]{4}[a-zA-Z0-9]{1}[0-9]{4}[a-zA-Z]{1}[1-9A-Za-z]{1}[dD]{1}[0-9a-zA-Z]{1}$/ ||
    /^[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9A-Za-z]{1}[C]{1}[0-9a-zA-Z]{1}$/ ||
    /^[9][9][0-9]{2}[a-zA-Z]{3}[0-9]{5}[oO][S][0-9a-zA-Z]{1}$/;
  ifscPattern = /^[a-zA-Z0-9]{11}$/;
  numberPattern = /^[1-9]{1}[0-9]$/;
  decimalPattern = /^0|[1-9]\d*$/;
  validNumber = new RegExp(/^\d*\.?\d*$/);

  constructor() { }
  checkPassword(first: any, second: any): any {
    if (first !== second) {
      return false;
    } else {
      return true;
    }
  }
}
