import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from './review';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class ReviewService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiServerUrl}/review/all`);
  }

  public addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.apiServerUrl}/review/add`, review);
  }

  public updateReview(review: Review): Observable<Review> {
    return this.http.put<Review>(`${this.apiServerUrl}/review/update`, review);
  }

  public deleteReview(reviewId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/review/delete/${reviewId}`);
  }
}
