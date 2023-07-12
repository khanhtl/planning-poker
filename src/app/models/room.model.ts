export interface Room {
  code: string,
  name: string,
  players: Player[],
  state: State|null
}

export enum State {
  Pending=1,
  Done,
  Flip
}
export interface Player {
  id: string,
  nickName: string,
  score: number,
  isHost: boolean,
  state: State
}

export interface Result {
  avg: number,
  detail: Detail
}

interface Detail {
  [key: string]: Data
}

interface Data {
  count: number,
  players: string[]
}
