/**
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit
} from '@angular/core';
import { SecurityService } from '../security';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app-header',
  template: `
      <span *ngIf="userName">
        <h1 x-large class="sample-content">
            Welcome {{ userName }}. 
            <a href="#" (click)="logout()">Click here</a> 
            to logout
        </h1>
      </span>
  `
})
export class HeaderComponent implements OnInit {
  public userName: string;

  constructor(
    private securityService: SecurityService
  ) {}

  public ngOnInit() {
    this.userName = this.securityService.getUserName();
  }

  public logout() {
    this.securityService.signOut();
  }
}
