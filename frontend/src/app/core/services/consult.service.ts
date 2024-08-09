import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from './http.service';
import { BrowserStorageService } from './storage.service';
import { Consult } from '../models/consult';
import { FetchConsultsApiResponse, ConsultApiResponseDTO, CreateConsultApi, CreateConsultApiResponse } from '../dto/api/consult.api.dto';

@Injectable({
  providedIn: 'root'
})
export class ConsultService {
  private updateListSubject = new Subject<boolean>();

  updateListObservable$ = this.updateListSubject.asObservable();

  constructor(private http: HttpService, private storage: BrowserStorageService) {
  }

  list(): Observable<Consult[]> {
    let clientId = this.storage.getUserSession().userid
    return this.http.get<ConsultApiResponseDTO[]>(`/consultas?clientId=${clientId}`).pipe(
      map( response => {
        return new FetchConsultsApiResponse(response).consultas
      })
    )
  }

  delete(consultId: number): Observable<void> {
    return this.http.delete(`/consultas/${consultId}`)
  }

  create(params: CreateConsultApi): Observable<Consult> {
    let clientId = this.storage.getUserSession().userid

    let body = {
      ...params,
      cliente_id: clientId
    }

    return this.http.post<ConsultApiResponseDTO>(`/consultas`,body).pipe(
      map( response => {
        return new CreateConsultApiResponse(response).consulta
      })
    )
  }

  askToUpdateConsultList(value: boolean) {
    this.updateListSubject.next(value);
  }
}
