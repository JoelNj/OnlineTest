import { Component, OnInit } from '@angular/core';
import { Question, QuestionsService } from '../questions.service';
import { CheckquestionvalidityPipe } from '../checkquestionvalidity.pipe';

@Component({
  selector: 'app-usersummary',
  templateUrl: './usersummary.component.html',
  styleUrls: ['./usersummary.component.css']
})
export class UsersummaryComponent implements OnInit {

  questions!: Question[];
  message!: string

  constructor(private _questionService: QuestionsService) { }

  ngOnInit(): void {
    this._questionService.getQuestionsWithoutPagination().subscribe(
      (data) => {

        this.questions = data.message;
        console.log(this.questions)

      }
    )
  }







}
