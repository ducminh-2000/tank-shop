import { TestBed } from '@angular/core/testing';
import { SharedDataService } from './shared-data.service';
describe('SharedDataService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(SharedDataService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=shared-data.service.spec.js.map