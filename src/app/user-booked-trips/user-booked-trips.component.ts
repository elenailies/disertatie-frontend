import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { Booking } from '../booking';
import { User } from '../user';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { TripService } from '../trip.service';
import { Trip } from '../trip';

@Component({
  selector: 'app-user-booked-trips',
  templateUrl: './user-booked-trips.component.html',
  styleUrls: ['./user-booked-trips.component.css']
})
export class userBookedTripsComponent implements OnInit {

  bookings: Booking[] = [];
  loggedUser: User = new User();
  public userIdToFind: number = 0;
  public deleteBooking: Booking = new Booking();
  public displayBookingDelete: String = "none";

  constructor(private bookingService: BookingService, private tripService: TripService, private localStorage: LocalStorage) {
    this.getLoggedUserAndLoadTrips();
  }

  ngOnInit(): void {}

  // Fetch the logged user and load trips
  getLoggedUserAndLoadTrips(): void {
    this.localStorage.getItem<any>('LoggedUser').subscribe((data: any) => {
      if (data) {
        this.loggedUser = data as User;
        this.userIdToFind = this.loggedUser.id;
        this.getUserTripDetails();
      }
    });
  }

  // Fetch the bookings for the logged user
  public getUserTripDetails(): void {
    this.bookingService.getBookings().subscribe(
      (response: Booking[]) => {
        this.bookings = response.filter(x => x.user.id === this.userIdToFind);
      },
      (error: HttpErrorResponse) => {
        alert('Error fetching bookings: ' + error.message);
      }
    );
  }

  public onOpenModal(booking: Booking, mode: string): void {
    if (mode === 'delete') {
      this.deleteBooking = booking;
      this.displayBookingDelete = "block";
    }
  }

  public onCloseHandledBookingDelete() {
    this.displayBookingDelete = "none";
  }

  public onDeleteBooking(bookingId: number): void {
    const trip = this.deleteBooking.trip;
    const nr = this.deleteBooking.nrTickets;
    this.bookingService.deleteBooking(bookingId).subscribe(
      (response: void) => {
        console.log('Booking deleted');
        trip.nrTickets += nr;
        this.tripService.updateTrip(trip).subscribe(
          (updatedTrip: Trip) => {
            console.log('Trip tickets updated successfully:', updatedTrip);
            this.getUserTripDetails();
          },
          (error: HttpErrorResponse) => {
            alert('Error updating trip tickets: ' + error.message);
          }
        );
        this.onCloseHandledBookingDelete();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
