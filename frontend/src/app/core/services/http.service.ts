import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = `${environment.apiBaseUrl}`;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  post<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${path}`, body, { headers: this.headers}).pipe(
      map(response => {
        return response
      })
    )
  }

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${path}`, { headers: this.headers}).pipe(
      map(response => {
        return response
      })
    )
  }

  delete(path: string): Observable<void> {
    return this.http.delete(`${this.baseUrl}${path}`, { headers: this.headers}).pipe(
      map(response => {
        return
      })
    )
  }
}
