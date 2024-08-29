import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from './token';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class TokenService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getTokens(): Observable<Token[]> {
    return this.http.get<Token[]>(`${this.apiServerUrl}/token/all`);
  }

  public addToken(token: Token): Observable<Token> {
    return this.http.post<Token>(`${this.apiServerUrl}/token/add`, token);
  }

  public updateToken(token: Token): Observable<Token> {
    return this.http.put<Token>(`${this.apiServerUrl}/token/update`, token);
  }

  public deleteToken(tokenId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/token/delete/${tokenId}`);
  }
}
