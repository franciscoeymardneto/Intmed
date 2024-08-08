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
import { SpecialityService } from '../../../core/services/speciality.service';
import { DoctorService } from '../../../core/services/doctor.service';
import { ScheduleService } from '../../../core/services/schedule.service';
import { Speciality } from '../../../core/models/speciality';
import { Doctor } from '../../../core/models/doctor';
import { Schedule } from '../../../core/models/schedule';
import { ConsultService } from '../../../core/services/consult.service';

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
  isLoading = false

  specialities: Speciality[] = []
  doctors: Doctor[] = []
  schedules: Schedule[] = []
  hours: string[] = []

  constructor(
    private fb: FormBuilder,
    private specialityService: SpecialityService,
    private doctorService: DoctorService,
    private scheduleyService: ScheduleService,
    private consultService: ConsultService,
  ) {
    this.newConsultForm = this.fb.group({
      speciality: [null, [Validators.required]],
      doctor: [{value: null, disabled: true}, [Validators.required]],
      date: [{value: null, disabled: true}, [Validators.required]],
      hour: [{value: null, disabled: true}, [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.handleListSpecialities()
  }

  handleSelectSpeciality() {
    this.handleListDoctors()
  }

  handleSelectDoctor() {
    this.handleListSchedules()
  }

  handleSelectSchedule() {
    let schedule = this.schedules.find(sched => sched.id == this.newConsultForm.get('date')!.value)
    this.hours = schedule?.hours || []
    this.handleEnableSelect('hour')
  }

  handleEnableSelect(selectId: string) {
    this.newConsultForm.get(selectId)?.enable()
  }

  handleDisableSelect(selectId: string) {
    this.newConsultForm.get(selectId)?.disable()
  }


  onSubmit() {
    if (this.newConsultForm.valid) {
      const { hour, date } = this.newConsultForm.value;

      this.isLoading = true;
      this.consultService.create({
        agenda_id: date,
        horario: hour
      }).subscribe({
        next: (result) => {
          this.isLoading = false
          this.consultService.askToUpdateCOnsultList(true)
          this.onNoClick()
        },
        error: (error) => {
          this.isLoading = false;
          alert("Erro ao fazer login: " + Object.values(error.error).join())
        }
     });


    } else {
      this.newConsultForm.markAllAsTouched()
    }
  }
  onNoClick() {
    this.dialogRef.close();
  }

  handleListSpecialities() {
    this.newConsultForm.get('speciality')?.reset()
    this.handleDisableSelect('speciality')
    this.specialityService.list().subscribe({
      next: (result) => {
        this.handleEnableSelect('speciality')
        this.specialities = result
      },
      error: (error) => {
        alert("Erro ao listar especialidades: " + Object.values(error.error).join())
      }
   })
  }

  handleListDoctors() {
    this.newConsultForm.get('doctor')?.reset()
    this.handleDisableSelect('doctor')
    this.doctorService.list(this.newConsultForm.get('speciality')!.value).subscribe({
      next: (result) => {
        this.handleEnableSelect('doctor')
        this.doctors = result
      },
      error: (error) => {
        alert("Erro ao listar médicos: " + Object.values(error.error).join())
      }
   })
  }

  handleListSchedules() {
    this.newConsultForm.get('date')?.reset()
    this.newConsultForm.get('hour')?.reset()
    this.handleDisableSelect('date')
    this.handleDisableSelect('hour')
    this.scheduleyService.list(this.newConsultForm.get('doctor')!.value).subscribe({
      next: (result) => {
        this.handleEnableSelect('date')
        this.handleEnableSelect('hour')
        this.schedules = result
      },
      error: (error) => {
        alert("Erro ao listar agendas: " + Object.values(error.error).join())
      }
   })
  }
}
