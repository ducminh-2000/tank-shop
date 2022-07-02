// Angular
import { Injectable } from '@angular/core';
// RxJS
import { Subject } from 'rxjs';
import { LoopBackAuth } from 'src/app/api';

@Injectable()
export class MenuConfigService {
	// Public properties
	onConfigUpdated$: Subject<any>;
	// Private properties
	private menuConfig: any;
	private userLogin: any
	isRoleSuperAdmin = false;
	isRoleAdmin = false;

	/**
	 * Service Constructor
	 */
	constructor(
		private auth: LoopBackAuth,

	) {
		// register on config changed event and set default config
		this.onConfigUpdated$ = new Subject();
		this.userLogin = this.auth.getCurrentUserData();
		this.isRoleSuperAdmin = this.userLogin.roles[0].name === 'SUPERADMIN';
		this.isRoleAdmin = this.userLogin.roles[0].name === 'ADMIN';
	}

	/**
	 * Returns the menuConfig
	 */
	getMenus() {
		if(this.isRoleAdmin){
			this.menuConfig.aside.items.splice(3,3)
			// this.menuConfig.aside.items.splice(0,1)
		}
		console.log(this.menuConfig.aside.items)
		return this.menuConfig;

	}

	/**
	 * Load config
	 *
	 * @param config: any
	 */
	loadConfigs(config: any) {
		this.menuConfig = config;
		this.onConfigUpdated$.next(this.menuConfig);
	}
}
