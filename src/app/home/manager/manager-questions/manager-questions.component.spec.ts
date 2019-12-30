import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerQuestionsComponent } from './manager-questions.component';

describe('ManagerQuestionsComponent', () => {
  let component: ManagerQuestionsComponent;
  let fixture: ComponentFixture<ManagerQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
