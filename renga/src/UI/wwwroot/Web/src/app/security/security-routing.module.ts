import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecuritySigninOidcComponent } from './signin-oidc/signin-oidc.component';
import { SecurityUnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
  { path: 'unauthorized', component: SecurityUnauthorizedComponent },
  { path: 'signin-oidc', component: SecuritySigninOidcComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class SecurityRoutingModule {}
