// Angular
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
    NavigationCancel,
    NavigationEnd,
    NavigationStart,
    RouteConfigLoadEnd,
    RouteConfigLoadStart,
    Router
} from '@angular/router';
// Object-Path
import * as objectPath from 'object-path';
// Loading bar
import { LoadingBarService } from '@ngx-loading-bar/core';
// Layout
import { LayoutConfigService, LayoutRefService } from '../../../core/_base/layout';
// HTML Class Service
import { HtmlClassService } from '../html-class.service';
import { Account, LoopBackAuth, LoopBackConfig } from '../../../api';
import { finalize } from 'rxjs/operators';

declare const playSound: any;

@Component({
    selector: 'kt-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
    // Public properties
    menuHeaderDisplay: boolean;
    fluid: boolean;
    isNotify = 0;

    @ViewChild('ktHeader', { static: true }) ktHeader: ElementRef;

    /**
     * Component constructor
     *
     * @param router: Router
     * @param layoutRefService: LayoutRefService
     * @param layoutConfigService: LayoutConfigService
     * @param loader: LoadingBarService
     * @param htmlClassService: HtmlClassService
     * @param notificationApi
     * @param auth
     */
    userLogin: Account = new Account();
    totalItems: number;
    isRoleAdmin = false;

    constructor(
        private router: Router,
        private layoutRefService: LayoutRefService,
        private layoutConfigService: LayoutConfigService,
        public loader: LoadingBarService,
        public htmlClassService: HtmlClassService,
        private auth: LoopBackAuth,
    ) {
        // page progress bar percentage
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                // set page progress bar loading to start on NavigationStart event router
                this.loader.start();
            }
            if (event instanceof RouteConfigLoadStart) {
                this.loader.increment(35);
            }
            if (event instanceof RouteConfigLoadEnd) {
                this.loader.increment(75);
            }
            if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
                // set page progress bar loading to end on NavigationEnd event router
                this.loader.complete();
            }
        });
    }

    /**
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
     */

    /**
     * On init
     */
    ngOnInit(): void {
        this.userLogin = this.auth.getCurrentUserData();
        this.isRoleAdmin = this.userLogin.roles[0].name === 'SUPERADMIN';

        const config = this.layoutConfigService.getConfig();

        // get menu header display option
        this.menuHeaderDisplay = objectPath.get(config, 'header.menu.self.display');

        // header width fluid
        this.fluid = objectPath.get(config, 'header.self.width') === 'fluid';

        // animate the header minimize the height on scroll down. to be removed, not applicable for default demo
        /*if (objectPath.get(config, 'header.self.fixed.desktop.enabled') || objectPath.get(config, 'header.self.fixed.desktop')) {
            // header minimize on scroll down
            this.ktHeader.nativeElement.setAttribute('data-ktheader-minimize', '1');
        }*/
        this.getNotifications();
    }

    ngAfterViewInit(): void {
        // keep header element in the service
        this.layoutRefService.addElement('header', this.ktHeader.nativeElement);
    }

    getNotifications() {
        const filter = {
            accountId: this.isRoleAdmin ? undefined : this.userLogin.id,
            or: [
                { read: { neq: 'READ' } },
                { read: null }
            ]
        };
    }
}
