import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

   public user: User = new User();
   public errorMessage: string = '';
   public existingUsers: User[] = [];
   public loggedUser: User = new User();

   public currentUser: User = new User();

   constructor(private userService: UserService, private router: Router, private localStorage: LocalStorage) {

     this.getLoggedUser();

   }

  getLoggedUser() {
      this.localStorage.getItem<any>('LoggedUser').subscribe((data: any) => {
        console.log('Retrieved user from local storage:', data);
        this.loggedUser = data as User;
        //this.loggedUser.role='USER';
        console.log('Logged user:', this.loggedUser);
      });

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

   onLogin() {

     const matchingUser = this.existingUsers.find(
       (existingUser) =>
         existingUser.email === this.user.email && existingUser.password === this.user.password
     );

     if (matchingUser) {
       this.currentUser = matchingUser;

       this.currentUser.role = 'USER';

       this.localStorage.setItem('LoggedUser', this.currentUser).subscribe(() => {
             console.log('User saved in local storage');

             this.localStorage.getItem<User>('LoggedUser').subscribe((data) => {
               console.log('Retrieved user from local storage:', data);
             });
           });


       console.log('User logged in successfully:', this.currentUser);


       if (this.router) {
         this.router.navigate(['/home']);
       }

     } else {
       //this.errorMessage = 'Invalid username or password. Please try again.';
       console.log('Invalid username or password. Please try again.');
     }
   }


}
