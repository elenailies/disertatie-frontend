import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from './trip.model';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl = 'http://localhost:8080/api/trips'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl);
  }

  getTrip(id: number): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiUrl}/${id}`);
  }

  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.apiUrl, trip);
  }

  updateTrip(id: number, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.apiUrl}/${id}`, trip);
  }

  deleteTrip(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
