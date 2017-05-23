import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { SecurityService } from '../security.service';

@Component({
    selector: 'cd-app-security-signin-response',
    template: `
        <div class="loading-bar-overlay">
            <div class="glogo-gif">
                <img src="/images/g_logo.gif">
            </div>
        </div> 
    `
})
export class SecuritySigninOidcComponent implements OnInit {

    constructor(private securityService: SecurityService) {
    }
    
    ngOnInit() {
        this.securityService.signinRedirectCallback();
    }
}