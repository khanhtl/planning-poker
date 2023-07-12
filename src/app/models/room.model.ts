export interface Room {
  code: string,
  name: string,
  players: Player[],
  state: State | null
}

export enum State {
  Pending = 1,
  Voting,
  Done
}

export interface Player {
  id: string,
  nickName: string,
  score: number,
  isHost: boolean
}
