import { __decorate, __metadata, __spreadArray } from "tslib";
// Angular
import { Injectable } from '@angular/core';
// Tranlsation
import { TranslateService } from '@ngx-translate/core';
var TranslationService = /** @class */ (function () {
    /**
     * Service Constructor
     *
     * @param translate: TranslateService
     */
    function TranslationService(translate) {
        this.translate = translate;
        // Private properties
        this.langIds = [];
        // add new langIds to the list
        this.translate.addLangs(['vi', 'en']);
        // this language will be used as a fallback when a translation isn't found in the current language
        this.translate.setDefaultLang('vi');
    }
    /**
     * Load Translation
     *
     * @param args: Locale[]
     */
    TranslationService.prototype.loadTranslations = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var locales = __spreadArray([], args, true);
        locales.forEach(function (locale) {
            // use setTranslation() with the third argument set to true
            // to append translations instead of replacing them
            _this.translate.setTranslation(locale.lang, locale.data, true);
            _this.langIds.push(locale.lang);
        });
        // add new languages to the list
        this.translate.addLangs(this.langIds);
    };
    /**
     * Setup language
     *
     * @param lang: any
     */
    TranslationService.prototype.setLanguage = function (lang) {
        if (lang) {
            this.translate.use(lang);
            localStorage.setItem('language', lang);
        }
    };
    /**
     * Returns selected language
     */
    TranslationService.prototype.getSelectedLanguage = function () {
        return localStorage.getItem('language') || this.translate.getDefaultLang();
    };
    TranslationService = __decorate([
        Injectable({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [TranslateService])
    ], TranslationService);
    return TranslationService;
}());
export { TranslationService };
//# sourceMappingURL=translation.service.js.map