import { Component } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { User } from '../user';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

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

  Logout(){

     this.localStorage.getItem<any>('LoggedUser').subscribe((data: any) => {
                console.log('Retrieved user from local storage:', data);
                this.loggedUser = data as User;
                this.loggedUser.password='';
                this.loggedUser.email='';
                this.loggedUser.username='';
                this.loggedUser.role='VISITOR';

                this.localStorage.setItem('LoggedUser', this.loggedUser).subscribe(() => {
                                 console.log('Visitor saved in local storage');

                console.log('User is logged out');

              });
                });

  }


}
