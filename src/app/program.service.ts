import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Program } from './program';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class ProgramService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getPrograms(): Observable<Program[]> {
    return this.http.get<Program[]>(`${this.apiServerUrl}/program/all`);
  }

  public addProgram(program: Program): Observable<Program> {
    return this.http.post<Program>(`${this.apiServerUrl}/program/add`, program);
  }

  public updateProgram(program: Program): Observable<Program> {
    return this.http.put<Program>(`${this.apiServerUrl}/program/update`, program);
  }

  public deleteProgram(programId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/program/delete/${programId}`);
  }
}
