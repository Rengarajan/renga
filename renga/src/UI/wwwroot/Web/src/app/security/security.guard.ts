import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SecurityService } from './security.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SecurityGuard implements CanActivate {
	constructor(private securityService: SecurityService,
		private router: Router) {
	}
	// Not using but worth knowing about
	canActivate(next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | boolean {
		if (this.securityService.getUserAuthorized()) {
			return true;
		}
		this.securityService.signIn();
	}
}