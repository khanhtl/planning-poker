import { Component, OnInit } from '@angular/core';
import { RoomStore } from '../stores/room.store';
import { State } from '../models/room.model';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.scss']
})
export class GameTableComponent implements OnInit {

  constructor(private roomStore: RoomStore) { }
  room$ = this.roomStore.room$;
  state = State;
  ngOnInit(): void {
  }

}
