import { create } from 'zustand'
import Cookies from 'js-cookie'

interface AuthState {
  token: string | null
  setToken: (token: string) => void
  clearToken: () => void
}

const useAuthStore = create<AuthState>((set) => ({
  token: Cookies.get('token') || null, // Ambil dari cookies saat init

  setToken: (token) => {
    Cookies.set('token', token, { expires: 1 }) // Simpan 1 hari
    set({ token })
  },

  clearToken: () => {
    Cookies.remove('token')
    set({ token: null })
  },
}))

export default useAuthStore
