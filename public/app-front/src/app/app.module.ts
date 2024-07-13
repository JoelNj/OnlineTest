import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AddquestionComponent } from './addquestion/addquestion.component';
import { AnswerComponent } from './answer/answer.component';
import { AnswerdetailComponent } from './answerdetail/answerdetail.component';
import { QuestionComponent } from './question/question.component';
import { QuestionsComponent } from './questions/questions.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ReplaytoanswersComponent } from './replaytoanswers/replaytoanswers.component';
import { UsersummaryComponent } from './usersummary/usersummary.component';
import { CheckquestionvalidityPipe } from './checkquestionvalidity.pipe';
import { GivepourcentageofgoodanswersformyuserPipe } from './givepourcentageofgoodanswersformyuser.pipe';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { UpdatequestionComponent } from './updatequestion/updatequestion.component';
import { AnswersComponent } from './answers/answers.component';
import { UserComponent } from './users/user.component';
import { AddTokenInterceptor } from './add-token.interceptor';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    AnswerComponent,
    AnswerdetailComponent,
    QuestionComponent,
    QuestionsComponent,
    AddquestionComponent,
    ReplaytoanswersComponent,
    UsersummaryComponent,
    CheckquestionvalidityPipe,
    GivepourcentageofgoodanswersformyuserPipe,
    LoginComponent,
    SigninComponent,
    HomeComponent,
    UpdatequestionComponent,
    AnswersComponent,
    UserComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([

      { path: "questions", component: QuestionsComponent },
      { path: "question", component: QuestionComponent },
      { path: "addquestion", component: AddquestionComponent },
      { path: "answers/:questionId", component: AnswerComponent },
      { path: "replaytoanswers", component: ReplaytoanswersComponent, data: { queryParams: ['page'] } },
      { path: "usersummary", component: UsersummaryComponent },
      { path: "login", component: LoginComponent },
      { path: "newuser", component: SigninComponent },
      { path: "home", component: HomeComponent },
      {path:"updatequestion/:questionId",component:UpdatequestionComponent},
      {path:"listanswer/:questionId",component:AnswersComponent},
      {path:"users",component:UserComponent}
    ]),
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000, // duration for which the toast will be displayed (in milliseconds)
      positionClass: 'toast-top-right', // position of the toast on the screen
      preventDuplicates: true, // prevent duplicate toasts from appearing
    })
  ],
  providers: [ provideToastr(),{ 
    provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi:true
  }],
  bootstrap: [AppComponent,]
})
export class AppModule { }
