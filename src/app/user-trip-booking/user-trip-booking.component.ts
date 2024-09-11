//import { Component, OnInit } from '@angular/core';
import { Component } from '@angular/core';

import { TripService } from '../trip.service';
import { Trip } from '../trip';
import { BookingService } from '../booking.service';
import { User } from '../user';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-user-trip-booking',
  templateUrl: './user-trip-booking.component.html',
  styleUrls: ['./user-trip-booking.component.css']
})
export class userTripBookingComponent implements OnInit {

 /* trips: Trip[] = [];
  loggedUser: User = new User(); // This would typically be fetched from an auth service
  //public loggedUser: User = new User();
  public userIdToFind: number = 0;

  constructor(private tripService: TripService, private bookingService: BookingService, private localStorage: LocalStorage) {
    // Simulating logged in user
    //this.loggedUser.id = 1; // Replace with actual user data from authentication
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

    }*/


  ngOnInit(): void {
    //this.loadAvailableTrips();
  }
/*
  loadAvailableTrips(): void {
    this.tripService.getTrips().subscribe(
      (trips) => {
        this.trips = trips;
      },
      (error) => {
        console.error('Error fetching trips:', error);
      }
    );
  }*/

}

