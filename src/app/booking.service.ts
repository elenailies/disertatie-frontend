import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from './booking';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class BookingService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiServerUrl}/booking/all`);
  }

  public addBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiServerUrl}/booking/add`, booking);
  }

  public updateBooking(booking: Booking): Observable<Booking> {
    return this.http.put<Booking>(`${this.apiServerUrl}/booking/update`, booking);
  }

  public deleteBooking(bookingId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/booking/delete/${bookingId}`);
  }
}
