import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { QuestionsService } from '../questions.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updatequestion',
  templateUrl: './updatequestion.component.html',
  styleUrls: ['./updatequestion.component.css']
})
export class UpdatequestionComponent implements OnInit {

  updateQuestionFormGroup!: FormGroup;
  question_id!:any 
 
  constructor(private _questionService:QuestionsService ,
     private _activateRoute:ActivatedRoute , private _route:Router){
     this.updateQuestionFormGroup=new FormGroup({
      questionText: new FormControl('')
     })
  }

ngOnInit(): void {

  this.question_id=this._activateRoute.snapshot.paramMap.get("questionId");

   this._questionService.getOneQuestion(this.question_id).subscribe(
  
        (data)=>{
         this.setquestion(data.questionText?.toString(),data._id);
      
      }
   )
   
}
  


setquestion(newValueToPatch:any ,questionId:any){
  this.updateQuestionFormGroup.patchValue({
    questionText:newValueToPatch
  })
}

sendData() {
         this._questionService.updateOneQuestion(this.question_id ,this.updateQuestionFormGroup.value).subscribe(
          (data)=>{
            this._route.navigate(["/questions"]);
          }
          
         )
    }

}
