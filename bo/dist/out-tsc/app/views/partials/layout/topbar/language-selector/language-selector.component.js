import { __decorate, __metadata } from "tslib";
// Angular
import { Component, HostBinding, Input } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
// RxJS
import { filter } from 'rxjs/operators';
// Translate
import { TranslationService } from '../../../../../core/_base/layout';
var LanguageSelectorComponent = /** @class */ (function () {
    /**
     * Component constructor
     *
     * @param translationService: TranslationService
     * @param router: Router
     */
    function LanguageSelectorComponent(translationService, router) {
        this.translationService = translationService;
        this.router = router;
        // Public properties
        this.classes = '';
        this.languages = [
            {
                lang: 'en',
                name: 'English',
                flag: './assets/media/flags/260-united-kingdom.svg',
            },
            {
                lang: 'ch',
                name: 'Mandarin',
                flag: './assets/media/flags/034-china.svg',
            },
            {
                lang: 'es',
                name: 'Spanish',
                flag: './assets/media/flags/128-spain.svg',
            },
            {
                lang: 'jp',
                name: 'Japanese',
                flag: './assets/media/flags/063-japan.svg',
            },
            {
                lang: 'de',
                name: 'German',
                flag: './assets/media/flags/162-germany.svg',
            },
            {
                lang: 'fr',
                name: 'French',
                flag: './assets/media/flags/195-france.svg',
            },
            {
                lang: 'vi',
                name: 'VietNam',
                flag: './assets/media/flags/220-vietnam.svg',
            },
        ];
    }
    /**
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
     */
    /**
     * On init
     */
    LanguageSelectorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.setSelectedLanguage();
        this.router.events
            .pipe(filter(function (event) { return event instanceof NavigationStart; }))
            .subscribe(function (event) {
            _this.setSelectedLanguage();
        });
    };
    /**
     * Set language
     *
     * @param lang: any
     */
    LanguageSelectorComponent.prototype.setLanguage = function (lang) {
        var _this = this;
        this.languages.forEach(function (language) {
            if (language.lang === lang) {
                language.active = true;
                _this.language = language;
            }
            else {
                language.active = false;
            }
        });
        this.translationService.setLanguage(lang);
    };
    /**
     * Set selected language
     */
    LanguageSelectorComponent.prototype.setSelectedLanguage = function () {
        this.setLanguage(this.translationService.getSelectedLanguage());
    };
    __decorate([
        HostBinding('class'),
        __metadata("design:type", Object)
    ], LanguageSelectorComponent.prototype, "classes", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], LanguageSelectorComponent.prototype, "iconType", void 0);
    LanguageSelectorComponent = __decorate([
        Component({
            selector: 'kt-language-selector',
            templateUrl: './language-selector.component.html',
        }),
        __metadata("design:paramtypes", [TranslationService,
            Router])
    ], LanguageSelectorComponent);
    return LanguageSelectorComponent;
}());
export { LanguageSelectorComponent };
//# sourceMappingURL=language-selector.component.js.map