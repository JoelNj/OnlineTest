import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Question, QuestionsService } from '../questions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})
export class AddquestionComponent {


  addQuestionFormGroup !: FormGroup;

  constructor(private _questionService: QuestionsService, private _router: Router) { }

  ngOnInit(): void {
    this.addQuestionFormGroup = new FormGroup({
      questionText: new FormControl('', [Validators.required]),
      questionDate: new FormControl('', [Validators.required])
    })

  }

  sendData() {
    this._questionService.addOneQuestion(this.addQuestionFormGroup.value as Question).subscribe(

      (data) => {
        this._router.navigate(['/questions']);
      }
    );
  }

}
