export interface LoginFormInterface {
  email: string
  password: string
}

export interface RegisterFormInterface {
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
  phone: string | number
  name: string
  address: string
  subdomain: string
  settings: string[]
}
