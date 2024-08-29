import { Component } from '@angular/core';

import { Question } from '../question';
import { QuestionService } from '../question.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { User } from '../user';
import { AnswerService } from '../answer.service';
import { Answer } from '../answer';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class questionComponent implements OnInit{

  public questions: Question[] = [];
  public editQuestion: Question = new Question();
  public deleteQuestion: Question = new Question();
  public addQuestion: Question = new Question();
  public viewQuestion: Question = new Question();
  public display: String = "none";
  public display2: String = "none";
  public display3: String = "none";
  public display4: String = "none";
  public display5: String = "none";
  public loggedUser: User = new User();

  public selectedQuestionId: number = 0;

  //public userIdToFind: number = 0;
  //getLoggedUser();

  public answers: Answer[] = [];
  public editAnswer: Answer = new Answer();
  public deleteAnswer: Answer = new Answer();
  public addAnswer: Answer = new Answer();
  public viewAnswer: Answer = new Answer();
  public ansQuestion: Question = new Question();

  public selectedAnswerId: number = 0;

  constructor(private questionService: QuestionService, private answerService: AnswerService, private localStorage: LocalStorage){

     this.getLoggedUser();

  }

  getLoggedUser() {
      this.localStorage.getItem<any>('LoggedUser').subscribe((data: any) => {
        console.log('Retrieved user from local storage:', data);
        this.loggedUser = data as User;
        //this.loggedUser.role='USER';
        console.log('Logged user:', this.loggedUser);
        //this.userIdToFind = this.loggedUser.id;
      });

  }

  ngOnInit() {
    this.getQuestions();
    this.getAnswers();
  }

  public getQuestions(): void {
    this.questionService.getQuestions().subscribe(
      (response: Question[]) => {
        this.questions = response;
        console.log(this.questions);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onAddQuestion(addForm: NgForm): void {
    //this.getLoggedUser();
    //this.addQuestion.user = this.loggedUser;
    const container = document.getElementById('add-question-form');
     if(container != null)
          {container.click();}
    this.questionService.addQuestion(addForm.value).subscribe(
      (response: Question) => {
        console.log(response);
        this.getQuestions();
        //addForm.reset();
        this.onCloseHandled();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        //addForm.reset();
      }
    );
  }


  public onUpdateQuestion(question: Question): void {
    this.questionService.updateQuestion(question).subscribe(
      (response: Question) => {
        console.log(response);
        this.getQuestions();
        this.onCloseHandled2();
       // console.log("update se acceseaza");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteQuestion(questionId: number): void {
    this.questionService.deleteQuestion(questionId).subscribe(
      (response: void) => {
        console.log(response);
        this.getQuestions();
        this.onCloseHandled3();
        //console.log("delete se acceseaza");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchQuestions(key: string): void {
    console.log(key);
    const results: Question[] = [];
    for (const question of this.questions) {
      if (question.title.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(question);
      }
    }
    this.questions = results;
    if (results.length === 0 || !key) {
      this.getQuestions();
    }
  }

  public onOpenModal(question: Question, mode: string): void {
    /*const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');*/
    if (mode === 'add') {
      //this.display = "block";
      //button.setAttribute('data-bs-target', '#addQuestionModal');
      this.display = "block";
    }
    if (mode === 'edit') {
      this.editQuestion = question;
      //button.setAttribute('data-bs-target', '#updateQuestionModal');
      this.display2 = "block";
    }
    if (mode === 'delete') {
      this.deleteQuestion = question;
      //button.setAttribute('data-bs-target', '#deleteQuestionModal');
      this.display3 = "block";
    }
    if (mode === 'all') {
      this.viewQuestion = question;
      this.display4 = "block";
    }
    //if(container != null)
      //{container.appendChild(button);
      //}
    //button.click();
     //this.display = "block";

  }

  public onOpenModal2(answer: Answer, question: Question, mode: string): void {

    if (mode === 'addA') {
        this.ansQuestion = question;
        console.log("this.ansQuestion: ", this.ansQuestion);
        this.display5 = "block";
    }

  }
  onCloseHandled() {
      this.display = "none";

    }

   onCloseHandled2() {
      this.display2 = "none";

   }

   onCloseHandled3() {
      this.display3 = "none";

   }

   onCloseHandled4() {
      this.display4 = "none";

   }

   onCloseHandled5() {
     this.display5 = "none";

   }

 public getAnswers(): void {
     this.answerService.getAnswers().subscribe(
       (response: Answer[]) => {
         this.answers = response;
         console.log(this.answers);
       },
       (error: HttpErrorResponse) => {
         alert(error.message);
       }
     );
   }

 getAnswersForQuestion(questionId: number) {

     return this.answers.filter(answer => answer.question.id === questionId);
   }


   public onAddAnswer(addForm2: NgForm): void {
     //this.getLoggedUser();
     //this.addAnswer.user = this.loggedUser;
     const container = document.getElementById('add-answer-form');
      if(container != null)
           {container.click();}
     this.answerService.addAnswer(addForm2.value).subscribe(
       (response: Answer) => {
         console.log(response);
         this.getAnswers();
         addForm2.reset();
         this.onCloseHandled();
       },
       (error: HttpErrorResponse) => {
         alert(error.message);
         addForm2.reset();
       }
     );
   }


   public onUpdateAnswer(answer: Answer): void {
     this.answerService.updateAnswer(answer).subscribe(
       (response: Answer) => {
         console.log(response);
         this.getAnswers();
         this.onCloseHandled2();
        // console.log("update se acceseaza");
       },
       (error: HttpErrorResponse) => {
         alert(error.message);
       }
     );
   }

   public onDeleteAnswer(answerId: number): void {
     this.answerService.deleteAnswer(answerId).subscribe(
       (response: void) => {
         console.log(response);
         this.getAnswers();
         this.onCloseHandled3();
         //console.log("delete se acceseaza");
       },
       (error: HttpErrorResponse) => {
         alert(error.message);
       }
     );
   }

   public searchAnswers(key: string): void {
     console.log(key);
     const results: Answer[] = [];
     for (const answer of this.answers) {
       if (answer.content.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
         results.push(answer);
       }
     }
     this.answers = results;
     if (results.length === 0 || !key) {
       this.getAnswers();
     }
   }

}
