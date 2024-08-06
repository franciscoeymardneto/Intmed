import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserStorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly username: string = 'Karla Burrito'
  constructor( private router: Router, private storage: BrowserStorageService) {
    this.username = this.storage.getUserSession()?.username
  }
  logout() {
    this.storage.clearSession()
    this.router.navigate(['/login'])
  }
}
