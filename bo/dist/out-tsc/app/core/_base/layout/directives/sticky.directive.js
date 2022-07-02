import { __decorate, __metadata, __param } from "tslib";
import { Directive, ElementRef, HostBinding, HostListener, Inject, Input, isDevMode, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { animationFrame } from 'rxjs/internal/scheduler/animationFrame';
import { filter, map, share, startWith, takeUntil, throttleTime } from 'rxjs/operators';
var StickyDirective = /** @class */ (function () {
    function StickyDirective(stickyElement, platformId) {
        var _this = this;
        this.stickyElement = stickyElement;
        this.platformId = platformId;
        this.filterGate = false;
        this.marginTop$ = new BehaviorSubject(0);
        this.marginBottom$ = new BehaviorSubject(0);
        this.enable$ = new BehaviorSubject(true);
        this.sticky = false;
        this.boundaryReached = false;
        /**
         * The field represents some position values in normal (not sticky) mode.
         * If the browser size or the content of the page changes, this value must be recalculated.
         */
        this.scroll$ = new Subject();
        this.resize$ = new Subject();
        this.extraordinaryChange$ = new BehaviorSubject(undefined);
        this.componentDestroyed = new Subject();
        this.listener = function (e) {
            var upperScreenEdgeAt = e.target.scrollTop || window.pageYOffset;
            _this.scroll$.next(upperScreenEdgeAt);
        };
        /** Throttle the scroll to animation frame (around 16.67ms) */
        this.scrollThrottled$ = this.scroll$
            .pipe(throttleTime(0, animationFrame), share());
        /** Throttle the resize to animation frame (around 16.67ms) */
        this.resizeThrottled$ = this.resize$
            .pipe(throttleTime(0, animationFrame), 
        // emit once since we are currently using combineLatest
        startWith(null), share());
        this.status$ = combineLatest(this.enable$, this.scrollThrottled$, this.marginTop$, this.marginBottom$, this.extraordinaryChange$, this.resizeThrottled$)
            .pipe(filter(function (_a) {
            var enabled = _a[0];
            return _this.checkEnabled(enabled);
        }), map(function (_a) {
            var enabled = _a[0], pageYOffset = _a[1], marginTop = _a[2], marginBottom = _a[3];
            return _this.determineStatus(_this.determineElementOffsets(), pageYOffset, marginTop, marginBottom, enabled);
        }), share());
    }
    Object.defineProperty(StickyDirective.prototype, "marginTop", {
        set: function (value) {
            this.marginTop$.next(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StickyDirective.prototype, "marginBottom", {
        set: function (value) {
            this.marginBottom$.next(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StickyDirective.prototype, "enable", {
        set: function (value) {
            this.enable$.next(value);
        },
        enumerable: false,
        configurable: true
    });
    StickyDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.status$
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(function (status) { return _this.setSticky(status); });
    };
    StickyDirective.prototype.recalculate = function () {
        var _this = this;
        if (isPlatformBrowser(this.platformId)) {
            // Make sure to be in the next tick by using timeout
            setTimeout(function () {
                _this.extraordinaryChange$.next(undefined);
            }, 0);
        }
    };
    /**
     * This is nasty code that should be refactored at some point.
     *
     * The Problem is, we filter for enabled. So that the code doesn't run
     * if @Input enabled = false. But if the user disables, we need exactly 1
     * emit in order to reset and call removeSticky. So this method basically
     * turns the filter in "filter, but let the first pass".
     */
    StickyDirective.prototype.checkEnabled = function (enabled) {
        if (!isPlatformBrowser(this.platformId)) {
            return false;
        }
        if (enabled) {
            // reset the gate
            this.filterGate = false;
            return true;
        }
        else {
            if (this.filterGate) {
                // gate closed, first emit has happened
                return false;
            }
            else {
                // this is the first emit for enabled = false,
                // let it pass, and activate the gate
                // so the next wont pass.
                this.filterGate = true;
                return true;
            }
        }
    };
    StickyDirective.prototype.onWindowResize = function () {
        if (isPlatformBrowser(this.platformId)) {
            this.resize$.next();
        }
    };
    StickyDirective.prototype.setupListener = function () {
        if (isPlatformBrowser(this.platformId)) {
            var target = this.getScrollTarget();
            target.addEventListener('scroll', this.listener);
        }
    };
    StickyDirective.prototype.removeListener = function () {
        if (isPlatformBrowser(this.platformId)) {
            var target = this.getScrollTarget();
            target.removeEventListener('scroll', this.listener);
        }
    };
    StickyDirective.prototype.ngOnInit = function () {
        // this.checkSetup();
        this.setupListener();
    };
    StickyDirective.prototype.ngOnDestroy = function () {
        this.componentDestroyed.next();
        this.removeListener();
    };
    StickyDirective.prototype.getComputedStyle = function (el) {
        return el.getBoundingClientRect();
    };
    StickyDirective.prototype.getScrollTarget = function () {
        var target;
        if (this.scrollContainer && typeof this.scrollContainer === 'string') {
            target = document.querySelector(this.scrollContainer);
        }
        else if (this.scrollContainer && this.scrollContainer instanceof HTMLElement) {
            target = this.scrollContainer;
        }
        else {
            target = window;
        }
        return target;
    };
    StickyDirective.prototype.determineStatus = function (originalVals, pageYOffset, marginTop, marginBottom, enabled) {
        var stickyElementHeight = this.getComputedStyle(this.stickyElement.nativeElement).height;
        var reachedLowerEdge = this.boundaryElement && window.pageYOffset + stickyElementHeight + marginBottom >= (originalVals.bottomBoundary - marginTop);
        return {
            isSticky: enabled && pageYOffset > originalVals.offsetY,
            reachedLowerEdge: reachedLowerEdge,
            marginBottom: marginBottom,
            marginTop: marginTop,
        };
    };
    /**
     * Gets the offset for element. If the element
     * currently is sticky, it will get removed
     * to access the original position. Other
     * wise this would just be 0 for fixed elements.
     */
    StickyDirective.prototype.determineElementOffsets = function () {
        if (this.sticky) {
            this.removeSticky();
        }
        var bottomBoundary = null;
        if (this.boundaryElement) {
            var boundaryElementHeight = this.getComputedStyle(this.boundaryElement).height;
            var boundaryElementOffset = getPosition(this.boundaryElement).y;
            bottomBoundary = boundaryElementHeight + boundaryElementOffset;
        }
        return { offsetY: (getPosition(this.stickyElement.nativeElement).y - this.marginTop$.value), bottomBoundary: bottomBoundary };
    };
    StickyDirective.prototype.makeSticky = function (boundaryReached, marginTop, marginBottom) {
        if (boundaryReached === void 0) { boundaryReached = false; }
        this.boundaryReached = boundaryReached;
        // do this before setting it to pos:fixed
        var _a = this.getComputedStyle(this.stickyElement.nativeElement), width = _a.width, height = _a.height, left = _a.left;
        var offSet = boundaryReached ? (this.getComputedStyle(this.boundaryElement).bottom - height - this.marginBottom$.value) : this.marginTop$.value;
        this.sticky = true;
        this.stickyElement.nativeElement.style.position = 'sticky';
        this.stickyElement.nativeElement.style.backgroundColor = '#fff';
        this.stickyElement.nativeElement.style.top = this.marginTop$.value + 'px';
        // this.stickyElement.nativeElement.style.left = left + 'px';
        this.stickyElement.nativeElement.style.width = "".concat(width, "px");
        this.stickyElement.nativeElement.style.zIndex = "2";
        if (this.spacerElement) {
            var spacerHeight = marginBottom + height + marginTop;
            this.spacerElement.style.height = "".concat(spacerHeight, "px");
        }
    };
    StickyDirective.prototype.checkSetup = function () {
        if (isDevMode() && !this.spacerElement) {
            console.warn("******There might be an issue with your sticky directive!******\n\nYou haven't specified a spacer element. This will cause the page to jump.\n\nBest practise is to provide a spacer element (e.g. a div) right before/after the sticky element.\nThen pass the spacer element as input:\n\n<div #spacer></div>\n\n<div stickyThing=\"\" [spacer]=\"spacer\">\n    I am sticky!\n</div>");
        }
    };
    StickyDirective.prototype.setSticky = function (status) {
        if (status.isSticky) {
            this.makeSticky(status.reachedLowerEdge, status.marginTop, status.marginBottom);
        }
        else {
            this.removeSticky();
        }
    };
    StickyDirective.prototype.removeSticky = function () {
        this.boundaryReached = false;
        this.sticky = false;
        this.stickyElement.nativeElement.style.position = '';
        this.stickyElement.nativeElement.style.width = 'auto';
        this.stickyElement.nativeElement.style.left = 'auto';
        this.stickyElement.nativeElement.style.top = 'auto';
        if (this.spacerElement) {
            this.spacerElement.style.height = '0';
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], StickyDirective.prototype, "scrollContainer", void 0);
    __decorate([
        Input('spacerElement'),
        __metadata("design:type", HTMLElement)
    ], StickyDirective.prototype, "spacerElement", void 0);
    __decorate([
        Input('boundaryElement'),
        __metadata("design:type", HTMLElement)
    ], StickyDirective.prototype, "boundaryElement", void 0);
    __decorate([
        HostBinding('class.is-sticky'),
        __metadata("design:type", Object)
    ], StickyDirective.prototype, "sticky", void 0);
    __decorate([
        HostBinding('class.boundary-reached'),
        __metadata("design:type", Object)
    ], StickyDirective.prototype, "boundaryReached", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], StickyDirective.prototype, "marginTop", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], StickyDirective.prototype, "marginBottom", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], StickyDirective.prototype, "enable", null);
    __decorate([
        HostListener('window:resize', []),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], StickyDirective.prototype, "onWindowResize", null);
    StickyDirective = __decorate([
        Directive({
            selector: '[ktSticky]'
        }),
        __param(1, Inject(PLATFORM_ID)),
        __metadata("design:paramtypes", [ElementRef, String])
    ], StickyDirective);
    return StickyDirective;
}());
export { StickyDirective };
// Thanks to https://stanko.github.io/javascript-get-element-offset/
function getPosition(el) {
    var top = 0;
    var left = 0;
    var element = el;
    // Loop through the DOM tree
    // and add it's parent's offset to get page offset
    do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while (element);
    return {
        y: top,
        x: left,
    };
}
//# sourceMappingURL=sticky.directive.js.map