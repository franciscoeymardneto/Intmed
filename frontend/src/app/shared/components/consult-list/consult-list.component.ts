import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { ScheduleConsultModalBtnComponent } from '../schedule-consult-modal-btn/schedule-consult-modal-btn.component';


export interface Consulta {
  especialidade: string;
  profissional: string;
  data: string;
  hora: string;
}

const CONSULTAS: Consulta[] = [
  { especialidade: 'Cardiologia', profissional: 'Dr. Caio Carlos Ferreira', data: '01/01/2020', hora: '13:00' },
  { especialidade: 'Cardiologia', profissional: 'Dr. Caio Carlos Ferreira', data: '01/01/2020', hora: '13:00' },
  { especialidade: 'Cardiologia', profissional: 'Dr. Caio Carlos Ferreira', data: '01/01/2020', hora: '13:00' },
  { especialidade: 'Cardiologia', profissional: 'Dr. Caio Carlos Ferreira', data: '01/01/2020', hora: '13:00' },
];

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
  dataSource = CONSULTAS;

  desmarcar(element: Consulta) {
    console.log('Desmarcar consulta:', element);
  }
}
