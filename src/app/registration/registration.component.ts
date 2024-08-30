import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import * as CryptoJS from 'crypto-js'; // Import CryptoJS for hashing

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  public user: User = new User();
  public currentUser: User = new User();
  public loggedUser: User = new User();

  constructor(private userService: UserService, private router: Router, private localStorage: LocalStorage) {
    this.getLoggedUser();
  }

  getLoggedUser() {
    this.localStorage.getItem<any>('LoggedUser').subscribe((data: any) => {
      console.log('Retrieved user from local storage:', data);
      this.loggedUser = data as User;
      console.log('Logged user:', this.loggedUser);
    });
  }

  hashPassword(password: string): string {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  }

  onRegister() {
    this.user.password = this.hashPassword(this.user.password);

    this.userService.addUser(this.user).subscribe(
      (response: User) => {
        this.currentUser = response;
        console.log('User registered successfully:', response);

        this.currentUser.role = 'USER';

        if (this.router) {
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        console.error('Registration failed:', error);
      }
    );
  }
}
