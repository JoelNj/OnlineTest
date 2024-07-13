import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {



  base_Url: string = environment.ANSWER_SERVICE;

  constructor(private _http: HttpClient) { }

  public getAllAnswers(questionId: String): Observable<answer[]> {
    return this._http.get<answer[]>(this.base_Url + questionId + "/answers/");
  }

  public addAnswer(questionId: String, answer: answer) {
    return this._http.post<answer>(this.base_Url + questionId + "/answers/", answer);
  }

  public updateAnswer(questionId:String,answerId:String,answer:answer){
    return this._http.put<answer>(this.base_Url + questionId + "/answers/"+answerId,answer);

  }

  public deleteAnswer(questionId:String,answerId:String){
    return this._http.delete<answer>(this.base_Url + questionId + "/answers/"+answerId)
  }


}


export interface answer {
  _id?: String;
  answerText?: String;
  answerIsValid?: Boolean;

}
