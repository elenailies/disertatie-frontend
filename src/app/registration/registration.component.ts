import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
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
export class RegistrationComponent implements OnInit{

  public user: User = new User();
  public existingUsers: User[] = [];
  public currentUser: User = new User();
  public loggedUser: User = new User();
  public errorMessage: string = '';

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

  ngOnInit() {
    this.getExistingUsers();
  }

  getExistingUsers() {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.existingUsers = users;
      },
      (error) => {
        console.error('Failed to retrieve existing users:', error);
      }
    );
  }

  onRegister() {
    const matchingUser = this.existingUsers.find(user => user.email === this.user.email);
    const matchingUser2 = this.existingUsers.find(user => user.username === this.user.username);
    if(!matchingUser && !matchingUser2){
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
    else if(matchingUser)this.errorMessage = 'The email address is already registered. Please use a different email.';
    else if(matchingUser2)this.errorMessage = 'The username is already registered. Please use a different username.';

  }
}
