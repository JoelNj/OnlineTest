import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerdetailComponent } from './answerdetail.component';

describe('AnswerdetailComponent', () => {
  let component: AnswerdetailComponent;
  let fixture: ComponentFixture<AnswerdetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnswerdetailComponent]
    });
    fixture = TestBed.createComponent(AnswerdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
