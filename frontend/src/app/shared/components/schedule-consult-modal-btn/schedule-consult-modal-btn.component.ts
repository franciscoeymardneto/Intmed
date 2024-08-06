import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleConsultModalComponent } from '../../modals/schedule-consult-modal/schedule-consult-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-schedule-consult-modal-btn',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './schedule-consult-modal-btn.component.html',
  styleUrl: './schedule-consult-modal-btn.component.scss'
})
export class ScheduleConsultModalBtnComponent {

  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    console.log('LALALALALAL')
    this.dialog.open(ScheduleConsultModalComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
