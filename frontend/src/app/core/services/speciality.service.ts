import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from './http.service';
import { ApiSpecialityResponse } from '../dto/api/speciality.api.dto';
import { Speciality } from '../models/speciality';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {
  constructor(private http: HttpService) {
  }

  list(): Observable<Speciality[]> {
    return this.http.get<ApiSpecialityResponse[]>(`/especialidades`).pipe(
      map( response => {
        return response
      })
    )
  }
}
