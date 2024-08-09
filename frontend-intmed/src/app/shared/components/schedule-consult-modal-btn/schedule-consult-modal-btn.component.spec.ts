import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleConsultModalBtnComponent } from './schedule-consult-modal-btn.component';

describe('ScheduleConsultModalBtnComponent', () => {
  let component: ScheduleConsultModalBtnComponent;
  let fixture: ComponentFixture<ScheduleConsultModalBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleConsultModalBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleConsultModalBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
