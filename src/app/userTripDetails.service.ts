import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserTripDetails } from './userTripDetails';
import { environment } from 'src/environments/environment';
import { Trip } from './trip';

@Injectable({providedIn: 'root'})
export class UserTripDetailsService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // Book a trip for a user
  public bookTrip(userId: number, tripId: number, bookingDate: string): Observable<UserTripDetails> {
    const params = {
      userId: userId.toString(),
      tripId: tripId.toString(),
      bookingDate
    };
    return this.http.post<UserTripDetails>(`${this.apiServerUrl}/bookings/book`, {}, {params});
  }

  public getUserTripDetails(): Observable<UserTripDetails[]> {
      return this.http.get<UserTripDetails[]>(`${this.apiServerUrl}/bookings/all`);
    }

  // Get all users who booked a specific trip
  public getTripUsers(tripId: number): Observable<UserTripDetails[]> {
    return this.http.get<UserTripDetails[]>(`${this.apiServerUrl}/bookings/trip/${tripId}`);
  }

  // Cancel a specific booking by bookingId
  public cancelBooking(bookingId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/bookings/cancel/${bookingId}`);
  }
}

