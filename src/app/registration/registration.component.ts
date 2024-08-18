import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

   public user: User = new User();
   public currentUser: User = new User();
   public loggedUser: User = new User();

   //public shopOrderId: number = 0;

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

    /*onRegister() {
      this.userService.addUser(this.user).subscribe(
        (response: User) => {

         this.currentUser = this.user;

          console.log('User registered successfully:', response);

          //this.user.role='USER';

          if (this.router) {
                           this.router.navigate(['/home']);
                         }

          // You can add a success message or navigate to a different page.
        },
        (error) => {
          console.error('Registration failed:', error);
          // Handle registration failure (e.g., display an error message).
        }

      );


      this.shopOrderId = this.shopOrderId + 1;

           const shopOrder: ShopOrder = {
                       id: this.shopOrderId,
                       address: '',
                       user: this.currentUser,
                     };

                     // Call a method to add the orderProduct to the database
                     this.shopOrderService.addShopOrder(shopOrder);

                     console.log("Initial empty order was added for registered user: ", shopOrder);


    }*/

    onRegister() {
      this.userService.addUser(this.user).subscribe(
        (response: User) => {

          this.currentUser = response;

          console.log('User registered successfully:', response);

          this.currentUser.role='USER';
          //this.currentUser.role='';

          if (this.router) {
            this.router.navigate(['/login']);
          }


         /* const shopOrder: ShopOrder = {
            id: 0,
            address: '',
            user: this.currentUser,
          };*/


          /*this.shopOrderService.addShopOrder(shopOrder).subscribe(
            (orderResponse: ShopOrder) => {
              console.log('Initial empty order was added for registered user:', orderResponse);
            },
            (orderError) => {
              console.error('Error adding initial empty order:', orderError);

            }
          );*/
        },
        (error) => {
          console.error('Registration failed:', error);
          // Handle registration failure (e.g., display an error message).
        }
      );
    }

}
