import { Injectable, Injector } from '@angular/core';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { UserManager, User } from 'oidc-client';

const webUrl = 'http://localhost:3000';

export const securitySettings: any = {
  authority: OIDC_URL,
  client_id: 'UI',
  redirect_uri: webUrl + '/signin-oidc',
  post_logout_redirect_uri: webUrl,
  response_type: 'id_token token',
  scope: 'openid profile',
  automaticSilentRenew: false,
  silentRequestTimeout:10000,
  filterProtocolClaims: true,
  loadUserInfo: true
};

@Injectable()
export class SecurityService {
    public userName: string;
    public userId:string;

    private oidcManager = new UserManager(securitySettings);

    constructor(
        private injector: Injector,
        private storageService: StorageService
    ) {
        if (this.getUserAuthorized()) {
            this.setUserData();
        }
        // this.runExpiryCheck();
    }

    get router() {
        return this.injector.get(Router);
    }

    getUserAuthorized(): boolean {
        return this.storageService.getObject('userData') !== null;
    }
    
    getUserName(): string {
        return this.storageService.getObject('userData') === null ? '' : this.storageService.getObject('userData').profile.name;
    }
    
    getAccessToken(): string {
        return this.storageService.getObject('userData') === null ? '' : this.storageService.getObject('userData').access_token;
    }

    getTokenExpiresInSeconds(): number {
        return this.storageService.getObject('userData') === null ? 0 : (this.storageService.getObject('userData').expires_at - Math.floor(new Date().getTime() / 1000) + 300);
    }
    
    clearUserData() {
        this.storageService.clearAll();
        this.userName = '';
        this.userId='';
    }

    handleUnauthorized() {
        this.clearUserData();
        this.router.navigate(['/unauthorized']);
    }

    signIn() {
        let hostUrl = (process.env.HTTP_PROTOCOL + '://' + process.env.HOST
                        + (process.env.PORT === 80 ? '' : ':' + process.env.PORT));
        let additionalParams = {
            register_uri : hostUrl + '/pre-qual',
            forgot_password_uri: hostUrl + '/accounts/forgot-password'
        };
        this.oidcManager.signinRedirect(additionalParams).then(() => {
        }).catch((err: any) => {
            console.log(err);
        });
    }

    signOut() {
        this.oidcManager.signoutRedirect().then(() => {
            this.clearUserData();
        }).catch((err: any) => {
            console.log(err);
        });
    };

    signinRedirectCallback() {
        this.oidcManager.signinRedirectCallback().then(() => {
            this.oidcManager.getUser()
                .then((user: any) => {
                    if (user) {
                        this.storageService.setObject('userData', user);
                        this.storageService.setItem('renewAfter', new Date().setSeconds(this.getTokenExpiresInSeconds()/2).toString());
                        this.setUserData();
                        this.router.navigate(['/']);
                    }
                });
        });
    };

    // private runExpiryCheck(): void {
    //     const timer = Observable.timer(1000, 10000);

    //     const sub = timer.subscribe(t=> {
    //         const expiresIn = this.getTokenExpiresInSeconds();

    //         if(expiresIn) {
    //             console.log(`Expires in: ${expiresIn}`);
    //             if (expiresIn <= 0) {
    //                 this.clearUserData();
    //                 sub.unsubscribe();
    //                 this.router.navigate(['/unauthorized']);
    //             }
    //         }
    //     });
    // }

    private setUserData() {
        let userData: User = this.storageService.getObject('userData');
        this.userName = userData.profile.name;
        this.userId = userData.profile.sub;
    }
}
