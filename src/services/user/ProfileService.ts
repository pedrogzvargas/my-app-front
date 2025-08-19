import api from '@/api/api'
import type { Profile } from './Profile'
import type { PartialProfile } from './Profile'

const getProfile = async (): Promise<Profile> => {
  const { data } = await api.get(`api/v1/me`)
  return data
}

const patchProfile = async (profile: PartialProfile): Promise<Profile> => {
  const { data } = await api.patch(`api/v1/me/`, profile)
  return data
}

export default {
  getProfile,
  patchProfile,
}
