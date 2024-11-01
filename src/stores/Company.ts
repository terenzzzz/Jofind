import { defineStore } from 'pinia'

export const useCompanyStore = defineStore("company",{
  state: () => {
    return {
      _id: '',
      name: '',
      logo: '',
      founded: '',
      industry: '',
      size: 0,
      website: '',
      location: '',
      latitude: '',
      longitude: '',
      background: '',
    }
  },
  getters: {
    getCompany: (state) => state
  },
  actions: {

  },
})

