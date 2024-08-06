import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpService } from './http.service';
import { BrowserStorageService } from './storage.service';
import { UserSession } from '../models/session';


type RegisterRequestBody = {
  first_name: string
  email: string
  password: string
  password2: string
}
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpService, private storage: BrowserStorageService) {
  }

  register(body: RegisterRequestBody): Observable<boolean> {
    return this.http.post<UserSession>('/users', body).pipe(
      map( response => {
        return true
      })
    )
  }
}
