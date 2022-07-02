import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import moment from 'moment';
import { Workbook } from 'exceljs';

@Injectable({
  providedIn: 'root'
})
export class ExportFileService {

  constructor() { }

  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';

  public exportExcel(jsonData: any[], nameCo: string, number: string, pickDate: Date, totalRealWeight: number, weighShare: number, reciveDate: Date, fileName: string): void {
    let wb = new Workbook();
    let ws = wb.addWorksheet();
    ws.mergeCells('A1:I1');
    ws.getCell('A1').value = 'Phiếu Giao Hàng';
    ws.getCell('A1').alignment = { horizontal: 'center' };
    ws.getCell('A1').font = {
      name: 'Arial',
      size: 16,
      bold: true,
    }
    ws.mergeCells('A2:D2');
    ws.getCell('A2').value = `TÊN C/O: ${nameCo}`
    ws.getCell('A2').font = {
      name: 'Arial',
      size: 14,
      bold: true
    }
    ws.mergeCells('E2:I2');
    ws.getCell('E2').value = `SỐ PHIẾU: ${number}`
    ws.getCell('E2').font = {
      size: 14,
      bold: true,
      name: 'Arial',

    }
    ws.mergeCells('A3:I3');
    ws.getCell('A3').value = `NGÀY PICK: ${moment(pickDate).format('DD/MM/yyyy')
      // .toISOString(true)
      .slice(0, 10) as any}`
    ws.getCell('A3').font = {
      size: 14,
      bold: true,
      name: 'Arial',
    }
    ws.mergeCells('A4:D4');
    ws.getCell('A4').value = `TỔNG KG THỰC: ${totalRealWeight}`
    ws.getCell('A4').font = {
      size: 14,
      bold: true,
      name: 'Arial',
    }
    ws.mergeCells('E4:I4');
    ws.getCell('E4').value = `NGÀY VỀ: ${moment(reciveDate).format('DD/MM/yyyy')
      // .toISOString(true)
      .slice(0, 10) as any}`
    ws.getCell('E4').font = {
      size: 14,
      bold: true,
      name: 'Arial',

    }
    ws.mergeCells('A5:I5');
    ws.getCell('A5').value = `TỔNG KG ĐÃ SHARE THÙNG: ${weighShare}`
    ws.getCell('A5').font = {
      size: 14,
      bold: true,
      name: 'Arial',
    }
    ws.getColumn(1).width = 15
    ws.getColumn(2).width = 15
    ws.getColumn(3).width = 15
    ws.getColumn(4).width = 32
    ws.getColumn(5).width = 32
    ws.getColumn(6).width = 32
    ws.getColumn(7).width = 17
    ws.getColumn(8).width = 30
    ws.getColumn(9).width = 30
    ws.addRow([
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ], "n")
    ws.addRow([
      'Ngày pick', 'Tên thùng', 'Tên khách hàng', 'Tên hãng', 'Số tracking', 'Số order', 'Số sản phẩm', 'Ghi chú 1', 'Ghi chú 2'
    ], "n")
    ws.getRow(7).height = 30
    jsonData.forEach((e) => {
      if (e.pickDate) {
        e.pickDate = moment(e.pickDate).format('DD/MM/yyyy')
          // .toISOString(true)
          .slice(0, 10) as any;
      }
      ws.addRow([
        e.pickDate,
        e.boxName,
        e.userName,
        e.brandName,
        e.code,
        e.numberOrder,
        e.quantity,
        e.note1,
        e.note2,
      ], "n")
    })
    ws.addRow([
      '',
      '',
      '',
      '',
      jsonData.length,
      '',
      '',
      '',
      '',
    ], "n")

    ws.getRows(7, jsonData.length + 9).forEach((e) => {
      e.eachCell({ includeEmpty: true }, (it) => {
        it.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
        it.alignment = { vertical: 'middle', horizontal: 'center' };
      })
    })
    ws.getRow(7).eachCell((e) => {
      e.fill = {
        type: 'pattern',
        pattern: 'darkTrellis',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      }
      e.font = {
        bold: false,
        size: 12,
        name: 'Arial'
      }
    })
    ws.getRow(jsonData.length + 9).eachCell((e) => {
      e.fill = {
        type: 'pattern',
        pattern: 'solid',
        bgColor: { argb: 'FF0000FF' }
      }
      e.font = {
        bold: true,
        size: 12,
        name: 'Arial'
      }
    })

    ws.mergeCells(`A${jsonData.length + 10}:I${jsonData.length + 10}`)
    ws.getCell(`A${jsonData.length + 10}`).value = `
    Quý khách hàng chú ý: 
    Công ty chúng tôi sẽ giải quyết mọi thắc mắc về hàng hóa liên quan đến Tổng kg theo từng PHIẾU GIAO HÀNG trong vòng 5 
    ngày kể từ ngày Qúy khách hàng nhận hàng. Sau 5 ngày kể từ ngày Qúy khách hàng nhận hàng, mọi vấn đề liên quan đến Tổng kg 
    nhận, chúng tôi hoàn toàn không chịu trách nhiệm giải quyết. 
    HÀNG KHI RỜI KHỎI KHO LIHACO BÊN CTY CHÚNG TÔI HOÀN TOÀN KHÔNG CHỊU TRÁCH NHIỆM VỀ MÓN HÀNG ĐÓ .
    
    Chú ý 2: Khi nhận hàng Quý khách vui lòng kiểm đếm số lượng hàng thực nhận của mình, nếu có sai khác với Note giao hàng của LIHACO xin vui lòng quay video + chụp ảnh số món hàng và ảnh tổng Kg thực nhận của kiện hàng đó. Chúng tôi chỉ nhận xử lý kiếu nại việc thiếu hụt hàng khi Quý khách cung cấp được bằng chứng xác thực trên, nếu quý khách không cung cấp được bằng chứng xác thực LIHACO sẽ từ chối việc đền bù cho sự thiếu hụt nếu có.
    
    Quý khách hàng vui lòng đọc kỹ Điều khoản về QUY ĐỊNH HÀNG CẤM GỬI TẠI LIHACO trên website chính thức của công ty chúng tôi:
    http://lihacoltd.com/quy-dinh-hang-cam-nhan-gui-tai-lihaco.html
    Mọi sai phạm về hàng cấm gửi, chúng tôi hoàn toàn không chịu trách nhiệm đền bù và mọi trách nhiệm liên đới đến pháp luật hiện hành, khi có phát sinh 
    `
    ws.getCell(`A${jsonData.length + 10}`).alignment = { vertical: 'middle', horizontal: 'center' }
    ws.getCell(`A${jsonData.length + 10}`).font = {
      name: 'Arial',
      size: 12,
      italic: true
    }
    wb.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, fileName);
    })
  }
}
