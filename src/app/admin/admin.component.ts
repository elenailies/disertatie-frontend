import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { LocalStorage } from '@ngx-pwa/local-storage';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public users: User[] = [];
  public editUser: User = new User();
  public deleteUser: User = new User();
  public addUser: User = new User();
  public display: String = "none";
  public display2: String = "none";
  public display3: String = "none";
  public loggedUser: User = new User();

  constructor(private userService: UserService, private localStorage: LocalStorage) {
    this.getLoggedUser();
  }

  ngOnInit() {
    this.getUsers();
  }

  getLoggedUser() {
    this.localStorage.getItem<any>('LoggedUser').subscribe((data: any) => {
      console.log('Retrieved user from local storage:', data);
      this.loggedUser = data as User;
      console.log('Logged user:', this.loggedUser);
    });
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
    const userToAdd = addForm.value;
    userToAdd.password = CryptoJS.SHA256(userToAdd.password).toString(CryptoJS.enc.Hex);

    this.userService.addUser(userToAdd).subscribe(
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
     console.log('first:',user);
    if (user.password) {
      user.password = CryptoJS.SHA256(user.password).toString(CryptoJS.enc.Hex);
    }

    this.userService.updateUser(user).subscribe(
      (response: User) => {
        console.log('second:',response);
        this.getUsers();
        this.onCloseHandled2();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onChangePassword(passwordForm: NgForm): void {
    const currentPassword = passwordForm.value.currentPassword;
    const newPassword = passwordForm.value.newPassword;
    const confirmPassword = passwordForm.value.confirmPassword;

    // Hash the current password for comparison
    const hashedCurrentPassword = CryptoJS.SHA256(currentPassword).toString(CryptoJS.enc.Hex);

    console.log('Hashed current password:', hashedCurrentPassword);
    console.log('Stored hashed password:', CryptoJS.SHA256(this.loggedUser.password).toString(CryptoJS.enc.Hex));

    // Check if the current password matches
    if (hashedCurrentPassword !== this.loggedUser.password) {
      alert('Current password is incorrect.');
      return;
    }

    // Check if new password and confirmation match
    if (newPassword !== confirmPassword) {
      alert('New password and confirmation do not match!');
      return;
    }

    // Hash the new password
    this.loggedUser.password = CryptoJS.SHA256(newPassword).toString(CryptoJS.enc.Hex);

    // Update the loggedUser's password
    this.userService.updateUser(this.loggedUser).subscribe(
      (response: User) => {
        // Update user in localStorage after successful API call
        this.localStorage.setItem('LoggedUser', response).subscribe(() => {
          alert('Password changed successfully');
          passwordForm.reset();
        });
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
