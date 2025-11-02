
export interface UserInterface {
  id?: string
  tenant_id: string
  first_name: string
  last_name: string
  email: string
  phone?: string | null
  address?: string | null
  roles: string[];
  permissions: string[]
}
