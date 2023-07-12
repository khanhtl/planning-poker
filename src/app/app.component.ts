import { Component, OnInit } from '@angular/core';
import { PokerService } from './services/poker.service';
import { RoomStore } from './stores/room.store';
import { Player } from './models/room.model';
import {map} from 'rxjs/operators'
import { PlayerStore } from './stores/player.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private pokerService: PokerService,
    private roomStore: RoomStore,
    private playerStore: PlayerStore) {
  }
  room$ = this.roomStore.room$;
  player$ = this.playerStore.player$;
  ngOnInit(): void {
    this.pokerService.onCreatedRoom().subscribe(room => {
      this.roomStore.room = room
    });

    this.pokerService.onJoinedRoom().subscribe(data => {
      data.isSuccess && (this.roomStore.room = data.room);
    });

    this.pokerService.onJoinedGame().subscribe(data => {
      this.playerStore.player = data.player;
      this.roomStore.room = {
        ...this.roomStore.room,
        players: data.room.players,
        state: data.room.state
      }
    })

    this.pokerService.listenRoomMessage().subscribe(data => {
      this.roomStore.room = {
        ...this.roomStore.room,
        players: data.players,
        state: data.state
      }
    });
  }

  createRoom(input: HTMLInputElement) {
    if(!input.value) return;
    this.pokerService.createRoom(input.value.trim());
  }

  joinRoom(input: HTMLInputElement) {
    if(!input.value) return;
    this.pokerService.joinRoom(input.value.trim());
  }

  joinGame(input: HTMLInputElement) {
    if(!input.value) return;
    this.pokerService.joinGame(input.value.trim());
  }
}
