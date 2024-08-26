import { Component } from '@angular/core';

import { Trip } from '../trip';
import { TripService } from '../trip.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { User } from '../user';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit{

  public trips: Trip[] = [];
  public editTrip: Trip = new Trip();
  public deleteTrip: Trip = new Trip();
  public addTrip: Trip = new Trip();
  public display: String = "none";
  public display2: String = "none";
  public display3: String = "none";
  public loggedUser: User = new User();

  public selectedTripId: number = 0;

  //public userIdToFind: number = 0;


  constructor(private tripService: TripService, private localStorage: LocalStorage){

     this.getLoggedUser();

  }

  getLoggedUser() {
      this.localStorage.getItem<any>('LoggedUser').subscribe((data: any) => {
        console.log('Retrieved user from local storage:', data);
        this.loggedUser = data as User;
        //this.loggedUser.role='USER';
        console.log('Logged user:', this.loggedUser);
        //this.userIdToFind = this.loggedUser.id;
      });

  }

  ngOnInit() {
    this.getTrips();
  }

  public getTrips(): void {
    this.tripService.getTrips().subscribe(
      (response: Trip[]) => {
        this.trips = response;
        console.log(this.trips);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onAddTrip(addForm: NgForm): void {
    const container = document.getElementById('add-trip-form');

     if(container != null)
          {container.click();}
    this.tripService.addTrip(addForm.value).subscribe(
      (response: Trip) => {
        console.log(response);
        this.getTrips();
        addForm.reset();
        this.onCloseHandled();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }


  public onUpdateTrip(trip: Trip): void {
    this.tripService.updateTrip(trip).subscribe(
      (response: Trip) => {
        console.log(response);
        this.getTrips();
        this.onCloseHandled2();
       // console.log("update se acceseaza");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteTrip(tripId: number): void {
    this.tripService.deleteTrip(tripId).subscribe(
      (response: void) => {
        console.log(response);
        this.getTrips();
        this.onCloseHandled3();
        //console.log("delete se acceseaza");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchTrips(key: string): void {
    console.log(key);
    const results: Trip[] = [];
    for (const trip of this.trips) {
      if (trip.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(trip);
      }
    }
    this.trips = results;
    if (results.length === 0 || !key) {
      this.getTrips();
    }
  }

  public onOpenModal(trip: Trip, mode: string): void {
    if (mode === 'add') {
      this.display = "block";
    }
    if (mode === 'edit') {
      this.editTrip = trip;
      this.display2 = "block";
    }
    if (mode === 'delete') {
      this.deleteTrip = trip;
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
