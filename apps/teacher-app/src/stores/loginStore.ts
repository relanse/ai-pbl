import {defineStore} from 'pinia'
import {ref} from 'vue'
import {AdminInfo} from '../types/loginTypes'
export const useLoginStore = defineStore('loginStore', () => {
  const adminInfo = ref<AdminInfo>()
  const setUserInfo = (info: AdminInfo) => {
    adminInfo.value = info
  }
  return {
    adminInfo,
    setUserInfo
  }
})
