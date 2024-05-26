import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from './user';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  /*implements OnInit*/{

  public loggedUser: User = new User();

  //public loggedUser: User;

  constructor(private router: Router, private titleService:Title,  private localStorage: LocalStorage) {

    this.titleService.setTitle("disertatie_frontend");
    this.getLoggedUser();
  }

 title = 'disertatie_frontend';



 /* ngOnInit() {
         this.getLoggedUser();

         console.log('Logged user (outside of localStorage):', this.loggedUser);
       }
*/
   getLoggedUser() {
    this.localStorage.getItem<any>('LoggedUser').subscribe((data: any) => {
      console.log('Retrieved user from local storage:', data);
      this.loggedUser = data as User;
      this.loggedUser.role='USER';
      console.log('Logged user:', this.loggedUser);
    });

    //console.log('Logged user:', this.loggedUser);
  }



}
