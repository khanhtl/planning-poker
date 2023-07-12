import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs'
import { Player, Room } from '../models/room.model';
import { RoomStore } from '../stores/room.store';

@Injectable({
  providedIn: 'root',
})
export class PokerService {
  constructor(private socket: Socket, private roomStore: RoomStore) {
  }
  createRoom(roomName: string) {
    this.socket.emit('create-room', roomName);
  }

  joinRoom(roomName: string) {
    this.socket.emit('join-room', roomName);
  }

  joinGame(nickName: string) {
    this.socket.emit('join-game', {
      nickName: nickName,
      code: this.roomStore.room.code
    });
  }

  pickCard(data: any) {
    this.socket.emit('pick-card', data);
  }
  flipCard(code: any) {
    this.socket.emit('flip-card', code);
  }
  newVote(code: any) {
    this.socket.emit('new-vote', code);
  }

  onCreatedRoom() {
    return new Observable(observer => {
      this.socket.on('created-room', (room: Room) => {
        observer.next(room)
      })
    }) as Observable<Room>
  }

  onJoinedRoom() {
    return new Observable(observer => {
      this.socket.on('joined-room', (data: { room: Room, isSuccess: boolean }) => {
        observer.next(data)
      })
    }) as Observable<{ room: Room, isSuccess: boolean }>
  }

  listenRoomMessage() {
    return new Observable(observer => {
      this.socket.on('poker-room', (data: any) => {
        observer.next(data)
      })
    }) as Observable<any>;
  }

  onJoinedGame() {
    return new Observable(observer => {
      this.socket.on('joined-game', (data: { player: Player, room: Room }) => {
        observer.next(data)
      })
    }) as Observable<{ player: Player, room: Room }>;
  }

}
