import { Component, OnInit } from '@angular/core';
import { Question, QuestionsService } from '../questions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  
  // Component configuration
    animations: [
      trigger('toastAnimation', [
        transition(':enter', [
          style({ opacity: 0, transform: 'translateY(100%)' }),
          animate('300ms', style({ opacity: 1, transform: 'translateY(0)' }))
        ]),
        transition(':leave', [
          animate('300ms', style({ opacity: 0, transform: 'translateY(100%)' }))
        ])
      ])
    ]
  
})
export class QuestionsComponent implements OnInit {

  page!: any;
  count!: any;
  countItem!:any;
 

  constructor(private _questionService: QuestionsService,
    private route: Router, private activatedRoute: ActivatedRoute,
    private _toaster : ToastrService) { }
  questions !: Question[];




  ngOnInit(): void {

    this.count = "5"
    if (this.activatedRoute.snapshot.queryParamMap.get('page')) {
      this.page = this.activatedRoute.snapshot.queryParamMap.get('page');
    }
    else {
      this.page = "1";
    }

    this._questionService.getQuestions(this.page, this.count).subscribe(
      (data) => {
        this.questions = data.message;
        this.countItem= Math.ceil(data.count/this.count)  ;
      }
    )


  }

  nextPage() {
    const currentPage = parseInt(this.page);
    this.page = currentPage + 1;

    this.route.navigate(['/questions'], { queryParams: { page: this.page } }).
      then(() => {
        window.location.reload();
      });
  }

  previousPage() {
    const currentPage = parseInt(this.page);
    this.page = currentPage - 1;

    this.route.navigate(['/questions'], { queryParams: { page: this.page } }).
      then(() => {
        window.location.reload();
      });
  }

  delete(questionId: String) {
    this._questionService.DeleteOneQuestion(questionId).subscribe(
      (data) => {
        //this._toaster.success('Task completed successfully!', 'Success');
        this.questions = this.questions.filter(question => question._id !== questionId)
      }
    )

  }
}