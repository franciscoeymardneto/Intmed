import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteConsultComponent } from './confirm-delete-consult.component';

describe('ConfirmDeleteConsultComponent', () => {
  let component: ConfirmDeleteConsultComponent;
  let fixture: ComponentFixture<ConfirmDeleteConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDeleteConsultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDeleteConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
