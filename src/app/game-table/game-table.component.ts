import { PokerService } from './../services/poker.service';
import { Component, OnInit } from '@angular/core';
import { RoomStore } from '../stores/room.store';
import { State } from '../models/room.model';
import { PlayerStore } from '../stores/player.store';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.scss']
})
export class GameTableComponent implements OnInit {

  constructor(
    private roomStore: RoomStore,
    private pokerService: PokerService,
    private playerStore: PlayerStore) { }
  room$=this.roomStore.room$;
  player$=this.playerStore.player$;
  state=State;
  result$=this.room$.pipe(map(room => {
    return {
      avg: Number((room.players.reduce((a, c) => a+~~c.score, 0)/room.players.length).toFixed(2)),
      detail: room.players.reduce((a, c) => {
        if (!a[c.score]) {
          a[c.score]={
            count: 1,
            players: [c.nickName]
          }
        } else {
          a[c.score].count++;
          a[c.score].players.push(c.nickName)
        }

        return a;
      }, {} as any)
    }
  }))
  ngOnInit(): void {
  }

  onPickCard(score: any) {
    this.playerStore.player={
      ...this.playerStore.player,
      score: score
    }
    this.pokerService.pickCard({ id: this.playerStore.player.id, score: score, code: this.roomStore.room.code });
  }

  onFlipCard() {
    this.pokerService.flipCard(this.roomStore.room.code);
  }

  onNewVote() {
    this.playerStore.player={
      ...this.playerStore.player,
      score: 0,
      state: this.state.Pending
    }
    this.pokerService.newVote(this.roomStore.room.code);
  }
}
