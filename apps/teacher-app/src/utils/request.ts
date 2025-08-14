import router from '@/router'
import {createRequestInstance} from '@aipbl/common/request/request'
import {ElMessage} from 'element-plus'

export const {request} = createRequestInstance({
  onErrorMessage: ElMessage.error,
  onUnAuth: () => {
    router.push('/login')
    ElMessage.error('请先登录')
  },
  getToken: () => ''
})
