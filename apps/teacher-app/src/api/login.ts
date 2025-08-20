import {createRequestInstance} from '@aipbl/common/request/request'
import {ElMessage} from 'element-plus'
import type {AdminInfo, LoginRequestType} from '../types/loginTypes' // 3. 导入了 LoginRequestType
import {useLoginStore} from '../stores/loginStore'
import router from '@/router/index'

const turnToLogin = () => {
  router.push('/login')
}

const getAdminToken = (): string | undefined => {
  return useLoginStore().adminInfo?.access_token
}

const AdminRequest = createRequestInstance({
  onErrorMessage: ElMessage.error,
  onUnAuth: turnToLogin,
  getToken: getAdminToken
})

export function loginAdminAccount(data: LoginRequestType) {
  return AdminRequest.request<AdminInfo>({
    url: '/api/admin/login',
    method: 'post',
    data
  })
}
