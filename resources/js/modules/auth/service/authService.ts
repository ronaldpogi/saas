import api from '@/plugins/axios'
import type { UserInterface} from '@/types/user'
import type { LoginFormInterface, RegisterFormInterface } from '@/types/auth'

export const authService = {
  async register(payload: RegisterFormInterface) {
    const { data } = await api.post('register', payload)
    return data
  },

  async login(payload: LoginFormInterface) {
    const { data } = await api.post('login', payload)
    return data
  },

  async fetchUser(): Promise<UserInterface> {
    const { data } = await api.get('me')
    return data.data
  },

  async logout() {
    return api.post('logout')
  },
}
