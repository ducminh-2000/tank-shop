import { __decorate, __metadata } from "tslib";
// Angular
import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
var SearchDropdownComponent = /** @class */ (function () {
    /**
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
     */
    function SearchDropdownComponent(cdr) {
        this.cdr = cdr;
        // Public properties
        // Set icon class name
        this.icon = 'flaticon2-search-1';
        this.type = 'success';
    }
    /**
     * On init
     */
    SearchDropdownComponent.prototype.ngOnInit = function () {
        // simulate result from API
        // type 0|1 as separator or item
        this.result = [
            {
                text: 'Documents',
                type: 0
            }, {
                icon: '<i class="flaticon-interface-3 kt-font-warning">',
                text: 'Annual finance report',
                type: 1
            }, {
                icon: '<i class="flaticon-share kt-font-success"></i>',
                text: 'Company meeting schedule',
                type: 1
            }, {
                icon: '<i class="flaticon-paper-plane kt-font-info"></i>',
                text: 'Project quotations',
                type: 1
            }, {
                text: 'Customers',
                type: 0
            }, {
                img: '<img src="assets/media/users/user1.jpg" alt="">',
                text: 'Amanda Anderson',
                type: 1
            }, {
                img: '<img src="assets/media/users/user2.jpg" alt="">',
                text: 'Kennedy Lloyd',
                type: 1
            }, {
                img: '<img src="assets/media/users/user3.jpg" alt="">',
                text: 'Megan Weldon',
                type: 1
            }, {
                img: '<img src="assets/media/users/user4.jpg" alt="">',
                text: 'Marc-André ter Stegen',
                type: 1
            }, {
                text: 'Files',
                type: 0
            }, {
                icon: '<i class="flaticon-lifebuoy kt-font-warning"></i>',
                text: 'Revenue report',
                type: 1
            }, {
                icon: '<i class="flaticon-coins kt-font-primary"></i>',
                text: 'Anual finance report',
                type: 1
            }, {
                icon: '<i class="flaticon-calendar kt-font-danger"></i>',
                text: 'Tax calculations',
                type: 1
            }
        ];
    };
    /**
     * Search
     * @param e: Event
     */
    SearchDropdownComponent.prototype.search = function (e) {
        var _this = this;
        this.data = null;
        if (e.target.value.length > 2) {
            this.loading = true;
            // simulate getting search result
            setTimeout(function () {
                _this.data = _this.result;
                _this.loading = false;
                _this.cdr.markForCheck();
            }, 500);
        }
    };
    /**
     * Clear search
     *
     * @param e: Event
     */
    SearchDropdownComponent.prototype.clear = function (e) {
        this.data = null;
        this.searchInput.nativeElement.value = '';
    };
    SearchDropdownComponent.prototype.openChange = function () {
        var _this = this;
        setTimeout(function () { return _this.searchInput.nativeElement.focus(); });
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SearchDropdownComponent.prototype, "icon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SearchDropdownComponent.prototype, "useSVG", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SearchDropdownComponent.prototype, "type", void 0);
    __decorate([
        ViewChild('searchInput', { static: true }),
        __metadata("design:type", ElementRef)
    ], SearchDropdownComponent.prototype, "searchInput", void 0);
    SearchDropdownComponent = __decorate([
        Component({
            selector: 'kt-search-dropdown',
            templateUrl: './search-dropdown.component.html',
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], SearchDropdownComponent);
    return SearchDropdownComponent;
}());
export { SearchDropdownComponent };
//# sourceMappingURL=search-dropdown.component.js.map