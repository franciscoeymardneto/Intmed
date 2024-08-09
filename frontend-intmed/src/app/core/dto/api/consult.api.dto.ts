import { Consult } from "../../models/consult"
import { DoctorApiResponse } from "./doctor.api.dto"

export type ConsultApiResponseDTO = {
  id: number,
  dia: string,
  horario: string,
  data_agendamento: string,
  medico: DoctorApiResponse
}

export type CreateConsultApi = {
  agenda_id: number,
  horario: string
}

function parseConsultServerToApp(value: ConsultApiResponseDTO): Consult{
  return {
    id: value.id,
    date: value.dia,
    speciality: value.medico.especialidade,
    hour: value.horario,
    doctor: value.medico.nome
  }
}

export class FetchConsultsApiResponse {
  consultas: Consult[] = []
  constructor(value: ConsultApiResponseDTO[]) {
    this.consultas = value.map(con => (parseConsultServerToApp(con)))
  }
}

export class CreateConsultApiResponse {
  consulta: Consult
  constructor(value: ConsultApiResponseDTO) {
    this.consulta = parseConsultServerToApp(value)
  }
}
