import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
 private apiServerUrl = environment.apiBaseUrl;
 //`${this.apiServerUrl}/destination/all`
  private apiUrl = `${this.apiServerUrl}/email/send`;

  constructor(private http: HttpClient) { }

  sendEmail(emailDetails: { to: string, subject: string, text: string }): Observable<any> {
    return this.http.post(this.apiUrl, emailDetails);
  }
}
