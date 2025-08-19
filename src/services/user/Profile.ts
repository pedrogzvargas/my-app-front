export interface Profile {
  username: string
  first_name: string
  second_name: string
  last_name: string
  second_last_name: string
  email: string
  bio: string
}

export type PartialProfile = Partial<Profile>
