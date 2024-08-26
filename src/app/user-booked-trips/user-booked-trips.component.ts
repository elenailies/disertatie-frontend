import { Component, OnInit } from '@angular/core';
import { UserTripDetailsService } from '../userTripDetails.service';
import { UserTripDetails } from '../userTripDetails';
import { User } from '../user';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Trip } from '../trip';

@Component({
  selector: 'app-user-booked-trips',
  templateUrl: './user-booked-trips.component.html',
  styleUrls: ['./user-booked-trips.component.css']
})
export class userBookedTripsComponent implements OnInit {

  userTripDetails: UserTripDetails[] = [];
  loggedUser: User = new User(); // This would typically be fetched from an auth service
  public userIdToFind: number = 0;

  constructor(private userTripDetailsService: UserTripDetailsService, private localStorage: LocalStorage) {
    this.getLoggedUserAndLoadTrips();
  }

  // Method to fetch logged user and then load trips
  getLoggedUserAndLoadTrips(): void {
    this.localStorage.getItem<any>('LoggedUser').subscribe((data: any) => {
      console.log('Retrieved user from local storage:', data);
      this.loggedUser = data as User;
      console.log('Logged user:', this.loggedUser);
      this.userIdToFind = this.loggedUser.id;

      // Once logged user is retrieved, call getUserTripDetails
      this.getUserTripDetails();
    });
  }

  ngOnInit(): void {
    // The trips will be loaded once the user is fetched in the constructor
  }

  public getUserTripDetails(): void {
    this.userTripDetailsService.getUserTripDetails().subscribe(
      (response: UserTripDetails[]) => {
        // Filter trips based on the logged user's ID
        this.userTripDetails = response.filter(x => x.user.id === this.userIdToFind);
        console.log(this.userTripDetails);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
