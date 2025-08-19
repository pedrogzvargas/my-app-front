import api from '@/api/api'
import type { authBody } from './authBody'
import type { authResponse } from './authBody'

const auth = async (body: authBody): Promise<authResponse> => {
  const { data } = await api.post(`/api/v1/token/`, body)
  return data
}

export default {
  auth,
}
