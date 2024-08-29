import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { User } from '../user';
import { TokenService } from '../token.service';
import { Token } from '../token';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public loggedUser: User = new User();
  public toLogOut: boolean = true;
  public tokens: Token[] = [];

  constructor(private localStorage: LocalStorage, private tokenService: TokenService) {
    this.getLoggedUser();
  }

  ngOnInit(): void {

  }

  getLoggedUser(): void {
    this.localStorage.getItem<any>('LoggedUser').subscribe((data: any) => {
      if (data) {
        console.log('Retrieved user from local storage:', data);
        this.loggedUser = data as User;
        console.log('Logged user:', this.loggedUser);

        this.getTokens();
      } else {
        console.log('No logged user found in local storage.');
      }
    });
  }

  getTokens(): void {
    this.tokenService.getTokens().subscribe(
      (response: Token[]) => {
        this.tokens = response;
        console.log('All tokens:', this.tokens);

        this.checkTokenValidityForUser();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  checkTokenValidityForUser(): void {
    const currentDate = new Date();

    const userTokens = this.tokens.filter(token => token.user.id === this.loggedUser.id);

    if (userTokens.length > 0) {
      let hasValidToken = false;
      for (let t of userTokens) {
        if (new Date(t.expiryDate) >= currentDate && t.enabled) {
          console.log('Unexpired and enabled Token:', t);
          hasValidToken = true;
          this.toLogOut = false;
          break;
        }
      }
      if (!hasValidToken) {
        this.Logout();
      }
    } else {
      this.Logout();
    }
  }

  Logout(): void {
    this.localStorage.getItem<any>('LoggedUser').subscribe((data: any) => {
      if (data) {
        console.log('Logging out user:', data);
        this.loggedUser = new User();
        this.loggedUser.role = 'VISITOR';

        this.localStorage.setItem('LoggedUser', this.loggedUser).subscribe(() => {
          console.log('User logged out and visitor role saved in local storage');
        });
      }
    });
  }
}
