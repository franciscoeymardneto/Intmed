export type ApiRegisterRequest = {
  first_name: string
  email: string
  password: string
  password2: string
}

export type ApiRegisterResponse = {
  email: string
  first_name: string
}
