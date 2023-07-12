import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PokerService } from './services/poker.service';
import { RoomStore } from './stores/room.store';
import { PlayerStore } from './stores/player.store';
import { Title } from '@angular/platform-browser';
import { Room } from './models/room.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private pokerService: PokerService,
    private roomStore: RoomStore,
    private playerStore: PlayerStore,
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router) {
  }
  room$=this.roomStore.room$;
  player$=this.playerStore.player$;
  ngOnInit(): void {
    this.pokerService.onCreatedRoom().subscribe(room => {
      this.roomStore.room=room;
      this.titleService.setTitle(room.name);
      this.router.navigate([''], { queryParams: { code: room.code } });
    });

    this.pokerService.onJoinedRoom().subscribe(data => {
      if (!data.isSuccess) {
        this.router.navigate([], { queryParams: {} });
        this.roomStore.room={} as Room;
        return;
      };
      this.roomStore.room=data.room;
      this.titleService.setTitle(data.room.name);
      this.router.navigate([''], { queryParams: { code: data.room.code } });
    });

    this.pokerService.onJoinedGame().subscribe(data => {
      this.playerStore.player=data.player;
      this.roomStore.room={
        ...this.roomStore.room,
        players: data.room.players,
        state: data.room.state
      }
    })

    this.pokerService.listenRoomMessage().subscribe(data => {
      console.log(data);

      this.roomStore.room={
        ...this.roomStore.room,
        players: data.players,
        state: data.state
      }
    });
    this.route.queryParamMap.subscribe(data => {
      let code=data.get('code') as any
      if (!code) return;
      this.pokerService.joinRoom(code);
    });
  }

  createRoom(input: HTMLInputElement) {
    if (!input.value) return;
    this.pokerService.createRoom(input.value.trim());
  }

  joinRoom(input: HTMLInputElement) {
    if (!input.value) return;
    this.pokerService.joinRoom(input.value.trim());
  }

  joinGame(input: HTMLInputElement) {
    if (!input.value) return;
    this.pokerService.joinGame(input.value.trim());
  }

  onShare() {
    navigator.clipboard.writeText(location.href)
  }

  onKeyUp(e: KeyboardEvent, callBack: (input: HTMLInputElement) => void, input: HTMLInputElement) {
    if (e.key==='Enter') {
      if (typeof callBack==='function') {
        callBack(input)
      }
    }
  }
}
