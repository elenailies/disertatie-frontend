import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { TokenService } from '../token.service';
import { Token } from '../token';
import { v4 as uuidv4 } from 'uuid';
import * as CryptoJS from 'crypto-js'; // Import CryptoJS for hashing
import { EmailService } from '../email.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User = new User();
  public errorMessage: string = '';
  public existingUsers: User[] = [];
  public loggedUser: User = new User();
  public currentUser: User = new User();
  public tokens: Token[] = [];
  public tokensUser: Token[] = [];
   public display: String = "none";

  emailDetails = { to: 'elenailies09gmail.com', subject: 'Test resetare parola', text: 'Test Test' };
    message: string | null = null;

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router,
    private localStorage: LocalStorage,
    private emailService: EmailService
  ) {
    this.getLoggedUser();
  }

  ngOnInit() {
    this.getExistingUsers();
    this.getTokens();
  }

  getLoggedUser() {
    this.localStorage.getItem<any>('LoggedUser').subscribe((data: any) => {
      console.log('Retrieved user from local storage:', data);
      this.loggedUser = data as User;
      console.log('Logged user:', this.loggedUser);
    });
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

  hashPassword(password: string): string {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  }

  onLogin() {
    // Hash the entered password
    const hashedPassword = this.hashPassword(this.user.password);

    // Check if there's a matching user with the hashed password
    const matchingUser = this.existingUsers.find(
      (existingUser) =>
        existingUser.email === this.user.email && existingUser.password === hashedPassword
    );

    if (matchingUser) {
      this.currentUser = matchingUser;
      this.currentUser.role = 'USER';

      this.tokensUser = this.getTokensForUser(this.currentUser.id);
      for (let t of this.tokensUser) {
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
    );
  }

  getTokensForUser(userId: number) {
    return this.tokens.filter(token => token.user.id === userId);
  }

   /*sendEmail() {
      this.emailService.sendEmail(this.emailDetails).subscribe(
        (response: any) => {
          this.message = response.message;  // Access the message property from the JSON response
        },
        (error: HttpErrorResponse) => {
          console.error('Error occurred:', error);
          this.message = 'Error sending email. Please check console for details.';
        }
      );
    }*/

   generateRandomString(length: number): string {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
        }

  /*sendEmail() {
    const password: string = this.generateRandomString(8);
    console.log(password);
    this.emailDetails = {
      to: 'elenailies09@gmail.com',
      subject: 'Test resetare parola',
      text: password
    };

    this.emailService.sendEmail(this.emailDetails).subscribe(
      (response: any) => {
        this.message = response.message;
        console.log('Email sent successfully:', response);
      },
      (error: HttpErrorResponse) => {
        console.error('Error occurred:', error);
        this.message = 'Error sending email. Please check console for details.';
      }
    );
  }*/

  sendEmail() {
    // Step 1: Check if the email exists in the database
    const matchingUser = this.existingUsers.find(user => user.email === this.user.email);

    if (matchingUser) {
      // Step 2: Generate a random password
      const password: string = this.generateRandomString(8);
      console.log(password);
      console.log(matchingUser);

      // Step 3: Prepare email details
      this.emailDetails = {
        to: 'elenailies09@gmail.com', // Use the matching user's email
        subject: 'Password Reset',
        text: `Your new password is: ${password}` // You might want to store this password securely in your database
      };

      // Step 4: Send the email
      this.emailService.sendEmail(this.emailDetails).subscribe(
            (response: any) => {
              this.message = response.message;
              console.log('Email sent successfully:', response);
            },
            (error: HttpErrorResponse) => {
              console.error('Error occurred:', error);
              this.message = 'Error sending email. Please check console for details.';
            }
      );

      const hashedPassword = this.hashPassword(password);
      matchingUser.password = hashedPassword;
      this.userService.updateUser(matchingUser).subscribe(
        () => {
          console.log('Password updated successfully');
        },
        (error: HttpErrorResponse) => {
          console.error('Error updating password:', error);
        }
      );
    } else {
      // Email does not exist, show an error message
      this.message = 'This email address is not registered.';
      console.error('Email does not exist in the database.');
    }
  }




  public onOpenModal( mode: string): void {
      if (mode === 'add') {
        this.display = "block";
      }
  }

  onCloseHandled() {
        this.display = "none";

      }


}
