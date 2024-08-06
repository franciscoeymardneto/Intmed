import { Component, inject } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-schedule-consult-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './schedule-consult-modal.component.html',
  styleUrl: './schedule-consult-modal.component.scss'
})
export class ScheduleConsultModalComponent {
  readonly dialogRef = inject(MatDialogRef<ScheduleConsultModalComponent>);
  newConsultForm!: FormGroup

  constructor(private fb: FormBuilder) {
    this.newConsultForm = this.fb.group({
      speciality: [null, [Validators.required]],
      doctor: [{value: null, disabled: true}, [Validators.required]],
      date: [{value: null, disabled: true}, [Validators.required]],
      hour: [{value: null, disabled: true}, [Validators.required]],
    })
  }

  handleEnableNextSelect(nextSelectId: string) {
    this.newConsultForm.get(nextSelectId)?.enable()
  }
  onSubmit() {

  }
  onNoClick() {
    this.dialogRef.close();
  }
}
