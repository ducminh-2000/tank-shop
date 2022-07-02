import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import moment from 'moment';
import { Workbook } from 'exceljs';
var ExportFileService = /** @class */ (function () {
    function ExportFileService() {
        this.fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        this.fileExtension = '.xlsx';
    }
    ExportFileService.prototype.exportExcel = function (jsonData, nameCo, number, pickDate, totalRealWeight, weighShare, reciveDate, fileName) {
        var wb = new Workbook();
        var ws = wb.addWorksheet();
        ws.mergeCells('A1:I1');
        ws.getCell('A1').value = 'Phiếu Giao Hàng';
        ws.getCell('A1').alignment = { horizontal: 'center' };
        ws.getCell('A1').font = {
            name: 'Arial',
            size: 16,
            bold: true,
        };
        ws.mergeCells('A2:D2');
        ws.getCell('A2').value = "T\u00CAN C/O: ".concat(nameCo);
        ws.getCell('A2').font = {
            name: 'Arial',
            size: 14,
            bold: true
        };
        ws.mergeCells('E2:I2');
        ws.getCell('E2').value = "S\u1ED0 PHI\u1EBEU: ".concat(number);
        ws.getCell('E2').font = {
            size: 14,
            bold: true,
            name: 'Arial',
        };
        ws.mergeCells('A3:I3');
        ws.getCell('A3').value = "NG\u00C0Y PICK: ".concat(moment(pickDate).format('DD/MM/yyyy')
            // .toISOString(true)
            .slice(0, 10));
        ws.getCell('A3').font = {
            size: 14,
            bold: true,
            name: 'Arial',
        };
        ws.mergeCells('A4:D4');
        ws.getCell('A4').value = "T\u1ED4NG KG TH\u1EF0C: ".concat(totalRealWeight);
        ws.getCell('A4').font = {
            size: 14,
            bold: true,
            name: 'Arial',
        };
        ws.mergeCells('E4:I4');
        ws.getCell('E4').value = "NG\u00C0Y V\u1EC0: ".concat(moment(reciveDate).format('DD/MM/yyyy')
            // .toISOString(true)
            .slice(0, 10));
        ws.getCell('E4').font = {
            size: 14,
            bold: true,
            name: 'Arial',
        };
        ws.mergeCells('A5:I5');
        ws.getCell('A5').value = "T\u1ED4NG KG \u0110\u00C3 SHARE TH\u00D9NG: ".concat(weighShare);
        ws.getCell('A5').font = {
            size: 14,
            bold: true,
            name: 'Arial',
        };
        ws.getColumn(1).width = 15;
        ws.getColumn(2).width = 15;
        ws.getColumn(3).width = 15;
        ws.getColumn(4).width = 32;
        ws.getColumn(5).width = 32;
        ws.getColumn(6).width = 32;
        ws.getColumn(7).width = 17;
        ws.getColumn(8).width = 30;
        ws.getColumn(9).width = 30;
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
        ], "n");
        ws.addRow([
            'Ngày pick', 'Tên thùng', 'Tên khách hàng', 'Tên hãng', 'Số tracking', 'Số order', 'Số sản phẩm', 'Ghi chú 1', 'Ghi chú 2'
        ], "n");
        ws.getRow(7).height = 30;
        jsonData.forEach(function (e) {
            if (e.pickDate) {
                e.pickDate = moment(e.pickDate).format('DD/MM/yyyy')
                    // .toISOString(true)
                    .slice(0, 10);
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
            ], "n");
        });
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
        ], "n");
        ws.getRows(7, jsonData.length + 9).forEach(function (e) {
            e.eachCell({ includeEmpty: true }, function (it) {
                it.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                it.alignment = { vertical: 'middle', horizontal: 'center' };
            });
        });
        ws.getRow(7).eachCell(function (e) {
            e.fill = {
                type: 'pattern',
                pattern: 'darkTrellis',
                fgColor: { argb: 'FFFFFF00' },
                bgColor: { argb: 'FF0000FF' }
            };
            e.font = {
                bold: false,
                size: 12,
                name: 'Arial'
            };
        });
        ws.getRow(jsonData.length + 9).eachCell(function (e) {
            e.fill = {
                type: 'pattern',
                pattern: 'solid',
                bgColor: { argb: 'FF0000FF' }
            };
            e.font = {
                bold: true,
                size: 12,
                name: 'Arial'
            };
        });
        ws.mergeCells("A".concat(jsonData.length + 10, ":I").concat(jsonData.length + 10));
        ws.getCell("A".concat(jsonData.length + 10)).value = "\n    Qu\u00FD kh\u00E1ch h\u00E0ng ch\u00FA \u00FD: \n    C\u00F4ng ty ch\u00FAng t\u00F4i s\u1EBD gi\u1EA3i quy\u1EBFt m\u1ECDi th\u1EAFc m\u1EAFc v\u1EC1 h\u00E0ng h\u00F3a li\u00EAn quan \u0111\u1EBFn T\u1ED5ng kg theo t\u1EEBng PHI\u1EBEU GIAO H\u00C0NG trong v\u00F2ng 5 \n    ng\u00E0y k\u1EC3 t\u1EEB ng\u00E0y Q\u00FAy kh\u00E1ch h\u00E0ng nh\u1EADn h\u00E0ng. Sau 5 ng\u00E0y k\u1EC3 t\u1EEB ng\u00E0y Q\u00FAy kh\u00E1ch h\u00E0ng nh\u1EADn h\u00E0ng, m\u1ECDi v\u1EA5n \u0111\u1EC1 li\u00EAn quan \u0111\u1EBFn T\u1ED5ng kg \n    nh\u1EADn, ch\u00FAng t\u00F4i ho\u00E0n to\u00E0n kh\u00F4ng ch\u1ECBu tr\u00E1ch nhi\u1EC7m gi\u1EA3i quy\u1EBFt. \n    H\u00C0NG KHI R\u1EDCI KH\u1ECEI KHO LIHACO B\u00CAN CTY CH\u00DANG T\u00D4I HO\u00C0N TO\u00C0N KH\u00D4NG CH\u1ECAU TR\u00C1CH NHI\u1EC6M V\u1EC0 M\u00D3N H\u00C0NG \u0110\u00D3 .\n    \n    Ch\u00FA \u00FD 2: Khi nh\u1EADn h\u00E0ng Qu\u00FD kh\u00E1ch vui l\u00F2ng ki\u1EC3m \u0111\u1EBFm s\u1ED1 l\u01B0\u1EE3ng h\u00E0ng th\u1EF1c nh\u1EADn c\u1EE7a m\u00ECnh, n\u1EBFu c\u00F3 sai kh\u00E1c v\u1EDBi Note giao h\u00E0ng c\u1EE7a LIHACO xin vui l\u00F2ng quay video + ch\u1EE5p \u1EA3nh s\u1ED1 m\u00F3n h\u00E0ng v\u00E0 \u1EA3nh t\u1ED5ng Kg th\u1EF1c nh\u1EADn c\u1EE7a ki\u1EC7n h\u00E0ng \u0111\u00F3. Ch\u00FAng t\u00F4i ch\u1EC9 nh\u1EADn x\u1EED l\u00FD ki\u1EBFu n\u1EA1i vi\u1EC7c thi\u1EBFu h\u1EE5t h\u00E0ng khi Qu\u00FD kh\u00E1ch cung c\u1EA5p \u0111\u01B0\u1EE3c b\u1EB1ng ch\u1EE9ng x\u00E1c th\u1EF1c tr\u00EAn, n\u1EBFu qu\u00FD kh\u00E1ch kh\u00F4ng cung c\u1EA5p \u0111\u01B0\u1EE3c b\u1EB1ng ch\u1EE9ng x\u00E1c th\u1EF1c LIHACO s\u1EBD t\u1EEB ch\u1ED1i vi\u1EC7c \u0111\u1EC1n b\u00F9 cho s\u1EF1 thi\u1EBFu h\u1EE5t n\u1EBFu c\u00F3.\n    \n    Qu\u00FD kh\u00E1ch h\u00E0ng vui l\u00F2ng \u0111\u1ECDc k\u1EF9 \u0110i\u1EC1u kho\u1EA3n v\u1EC1 QUY \u0110\u1ECANH H\u00C0NG C\u1EA4M G\u1EECI T\u1EA0I LIHACO tr\u00EAn website ch\u00EDnh th\u1EE9c c\u1EE7a c\u00F4ng ty ch\u00FAng t\u00F4i:\n    http://lihacoltd.com/quy-dinh-hang-cam-nhan-gui-tai-lihaco.html\n    M\u1ECDi sai ph\u1EA1m v\u1EC1 h\u00E0ng c\u1EA5m g\u1EEDi, ch\u00FAng t\u00F4i ho\u00E0n to\u00E0n kh\u00F4ng ch\u1ECBu tr\u00E1ch nhi\u1EC7m \u0111\u1EC1n b\u00F9 v\u00E0 m\u1ECDi tr\u00E1ch nhi\u1EC7m li\u00EAn \u0111\u1EDBi \u0111\u1EBFn ph\u00E1p lu\u1EADt hi\u1EC7n h\u00E0nh, khi c\u00F3 ph\u00E1t sinh \n    ";
        ws.getCell("A".concat(jsonData.length + 10)).alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell("A".concat(jsonData.length + 10)).font = {
            name: 'Arial',
            size: 12,
            italic: true
        };
        wb.xlsx.writeBuffer().then(function (data) {
            var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            FileSaver.saveAs(blob, fileName);
        });
    };
    ExportFileService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], ExportFileService);
    return ExportFileService;
}());
export { ExportFileService };
//# sourceMappingURL=export-file.service.js.map