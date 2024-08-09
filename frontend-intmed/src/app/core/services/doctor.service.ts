import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from './http.service';
import { DoctorApiResponse, FetchDoctorsApiResponse } from '../dto/api/doctor.api.dto';
import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  constructor(private http: HttpService) {
  }

  list(specialityId: number): Observable<Doctor[]> {
    return this.http.get<DoctorApiResponse[]>(`/medicos?specialityId=${specialityId}`).pipe(
      map( response => {
        return new FetchDoctorsApiResponse(response).doctors
      })
    )
  }
}
