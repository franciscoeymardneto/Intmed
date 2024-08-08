import { Consult } from "../../models/consult"
import { DoctorApiResponse } from "./doctor.api.dto"

export type ConsultApiResponseDTO = {
  id: number,
  dia: string,
  horario: string,
  data_agendamento: string,
  medico: DoctorApiResponse
}

export class ConsultApiResponse {
  consultas: Consult[] = []
  constructor(value: ConsultApiResponseDTO[]) {
    this.consultas = value.map(con => ({
      id: con.id,
      data: con.dia,
      especialidade: con.medico.especialidade,
      hora: con.horario,
      profissional: con.medico.nome
    }))
  }
}
