import { TestBed } from '@angular/core/testing';
import { ExportFileService } from './export-file.service';
describe('ExportFileService', function () {
    var service;
    beforeEach(function () {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ExportFileService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=export-file.service.spec.js.map