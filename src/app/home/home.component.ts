import { Component } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { User } from '../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public loggedUser: User = new User();

  constructor( private localStorage: LocalStorage) {

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

}
