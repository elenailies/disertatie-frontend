import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from './trip';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class TripService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getTripById(tripId: number): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiServerUrl}/trip/${tripId}`);
  }

  public getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiServerUrl}/trip/all`);
  }

  public addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(`${this.apiServerUrl}/trip/add`, trip);
  }

  public updateTrip(trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.apiServerUrl}/trip/update`, trip);
  }

  public deleteTrip(tripId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/trip/delete/${tripId}`);
  }
}
