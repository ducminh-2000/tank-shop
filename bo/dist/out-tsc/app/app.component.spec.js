import { __awaiter, __generator } from "tslib";
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
describe('AppComponent', function () {
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, TestBed.configureTestingModule({
                        imports: [RouterTestingModule],
                        declarations: [AppComponent],
                    }).compileComponents()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should create the app', function () {
        var fixture = TestBed.createComponent(AppComponent);
        var app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
    it("should have as title 'LIHACO-BO'", function () {
        var fixture = TestBed.createComponent(AppComponent);
        var app = fixture.componentInstance;
        expect(app.title).toEqual('LIHACO-BO');
    });
    it('should render title', function () {
        var _a;
        var fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        var compiled = fixture.nativeElement;
        expect((_a = compiled.querySelector('.content span')) === null || _a === void 0 ? void 0 : _a.textContent).toContain('LIHACO-BO app is running!');
    });
});
//# sourceMappingURL=app.component.spec.js.map