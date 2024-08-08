import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { ScheduleConsultModalBtnComponent } from '../schedule-consult-modal-btn/schedule-consult-modal-btn.component';
import { Consult } from '../../../core/models/consult';
import { ConsultService } from '../../../core/services/consult.service';


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

  constructor(private consultService:ConsultService){

  }
  ngOnInit(): void {
    this.isLoading= true;
    this.consultService.list().subscribe({
      next: (result) => {
        this.isLoading= false;
        this.dataSource = result
      },
      error: (error) => {
        this.isLoading = false;
        alert("Erro ao listar Consultas: " + Object.values(error.error).join())
      }
   })
  }

  desmarcar(element: Consult) {
    console.log('Desmarcar consulta:', element);
  }
}
