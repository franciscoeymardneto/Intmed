import { Schedule } from "../../models/schedule"
import { DoctorApiResponse } from "./doctor.api.dto"

export type ScheduleApiResponse =  {
  id: number,
  medico: DoctorApiResponse,
  dia: string,
  horarios: string[]
}

export class FetchSchedulesApiResponse {
  schedules: Schedule[] = []
  constructor(value: ScheduleApiResponse[]) {
    this.schedules = value.map(sched => ({
      id: sched.id,
      name: sched.dia,
      hours: sched.horarios
    }))
  }
}
