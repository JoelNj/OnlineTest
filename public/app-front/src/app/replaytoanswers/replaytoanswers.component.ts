import { Component, OnInit, ɵIS_HYDRATION_DOM_REUSE_ENABLED } from '@angular/core';
import { Question, QuestionsService } from '../questions.service';
import { CheckboxControlValueAccessor, CheckboxRequiredValidator, FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-replaytoanswers',
  templateUrl: './replaytoanswers.component.html',
  styleUrls: ['./replaytoanswers.component.css']
})
export class ReplaytoanswersComponent implements OnInit {

  formresponsetoquestion!: FormGroup;
  questions !: Question[];
  page!: any;
  count!: any;
  countQuestion!: Number;
  questionId!:String;


  constructor(private _questionService: QuestionsService,
    private cookieService: CookieService,
    private activatedRoute: ActivatedRoute,
    private route: Router) {

  }
  ngOnInit(): void {


    this.formresponsetoquestion = new FormGroup({
      radioUserResponse: new FormControl(''),
      unputQuestion: new FormControl()

    });

    this.count = "1";
    if (this.activatedRoute.snapshot.queryParamMap.get('page')) {
      this.page = this.activatedRoute.snapshot.queryParamMap.get('page');
    }
    else {
      this.page = "1";
    }
    this._questionService.getQuestions(this.page, this.count).subscribe(
      (data) => {
        this.questions = data.message;
        this.countQuestion = data.count;
      }
    )


  }

  sendResponseForQuestion() {

    this.cookieService.set('ans' + this.questionId,
      this.formresponsetoquestion.get('radioUserResponse')?.value);

    const currentPage = parseInt(this.page);
    this.page = currentPage + 1;

    if (this.page > this.countQuestion) {
      this.route.navigate(['usersummary']);
    }
    else {
      this.route.navigate(['/replaytoanswers'], { queryParams: { page: this.page } }).
        then(() => {
         window.location.reload();
        });
    }



  }

  getValue(questionId: String) {

    this.questionId=questionId;

  }

}
