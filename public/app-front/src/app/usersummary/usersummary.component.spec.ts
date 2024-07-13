import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersummaryComponent } from './usersummary.component';

describe('UsersummaryComponent', () => {
  let component: UsersummaryComponent;
  let fixture: ComponentFixture<UsersummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersummaryComponent]
    });
    fixture = TestBed.createComponent(UsersummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
