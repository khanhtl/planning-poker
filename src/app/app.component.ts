import { Component, OnInit, inject } from '@angular/core';
import { PokerService } from './services/poker.service';
import { RoomStore } from './stores/room.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-planning-pocker';
  constructor(private pokerService: PokerService,
    private roomStore: RoomStore) {
  }
  room$ = this.roomStore.room$;
  ngOnInit(): void {

    this.pokerService.onCreatedRoom().subscribe(room => {
      this.roomStore.room = room
    });

    this.pokerService.onJoinedRoom().subscribe(data => {
      data.isSuccess && (this.roomStore.room = data.room);
    })
  }

  createRoom(input: HTMLInputElement) {
    this.pokerService.createRoom(input.value);
  }

  joinRoom(input: HTMLInputElement) {
      this.pokerService.joinRoom(input.value);
  }
}
