export interface Room {
  code: string,
  name: string,
  users: User[]
}

export interface User {
  id: string,
  name: string,
  score: number,
  isHost: boolean
}
