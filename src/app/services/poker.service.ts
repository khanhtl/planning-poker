import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs'
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root',
})
export class PokerService {
  constructor(private socket: Socket, ) {
  }

  createRoom(roomName: string) {
    this.socket.emit('create-room', roomName);
  }

  joinRoom(roomName: string) {
    this.socket.emit('join-room', roomName);
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

  onJoinVote(name: string) {
    this.socket.emit('join-vote', {
      name,
    });
  }
}
