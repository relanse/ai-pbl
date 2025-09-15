import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useUserStore = defineStore('userInfo', () => {
    const userState = ref({
        userid: '',
        username: '',
        avatarUrl: '',
        token: ''
    });
    function updateUserState(state) {
        userState.value.username = state.username;
        userState.value.avatarUrl = state.avatarUrl;
        userState.value.token = state.token;
        userState.value.userid = state.userid;
    }
    return {
        userState,
        updateUserState
    };
}, { persist: true });
