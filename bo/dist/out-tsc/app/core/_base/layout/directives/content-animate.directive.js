import { __decorate, __metadata } from "tslib";
// Angular
import { Directive, ElementRef } from '@angular/core';
import { animate, AnimationBuilder, style } from '@angular/animations';
import { NavigationEnd, Router } from '@angular/router';
/**
 * Page load animation
 *
 */
var ContentAnimateDirective = /** @class */ (function () {
    /**
     * Directive Consturctor
     * @param el: ElementRef
     * @param router: Router
     * @param animationBuilder: AnimationBuilder
     */
    function ContentAnimateDirective(el, router, animationBuilder) {
        this.el = el;
        this.router = router;
        this.animationBuilder = animationBuilder;
    }
    /**
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
     */
    /**
     * On init
     */
    ContentAnimateDirective.prototype.ngOnInit = function () {
        var _this = this;
        // animate the content
        this.initAnimate();
        // animate page load
        this.events = this.router.events.subscribe(function (event) {
            if (event instanceof NavigationEnd) {
                _this.player.play();
            }
        });
    };
    /**
     * On destroy
     */
    ContentAnimateDirective.prototype.ngOnDestroy = function () {
        this.events.unsubscribe();
        this.player.destroy();
    };
    /**
     * Animate page load
     */
    ContentAnimateDirective.prototype.initAnimate = function () {
        this.player = this.animationBuilder
            .build([
            // style({opacity: 0, transform: 'translateY(15px)'}),
            // animate(500, style({opacity: 1, transform: 'translateY(0)'})),
            // style({transform: 'none'}),
            style({
                transform: 'translateY(-3%)',
                opacity: 0,
                position: 'static'
            }),
            animate('0.5s ease-in-out', style({ transform: 'translateY(0%)', opacity: 1 }))
        ])
            .create(this.el.nativeElement);
    };
    ContentAnimateDirective = __decorate([
        Directive({
            selector: '[ktContentAnimate]'
        }),
        __metadata("design:paramtypes", [ElementRef,
            Router,
            AnimationBuilder])
    ], ContentAnimateDirective);
    return ContentAnimateDirective;
}());
export { ContentAnimateDirective };
//# sourceMappingURL=content-animate.directive.js.map