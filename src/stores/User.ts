import { defineStore } from 'pinia'

export const useUserStore = defineStore("user",{
  state: () => {
    return {
      _id: '',
      name: '',
      email: '',
      avatar: '',
      role: -1,
      token: '',
    }
  },
  getters: {
    getUser: (state) => state
  },
  actions: {

  },
})

