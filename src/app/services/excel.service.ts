import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Workbook } from 'exceljs';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {

  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const myworkbook: XLSX.WorkBook = { Sheets: { data: myworksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  public importFromFile(bstr: string): any {
    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    const data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
    return data;
  }

  public exportAsExcelWitheHeader(header: any, json: any[], excelFileName: string,shortRange: string): void {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('DataSheet', {views:[{state: 'frozen', xSplit: 0, ySplit:1}]});
    worksheet.autoFilter = 'A1:'+shortRange;
  
    const headerRow = worksheet.addRow(header);
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        //fgColor: { argb: 'FFCCFFE5' },      
       // bgColor: { argb: '1a4f71' }
      };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });
  
    //const usersJson: any[] = Array.of(json);

    worksheet.addRows(json);
    this.AdjustColumnWidth(worksheet);
    //Footer Row
    // let footerRow = worksheet.addRow(['This is system generated excel sheet.']);
    // footerRow.getCell(1).fill = {
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: { argb: 'FFCCFFE5' }
    // };
  
   // footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    //Merge Cells
   // worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);
    workbook.xlsx.writeBuffer().then((json: any) => {
      const blob = new Blob([json], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, excelFileName);
    });
  }
  public exportAsExcelWitheNoFormate(header: any, json: any[], excelFileName: string,shortRange: string): void {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('DataSheet', {views:[{state: 'frozen', xSplit: 0, ySplit:1}]});
    worksheet.autoFilter = 'A1:'+shortRange;
  
    const headerRow = worksheet.addRow(header);
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
       // fgColor: { argb: '1a4f71' },      
        //bgColor: { argb: 'fffff' }
      };
    });
  
    //const usersJson: any[] = Array.of(json);

    worksheet.addRows(json);
    this.AdjustColumnWidth(worksheet);
    //Footer Row
    // let footerRow = worksheet.addRow(['This is system generated excel sheet.']);
    // footerRow.getCell(1).fill = {
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: { argb: 'FFCCFFE5' }
    // };
  
    //footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    //Merge Cells
    // worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);
    workbook.xlsx.writeBuffer().then((json: any) => {
      const blob = new Blob([json], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, excelFileName);
    });
  }
   private AdjustColumnWidth(worksheet:any) {
    worksheet.columns.forEach((column: { values: any[]; width: number; }) => {
      const lengths = column.values.map((v: { toString: () => { (): any; new(): any; length: any; }; }) => v.toString().length);
      const maxLength = Math.max(...lengths.filter((v: any) => typeof v === 'number'));
      column.width = maxLength;
    });
  }
  public convertNumberToWords(amount:any):any {
    if(amount!=undefined && amount!="")
    {
    let splittedNum =amount?.toString().split('.')
    if(splittedNum.length>1)
    {
      let nonDecimal=splittedNum[0]
      let decimal=splittedNum[1]
      let price= this.price_in_words(Number(nonDecimal))+" and "+this.price_in_words(Number(decimal))+" paise"
      return price;
    }
    else
    {
      return this.price_in_words(Number(splittedNum))
    }
  }
 }
private price_in_words(price:any) {
  var sglDigit = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"],
    dblDigit = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"],
    tensPlace = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"],
    handle_tens = function(dgt:any, prevDgt:any) {
      return 0 == dgt ? "" : " " + (1 == dgt ? dblDigit[prevDgt] : tensPlace[dgt])
    },
    handle_utlc = function(dgt:any, nxtDgt:any, denom:any) {
      return (0 != dgt && 1 != nxtDgt ? " " + sglDigit[dgt] : "") + (0 != nxtDgt || dgt > 0 ? " " + denom : "")
    };

  var str = "",
    digitIdx = 0,
    digit = 0,
    nxtDigit = 0,
    words = [];
  if (price += "", isNaN(parseInt(price))) str = "";
  else if (parseInt(price) > 0 && price.length <= 10) {
    for (digitIdx = price.length - 1; digitIdx >= 0; digitIdx--) switch (digit = price[digitIdx] - 0, nxtDigit = digitIdx > 0 ? price[digitIdx - 1] - 0 : 0, price.length - digitIdx - 1) {
      case 0:
        words.push(handle_utlc(digit, nxtDigit, ""));
        break;
      case 1:
        words.push(handle_tens(digit, price[digitIdx + 1]));
        break;
      case 2:
        words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] && 0 != price[digitIdx + 2] ? " and" : "") : "");
        break;
      case 3:
        words.push(handle_utlc(digit, nxtDigit, "Thousand"));
        break;
      case 4:
        words.push(handle_tens(digit, price[digitIdx + 1]));
        break;
      case 5:
        words.push(handle_utlc(digit, nxtDigit, "Lakh"));
        break;
      case 6:
        words.push(handle_tens(digit, price[digitIdx + 1]));
        break;
      case 7:
        words.push(handle_utlc(digit, nxtDigit, "Crore"));
        break;
      case 8:
        words.push(handle_tens(digit, price[digitIdx + 1]));
        break;
      case 9:
        words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] || 0 != price[digitIdx + 2] ? " and" : " Crore") : "")
    }
    str = words.reverse().join("")
  } else str = "";
  return str
 }

}

