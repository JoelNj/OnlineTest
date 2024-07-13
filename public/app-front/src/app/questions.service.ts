import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { answer } from './answers.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  base_Url: string =environment.QUESTION_SERVICE;

  constructor(private _http: HttpClient) { }

  public getQuestions(page?: any, count?: any): Observable<{ "message": Question[], "count": number }> {

    return this._http.get<{ "message": Question[], "count": number }>(this.base_Url + "?page=" + page + "&&count=" + count);

  }

  public getOneQuestion(questionId: String): Observable<Question> {
    return this._http.get<Question>(this.base_Url + "/" + questionId);
  }

  public updateOneQuestion(_id:string,question: Question) :Observable<Question> {

    return this._http.put<Question>(this.base_Url + "/" + _id, question);

  }

  public DeleteOneQuestion(questionId: String) {
    return this._http.delete<Question>(this.base_Url + "/" + questionId);
  }

  public addOneQuestion(question: Question) {
    return this._http.post<Question>(this.base_Url + "/", question);
  }

  public getQuestionsWithoutPagination(): Observable<{ "message": Question[] }> {

    return this._http.get<{ "message": Question[] }>(this.base_Url);
  }

}

export interface Question {
  _id: String;
  questionText?: string;
  questionDate?: Date;
  answers?: answer[]
}