import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './question';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class QuestionService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiServerUrl}/question/all`);
  }

  public addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.apiServerUrl}/question/add`, question);
  }

  public updateQuestion(question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.apiServerUrl}/question/update`, question);
  }

  public deleteQuestion(questionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/question/delete/${questionId}`);
  }
}
