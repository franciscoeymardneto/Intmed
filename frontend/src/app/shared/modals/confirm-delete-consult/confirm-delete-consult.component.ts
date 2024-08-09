import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { ConsultListComponent } from '../../components/consult-list/consult-list.component';
import { MatButtonModule } from '@angular/material/button';


export interface DialogData {
  day: string;
  doctor: string;
}


@Component({
  selector: 'app-confirm-delete-consult',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './confirm-delete-consult.component.html',
  styleUrl: './confirm-delete-consult.component.scss'
})
export class ConfirmDeleteConsultComponent {
  day = ''
  doctor = ''
  readonly dialogRef = inject(MatDialogRef<ConsultListComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.day = this.data.day
    this.doctor = this.data.doctor
  }

  onRespond(value: boolean): void {
    this.dialogRef.close(value);
  }
}
