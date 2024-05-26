import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent{

      public users: User[] = [];
      public editUser: User = new User();
      public deleteUser: User = new User();
      public addUser: User = new User();
      public display: String = "none";
      public display2: String = "none";
      public display3: String = "none";
      public loggedUser: User = new User();

      constructor(private userService: UserService, private localStorage: LocalStorage){

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
        this.getUsers();
      }

      public getUsers(): void {
        this.userService.getUsers().subscribe(
          (response: User[]) => {
            this.users = response;
            console.log(this.users);
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }

      public onAddUser(addForm: NgForm): void {
        const container = document.getElementById('add-user-form');
         if(container != null)
              {container.click();}
        this.userService.addUser(addForm.value).subscribe(
          (response: User) => {
            console.log(response);
            this.getUsers();
            addForm.reset();
            this.onCloseHandled();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
            addForm.reset();
          }
        );
      }

      public onUpdateUser(user: User): void {
        this.userService.updateUser(user).subscribe(
          (response: User) => {
            console.log(response);
            this.getUsers();
            this.onCloseHandled2();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }

      public onDeleteUser(userId: number): void {
        this.userService.deleteUser(userId).subscribe(
          (response: void) => {
            console.log(response);
            this.getUsers();
            this.onCloseHandled3();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }

      public searchUsers(key: string): void {
        console.log(key);
        const results: User[] = [];
        for (const user of this.users) {
          if (user.username.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
            results.push(user);
          }
        }
        this.users = results;
        if (results.length === 0 || !key) {
          this.getUsers();
        }
      }

      public onOpenModal(user: User, mode: string): void {

        if (mode === 'add') {
          this.display = "block";
        }
        if (mode === 'edit') {
          this.editUser = user;
          this.display2 = "block";
        }
        if (mode === 'delete') {
          this.deleteUser = user;
          this.display3 = "block";
        }

      }

       onCloseHandled() {
          this.display = "none";

        }

       onCloseHandled2() {
          this.display2 = "none";

       }

       onCloseHandled3() {
          this.display3 = "none";

       }

}

