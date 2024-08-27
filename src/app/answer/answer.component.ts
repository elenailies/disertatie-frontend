import { Component, OnInit, Input } from '@angular/core';
import { AnswerService } from '../answer.service';
import { Answer } from '../answer';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class answerComponent implements OnInit {
  answers: Answer[] = [];
  newAnswer: Answer = new Answer();
  @Input() questionId: number = 0;

  constructor(
    private answerService: AnswerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.questionId = id;
      //this.loadAnswers(id);
    });
  }

  /*loadAnswers(questionId: number): void {
    this.answerService.getAnswersByQuestionId(questionId).subscribe((answers: Answer[]) => {
      this.answers = answers;
    });
  }

  addAnswer(): void {
    this.newAnswer.question.id = this.questionId;
    this.answerService.addAnswer(this.newAnswer).subscribe(() => {
      this.loadAnswers(this.questionId);
      this.newAnswer = new Answer(); // Reset the new answer
    });
  }

  deleteAnswer(id: number): void {
    this.answerService.deleteAnswer(id).subscribe(() => {
      this.loadAnswers(this.questionId);
    });
  }*/
}
