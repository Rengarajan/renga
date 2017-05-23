import { NgModule } from '@angular/core';
import { SecuritySigninOidcComponent } from './signin-oidc/signin-oidc.component';
import { SecurityUnauthorizedComponent } from './unauthorized/unauthorized.component';
import { SecurityGuard } from './security.guard';
import { SecurityService } from './security.service';
import { StorageService } from './storage.service';
import { RouterModule } from '@angular/router';
import { SecurityRoutingModule } from './security-routing.module';

@NgModule({
    imports: [
        RouterModule,
        SecurityRoutingModule
    ],
    declarations: [
        SecuritySigninOidcComponent,
        SecurityUnauthorizedComponent
    ],
    providers: [
        SecurityService,
        StorageService,
        SecurityGuard
    ]
})
export class SecurityModule {
    
}

