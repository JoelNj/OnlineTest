import { Component, OnInit } from '@angular/core';
import { Question, QuestionsService } from '../questions.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnswersService, answer } from '../answers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  question!: Question;
  questionText!: any;
  questionId!: string;
  formAnswer!: FormGroup;
  answers!: answer[];

  constructor(private _questionService: QuestionsService,
    private _answerService: AnswersService, private _route: Router, private _activatedRoute: ActivatedRoute) {

  }
  ngOnInit(): void {

    this.questionId = this._activatedRoute.snapshot.params['questionId'];
    this._questionService.getOneQuestion(this.questionId).subscribe(
      (data) => {
        this.question = data;
        this.questionText = data.questionText
      }
    )

    this.formAnswer = new FormGroup({
      answerText: new FormControl('', Validators.required),
      answerIsValid: new FormControl(''),
    })

    this._answerService.getAllAnswers(this.questionId).subscribe(
      (data) => {
           
      }
    )


  }

  sendData() {
    console.log(this.formAnswer.value );
    this._answerService.addAnswer(this.questionId, this.formAnswer.value as answer).subscribe(
      (data) => {

        //this._route.navigate(["/listanswer",this.questionId]);

         this.cleanData()

      }
    )
  }

  cleanData(){
    this.formAnswer.patchValue({
      answerText:'',
      answerIsValid:''
    })
  }

}
