import { Component } from '@angular/core';

import { Destination } from '../destination';
import { Category } from '../category';
import { DestinationService } from '../destination.service';
import { CategoryService } from '../category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { User } from '../user';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit{

  public destinations: Destination[] = [];
  public editDestination: Destination = new Destination();
  public deleteDestination: Destination = new Destination();
  public addDestination: Destination = new Destination();
  public display: String = "none";
  public display2: String = "none";
  public display3: String = "none";
  public loggedUser: User = new User();

  public selectedCategoryId: number = 0;
  public categories: Category[] = [];


  public userIdToFind: number = 0;


  constructor(private destinationService: DestinationService, private categoryService: CategoryService, private localStorage: LocalStorage){

     this.getLoggedUser();

  }

  getLoggedUser() {
      this.localStorage.getItem<any>('LoggedUser').subscribe((data: any) => {
        console.log('Retrieved user from local storage:', data);
        this.loggedUser = data as User;
        //this.loggedUser.role='USER';
        console.log('Logged user:', this.loggedUser);
        this.userIdToFind = this.loggedUser.id;
      });

  }

  ngOnInit() {
    this.getDestinations();
    this.getCategories();
  }

  public getDestinations(): void {
    this.destinationService.getDestinations().subscribe(
      (response: Destination[]) => {
        this.destinations = response;
        console.log(this.destinations);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getCategories(): void {
      this.categoryService.getCategories().subscribe(
        (response: Category[]) => {
          this.categories = response;
          console.log(this.categories);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }


  public onAddDestination(addForm: NgForm): void {
    const container = document.getElementById('add-destination-form');

     if(container != null)
          {container.click();}
    this.destinationService.addDestination(addForm.value).subscribe(
      (response: Destination) => {
        console.log(response);
        this.getDestinations();
        addForm.reset();
        this.onCloseHandled();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }


  public onUpdateDestination(destination: Destination): void {
    this.destinationService.updateDestination(destination).subscribe(
      (response: Destination) => {
        console.log(response);
        this.getDestinations();
        this.onCloseHandled2();
       // console.log("update se acceseaza");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteDestination(destinationId: number): void {
    this.destinationService.deleteDestination(destinationId).subscribe(
      (response: void) => {
        console.log(response);
        this.getDestinations();
        this.onCloseHandled3();
        //console.log("delete se acceseaza");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchDestinations(key: string): void {
    console.log(key);
    const results: Destination[] = [];
    for (const destination of this.destinations) {
      if (destination.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(destination);
      }
    }
    this.destinations = results;
    if (results.length === 0 || !key) {
      this.getDestinations();
    }
  }

  public onOpenModal(destination: Destination, mode: string): void {

    if (mode === 'add') {
      //this.display = "block";
      //button.setAttribute('data-bs-target', '#addDestinationModal');
      this.display = "block";
    }
    if (mode === 'edit') {
      this.editDestination = destination;
      //button.setAttribute('data-bs-target', '#updateDestinationModal');
      this.display2 = "block";
    }
    if (mode === 'delete') {
      this.deleteDestination = destination;
      //button.setAttribute('data-bs-target', '#deleteDestinationModal');
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
