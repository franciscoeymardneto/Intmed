import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from './http.service';
import { BrowserStorageService } from './storage.service';
import { ApiRegisterRequest, ApiRegisterResponse } from '../dto/api/register.api.dto';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpService, private storage: BrowserStorageService) {
  }

  register(body: ApiRegisterRequest): Observable<boolean> {
    return this.http.post<ApiRegisterResponse>('/users', body).pipe(
      map(() => {
        return true
      })
    )
  }
}
