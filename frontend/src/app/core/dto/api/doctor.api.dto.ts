import { Doctor } from "../../models/doctor"

export type DoctorApiResponse = {
  id: number,
  crm: string,
  nome: string,
  email: string,
  especialidade: string
}

export class FetchDoctorsApiResponse {
  doctors: Doctor[] = []
  constructor(value: DoctorApiResponse[]) {
    this.doctors = value.map(doc => ({
      id: doc.id,
      name: doc.nome
    }))
  }
}
