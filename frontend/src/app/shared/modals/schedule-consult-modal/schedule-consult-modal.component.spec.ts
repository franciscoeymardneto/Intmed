import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleConsultModalComponent } from './schedule-consult-modal.component';

describe('ScheduleConsultModalComponent', () => {
  let component: ScheduleConsultModalComponent;
  let fixture: ComponentFixture<ScheduleConsultModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleConsultModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleConsultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
