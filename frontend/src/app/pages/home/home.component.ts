import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ConsultListComponent } from '../../shared/components/consult-list/consult-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,ConsultListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
