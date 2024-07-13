import { Component, OnInit } from '@angular/core';
import { AnswersService, answer } from '../answers.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {

  answers!:answer[];
  questionId:any ;
  constructor(private _answerService : AnswersService , private _route:ActivatedRoute){

  }
  ngOnInit(): void {
    this.questionId=this._route.snapshot.paramMap.get("questionId");
    this._answerService.getAllAnswers(this.questionId).subscribe(
        (data)=>{
            this.answers=data;
        }
    )
  }

  delete(questionId:any, answerId:any) {
    
    this._answerService.deleteAnswer(questionId,answerId).subscribe(
      (data)=>{
          this.answers = this.answers.filter(answer=>answer._id!==answerId);
      }
    )
  }



}
