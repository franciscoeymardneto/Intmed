import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpService } from './http.service';
import { BrowserStorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpService, private localStorage: BrowserStorageService) {
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{token: string}>('/users/login', {
      username,
      password
    }).pipe(
      map( response => {
        this.localStorage.set('user', JSON.stringify({ username, token: response.token }));
        return true
      }),
      catchError(error => {
        console.error('Login failed', error);
        return of(false);
      })
    )
  }

  logout(): void {
    this.localStorage.remove('user');
  }

  isLoggedIn(): boolean {
    return this.localStorage.get('user') !== null;
  }
}
