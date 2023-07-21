import { defineStore } from 'pinia'

export const useBannerStore = defineStore('banner', {
    // state is the data being stored in the data store
    state: () => ({
      // Message to display on banner
      bannerMessage: '',
      // Banner Types: Info, Error, or Success
      bannerType: 'Info'
     }),
  
    // getters return data from the data store
    getters: { 
      getBannerMessage: (state) => { return state.bannerMessage },
      getBannerType: (state) => { return state.bannerType }
    },
  
    // actions are operations that change the state
    actions: {
      setBannerData(message, type) {
        this.bannerMessage = message
        this.bannerType = type
      }
    }
  })