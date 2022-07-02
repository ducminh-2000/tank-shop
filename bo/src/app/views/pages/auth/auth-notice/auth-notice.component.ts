// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, Output } from '@angular/core';
// RxJS
import { Subscription } from 'rxjs';
// Auth
@Component({
	selector: 'kt-auth-notice',
	templateUrl: './auth-notice.component.html',
})
export class AuthNoticeComponent implements OnInit, OnDestroy {
	@Output() type: any;
	@Output() message: any = '';

	// Private properties
	private subscriptions: Subscription[] = [];

	/**
	 * Component Constructure
	 *
	 * @param authNoticeService
	 * @param cdr
	 */
	constructor(private cdr: ChangeDetectorRef) {
	}

	/*
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
    */

	/**
	 * On init
	 */
	ngOnInit() {}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {}
}
