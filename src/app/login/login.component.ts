import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { TokenService } from '../token.service';
import { Token } from '../token';
import { v4 as uuidv4 } from 'uuid';

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

   public tokens: Token[] = [];
   public tokensUser: Token[] = [];

   constructor(private userService: UserService, private tokenService: TokenService, private router: Router, private localStorage: LocalStorage) {

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
       this.getTokens();
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
/*
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
       //this.errorMessage = 'Invalid email or password. Please try again.';
       console.log('Invalid email or password. Please try again.');
     }*/
    const matchingUser = this.existingUsers.find(
         (existingUser) =>
           existingUser.email === this.user.email && existingUser.password === this.user.password
       );

       if (matchingUser) {
         this.currentUser = matchingUser;
         this.currentUser.role = 'USER';

         this.tokensUser = this.getTokensForUser(this.currentUser.id);
         //this.tokensUser.enabled = 0;
         //this.tokensUser.foreach(token => token.enabled = 0);
         for (var t of this.tokensUser){
           t.enabled = false;
            this.tokenService.updateToken(t).subscribe(
                           () => {
                               console.log('Token updated successfully');
                               this.getTokens();
                           },
                           (error: HttpErrorResponse) => {
                               alert('Failed to update token: ' + error.message);
                           }
                       );
           }

         // Create a new token
         const token = new Token();
         token.tokenValue = uuidv4(); // Generate a unique token value
         token.expiryDate = new Date();
         //token.expiryDate.setDate(token.expiryDate.getDate() + 7); // Set expiry date to 1 week from now
         //token.expiryDate.setMinutes(token.expiryDate.getMinutes() + 5); // Add 5 minutes to the current time
         token.expiryDate.setHours(token.expiryDate.getHours() + 3); // Add 3 hours
         token.expiryDate.setMinutes(token.expiryDate.getMinutes() + 5); // Add 5 minutes

         token.user = this.currentUser;

         // Save the token
         this.tokenService.addToken(token).subscribe(
           (savedToken: Token) => {
             console.log('Token saved successfully:', savedToken);

             // Save user in local storage
             this.localStorage.setItem('LoggedUser', this.currentUser).subscribe(() => {
               console.log('User saved in local storage');
             });

             // Navigate to home
             if (this.router) {
               this.router.navigate(['/home']);
             }
           },
           (error) => {
             console.error('Failed to save token:', error);
           }
         );

         console.log('User logged in successfully:', this.currentUser);

       } else {
         this.errorMessage = 'Invalid email or password. Please try again.';
         console.log('Invalid email or password. Please try again.');
       }

   }

   public getTokens(): void {
              this.tokenService.getTokens().subscribe(
                (response: Token[]) => {
                  this.tokens = response;
                  console.log(this.tokens);
                },
                (error: HttpErrorResponse) => {
                  alert(error.message);
                }
              )
   }

 getTokensForUser(userId: number) {

         return this.tokens.filter(token => token.user.id === userId);
       }

}
