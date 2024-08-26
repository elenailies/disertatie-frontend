import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { Question } from '../question';
import { Router } from '@angular/router';
import { User } from '../user';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class questionComponent implements OnInit {
  questions: Question[] = [];
  selectedQuestion: Question = new Question();
  loggedUser: User = new User();

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private localStorage: LocalStorage
  ) {
  this.getLoggedUser();}

  ngOnInit(): void {
    //this.getLoggedUser();
    this.loadQuestions();
  }

  getLoggedUser(): void {
    this.localStorage.getItem<any>('LoggedUser').subscribe((data: any) => {
      this.loggedUser = data as User;
      console.log('Logged user:', this.loggedUser);
    });
  }

  loadQuestions(): void {
    this.questionService.getQuestions().subscribe((questions: Question[]) => {
      this.questions = questions;
    });
  }

  viewQuestion(id: number): void {
    this.router.navigate(['/question', id]);
  }

  deleteQuestion(id: number): void {
    this.questionService.deleteQuestion(id).subscribe(() => {
      this.loadQuestions();
    });
  }

  addQuestion(): void {
    if (this.loggedUser && this.loggedUser.id) {
      this.selectedQuestion.user.id = this.loggedUser.id;
      this.questionService.addQuestion(this.selectedQuestion).subscribe(() => {
        this.loadQuestions();
        this.selectedQuestion = new Question();
      });
    } else {
      console.error('No user logged in.');
    }
  }
}
