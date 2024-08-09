import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from './http.service';
import { DoctorApiResponse, FetchDoctorsApiResponse } from '../dto/api/doctor.api.dto';
import { Doctor } from '../models/doctor';
import { Schedule } from '../models/schedule';
import { FetchSchedulesApiResponse, ScheduleApiResponse } from '../dto/api/schedule.api.dto';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  constructor(private http: HttpService) {
  }

  list(doctorId: number): Observable<Schedule[]> {
    return this.http.get<ScheduleApiResponse[]>(`/agendas?medico=${doctorId}`).pipe(
      map( response => {
        return new FetchSchedulesApiResponse(response).schedules
      })
    )
  }
}
