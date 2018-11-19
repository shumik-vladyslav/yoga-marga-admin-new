import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeModalComponent } from './practice-modal.component';

describe('PracticeModalComponent', () => {
  let component: PracticeModalComponent;
  let fixture: ComponentFixture<PracticeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
