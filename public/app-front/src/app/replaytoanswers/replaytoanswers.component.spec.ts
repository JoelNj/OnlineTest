import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplaytoanswersComponent } from './replaytoanswers.component';

describe('ReplaytoanswersComponent', () => {
  let component: ReplaytoanswersComponent;
  let fixture: ComponentFixture<ReplaytoanswersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReplaytoanswersComponent]
    });
    fixture = TestBed.createComponent(ReplaytoanswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
