import { RoomStore } from './../stores/room.store';
import { Component, Input, OnInit } from '@angular/core';
import { Player, State } from '../models/room.model';
import { PlayerStore } from '../stores/player.store';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() players!: Player[];
  state=State;
  player$=this.playerStore.player$;
  room$=this.roomStore.room$;
  constructor(private playerStore: PlayerStore, private roomStore: RoomStore) { }

  ngOnInit(): void {
  }

}
