import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'cd-security-unauthorized',
    templateUrl: './unauthorized.html',
})
export class SecurityUnauthorizedComponent implements OnInit {

    constructor(
        private router: Router
    ) {

    }

    ngOnInit() {

    }

    login() {
        this.router.navigate(['/']);
    }
}