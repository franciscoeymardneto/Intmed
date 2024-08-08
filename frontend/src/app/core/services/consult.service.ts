import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from './http.service';
import { BrowserStorageService } from './storage.service';
import { Consult } from '../models/consult';
import { ConsultApiResponse, ConsultApiResponseDTO } from '../dto/api/consult.api.dto';

@Injectable({
  providedIn: 'root'
})
export class ConsultService {
  constructor(private http: HttpService, private storage: BrowserStorageService) {
  }

  list(): Observable<Consult[]> {
    let clientId = this.storage.getUserSession().userid
    return this.http.get<ConsultApiResponseDTO[]>(`/consultas?clientId=${clientId}`).pipe(
      map( response => {
        return new ConsultApiResponse(response).consultas
      })
    )
  }

  delete(consultId: number): Observable<void> {
    return this.http.delete(`/consultas/${consultId}`)
  }
}
