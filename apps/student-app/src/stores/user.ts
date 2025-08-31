import {defineStore} from 'pinia'
import {ref} from 'vue'
import type {UserStateType} from '@/types/user'
export const useUserStore = defineStore(
  'userInfo',
  () => {
    const userState = ref<UserStateType>({
      username: '',
      avatarUrl: '',
      token: ''
    })
    function updateUserState(state: UserStateType) {
      userState.value.username = state.username
      userState.value.avatarUrl = state.avatarUrl
      userState.value.token = state.token
    }

    return {
      userState,
      updateUserState
    }
  },
  {persist: true}
)
