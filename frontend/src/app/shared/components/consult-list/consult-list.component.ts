import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { ScheduleConsultModalBtnComponent } from '../schedule-consult-modal-btn/schedule-consult-modal-btn.component';
import { Consult } from '../../../core/models/consult';
import { ConsultService } from '../../../core/services/consult.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteConsultComponent } from '../../modals/confirm-delete-consult/confirm-delete-consult.component';


@Component({
  selector: 'app-consult',
  standalone: true,
  imports: [
    ScheduleConsultModalBtnComponent,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './consult-list.component.html',
  styleUrl: './consult-list.component.scss'
})
export class ConsultListComponent {
  displayedColumns: string[] = ['especialidade', 'profissional', 'data', 'hora', 'acoes'];
  dataSource: Consult[] = [];
  isLoading= false;
  readonly dialog = inject(MatDialog);

  constructor(private consultService:ConsultService){

  }
  ngOnInit(): void {
    this.handleListConsults()
  }

  desmarcar(element: Consult) {
    const dialogRef = this.dialog.open(ConfirmDeleteConsultComponent, {
      data: {dia: `${element.data} ${element.hora}`, doctor: element.profissional},
      width: "400px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleDeleteConsult(element.id)
      }
    });
  }

  handleListConsults() {
    this.isLoading= true;
    this.dataSource = []
    this.consultService.list().subscribe({
      next: (result) => {
        this.isLoading= false;
        this.dataSource = result
      },
      error: (error) => {
        this.isLoading = false;
        alert("Erro ao listar consultas: " + Object.values(error.error).join())
      }
   })
  }

  handleDeleteConsult(consultId: number){
    this.consultService.delete(consultId).subscribe({
      next: () => {
        this.handleListConsults()
      },
      error:(error) => {
        alert("Erro ao desmaracr consulta: " + Object.values(error.error).join())
      }
    })
  }
}
